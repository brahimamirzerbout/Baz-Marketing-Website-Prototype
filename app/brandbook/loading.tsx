export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="mx-auto max-w-4xl animate-pulse">
        <div className="mb-4 h-10 w-56 rounded bg-white/5" />
        <div className="mb-12 h-5 w-80 rounded bg-white/5" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-video rounded-xl bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
