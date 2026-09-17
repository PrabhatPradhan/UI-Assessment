import { Inbox, Search } from "lucide-react";

export default function EmptyState({ type = "no-results", title, message, actionLabel, onAction }) {
  const Icon = type === "no-data" ? Inbox : Search;

  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-400">
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-500">{message}</p>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 h-9 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
