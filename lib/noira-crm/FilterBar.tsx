// ============================================================================
// FilterChip + FilterBar — UI for the typed filter language
// ============================================================================
// A single pill: `field operand value ×`. Multiple chips compose with AND/OR
// and can be edited, removed, or extended. Sovereign: zero network calls,
// zero external state. The bar is purely a controlled view over a FilterGroup.
//
//   <FilterBar
//     group={filterGroup}
//     onChange={setFilterGroup}
//     fields={FILTERABLE_FIELDS.task}
//   />
//
// Click a chip → edit mode (modal-less inline editor below the bar).
// Click "+ Add filter" → append a new empty rule. Click "Save smart group"
// → serialize the group to a URL param so the view is shareable.
// ============================================================================

import { useMemo, useState } from "react";
import {
  type FieldDef,
  type FilterGroup,
  type FilterOperand,
  type FilterRule,
  type FilterValue,
  type RelativeDateSpec,
  FILTER_OPERAND_LABELS,
  describeRelativeDate,
  newFilterId,
  operandsForField,
  RELATIVE_DATE_UNIT_LABELS,
} from "@/lib/crm/filter";
import { Close, Plus } from "./svgs";
import { cn } from "@/lib/utils";

// ---------- FilterChip ----------------------------------------------------

interface FilterChipProps {
  rule: FilterRule;
  field: FieldDef;
  onChange: (next: FilterRule) => void;
  onRemove: () => void;
}

function valueToLabel(rule: FilterRule, field: FieldDef): string {
  const v = rule.value;
  if (v === null || v === undefined || v === "") {
    if (rule.operand === "IS_EMPTY") return "—";
    if (rule.operand === "IS_NOT_EMPTY") return "any";
    return "—";
  }
  if (rule.operand === "IS_RELATIVE") {
    if (typeof v === "object" && v !== null && "direction" in v) {
      return describeRelativeDate(v as RelativeDateSpec);
    }
  }
  if (field.type === "select" && typeof v === "string") {
    const opt = field.options?.find((o) => o.value === v);
    return opt?.label ?? v;
  }
  return String(v);
}

export function FilterChip({ rule, field, onChange, onRemove }: FilterChipProps) {
  const operands = operandsForField(field);
  const operandLabel = FILTER_OPERAND_LABELS[rule.operand];
  const valueLabel = valueToLabel(rule, field);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 pl-2.5 pr-1 py-1 rounded-full",
        "bg-surface-1 border border-border-subtle text-light-2 text-xs",
        "hover:border-accent/50 transition-colors",
      )}
    >
      <span className="font-medium text-light-1">{field.label}</span>
      <span className="text-light-3">{operandLabel}</span>
      <span className="text-light-1">{valueLabel}</span>
      <button
        type="button"
        onClick={onRemove}
        className="ml-0.5 rounded-full p-0.5 hover:bg-surface-muted text-light-3 hover:text-light-1 transition-colors"
        aria-label={`Remove ${field.label} filter`}
      >
        <Close className="h-3 w-3" />
      </button>
    </div>
  );
}

// ---------- Edit-popover --------------------------------------------------

interface EditPopoverProps {
  rule: FilterRule;
  field: FieldDef;
  onChange: (next: FilterRule) => void;
  onClose: () => void;
}

function EditPopover({ rule, field, onChange, onClose }: EditPopoverProps) {
  const operands = operandsForField(field);

  const setOperand = (op: FilterOperand) => {
    // Pick a sensible default value when the operand changes shape.
    let nextValue: FilterValue = rule.value;
    if (op === "IS_EMPTY" || op === "IS_NOT_EMPTY") nextValue = null;
    else if (op === "IS_TODAY" || op === "IS_IN_PAST" || op === "IS_IN_FUTURE") nextValue = null;
    else if (op === "IS_RELATIVE")
      nextValue = { direction: "NEXT", amount: 7, unit: "DAY" } as RelativeDateSpec;
    else if (op === "IS" || op === "IS_NOT") {
      nextValue = field.options?.[0]?.value ?? "";
    } else if (op === "CONTAINS" || op === "DOES_NOT_CONTAIN") nextValue = "";
    else if (op === "GT" || op === "LT") nextValue = 0;
    else if (op === "IS_BEFORE" || op === "IS_AFTER") nextValue = "";
    onChange({ ...rule, operand: op, value: nextValue });
  };

  return (
    <div className="absolute z-20 mt-1 left-0 min-w-[280px] rounded-xl border border-border bg-surface-1 shadow-xl p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-light-1">Edit filter</span>
        <button
          onClick={onClose}
          className="text-light-3 hover:text-light-1"
          aria-label="Close editor"
        >
          <Close className="h-4 w-4" />
        </button>
      </div>

      <div>
        <label className="text-[10px] uppercase tracking-wider text-light-3 block mb-1">
          Field
        </label>
        <div className="text-xs px-2 py-1.5 rounded-md bg-surface-2 text-light-1 border border-border-subtle">
          {field.label}
        </div>
      </div>

      <div>
        <label className="text-[10px] uppercase tracking-wider text-light-3 block mb-1">
          Operator
        </label>
        <select
          value={rule.operand}
          onChange={(e) => setOperand(e.target.value as FilterOperand)}
          className="w-full text-xs px-2 py-1.5 rounded-md bg-surface-2 border border-border-subtle text-light-1"
        >
          {operands.map((op) => (
            <option key={op} value={op}>
              {FILTER_OPERAND_LABELS[op]}
            </option>
          ))}
        </select>
      </div>

      <ValueEditor rule={rule} field={field} onChange={onChange} />

      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={onClose}
          className="text-xs px-3 py-1.5 rounded-md bg-accent text-white hover:opacity-90"
        >
          Done
        </button>
      </div>
    </div>
  );
}

