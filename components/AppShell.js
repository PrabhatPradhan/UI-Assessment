"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

// Every page uses this. It draws the sidebar and the header,
// and the page itself is passed in as "children".
export default function AppShell({ title, subtitle, search, onSearchChange, searchPlaceholder, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // keep the browser tab title in sync with the page
  useEffect(() => {
    document.title = title + " | Paysetu";
  }, [title]);

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main">
        <Header
          title={title}
          subtitle={subtitle}
          search={search}
          onSearchChange={onSearchChange}
          searchPlaceholder={searchPlaceholder}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="page-content flex flex-col gap-4">{children}</main>
      </div>
    </div>
  );
}
