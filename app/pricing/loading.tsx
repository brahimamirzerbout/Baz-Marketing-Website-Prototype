export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="mb-4 h-10 w-40 animate-pulse rounded bg-white/5" />
      <div className="mb-16 h-5 w-80 animate-pulse rounded bg-white/5" />
      <div className="grid gap-8 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
            <div className="mb-2 h-5 w-24 animate-pulse rounded bg-white/5" />
            <div className="mb-6 h-10 w-28 animate-pulse rounded bg-white/5" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="h-4 w-full animate-pulse rounded bg-white/5" />
              ))}
            </div>
            <div className="mt-8 h-12 w-full animate-pulse rounded-full bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
