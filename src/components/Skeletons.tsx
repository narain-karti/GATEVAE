import { motion } from 'motion/react';

export function SkeletonCategory() {
  return (
    <div className="h-[300px] md:h-[400px] rounded-[32px] bg-gray-200 animate-pulse flex flex-col justify-end p-8">
      <div className="flex items-end justify-between">
        <div>
          <div className="w-32 h-6 bg-gray-300 rounded mb-3"></div>
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
}

export function SkeletonProduct() {
  return (
    <div className="bg-white rounded-[28px] p-4 flex flex-col h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="relative h-64 bg-gray-200 rounded-[20px] mb-6 animate-pulse"></div>
      <div className="flex-1 flex flex-col px-2">
        <div className="w-20 h-3 bg-gray-200 rounded mb-3 animate-pulse"></div>
        <div className="w-full h-5 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="w-2/3 h-5 bg-gray-200 rounded mb-4 animate-pulse"></div>
        
        <div className="flex items-center gap-1 mb-4">
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-20 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
