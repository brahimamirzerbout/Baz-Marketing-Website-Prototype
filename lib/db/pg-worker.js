/**
 * Worker thread for synchronous PostgreSQL queries.
 * Receives { id, sql, params, sharedBuffer } messages,
 * executes the query via pg, writes the JSON result to sharedBuffer,
 * and signals completion via Atomics.store.
 */
const { parentPort, workerData } = require("worker_threads");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: workerData.connectionString,
  max: 3,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000,
  ssl: { rejectUnauthorized: false },
});

pool.on("error", () => {});

parentPort.on("message", async ({ id, sql, params, sharedBuffer }) => {
  const signal = new Int32Array(sharedBuffer, 0, 2); // [status, length]
  
  try {
    const res = await pool.query(sql, params || []);
    const json = JSON.stringify({ rows: res.rows, rowCount: res.rowCount || 0 });
    const bytes = Buffer.from(json, "utf8");
    
    // Write length at offset 4 (signal[1])
    signal[1] = bytes.length;
    
    // Write data starting at offset 8
    const dataView = new Uint8Array(sharedBuffer, 8);
    bytes.copy(Buffer.from(dataView.buffer, dataView.byteOffset, dataView.byteLength));
    
    // Signal done (status = 1)
    Atomics.store(signal, 0, 1);
    Atomics.notify(signal, 0);
  } catch (err) {
    const msg = err.message || String(err);
    const bytes = Buffer.from(msg, "utf8");
    signal[1] = bytes.length;
    const dataView = new Uint8Array(sharedBuffer, 8);
    bytes.copy(Buffer.from(dataView.buffer, dataView.byteOffset, dataView.byteLength));
    
    // Signal error (status = 2)
    Atomics.store(signal, 0, 2);
    Atomics.notify(signal, 0);
  }
});