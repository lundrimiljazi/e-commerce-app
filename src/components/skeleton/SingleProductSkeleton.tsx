export default function SingleProductSkeleton() {
  return (
    <div className="container mx-auto p-8 min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="aspect-square relative col-span-1 lg:col-span-1 order-1 md:order-2">
          <div className="group bg-gray-200 rounded-xl p-4 w-full h-full animate-pulse"></div>
        </div>

        <div className="col-span-1 lg:col-span-1 order-2 md:order-1 space-y-4">
          <div className="h-8 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
          <div className="h-px w-20 bg-gray-200"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-1 order-3 bg-gray-50 rounded-xl p-6 h-fit">
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>

            <div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse"></div>

            <div className="flex items-center justify-center space-x-4">
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
