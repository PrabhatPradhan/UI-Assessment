"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Banknote, ChevronRight, CircleCheck, RefreshCw, ShieldAlert, TrendingUp } from "lucide-react";

import AppShell from "../components/AppShell";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import StatusBadge from "../components/StatusBadge";
import ActivityChart from "../components/ActivityChart";
import PaymentMethods from "../components/PaymentMethods";
import Skeleton from "../components/Skeleton";

import { activityData, methodStats, transactions } from "../data/transactions";
import { disputes } from "../data/disputes";
import { refunds } from "../data/refunds";
import { payouts, upcomingPayout } from "../data/payouts";
import { customers } from "../data/customers";
import { formatAmount, formatDate, formatMoney, formatShortDate, formatTime } from "../utils/helpers";

// numbers for the top of the page
const overviewStats = [
  { key: "volume", label: "Total volume", value: formatMoney(4862310), note: "8.4% more than last week", noteTone: "green", icon: TrendingUp, iconColor: "text-brand-600" },
  { key: "success", label: "Success rate", value: "94.6%", note: "1,106 of 1,284 payments", noteTone: "gray", icon: CircleCheck, iconColor: "text-emerald-600" },
  { key: "payout", label: "Next payout", value: formatMoney(517430), note: "Reaches your bank on 18 Sep", noteTone: "gray", icon: Banknote, iconColor: "text-gray-400" },
  { key: "disputes", label: "Open disputes", value: "3", note: "₹76,289 at risk", noteTone: "red", icon: ShieldAlert, iconColor: "text-red-600" },
];

export default function OverviewPage() {
  const [isLoading, setIsLoading] = useState(true);

  // fake API call, same idea as the transactions page
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  function refresh() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 700);
  }

  const recentTransactions = transactions.slice(0, 6);
  const openDisputes = disputes.filter((item) => item.stage === "evidence_required" || item.stage === "under_review");
  const processingRefunds = refunds.filter((item) => item.status === "processing");
  const heldPayouts = payouts.filter((item) => item.status === "on_hold");

  // customers who spent the most
  const topCustomers = [...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);

  // things the team should look at today
  const todoItems = [
    {
      id: "disputes",
      title: `${openDisputes.length} disputes need evidence`,
      note: "The earliest due date is 19 Sep 2026",
      href: "/disputes",
      tone: "red",
    },
    {
      id: "payouts",
      title: `${heldPayouts.length} payout on hold`,
      note: "KYC document re-verification is pending",
      href: "/payouts",
      tone: "amber",
    },
    {
      id: "refunds",
      title: `${processingRefunds.length} refunds are processing`,
      note: "Card refunds take 5 to 7 working days",
      href: "/refunds",
      tone: "blue",
    },
  ];

  return (
    <AppShell title="Overview" subtitle="How your payments are doing today">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Last 7 days</h2>
          <p className="text-sm text-gray-500">11–17 Sep 2026 vs the previous week</p>
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={isLoading}
          aria-label="Refresh data"
          className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin motion-reduce:animate-none" : ""} />
          <span className="refresh-label">{isLoading ? "Refreshing" : "Refresh"}</span>
        </button>
      </div>

      <div className="cards-grid">
        {overviewStats.map((stat) => (
          <StatCard
            key={stat.key}
            label={stat.label}
            value={stat.value}
            note={stat.note}
            noteTone={stat.noteTone}
            icon={stat.icon}
            iconColor={stat.iconColor}
            isLoading={isLoading}
          />
        ))}
      </div>

      <div className="split-grid">
        <ActivityChart data={activityData} isLoading={isLoading} />
        <PaymentMethods methods={methodStats} isLoading={isLoading} />
      </div>

      <div className="split-grid">
        {/* Recent payments */}
        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Recent payments</h2>
              <p className="text-xs text-gray-500">The last 6 payments across all methods</p>
            </div>
            <Link
              href="/transactions"
              className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-sm font-medium text-brand-600 hover:bg-brand-50"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>

          {isLoading ? (
            <div className="divide-y divide-gray-100 border-t border-gray-100">
              {[1, 2, 3, 4, 5, 6].map((row) => (
                <div key={row} className="flex items-center gap-3 px-4 py-3">
                  <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-36 max-w-full" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 border-t border-gray-100">
              {recentTransactions.map((txn) => (
                <li key={txn.id} className="flex items-center gap-3 px-4 py-3">
                  <Avatar name={txn.customer} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{txn.customer}</p>
                    <p className="truncate text-xs text-gray-500">
                      {txn.id} · {txn.method} · {formatShortDate(txn.date)}, {formatTime(txn.date)}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-medium tabular-nums text-gray-900">{formatAmount(txn.amount)}</p>
                    <div className="mt-1 flex justify-end">
                      <StatusBadge status={txn.status} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <section className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-gray-900">Next payout</h2>
              <Badge label="Scheduled" tone="blue" />
            </div>
            <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-gray-900">
              {formatAmount(upcomingPayout.amount)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {upcomingPayout.transactionCount} payments from {upcomingPayout.period}
            </p>
            <dl className="mt-3 space-y-1.5 border-t border-gray-100 pt-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">Reaches your bank</dt>
                <dd className="font-medium text-gray-900">{upcomingPayout.expectedOn}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">Bank account</dt>
                <dd className="font-medium text-gray-900">HDFC •••• 7742</dd>
              </div>
            </dl>
            <Link
              href="/payouts"
              className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              See all payouts
            </Link>
          </section>

          <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="px-4 py-3">
              <h2 className="text-sm font-semibold text-gray-900">Needs your attention</h2>
              <p className="text-xs text-gray-500">3 things to look at today</p>
            </div>
            <ul className="divide-y divide-gray-100 border-t border-gray-100">
              {todoItems.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                    <span
                      className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                        item.tone === "red" ? "bg-red-500" : item.tone === "amber" ? "bg-amber-500" : "bg-brand-500"
                      }`}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-gray-900">{item.title}</span>
                      <span className="block text-xs text-gray-500">{item.note}</span>
                    </span>
                    <ChevronRight size={16} className="shrink-0 text-gray-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <h2 className="text-sm font-semibold text-gray-900">Top customers</h2>
              <Link href="/customers" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                View all
              </Link>
            </div>
            <ul className="divide-y divide-gray-100 border-t border-gray-100">
              {topCustomers.map((customer) => (
                <li key={customer.id} className="flex items-center gap-3 px-4 py-2.5">
                  <Avatar name={customer.name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{customer.name}</p>
                    <p className="truncate text-xs text-gray-500">{customer.payments} payments</p>
                  </div>
                  <p className="shrink-0 text-sm font-medium tabular-nums text-gray-900">
                    {formatMoney(customer.totalSpent)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        Last updated on {formatDate("2026-09-17T14:40:00")} at {formatTime("2026-09-17T14:40:00")}. All figures are demo
        data.
      </p>
    </AppShell>
  );
}
