"use client";

import { useState } from "react";
import { ChevronDown, Download, SlidersHorizontal } from "lucide-react";

const statusTabs = [
  { value: "all", label: "All" },
  { value: "success", label: "Successful" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
];

const methodOptions = [
  { value: "all", label: "All methods" },
  { value: "UPI", label: "UPI" },
  { value: "Card", label: "Card" },
  { value: "Net Banking", label: "Net Banking" },
  { value: "Wallet", label: "Wallet" },
];

const dateOptions = [
  { value: "all", label: "All time" },
  { value: "today", label: "Today" },
  { value: "7days", label: "Last 7 days" },
  { value: "30days", label: "Last 30 days" },
];

// Styled native <select> (works well on mobile too)
function SelectBox({ label, value, options, onChange }) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-9 w-full cursor-pointer appearance-none rounded-md border bg-white pl-3 pr-8 text-sm hover:border-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
          value !== "all" ? "border-gray-400 font-medium text-gray-900" : "border-gray-300 text-gray-700"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
    </label>
  );
}

export default function Filters({
  search,
  statusFilter,
  methodFilter,
  dateFilter,
  statusCounts,
  resultCount,
  isLoading,
  hasError,
  onStatusChange,
  onMethodChange,
  onDateChange,
  onClearFilters,
  onExport,
}) {
  const [showFilters, setShowFilters] = useState(false);

  let extraFilterCount = 0;
  if (methodFilter !== "all") extraFilterCount++;
  if (dateFilter !== "all") extraFilterCount++;

  const hasAnyFilter = extraFilterCount > 0 || statusFilter !== "all" || search !== "";

  return (
    <div className="border-b border-gray-200">
      {/* title row */}
      <div className="flex items-center justify-between gap-3 px-4 pt-4">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-gray-900">Recent transactions</h2>
          <p className="mt-0.5 truncate text-xs text-gray-500">
            {isLoading && "Loading transactions"}
            {hasError && "Last update failed"}
            {!isLoading && !hasError && `${resultCount} ${resultCount === 1 ? "transaction" : "transactions"}`}
            {!isLoading && !hasError && search && ` matching "${search}"`}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            className={`filters-toggle h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium ${
              showFilters ? "border-gray-400 bg-gray-50 text-gray-900" : "border-gray-300 bg-white text-gray-700"
            }`}
          >
            <SlidersHorizontal size={16} />
            Filters
            {extraFilterCount > 0 && (
              <span className="rounded bg-gray-900 px-1.5 text-[11px] leading-4 text-white">{extraFilterCount}</span>
            )}
          </button>

          <button
            type="button"
            onClick={onExport}
            disabled={isLoading || hasError || resultCount === 0}
            aria-label="Export CSV"
            className="export-button h-9 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* tabs + dropdown filters */}
      <div className="filters-row flex items-end justify-between gap-3 px-4">
        <div className="status-tabs -mb-px flex gap-5 overflow-x-auto" role="tablist" aria-label="Filter by status">
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onStatusChange(tab.value)}
                className={`flex h-11 shrink-0 items-center gap-1.5 border-b-2 text-sm ${
                  isActive
                    ? "border-gray-900 font-medium text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded px-1.5 text-xs leading-5 tabular-nums ${
                    isActive ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {statusCounts[tab.value]}
                </span>
              </button>
            );
          })}
        </div>

        <div className={`filter-controls items-center gap-2 ${showFilters ? "is-open" : ""}`}>
          <SelectBox label="Payment method" value={methodFilter} options={methodOptions} onChange={onMethodChange} />
          <SelectBox label="Date range" value={dateFilter} options={dateOptions} onChange={onDateChange} />
          {hasAnyFilter && (
            <button
              type="button"
              onClick={onClearFilters}
              className="clear-button h-9 whitespace-nowrap px-2 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Clear all
            </button>
          )}
          {/* on mobile the export button lives inside the filter panel */}
          <button
            type="button"
            onClick={onExport}
            disabled={isLoading || hasError || resultCount === 0}
            className="export-in-panel h-9 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
