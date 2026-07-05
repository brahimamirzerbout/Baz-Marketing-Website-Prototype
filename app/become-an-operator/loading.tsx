export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-4 h-10 w-48 animate-pulse rounded bg-[var(--border)]" />
      <div className="mb-16 h-5 w-80 animate-pulse rounded bg-[var(--border)]" />
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-[var(--border)]" />
        ))}
      </div>
    </div>
  );
}