function ValueEditor({
  rule,
  field,
  onChange,
}: {
  rule: FilterRule;
  field: FieldDef;
  onChange: (next: FilterRule) => void;
}) {
  // No-value operands render an explanatory hint instead of an input.
  if (
    rule.operand === "IS_EMPTY" ||
    rule.operand === "IS_NOT_EMPTY" ||
    rule.operand === "IS_TODAY" ||
    rule.operand === "IS_IN_PAST" ||
    rule.operand === "IS_IN_FUTURE"
  ) {
    return <p className="text-[11px] text-light-3 italic">No value needed for this operator.</p>;
  }

  if (rule.operand === "IS_RELATIVE") {
    const spec = (rule.value as RelativeDateSpec) ?? { direction: "NEXT", amount: 7, unit: "DAY" };
    return (
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-wider text-light-3 block">Window</label>
        <div className="grid grid-cols-3 gap-1.5">
          <select
            value={spec.direction}
            onChange={(e) =>
              onChange({
                ...rule,
                value: {
                  ...spec,
                  direction: e.target.value as RelativeDateSpec["direction"],
                } as RelativeDateSpec,
              })
            }
            className="text-xs px-2 py-1.5 rounded-md bg-surface-2 border border-border-subtle text-light-1"
          >
            <option value="NEXT">next</option>
            <option value="THIS">this</option>
            <option value="PAST">last</option>
          </select>
          {spec.direction !== "THIS" && (
            <input
              type="number"
              min={1}
              value={spec.amount ?? 1}
              onChange={(e) =>
                onChange({
                  ...rule,
                  value: {
                    ...spec,
                    amount: Math.max(1, Number(e.target.value)),
                  } as RelativeDateSpec,
                })
              }
              className="text-xs px-2 py-1.5 rounded-md bg-surface-2 border border-border-subtle text-light-1"
            />
          )}
          {spec.direction === "THIS" && <div />}
          <select
            value={spec.unit}
            onChange={(e) =>
              onChange({
                ...rule,
                value: {
                  ...spec,
                  unit: e.target.value as RelativeDateSpec["unit"],
                } as RelativeDateSpec,
              })
            }
            className="text-xs px-2 py-1.5 rounded-md bg-surface-2 border border-border-subtle text-light-1"
          >
            {Object.entries(RELATIVE_DATE_UNIT_LABELS).map(([k, l]) => (
              <option key={k} value={k}>
                {l}
                {spec.amount === 1 ? "" : "s"}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (field.type === "select" && field.options) {
    return (
      <div>
        <label className="text-[10px] uppercase tracking-wider text-light-3 block mb-1">
          Value
        </label>
        <select
          value={String(rule.value ?? "")}
          onChange={(e) => onChange({ ...rule, value: e.target.value })}
          className="w-full text-xs px-2 py-1.5 rounded-md bg-surface-2 border border-border-subtle text-light-1"
        >
          <option value="">— pick —</option>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.numericOnly || rule.operand === "GT" || rule.operand === "LT") {
    return (
      <div>
        <label className="text-[10px] uppercase tracking-wider text-light-3 block mb-1">
          Value
        </label>
        <input
          type="number"
          value={Number(rule.value ?? 0)}
          onChange={(e) => onChange({ ...rule, value: Number(e.target.value) })}
          className="w-full text-xs px-2 py-1.5 rounded-md bg-surface-2 border border-border-subtle text-light-1"
        />
      </div>
    );
  }

  if (rule.operand === "IS_BEFORE" || rule.operand === "IS_AFTER") {
    return (
      <div>
        <label className="text-[10px] uppercase tracking-wider text-light-3 block mb-1">Date</label>
        <input
          type="date"
          value={String(rule.value ?? "").slice(0, 10)}
          onChange={(e) => onChange({ ...rule, value: e.target.value })}
          className="w-full text-xs px-2 py-1.5 rounded-md bg-surface-2 border border-border-subtle text-light-1"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="text-[10px] uppercase tracking-wider text-light-3 block mb-1">Value</label>
      <input
        type="text"
        value={String(rule.value ?? "")}
        onChange={(e) => onChange({ ...rule, value: e.target.value })}
        className="w-full text-xs px-2 py-1.5 rounded-md bg-surface-2 border border-border-subtle text-light-1"
        placeholder="type a value…"
      />
    </div>
  );
}

// ---------- FilterBar -----------------------------------------------------

interface FilterBarProps {
  group: FilterGroup;
  onChange: (next: FilterGroup) => void;
  fields: FieldDef[];
  /** Optional className for the outer wrapper. */
  className?: string;
  /** Compact mode: tighter padding, used in dense lists. */
  compact?: boolean;
}

export function FilterBar({ group, onChange, fields, className, compact }: FilterBarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const fieldByName = useMemo(() => {
    const m = new Map<string, FieldDef>();
    fields.forEach((f) => m.set(f.name, f));
    return m;
  }, [fields]);

  const updateRule = (next: FilterRule) => {
    onChange({
      ...group,
      rules: group.rules.map((r) => (r.id === next.id ? next : r)),
    });
  };

  const removeRule = (id: string) => {
    onChange({ ...group, rules: group.rules.filter((r) => r.id !== id) });
  };

  const addRule = (fieldName: string) => {
    const def = fieldByName.get(fieldName);
    if (!def) return;
    const operands = operandsForField(def);
    const defaultOp = operands[0];
    let value: FilterValue = "";
    if (defaultOp === "IS_RELATIVE")
      value = { direction: "NEXT", amount: 7, unit: "DAY" } as RelativeDateSpec;
    if (def.type === "select" && def.options) value = def.options[0].value;
    if (def.numericOnly) value = 0;
    const newRule: FilterRule = {
      id: newFilterId("r"),
      field: fieldName,
      operand: defaultOp,
      value,
    };
    onChange({ ...group, rules: [...group.rules, newRule] });
    setShowAddMenu(false);
    setEditingId(newRule.id);
  };

  const toggleLogical = () => {
    onChange({
      ...group,
      logicalOperator: group.logicalOperator === "AND" ? "OR" : "AND",
    });
  };

  const clear = () => onChange({ ...group, rules: [], groups: [] });

  const usedFields = new Set(group.rules.map((r) => r.field));
  const availableFields = fields.filter((f) => !usedFields.has(f.name));

  return (
    <div className={cn("relative", className)}>
      <div className={cn("flex flex-wrap items-center gap-1.5", compact ? "py-1" : "py-2")}>
        {group.rules.length === 0 && (
          <span className="text-[11px] text-light-3 italic">
            No filters — showing every record.
          </span>
        )}

        {group.rules.map((r, idx) => {
          const def = fieldByName.get(r.field);
          if (!def) return null;
          const isLast = idx === group.rules.length - 1;
          return (
            <span key={r.id} className="inline-flex items-center gap-1.5">
              {idx > 0 && (
                <button
                  type="button"
                  onClick={toggleLogical}
                  className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-surface-2 text-light-3 hover:text-accent transition-colors"
                  title="Click to toggle AND / OR"
                >
                  {group.logicalOperator}
                </button>
              )}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setEditingId(editingId === r.id ? null : r.id)}
                  className="cursor-pointer"
                >
                  <FilterChip
                    rule={r}
                    field={def}
                    onChange={updateRule}
                    onRemove={() => removeRule(r.id)}
                  />
                </button>
                {editingId === r.id && (
                  <EditPopover
                    rule={r}
                    field={def}
                    onChange={updateRule}
                    onClose={() => setEditingId(null)}
                  />
                )}
              </div>
              {!isLast && <span className="sr-only">{group.logicalOperator}</span>}
            </span>
          );
        })}

        {/* Add filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAddMenu((v) => !v)}
            disabled={availableFields.length === 0}
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px]",
              "border border-dashed transition-colors",
              availableFields.length === 0
                ? "border-border-subtle text-light-3/40 cursor-not-allowed"
                : "border-accent/40 text-accent hover:bg-accent/10",
            )}
          >
            <Plus className="h-3 w-3" />
            <span>Add filter</span>
          </button>
          {showAddMenu && availableFields.length > 0 && (
            <div className="absolute z-20 mt-1 left-0 min-w-[200px] rounded-xl border border-border bg-surface-1 shadow-xl py-1 max-h-72 overflow-y-auto">
              {availableFields.map((f) => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => addRule(f.name)}
                  className="w-full text-left px-3 py-1.5 text-xs text-light-2 hover:bg-surface-2 hover:text-light-1"
                >
                  {f.label}
                  <span className="ml-2 text-[10px] text-light-3">{f.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {group.rules.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="text-[10px] uppercase tracking-wider px-2 py-1 text-light-3 hover:text-light-1"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

// Re-export so consumers don't need a second import.
export { emptyGroup } from "@/lib/crm/filter";
