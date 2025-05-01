
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoader() {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-48 bg-gray-800" />
          <Skeleton className="h-10 w-32 bg-gray-800" />
        </div>
        
        {/* Stats cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-gray-800 rounded-lg p-4 bg-gray-900">
              <Skeleton className="h-4 w-24 mb-2 bg-gray-800" />
              <Skeleton className="h-8 w-16 mb-1 bg-gray-800" />
              <Skeleton className="h-3 w-32 bg-gray-800" />
            </div>
          ))}
        </div>
        
        {/* Panel list skeleton */}
        <div className="border border-gray-800 rounded-lg p-4 bg-gray-900 mb-8">
          <Skeleton className="h-6 w-32 mb-4 bg-gray-800" />
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Skeleton className="h-5 w-40 mb-2 bg-gray-800" />
                    <Skeleton className="h-4 w-24 bg-gray-800" />
                  </div>
                  <Skeleton className="h-6 w-16 bg-gray-800" />
                </div>
                <Skeleton className="h-2 w-full mb-4 bg-gray-800" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Skeleton className="h-3 w-24 mb-1 bg-gray-800" />
                    <Skeleton className="h-5 w-16 bg-gray-800" />
                  </div>
                  <div>
                    <Skeleton className="h-3 w-24 mb-1 bg-gray-800" />
                    <Skeleton className="h-5 w-16 bg-gray-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
