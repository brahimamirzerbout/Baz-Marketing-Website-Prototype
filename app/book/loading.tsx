export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="mx-auto max-w-4xl animate-pulse">
        <div className="mb-4 h-10 w-48 rounded bg-white/5" />
        <div className="mb-12 h-5 w-64 rounded bg-white/5" />
        <div className="flex gap-8">
          <div className="h-96 w-1/3 rounded-xl bg-white/5" />
          <div className="flex-1 space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 w-full rounded bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
