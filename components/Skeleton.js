// Grey placeholder block shown while data is loading
export default function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded bg-gray-200/70 motion-reduce:animate-none ${className}`} />;
}

// Placeholder rows for the transactions table
export function TableSkeleton({ rows = 6 }) {
  const rowList = Array.from({ length: rows });

  return (
    <div className="divide-y divide-gray-100" aria-busy="true" aria-label="Loading transactions">
      {rowList.map((_, index) => (
        <div key={index} className="flex items-center gap-4 px-4 py-3.5">
          <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-3 w-40 max-w-full" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      ))}
    </div>
  );
}
