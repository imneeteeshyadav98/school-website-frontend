// src/components/ProgramCardSkeleton.tsx
export default function ProgramCardSkeleton() {
    return (
      <div className="border rounded-lg p-6 shadow animate-pulse space-y-4">
        <div className="h-6 w-1/3 bg-gray-300 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        <div className="h-8 w-1/2 bg-gray-300 rounded mt-4" />
      </div>
    );
  }
  