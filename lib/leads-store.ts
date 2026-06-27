import { promises as fs } from "node:fs";
import path from "node:path";

export interface StoredLead {
  id: string;
  receivedAt: string;
  source: string;
  name: string;
  email: string;
  company?: string;
  website?: string;
  budget?: string;
  message: string;
  ip?: string;
  userAgent?: string;
}

export type LeadStatus = "new" | "replied" | "archived";

interface LeadStatusEntry {
  status: LeadStatus;
  updatedAt: string;
  note?: string;
}

/**
 * Status is stored as a sidecar file (`data/leads.status.json`) so the
 * append-only leads.jsonl stays pure and the migration cost stays zero.
 *
 * For up to a few thousand leads this in-memory read+write is fine.
 * Beyond that, switch the status sidecar to SQLite (same file as the
 * leads file, single atomic write).
 */
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.jsonl");
const STATUS_FILE = path.join(DATA_DIR, "leads.status.json");

interface StatusMap {
  [leadId: string]: LeadStatusEntry;
}

async function readStatus(): Promise<StatusMap> {
  try {
    const raw = await fs.readFile(STATUS_FILE, "utf8");
    return JSON.parse(raw) as StatusMap;
  } catch {
    return {};
  }
}

async function writeStatus(map: StatusMap): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  // Write to a tmp file then rename — atomic on POSIX, prevents partial
  // writes from corrupting the status sidecar.
  const tmp = STATUS_FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(map, null, 2), "utf8");
  await fs.rename(tmp, STATUS_FILE);
}

export async function readLeads(): Promise<StoredLead[]> {
  let raw: string;
  try {
    raw = await fs.readFile(LEADS_FILE, "utf8");
  } catch {
    return [];
  }
  const lines = raw.split("\n").filter(Boolean);
  const all = lines
    .map((l) => {
      try {
        return JSON.parse(l) as StoredLead;
      } catch {
        return null;
      }
    })
    .filter((x): x is StoredLead => x !== null);

  // Newest first
  all.sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
  return all;
}

export async function readLeadsWithStatus(): Promise<
  Array<StoredLead & { status: LeadStatus; updatedAt?: string }>
> {
  const [leads, status] = await Promise.all([readLeads(), readStatus()]);
  return leads.map((l) => {
    const s = status[l.id];
    return {
      ...l,
      status: s?.status ?? "new",
      updatedAt: s?.updatedAt,
    };
  });
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  note?: string,
): Promise<boolean> {
  const map = await readStatus();
  const prev = map[id];
  map[id] = {
    status,
    updatedAt: new Date().toISOString(),
    note: note ?? prev?.note,
  };
  await writeStatus(map);
  return true;
}

export async function getLeadStats(): Promise<{
  total: number;
  today: number;
  thisWeek: number;
  byStatus: Record<LeadStatus, number>;
  byBudget: Record<string, number>;
}> {
  const leads = await readLeadsWithStatus();
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  const byStatus: Record<LeadStatus, number> = { new: 0, replied: 0, archived: 0 };
  const byBudget: Record<string, number> = {};

  let today = 0;
  let thisWeek = 0;

  for (const l of leads) {
    byStatus[l.status]++;
    if (l.budget) byBudget[l.budget] = (byBudget[l.budget] || 0) + 1;

    const t = new Date(l.receivedAt).getTime();
    if (now - t < dayMs) today++;
    if (now - t < 7 * dayMs) thisWeek++;
  }

  return { total: leads.length, today, thisWeek, byStatus, byBudget };
}
