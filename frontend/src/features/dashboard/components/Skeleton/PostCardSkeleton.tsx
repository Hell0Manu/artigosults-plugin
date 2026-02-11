export function PostCardSkeleton() {
  return (
    <div className="p-3 bg-white/5 border border-white/10 rounded-[24px] flex flex-col gap-4 w-full animate-pulse">
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-white/10 rounded-full"></div>
        <div className="h-6 w-24 bg-white/10 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-white/10 rounded"></div>
        <div className="h-4 w-2/3 bg-white/10 rounded"></div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="h-8 w-8 bg-white/10 rounded-full"></div>
        <div className="h-4 w-20 bg-white/10 rounded"></div>
      </div>
    </div>
  );
}