// Row of tabs, for example: All 40 | Open 3 | Won 2
// tabs looks like: [{ key: "all", label: "All", count: 40 }]
export default function Tabs({ tabs, activeKey, onChange }) {
  return (
    <div className="status-tabs -mb-px flex items-center gap-1 overflow-x-auto" role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;

        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={`flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 text-sm ${
              isActive
                ? "border-gray-900 font-medium text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`rounded px-1.5 text-xs font-medium tabular-nums ${
                  isActive ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
