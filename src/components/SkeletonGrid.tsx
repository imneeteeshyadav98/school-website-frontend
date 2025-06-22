export default function SkeletonGrid() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-200 h-48 animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    );
  }
  