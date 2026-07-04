export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="mb-4 h-10 w-64 rounded bg-white/5" />
        <div className="mb-16 h-5 w-96 rounded bg-white/5" />
        <div className="overflow-hidden rounded-xl border border-white/5">
          <div className="grid grid-cols-4 gap-4 border-b border-white/5 bg-white/[0.02] p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-5 rounded bg-white/5" />
            ))}
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 border-b border-white/5 p-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-4 rounded bg-white/5" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
