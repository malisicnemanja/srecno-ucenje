import SkeletonLoader from '@/components/ui/SkeletonLoader'

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero skeleton */}
      <div className="relative min-h-[60vh] bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <SkeletonLoader type="title" />
            <div className="mt-6">
              <SkeletonLoader type="text" lines={2} />
            </div>
            
            {/* Category badges skeleton */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-24 h-10 bg-white/50 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured post skeleton */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <SkeletonLoader type="title" />
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="h-64 lg:h-auto bg-gray-200 animate-pulse" />
              <div className="p-8 lg:p-12">
                <SkeletonLoader type="title" />
                <div className="mt-4">
                  <SkeletonLoader type="text" lines={3} />
                </div>
                <div className="mt-6">
                  <SkeletonLoader type="button" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts grid skeleton */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-6">
                  <SkeletonLoader type="title" />
                  <div className="mt-2">
                    <SkeletonLoader type="text" lines={3} />
                  </div>
                  <div className="mt-4 flex gap-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="w-16 h-6 bg-gray-200 rounded animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}