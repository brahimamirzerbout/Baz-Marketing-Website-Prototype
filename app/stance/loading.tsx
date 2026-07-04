export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="mx-auto max-w-3xl animate-pulse">
        <div className="mb-6 h-4 w-24 rounded bg-white/5" />
        <div className="mb-4 h-12 w-5/6 rounded bg-white/5" />
        <div className="mb-12 h-5 w-full rounded bg-white/5" />
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-white/5 p-8">
              <div className="mb-2 h-6 w-1/2 rounded bg-white/5" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-white/5" />
                <div className="h-4 w-3/4 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
