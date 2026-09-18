import Skeleton from "./Skeleton";

// One number with a label, used at the top of most pages.
// Pass an icon component to show an icon on the right.
export default function StatCard({ label, value, note, noteTone = "gray", icon: Icon, iconColor = "text-gray-400", isLoading }) {
  const noteColors = {
    gray: "text-gray-500",
    green: "text-emerald-700",
    red: "text-red-700",
    amber: "text-amber-700",
  };

  if (isLoading) {
    return (
      <div className="stat-card rounded-lg border border-gray-200 bg-white p-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="stat-value mt-3 h-6 w-28" />
        <Skeleton className="mt-3 h-3 w-20" />
      </div>
    );
  }

  return (
    <div className="stat-card rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-gray-600">{label}</span>
        {Icon && <Icon size={18} strokeWidth={1.75} className={`stat-icon ${iconColor}`} />}
      </div>

      <p className="stat-value mt-2 text-2xl font-semibold tabular-nums tracking-tight text-gray-900">{value}</p>

      {note && <p className={`mt-1 text-xs ${noteColors[noteTone]}`}>{note}</p>}
    </div>
  );
}
