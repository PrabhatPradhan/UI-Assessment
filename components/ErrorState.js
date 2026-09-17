import { RefreshCw, TriangleAlert } from "lucide-react";

export default function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center" role="alert">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600">
        <TriangleAlert size={20} strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-gray-900">Transactions couldn&apos;t be loaded</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-500">
        The payments service took too long to respond. Check your connection, then try again.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex h-9 items-center gap-2 rounded-md bg-gray-900 px-3 text-sm font-medium text-white hover:bg-gray-800"
      >
        <RefreshCw size={16} />
        Try again
      </button>
    </div>
  );
}
