export default function Loading() {
  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-md animate-pulse">
        <div className="mb-8 space-y-2 text-center">
          <div className="mx-auto h-10 w-40 rounded bg-[var(--border)]" />
          <div className="mx-auto h-5 w-56 rounded bg-[var(--border)]" />
        </div>
        <div className="space-y-4">
          <div>
            <div className="mb-2 h-4 w-20 rounded bg-[var(--border)]" />
            <div className="h-12 w-full rounded-lg bg-[var(--border)]" />
          </div>
          <div>
            <div className="mb-2 h-4 w-20 rounded bg-[var(--border)]" />
            <div className="h-12 w-full rounded-lg bg-[var(--border)]" />
          </div>
          <div className="h-12 w-full rounded-full bg-[var(--border)]" />
        </div>
      </div>
    </div>
  );
}
