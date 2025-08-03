import SkeletonLoader from '@/components/ui/SkeletonLoader'

export default function AboutAuthorLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero skeleton */}
      <div className="relative min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <SkeletonLoader type="title" />
                <SkeletonLoader type="text" lines={2} />
                <div className="flex flex-col sm:flex-row gap-4">
                  <SkeletonLoader type="button" />
                  <SkeletonLoader type="button" />
                </div>
              </div>
              
              <div className="relative">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="aspect-[3/4] bg-gray-200 rounded-2xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote skeleton */}
      <div className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SkeletonLoader type="text" lines={3} className="text-white" />
          </div>
        </div>
      </div>

      {/* Content sections skeleton */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-20">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className={`p-8 lg:p-16 ${i % 2 === 0 ? 'lg:col-start-2' : ''}`}>
                    <SkeletonLoader type="title" />
                    <div className="mt-6">
                      <SkeletonLoader type="text" lines={5} />
                    </div>
                  </div>
                  <div className={`h-64 lg:h-96 bg-gray-200 animate-pulse ${i % 2 === 0 ? 'lg:col-start-1' : ''}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline skeleton */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <SkeletonLoader type="title" />
              <div className="mt-4">
                <SkeletonLoader type="text" />
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-12">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative flex items-start gap-8">
                    <div className="relative z-10 w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
                    <div className="flex-1 rounded-xl p-6 bg-white border border-gray-200">
                      <SkeletonLoader type="title" />
                      <div className="mt-2">
                        <SkeletonLoader type="text" lines={2} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements skeleton */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <SkeletonLoader type="title" />
              <div className="mt-4">
                <SkeletonLoader type="text" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-4 animate-pulse" />
                    <SkeletonLoader type="title" />
                    <div className="mt-2">
                      <SkeletonLoader type="text" lines={2} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Books skeleton */}
      <div className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <SkeletonLoader type="title" />
              <div className="mt-4">
                <SkeletonLoader type="text" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-64 bg-gray-200 animate-pulse" />
                  <div className="p-6">
                    <SkeletonLoader type="title" />
                    <div className="mt-2">
                      <SkeletonLoader type="text" lines={3} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <SkeletonLoader type="button" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}