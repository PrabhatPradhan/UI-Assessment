"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

 
export default function SideDrawer({ title, subtitle, onClose, footer, children }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (closeButtonRef.current) closeButtonRef.current.focus();
  }, []);
 
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />

      <aside className="drawer bg-white" role="dialog" aria-modal="true" aria-label={title}>
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-gray-200 px-5">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold text-gray-900">{title}</h2>
            {subtitle && <p className="truncate text-xs text-gray-500">{subtitle}</p>}
          </div>
          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close panel"
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">{children}</div>

        {footer && <div className="shrink-0 border-t border-gray-200 px-5 py-3">{footer}</div>}
      </aside>
    </>
  );
}

 
export function DrawerSection({ title, children }) {
  return (
    <div className="border-t border-gray-100 px-5 py-4 first:border-t-0">
      <h3 className="mb-2 text-xs font-medium text-gray-500">{title}</h3>
      {children}
    </div>
  );
}

export function DrawerRow({ label, children }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5 text-sm">
      <span className="shrink-0 text-gray-500">{label}</span>
      <span className="min-w-0 break-words text-right font-medium text-gray-900">{children}</span>
    </div>
  );
}
