function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-[#141414] border border-white/5 min-w-[160px]">
      <div className="w-full h-72 bg-white/5 animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-white/5 animate-pulse rounded-full w-3/4" />
        <div className="h-3 bg-white/5 animate-pulse rounded-full w-1/2" />
      </div>
    </div>
  );
}

export default SkeletonCard;