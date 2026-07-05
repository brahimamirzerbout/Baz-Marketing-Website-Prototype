export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="mb-4 h-10 w-64 animate-pulse rounded bg-[var(--border)]" />
      <div className="mb-16 h-5 w-96 animate-pulse rounded bg-[var(--border)]" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--border)] p-6">
            <div className="mb-3 h-4 w-20 animate-pulse rounded bg-[var(--border)]" />
            <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-[var(--border)]" />
            <div className="mb-4 h-4 w-full animate-pulse rounded bg-[var(--border)]" />
            <div className="flex gap-2">
              <div className="h-6 w-16 animate-pulse rounded-full bg-[var(--border)]" />
              <div className="h-6 w-16 animate-pulse rounded-full bg-[var(--border)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
