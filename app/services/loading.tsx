export default function ServicesLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16 h-10 w-64 animate-pulse rounded bg-white/5" />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-8">
            <div className="mb-4 h-4 w-20 animate-pulse rounded bg-white/5" />
            <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
