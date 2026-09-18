"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, Menu, Search, X } from "lucide-react";
import { notifications } from "../data/transactions";

// Search box used in the header (desktop) and below the header (mobile)
function SearchInput({ value, onChange, placeholder, inputRef, autoFocus }) {
  return (
    <div className="relative">
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-9 w-full rounded-md border border-gray-300 bg-white pl-9 pr-9 text-sm text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-1.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <X size={14} />
        </button>
      ) : (
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-gray-200 px-1.5 font-sans text-[11px] leading-4 text-gray-400">
          /
        </kbd>
      )}
    </div>
  );
}

export default function Header({ title, subtitle, search, onSearchChange, searchPlaceholder, onMenuClick }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);

  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  const unreadCount = notificationList.filter((item) => item.unread).length;

  // close the notification panel when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // press "/" anywhere to jump to the search box
  useEffect(() => {
    function handleKeyDown(event) {
      const tag = event.target.tagName;
      const isTyping = tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA";
      if (event.key === "/" && !isTyping && searchRef.current) {
        event.preventDefault();
        searchRef.current.focus();
      }
      if (event.key === "Escape") {
        setShowNotifications(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function markAllAsRead() {
    const updated = notificationList.map((item) => ({ ...item, unread: false }));
    setNotificationList(updated);
  }

  return (
    <div className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <header className="header flex h-16 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="menu-button h-10 w-10 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold leading-6 text-gray-900">{title}</h1>
          <p className="header-subtitle truncate text-xs text-gray-500">{subtitle}</p>
        </div>

        {onSearchChange && (
          <div className="header-search">
            <SearchInput value={search} onChange={onSearchChange} placeholder={searchPlaceholder} inputRef={searchRef} />
          </div>
        )}

        {onSearchChange && (
        <button
          type="button"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          aria-label="Search"
          aria-expanded={showMobileSearch}
          className={`search-toggle relative h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100 ${
            showMobileSearch ? "bg-gray-100 text-gray-900" : "text-gray-500"
          }`}
        >
          <Search size={18} />
          {search && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white" />}
        </button>
        )}

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label={`Notifications, ${unreadCount} unread`}
            aria-expanded={showNotifications}
            className={`relative flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100 hover:text-gray-900 ${
              showNotifications ? "bg-gray-100 text-gray-900" : "text-gray-500"
            }`}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="notif-panel rounded-lg border border-gray-200 bg-white shadow-lg">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">Notifications</p>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-xs font-medium text-brand-600 hover:text-brand-700"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <ul className="divide-y divide-gray-100">
                {notificationList.map((item) => (
                  <li key={item.id} className="flex gap-3 px-4 py-3 hover:bg-gray-50">
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.unread ? "bg-brand-500" : "bg-transparent"}`}
                    />
                    <div className="min-w-0">
                      <p className={`text-sm ${item.unread ? "font-medium text-gray-900" : "text-gray-700"}`}>
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-5 text-gray-500">{item.message}</p>
                      <p className="mt-1 text-xs text-gray-400">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <span className="header-divider h-6 w-px bg-gray-200" />

        {/* Profile */}
        <button type="button" className="flex items-center gap-2.5 rounded-md p-1 hover:bg-gray-100" aria-label="Account menu">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
            KS
          </span>
          <span className="header-user-info text-left">
            <span className="block text-sm font-medium leading-4 text-gray-900">Kriti Sood</span>
            <span className="block text-xs leading-4 text-gray-500">Operations</span>
          </span>
          <ChevronDown size={16} className="header-user-info mr-1 text-gray-400" />
        </button>
      </header>

      {showMobileSearch && onSearchChange && (
        <div className="mobile-search border-t border-gray-100 px-4 py-2.5">
          <SearchInput value={search} onChange={onSearchChange} placeholder={searchPlaceholder} autoFocus />
        </div>
      )}
    </div>
  );
}
