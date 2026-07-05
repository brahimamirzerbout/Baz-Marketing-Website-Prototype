export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="mx-auto max-w-3xl animate-pulse">
        <div className="mb-4 h-10 w-64 rounded bg-[var(--border)]" />
        <div className="mb-16 h-5 w-80 rounded bg-[var(--border)]" />
        <div className="space-y-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-6">
              <div className="h-12 w-12 flex-shrink-0 rounded-full bg-[var(--border)]" />
              <div className="flex-1 space-y-3">
                <div className="h-6 w-1/3 rounded bg-[var(--border)]" />
                <div className="h-4 w-full rounded bg-[var(--border)]" />
                <div className="h-4 w-3/4 rounded bg-[var(--border)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
