export default function BlogIndexSkeleton() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse mb-10">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-60 bg-gray-200 rounded-[20px]"></div>
        ))}
      </div>
    );
  }