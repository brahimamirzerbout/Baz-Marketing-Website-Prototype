/**
 * Push the BAZ database schema to Supabase PostgreSQL.
 * 
 * Uses the supabase-js client with the service role key to create
 * a temporary SQL execution function, runs the schema, then drops it.
 * 
 * Usage: node scripts/push-schema.mjs
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

// First, check if tables already exist
const { data: existing, error: checkError } = await supabase
  .from('users')
  .select('id')
  .limit(1);

if (!checkError) {
  console.log('✅ Tables already exist in Supabase');
  process.exit(0);
}

console.log('📋 Tables not found. Schema needs to be pushed.');
console.log('');
console.log('To push the schema, go to your Supabase dashboard:');
console.log('  1. Open https://supabase.com/dashboard/project/uyqgmdrzyapbbvmaumvk');
console.log('  2. Click "SQL Editor" in the left sidebar');
console.log('  3. Click "New query"');
console.log('  4. Paste the contents of supabase/migrations/00001_initial_schema.sql');
console.log('  5. Click "Run"');
console.log('');
console.log('Or provide the database password and I\'ll push it directly:');
console.log('  The connection string is in Settings → Database → Connection string');
console.log('  Format: postgresql://postgres.uyqgmdrzyapbbvmaumvk:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres');
