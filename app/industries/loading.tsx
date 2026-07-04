export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="mb-4 h-10 w-56 animate-pulse rounded bg-white/5" />
      <div className="mb-16 h-5 w-72 animate-pulse rounded bg-white/5" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-white/5 p-6">
            <div className="mb-3 h-12 w-12 animate-pulse rounded-lg bg-white/5" />
            <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
