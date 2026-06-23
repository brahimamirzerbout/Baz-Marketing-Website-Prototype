export function DeliverablesList({ items }: { items: string[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-2">
      {items.map((d, i) => (
        <li
          key={d}
          className="flex items-start gap-3 bg-paper rounded-xl border border-ink-100 px-4 py-3"
        >
          <span aria-hidden className="shrink-0 grid place-items-center w-6 h-6 rounded-full bg-ink-900 text-paper text-xs font-bold mt-0.5">
            {String(i + 1)}
          </span>
          <span className="text-[15px] text-ink-900">{d}</span>
        </li>
      ))}
    </ul>
  );
}
