export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="mb-4 h-10 w-40 animate-pulse rounded bg-white/5" />
      <div className="mb-12 h-5 w-72 animate-pulse rounded bg-white/5" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
            <div className="mb-4 h-4 w-20 animate-pulse rounded bg-white/5" />
            <div className="mb-2 h-8 w-16 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
