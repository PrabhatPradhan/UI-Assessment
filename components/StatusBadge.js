const statusStyles = {
  success: { label: "Successful", box: "bg-emerald-50 text-emerald-700 ring-emerald-600/20", dot: "bg-emerald-500" },
  pending: { label: "Pending", box: "bg-amber-50 text-amber-800 ring-amber-600/25", dot: "bg-amber-500" },
  failed: { label: "Failed", box: "bg-red-50 text-red-700 ring-red-600/20", dot: "bg-red-500" },
  refunded: { label: "Refunded", box: "bg-gray-100 text-gray-700 ring-gray-500/20", dot: "bg-gray-400" },
};

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${style.box}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
}
