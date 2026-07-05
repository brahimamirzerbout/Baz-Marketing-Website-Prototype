export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-2 h-8 w-48 animate-pulse rounded bg-[var(--border)]" />
      <div className="mb-8 h-5 w-64 animate-pulse rounded bg-[var(--border)]" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-[var(--border)] bg-[var(--border)] p-6">
            <div className="mb-2 h-4 w-20 animate-pulse rounded bg-[var(--border)]" />
            <div className="h-8 w-16 animate-pulse rounded bg-[var(--border)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
