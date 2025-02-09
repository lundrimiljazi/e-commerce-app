export default function ProductSkeleton() {
  return (
    <div className="container p-4 w-full ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="h-96 bg-gray-200 rounded-md"></div>
        ))}
      </div>
    </div>
  );
}
