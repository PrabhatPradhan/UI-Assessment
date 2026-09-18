import { ArrowDownRight, ArrowLeftRight, ArrowUpRight, CircleCheck, CircleX, Clock } from "lucide-react";
import Skeleton from "./Skeleton";
import { formatCount, formatMoney } from "../utils/helpers";

const cardIcons = {
  all: { icon: ArrowLeftRight, color: "text-gray-400" },
  success: { icon: CircleCheck, color: "text-emerald-600" },
  pending: { icon: Clock, color: "text-amber-600" },
  failed: { icon: CircleX, color: "text-red-600" },
};

function StatCard({ stat, isActive, onClick }) {
  const Icon = cardIcons[stat.key].icon;
  const isUp = stat.change >= 0;
  
  const isGoodChange = isUp === stat.goodWhenUp;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      title={`Show ${stat.label.toLowerCase()} in the table`}
      className={`stat-card rounded-lg border bg-white p-4 text-left transition-colors ${
        isActive ? "border-brand-500 ring-1 ring-brand-500" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-gray-600">{stat.label}</span>
        <Icon size={18} strokeWidth={1.75} className={`stat-icon ${cardIcons[stat.key].color}`} />
      </div>

      <p className="stat-value mt-2 text-2xl font-semibold tabular-nums tracking-tight text-gray-900">
        {formatCount(stat.count)}
      </p>

      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
        <span className="tabular-nums text-gray-500">{formatMoney(stat.amount)}</span>
        <span
          className={`inline-flex items-center font-medium tabular-nums ${isGoodChange ? "text-emerald-700" : "text-red-700"}`}
          aria-label={`${isUp ? "Up" : "Down"} ${Math.abs(stat.change)}% from previous 7 days`}
        >
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(stat.change)}%
        </span>
      </div>
    </button>
  );
}

export default function SummaryCards({ stats, isLoading, activeStatus, onSelect }) {
  if (isLoading) {
    return (
      <div className="cards-grid">
        {stats.map((stat) => (
          <div key={stat.key} className="stat-card rounded-lg border border-gray-200 bg-white p-4">
            <Skeleton className="h-4 w-28 max-w-full" />
            <Skeleton className="mt-3 h-7 w-20" />
            <Skeleton className="mt-2 h-3 w-32 max-w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="cards-grid">
      {stats.map((stat) => (
        <StatCard
          key={stat.key}
          stat={stat}
          
          isActive={stat.key !== "all" && stat.key === activeStatus}
          onClick={() => onSelect(stat.key)}
        />
      ))}
    </div>
  );
}
