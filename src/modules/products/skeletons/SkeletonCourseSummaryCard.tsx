'use client';

export default function SkeletonCourseSummaryCard() {
  return (
    <aside className="bg-white rounded-[38px] shadow p-6 w-full space-y-4 animate-pulse">
      {/* Skeleton Image */}
      <div className="bg-gray-300 w-full h-[250px] rounded-2xl"></div>

      {/* Skeleton Texts */}
      <div className="text-sm text-gray-600 space-y-2">
        <div className="bg-gray-300 h-6 w-1/2 rounded-sm"></div>
        <div className="bg-gray-300 h-8 w-1/4 rounded-sm"></div>
      </div>

      {/* Skeleton List */}
      <ul className="text-sm text-gray-700 space-y-3">
        <li className="flex items-center gap-2">
          <div className="bg-gray-300 w-4 h-4 rounded-full"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded-sm"></div>
        </li>
        <li className="flex items-center gap-2">
          <div className="bg-gray-300 w-4 h-4 rounded-full"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded-sm"></div>
        </li>
        <li className="flex items-center gap-2">
          <div className="bg-gray-300 w-4 h-4 rounded-full"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded-sm"></div>
        </li>
        <li className="flex items-center gap-2">
          <div className="bg-gray-300 w-4 h-4 rounded-full"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded-sm"></div>
        </li>
        <li className="flex items-center gap-2">
          <div className="bg-gray-300 w-4 h-4 rounded-full"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded-sm"></div>
        </li>
      </ul>

      {/* Skeleton Certification Text */}
      <div className="text-xs text-gray-500">
        <div className="bg-gray-300 h-4 w-2/3 rounded-sm"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded-sm mt-2"></div>
      </div>

      {/* Skeleton Certificate Image */}
      <div className="flex items-center justify-center mb-2">
        <div className="bg-gray-300 w-20 h-8 rounded-lg"></div>
      </div>

      {/* Skeleton Buttons */}
      <div className="space-y-2">
        <div className="bg-gray-300 w-full h-12 rounded-full"></div>
        <div className="bg-gray-300 w-full h-12 rounded-full"></div>
      </div>
    </aside>
  );
}
