export default function CategorySkeleton() {
  return (
    <div className="container mx-auto p-8 pt-28">
      <div className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded-md w-24"></div>
        ))}
      </div>
      <div className="pt-28">
        {[...Array(1)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded-md w-24"></div>
        ))}
      </div>
    </div>
  );
}
