// ============================================================================
// CommandPalette — ⌘K launcher for the CRM
// ============================================================================
// Keyboard-first palette. Three scopes:
//
//   • Navigation  — go to /crm, /crm/contacts, /crm/pipeline, etc.
//   • Records     — global search across contacts, deals, tasks, notes, companies
//   • Actions     — "Reset CRM data", "Toggle theme", quick-create shortcuts
//
// Sovereign: zero network. Recent commands persist in localStorage. Search
// uses the in-memory `globalSearch()` (Phase 1).
// ============================================================================

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  globalSearch,
  getRecentCommands,
  pushRecentCommand,
  type GlobalSearchResults,
  type SearchHit,
} from "@/lib/crm/search";
import type { Company, Contact, Deal, Note, Task } from "@/lib/crm/types";
import { Close, Search } from "./svgs";
import { cn } from "@/lib/utils";

// ---------- Item types ----------------------------------------------------

interface NavItem {
  kind: "nav";
  id: string;
  label: string;
  hint: string;
  to: string;
  group: "Navigation";
}
interface RecordItem {
  kind: "record";
  id: string;
  label: string;
  hint: string;
  to: string;
  group: string;
  onRun: () => void;
}
interface ActionItem {
  kind: "action";
  id: string;
  label: string;
  hint: string;
  group: "Actions";
  onRun: () => void;
}
type PaletteItem = NavItem | RecordItem | ActionItem;

// ---------- Component -----------------------------------------------------

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
  onQuickCreate?: (kind: "contact" | "deal" | "task") => void;
}

