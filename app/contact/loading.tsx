export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="mx-auto max-w-2xl animate-pulse">
        <div className="mb-4 h-10 w-48 rounded bg-white/5" />
        <div className="mb-12 h-5 w-96 rounded bg-white/5" />
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="mb-2 h-4 w-24 rounded bg-white/5" />
              <div className="h-12 w-full rounded-lg bg-white/5" />
            </div>
          ))}
          <div className="h-12 w-40 rounded-full bg-white/5" />
        </div>
      </div>
    </div>
  );
}
