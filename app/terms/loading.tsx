export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="mx-auto max-w-3xl animate-pulse">
        <div className="mb-4 h-10 w-36 rounded bg-white/5" />
        <div className="mb-12 h-5 w-56 rounded bg-white/5" />
        <div className="space-y-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-4 w-full rounded bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