export function CommandPalette({ isOpen, onClose, onReset, onQuickCreate }: CommandPaletteProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [results, setResults] = useState<GlobalSearchResults | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ---------- Static nav items -------------------------------------------
  const navItems: NavItem[] = useMemo(
    () => [
      {
        kind: "nav",
        id: "nav-dashboard",
        label: "Dashboard",
        hint: "KPI overview",
        to: "/crm",
        group: "Navigation",
      },
      {
        kind: "nav",
        id: "nav-contacts",
        label: "Contacts",
        hint: "Browse all contacts",
        to: "/crm/contacts",
        group: "Navigation",
      },
      {
        kind: "nav",
        id: "nav-companies",
        label: "Companies",
        hint: "Browse companies",
        to: "/crm/companies",
        group: "Navigation",
      },
      {
        kind: "nav",
        id: "nav-pipeline",
        label: "Pipeline",
        hint: "Deal kanban",
        to: "/crm/pipeline",
        group: "Navigation",
      },
      {
        kind: "nav",
        id: "nav-tasks",
        label: "Tasks",
        hint: "Activity & to-dos",
        to: "/crm/tasks",
        group: "Navigation",
      },
      {
        kind: "nav",
        id: "nav-finance",
        label: "Finance Center",
        hint: "Forecasts & ROI",
        to: "/crm/finance",
        group: "Navigation",
      },
    ],
    [],
  );

  const actionItems: ActionItem[] = useMemo(
    () => [
      ...(onQuickCreate
        ? ([
            {
              kind: "action",
              id: "act-new-contact",
              label: "New contact",
              hint: "Quick-create",
              group: "Actions",
              onRun: () => onQuickCreate("contact"),
            },
            {
              kind: "action",
              id: "act-new-deal",
              label: "New deal",
              hint: "Quick-create",
              group: "Actions",
              onRun: () => onQuickCreate("deal"),
            },
            {
              kind: "action",
              id: "act-new-task",
              label: "New task",
              hint: "Quick-create",
              group: "Actions",
              onRun: () => onQuickCreate("task"),
            },
          ] as ActionItem[])
        : []),
      ...(onReset
        ? ([
            {
              kind: "action",
              id: "act-reset",
              label: "Reset CRM data",
              hint: "Restore seed",
              group: "Actions",
              onRun: () => {
                if (confirm("Reset CRM data? This restores the demo seed.")) {
                  onReset();
                }
              },
            },
          ] as ActionItem[])
        : []),
    ],
    [onQuickCreate, onReset],
  );

  // ---------- Recent commands (shown when query empty) ------------------
  const [recents, setRecents] = useState<string[]>([]);
  useEffect(() => {
    if (isOpen) setRecents(getRecentCommands());
  }, [isOpen]);

  // ---------- Search ----------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(0);
    setQuery("");
    setResults(null);
    // Focus input on open.
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (!query.trim()) {
      setResults(null);
      return;
    }
    setResults(globalSearch(query));
    setActiveIndex(0);
  }, [query, isOpen]);

  // ---------- Build flat list of items ---------------------------------
  const flatItems: PaletteItem[] = useMemo(() => {
    const out: PaletteItem[] = [];

    // Static nav (filtered by query if present).
    const q = query.trim().toLowerCase();
    for (const n of navItems) {
      if (!q || n.label.toLowerCase().includes(q) || n.hint.toLowerCase().includes(q)) {
        out.push(n);
      }
    }

    // Record results (only when query present).
    if (results) {
      const pushRecords = <T extends { id: string }>(
        hits: SearchHit<T>[],
        groupLabel: string,
        makeItem: (hit: SearchHit<T>) => RecordItem,
      ) => {
        for (const h of hits) out.push(makeItem(h));
        // Touch the group label to keep types happy.
        void groupLabel;
      };
      pushRecords<Contact>(results.contacts, "Contacts", (h) => ({
        kind: "record",
        id: `rec-contact-${h.item.id}`,
        label: h.item.fullName,
        hint: `${h.item.email}${h.item.title ? " · " + h.item.title : ""}`,
        to: `/crm/contacts/${h.item.id}`,
        group: "Contacts",
        onRun: () => navigate(`/crm/contacts/${h.item.id}`),
      }));
      pushRecords<Company>(results.companies, "Companies", (h) => ({
        kind: "record",
        id: `rec-company-${h.item.id}`,
        label: h.item.name,
        hint: h.item.domain ?? h.item.industry ?? "Company",
        to: `/crm/companies`,
        group: "Companies",
        onRun: () => navigate(`/crm/companies`),
      }));
      pushRecords<Deal>(results.deals, "Deals", (h) => ({
        kind: "record",
        id: `rec-deal-${h.item.id}`,
        label: h.item.name,
        hint: `${h.item.stage} · ${h.item.amount.toLocaleString()}`,
        to: `/crm/pipeline`,
        group: "Deals",
        onRun: () => navigate(`/crm/pipeline`),
      }));
      pushRecords<Task>(results.tasks, "Tasks", (h) => ({
        kind: "record",
        id: `rec-task-${h.item.id}`,
        label: h.item.title,
        hint: `${h.item.type}${h.item.dueDate ? " · due " + h.item.dueDate.slice(0, 10) : ""}`,
        to: `/crm/tasks`,
        group: "Tasks",
        onRun: () => navigate(`/crm/tasks`),
      }));
      pushRecords<Note>(results.notes, "Notes", (h) => ({
        kind: "record",
        id: `rec-note-${h.item.id}`,
        label: h.item.body.slice(0, 60) + (h.item.body.length > 60 ? "…" : ""),
        hint: `Note`,
        to: `/crm/tasks`,
        group: "Notes",
        onRun: () => navigate(`/crm/tasks`),
      }));
    }

    // Actions (filtered by query).
    for (const a of actionItems) {
      if (!q || a.label.toLowerCase().includes(q)) {
        out.push(a);
      }
    }

    return out;
  }, [query, results, navItems, actionItems, navigate]);

  // ---------- Run an item ----------------------------------------------
  const runItem = useCallback(
    (item: PaletteItem) => {
      pushRecentCommand(item.label);
      if (item.kind === "nav") {
        navigate(item.to);
      } else if (item.kind === "record" || item.kind === "action") {
        item.onRun();
      }
      onClose();
    },
    [navigate, onClose],
  );

  // ---------- Keyboard navigation --------------------------------------
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(flatItems.length - 1, i + 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const item = flatItems[activeIndex];
      if (item) runItem(item);
      return;
    }
  };

  if (!isOpen) return null;

  // ---------- Render ---------------------------------------------------
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl rounded-2xl border border-border-subtle bg-surface-card shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle">
          <Search className="h-4 w-4 text-light-3 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search contacts, deals, tasks, or type a command…"
            className="flex-1 bg-transparent outline-none text-sm text-light-1 placeholder:text-light-3"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-surface-2 border border-border-subtle text-light-3">
            Esc
          </kbd>
          <button
            type="button"
            onClick={onClose}
            className="text-light-3 hover:text-light-1"
            aria-label="Close command palette"
          >
            <Close className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
          {flatItems.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="text-sm text-light-3">
                {query.trim()
                  ? `No matches for "${query}".`
                  : "Start typing to search across contacts, deals, tasks, and notes."}
              </p>
              {recents.length > 0 && !query.trim() && (
                <div className="mt-6 text-left">
                  <div className="text-[10px] uppercase tracking-wider text-light-3 mb-2 px-2">
                    Recent
                  </div>
                  <ul className="space-y-1">
                    {recents.map((r, i) => (
                      <li key={`${r}-${i}`}>
                        <button
                          type="button"
                          onClick={() => setQuery(r)}
                          className="w-full text-left px-3 py-1.5 rounded-md text-xs text-light-2 hover:bg-surface-2"
                        >
                          {r}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <PaletteGroups
              items={flatItems}
              activeIndex={activeIndex}
              onRun={runItem}
              setActiveIndex={setActiveIndex}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-4 py-2 border-t border-border-subtle bg-surface-1 text-[10px] text-light-3">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 rounded bg-surface-2 border border-border-subtle">↑↓</kbd>{" "}
              navigate
            </span>
            <span>
              <kbd className="px-1 rounded bg-surface-2 border border-border-subtle">↵</kbd> open
            </span>
            <span>
              <kbd className="px-1 rounded bg-surface-2 border border-border-subtle">Esc</kbd> close
            </span>
          </div>
          <span>
            {flatItems.length} result{flatItems.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------- Grouped rendering --------------------------------------------

function PaletteGroups({
  items,
  activeIndex,
  setActiveIndex,
  onRun,
}: {
  items: PaletteItem[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  onRun: (item: PaletteItem) => void;
}) {
  // Group items by `group`.
  const groups = useMemo(() => {
    const map = new Map<string, PaletteItem[]>();
    for (const it of items) {
      const g = it.group;
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(it);
    }
    return Array.from(map.entries());
  }, [items]);

  return (
    <div className="py-2">
      {groups.map(([group, groupItems]) => (
        <div key={group} className="mb-1">
          <div className="px-4 py-1 text-[10px] uppercase tracking-wider text-light-3">{group}</div>
          <ul>
            {groupItems.map((item) => {
              const idx = items.indexOf(item);
              const active = idx === activeIndex;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => onRun(item)}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 px-4 py-2 text-left text-sm transition-colors",
                      active ? "bg-surface-2 text-light-1" : "text-light-2",
                    )}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <span className="truncate">{item.label}</span>
                    </span>
                    <span className="text-[10px] text-light-3 truncate max-w-[40%]">
                      {item.hint}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
