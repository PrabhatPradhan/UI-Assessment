import {
  ArrowLeftRight,
  Banknote,
  CircleHelp,
  FileText,
  LayoutDashboard,
  RotateCcw,
  Settings,
  ShieldAlert,
  Users,
  X,
} from "lucide-react";

const paymentLinks = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Transactions", icon: ArrowLeftRight, active: true },
  { label: "Payouts", icon: Banknote },
  { label: "Refunds", icon: RotateCcw },
  { label: "Disputes", icon: ShieldAlert, badge: 3 },
];

const businessLinks = [
  { label: "Customers", icon: Users },
  { label: "Reports", icon: FileText },
];

const bottomLinks = [
  { label: "Settings", icon: Settings },
  { label: "Help", icon: CircleHelp },
];

function NavItem({ item, onClick }) {
  const Icon = item.icon;

  return (
    <a
      href="#"
      title={item.label}
      onClick={onClick}
      aria-current={item.active ? "page" : undefined}
      className={`nav-item group flex h-9 items-center gap-3 rounded-md px-3 text-sm ${
        item.active ? "bg-gray-100 font-medium text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <Icon
        size={18}
        strokeWidth={1.75}
        className={item.active ? "text-brand-600" : "text-gray-400 group-hover:text-gray-600"}
      />
      <span className="nav-label flex-1">{item.label}</span>
      {item.badge && (
        <span className="nav-badge rounded bg-red-50 px-1.5 text-xs font-medium tabular-nums text-red-700">
          {item.badge}
        </span>
      )}
    </a>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  // links don't go anywhere in this demo, so we just close the mobile menu
  function handleLinkClick(event) {
    event.preventDefault();
    onClose();
  }

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "is-open" : ""}`} onClick={onClose} />

      <aside className={`sidebar border-r border-gray-200 bg-white ${isOpen ? "is-open" : ""}`}>
        <div className="sidebar-brand flex h-16 shrink-0 items-center gap-2.5 border-b border-gray-200 px-5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-900 text-sm font-semibold text-white">
            P
          </span>
          <span className="sidebar-brand-name text-[15px] font-semibold text-gray-900">Paysetu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="sidebar-close ml-auto h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main">
          <p className="sidebar-section-title px-3 pb-2 text-xs font-medium text-gray-400">Payments</p>
          <div className="space-y-0.5">
            {paymentLinks.map((item) => (
              <NavItem key={item.label} item={item} onClick={handleLinkClick} />
            ))}
          </div>

          <p className="sidebar-section-title mt-6 px-3 pb-2 text-xs font-medium text-gray-400">Business</p>
          <div className="nav-group-business space-y-0.5">
            {businessLinks.map((item) => (
              <NavItem key={item.label} item={item} onClick={handleLinkClick} />
            ))}
          </div>
        </nav>

        <div className="shrink-0 space-y-0.5 border-t border-gray-200 px-3 py-3">
          {bottomLinks.map((item) => (
            <NavItem key={item.label} item={item} onClick={handleLinkClick} />
          ))}
        </div>
      </aside>
    </>
  );
}
