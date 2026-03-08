import React from 'react'

const ProductGridSkeleton = () => {
  return (
    <div className="nf-fade-3  grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse"
        >
          {/* Image area */}
          <div className="relative">
            <div className="w-full h-72 bg-gray-200" />
            {/* Heart button */}
            <div className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
              <div className="w-5 h-5 rounded-full bg-gray-200" />
            </div>
          </div>

          {/* Content area */}
          <div className="p-6">
            {/* Category + Rating row */}
            <div className="flex items-center justify-between mb-2">
              <div className="h-2 w-20 rounded bg-gray-200" />
              <div className="h-2 w-10 rounded bg-gray-200" />
            </div>

            {/* Product name */}
            <div className="h-4 w-3/4 rounded bg-gray-200 mb-2" />

            {/* Description lines */}
            <div className="space-y-2 mb-4">
              <div className="h-2 w-full rounded bg-gray-200" />
              <div className="h-2 w-5/6 rounded bg-gray-200" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="h-5 w-14 rounded-full bg-gray-200" />
              <div className="h-5 w-16 rounded-full bg-gray-200" />
              <div className="h-5 w-12 rounded-full bg-gray-200" />
            </div>

            {/* Price + Buttons row */}
            <div className="flex justify-between items-center">
              <div className="h-6 w-16 rounded bg-gray-200" />
              <div className="flex space-x-2">
                <div className="h-9 w-20 rounded-full bg-gray-200" />
                <div className="h-9 w-16 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductGridSkeleton
