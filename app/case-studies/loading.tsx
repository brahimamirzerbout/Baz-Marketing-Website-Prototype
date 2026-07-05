export default function CaseStudiesLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-4 h-10 w-56 animate-pulse rounded bg-[var(--border)]" />
      <div className="mb-16 h-5 w-80 animate-pulse rounded bg-[var(--border)]" />
      <div className="grid gap-8 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-[var(--border)] p-8">
            <div className="mb-3 h-4 w-24 animate-pulse rounded bg-[var(--border)]" />
            <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-[var(--border)]" />
            <div className="mb-4 h-4 w-full animate-pulse rounded bg-[var(--border)]" />
            <div className="flex gap-4">
              <div className="h-4 w-16 animate-pulse rounded bg-[var(--border)]" />
              <div className="h-4 w-16 animate-pulse rounded bg-[var(--border)]" />
              <div className="h-4 w-16 animate-pulse rounded bg-[var(--border)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
