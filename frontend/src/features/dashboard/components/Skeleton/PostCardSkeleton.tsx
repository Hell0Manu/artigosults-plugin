export function PostCardSkeleton() {
  return (
    <div className="p-3 bg-card border border-border rounded-[24px] shadow-sm flex flex-col gap-4 w-full animate-pulse">
      {/* Badge Placeholder */}
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-muted rounded-full" />
      </div>

      {/* Title Placeholder */}
      <div className="min-h-[44px] space-y-2">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-2/3 bg-muted rounded" />
      </div>

      {/* Footer Placeholder */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-card bg-muted" />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="h-4 w-10 bg-muted rounded" />
          <div className="h-4 w-12 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}