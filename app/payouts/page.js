"use client";

import { useEffect, useState } from "react";
import { Banknote, ChevronRight, Download, Landmark, TriangleAlert } from "lucide-react";

import AppShell from "../../components/AppShell";
import StatCard from "../../components/StatCard";
import Badge from "../../components/Badge";
import Tabs from "../../components/Tabs";
import EmptyState from "../../components/EmptyState";
import CopyButton from "../../components/CopyButton";
import Skeleton, { TableSkeleton } from "../../components/Skeleton";
import SideDrawer, { DrawerRow, DrawerSection } from "../../components/SideDrawer";

import { bankAccount, holdReason, payouts, payoutTrend, upcomingPayout } from "../../data/payouts";
import { downloadFile, formatAmount, formatDate, formatMoney, formatTime } from "../../utils/helpers";

// how each payout status should look
const payoutStatus = {
  paid: { label: "Paid", tone: "green" },
  in_transit: { label: "In transit", tone: "blue" },
  on_hold: { label: "On hold", tone: "amber" },
};

const tabs = [
  { key: "all", label: "All" },
  { key: "paid", label: "Paid" },
  { key: "in_transit", label: "In transit" },
  { key: "on_hold", label: "On hold" },
];

// turn the payout list into a CSV file
function payoutsToCSV(list) {
  const header = ["Payout ID", "Settled on", "For payments of", "Transactions", "Gross", "Fees", "GST", "Refunds", "Net", "UTR", "Status"];
  const rows = list.map((payout) => [
    payout.id,
    formatDate(payout.settledOn),
    payout.period,
    payout.transactionCount,
    payout.gross,
    payout.fees,
    payout.gst,
    payout.refunds,
    payout.net,
    payout.utr,
    payoutStatus[payout.status].label,
  ]);
  return [header, ...rows].map((row) => row.join(",")).join("\n");
}

export default function PayoutsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  // ---------- filtering ----------
  const searchText = search.trim().toLowerCase();

  const payoutsBeforeStatus = payouts.filter((payout) => {
    return (
      searchText === "" ||
      payout.id.toLowerCase().includes(searchText) ||
      payout.utr.toLowerCase().includes(searchText) ||
      payout.period.toLowerCase().includes(searchText)
    );
  });

  const filteredPayouts = payoutsBeforeStatus.filter((payout) => {
    return statusFilter === "all" || payout.status === statusFilter;
  });

  const tabsWithCounts = tabs.map((tab) => ({
    ...tab,
    count: tab.key === "all" ? payoutsBeforeStatus.length : payoutsBeforeStatus.filter((p) => p.status === tab.key).length,
  }));

  const selectedPayout = payouts.find((payout) => payout.id === selectedId);

  // ---------- numbers at the top ----------
  const paidThisMonth = payouts.filter((p) => p.status === "paid").reduce((total, p) => total + p.net, 0);
  const inTransit = payouts.filter((p) => p.status === "in_transit").reduce((total, p) => total + p.net, 0);
  const onHold = payouts.filter((p) => p.status === "on_hold").reduce((total, p) => total + p.net, 0);

  const biggestPayout = Math.max(...payoutTrend.map((day) => day.amount));

  function handleExport() {
    downloadFile("payouts.csv", payoutsToCSV(filteredPayouts), "text/csv");
  }

  return (
    <AppShell
      title="Payouts"
      subtitle="Money sent from Paysetu to your bank account"
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search by payout ID or UTR"
    >
      <div className="cards-grid">
        <StatCard
          label="Next payout"
          value={formatMoney(upcomingPayout.amount)}
          note={`Expected on ${upcomingPayout.expectedOn}`}
          icon={Banknote}
          iconColor="text-brand-600"
          isLoading={isLoading}
        />
        <StatCard label="In transit" value={formatMoney(inTransit)} note="1 payout with the bank" isLoading={isLoading} />
        <StatCard
          label="Settled this month"
          value={formatMoney(paidThisMonth)}
          note="10 payouts since 1 Sep"
          noteTone="green"
          isLoading={isLoading}
        />
        <StatCard
          label="On hold"
          value={formatMoney(onHold)}
          note="Action needed from you"
          noteTone="amber"
          icon={TriangleAlert}
          iconColor="text-amber-600"
          isLoading={isLoading}
        />
      </div>

      <div className="split-grid">
        {/* last 7 payouts as a simple bar chart */}
        <section className="panel-card rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-900">Last 7 payouts</h2>
          <p className="text-xs text-gray-500">Net amount that reached your bank account</p>

          {isLoading ? (
            <Skeleton className="mt-4 h-[180px] w-full" />
          ) : (
            <div className="mt-4">
              <div className="flex h-[150px] items-end gap-2">
                {payoutTrend.map((day) => (
                  <div key={day.label} className="flex h-full min-w-0 flex-1 flex-col justify-end" title={formatAmount(day.amount)}>
                    <div
                      className="rounded-t bg-brand-500/85 hover:bg-brand-600"
                      style={{ height: `${Math.round((day.amount / biggestPayout) * 100)}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                {payoutTrend.map((day) => (
                  <span key={day.label} className="min-w-0 flex-1 text-center text-[11px] text-gray-500">
                    {day.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* where the money goes */}
        <section className="panel-card rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-900">Settlement account</h2>
          <p className="text-xs text-gray-500">Every payout is sent here</p>

          <div className="mt-4 flex items-start gap-3 rounded-md border border-gray-200 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-200 text-gray-500">
              <Landmark size={18} strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900">{bankAccount.bankName}</p>
              <p className="truncate text-xs text-gray-500">{bankAccount.accountName}</p>
            </div>
          </div>

          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-gray-500">Account</dt>
              <dd className="font-medium tabular-nums text-gray-900">{bankAccount.accountNumber}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-gray-500">IFSC</dt>
              <dd className="font-medium text-gray-900">{bankAccount.ifsc}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-gray-500">Branch</dt>
              <dd className="min-w-0 text-right font-medium text-gray-900">{bankAccount.branch}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-gray-500">Schedule</dt>
              <dd className="font-medium text-gray-900">{bankAccount.schedule}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="px-4 pt-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Payout history</h2>
              <p className="text-xs text-gray-500">
                {isLoading ? "Loading payouts" : `${filteredPayouts.length} payouts`}
              </p>
            </div>
            <button
              type="button"
              onClick={handleExport}
              disabled={isLoading}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <Download size={16} />
              <span className="refresh-label">Export</span>
            </button>
          </div>

          <div className="mt-2 border-b border-gray-200">
            <Tabs tabs={tabsWithCounts} activeKey={statusFilter} onChange={setStatusFilter} />
          </div>
        </div>

        {isLoading ? (
          <TableSkeleton rows={6} />
        ) : filteredPayouts.length === 0 ? (
          <EmptyState
            title="No payouts match your filters"
            message="Try another payout ID or UTR number, or switch back to the All tab."
            actionLabel="Clear filters"
            onAction={() => {
              setSearch("");
              setStatusFilter("all");
            }}
          />
        ) : (
          <>
            {/* table for bigger screens */}
            <div className="table-wrap">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-gray-200 bg-gray-50 text-left text-xs text-gray-500">
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 font-medium">Payout ID</th>
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 font-medium">Settled on</th>
                    <th scope="col" className="col-optional whitespace-nowrap px-4 py-2.5 font-medium">UTR</th>
                    <th scope="col" className="col-secondary whitespace-nowrap px-4 py-2.5 text-right font-medium">Payments</th>
                    <th scope="col" className="col-optional whitespace-nowrap px-4 py-2.5 text-right font-medium">Gross</th>
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 text-right font-medium">Net amount</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
                    <th scope="col" className="col-arrow w-10 px-2 py-2.5">
                      <span className="sr-only">Open</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPayouts.map((payout) => (
                    <tr
                      key={payout.id}
                      tabIndex={0}
                      onClick={() => setSelectedId(payout.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") setSelectedId(payout.id);
                      }}
                      className={`group cursor-pointer hover:bg-gray-50 ${
                        selectedId === payout.id ? "bg-brand-50 shadow-[inset_3px_0_0_0_#3358D4]" : ""
                      }`}
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{payout.id}</td>
                      <td className="px-4 py-3">
                        <p className="whitespace-nowrap text-gray-900">{formatDate(payout.settledOn)}</p>
                        <p className="text-xs text-gray-500">for {payout.period}</p>
                      </td>
                      <td className="col-optional whitespace-nowrap px-4 py-3 tabular-nums text-gray-600">{payout.utr}</td>
                      <td className="col-secondary px-4 py-3 text-right tabular-nums text-gray-600">{payout.transactionCount}</td>
                      <td className="col-optional whitespace-nowrap px-4 py-3 text-right tabular-nums text-gray-600">
                        {formatAmount(payout.gross)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right font-medium tabular-nums text-gray-900">
                        {formatAmount(payout.net)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge label={payoutStatus[payout.status].label} tone={payoutStatus[payout.status].tone} />
                      </td>
                      <td className="col-arrow px-2 py-3 text-gray-300 group-hover:text-gray-500">
                        <ChevronRight size={16} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* list for small screens */}
            <ul className="txn-list divide-y divide-gray-100 border-t border-gray-200">
              {filteredPayouts.map((payout) => (
                <li key={payout.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(payout.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-gray-900">{payout.id}</span>
                      <span className="block truncate text-xs text-gray-500">
                        {formatDate(payout.settledOn)} · {payout.transactionCount} payments
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-sm font-medium tabular-nums text-gray-900">
                        {formatAmount(payout.net)}
                      </span>
                      <span className="mt-1 flex justify-end">
                        <Badge label={payoutStatus[payout.status].label} tone={payoutStatus[payout.status].tone} />
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {selectedPayout && (
        <SideDrawer
          title={selectedPayout.id}
          subtitle={`Settled on ${formatDate(selectedPayout.settledOn)}`}
          onClose={() => setSelectedId(null)}
          footer={
            <div className="flex gap-2">
              <button
                type="button"
                className="h-9 flex-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Download statement
              </button>
              <button
                type="button"
                className="h-9 flex-1 rounded-md bg-gray-900 text-sm font-medium text-white hover:bg-gray-800"
              >
                View payments
              </button>
            </div>
          }
        >
          <div className="px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <Badge label={payoutStatus[selectedPayout.status].label} tone={payoutStatus[selectedPayout.status].tone} />
              <span className="text-xs text-gray-500">{selectedPayout.transactionCount} payments</span>
            </div>
            <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight text-gray-900">
              {formatAmount(selectedPayout.net)}
            </p>
            <p className="text-xs text-gray-500">Net amount credited for payments of {selectedPayout.period}</p>
          </div>

          {selectedPayout.status === "on_hold" && (
            <div className="mx-5 mb-4 flex gap-2.5 rounded-md border border-amber-200 bg-amber-50 p-3">
              <TriangleAlert size={16} className="mt-0.5 shrink-0 text-amber-600" />
              <p className="text-sm leading-5 text-amber-900">{holdReason}</p>
            </div>
          )}

          <DrawerSection title="Amount breakdown">
            <DrawerRow label="Gross payments">{formatAmount(selectedPayout.gross)}</DrawerRow>
            <DrawerRow label="Paysetu fees">−{formatAmount(selectedPayout.fees)}</DrawerRow>
            <DrawerRow label="GST on fees (18%)">−{formatAmount(selectedPayout.gst)}</DrawerRow>
            <DrawerRow label="Refunds adjusted">
              {selectedPayout.refunds === 0 ? "—" : `−${formatAmount(selectedPayout.refunds)}`}
            </DrawerRow>
            <div className="mt-2 flex items-center justify-between gap-4 border-t border-gray-100 pt-2 text-sm">
              <span className="font-medium text-gray-900">Net amount</span>
              <span className="font-semibold tabular-nums text-gray-900">{formatAmount(selectedPayout.net)}</span>
            </div>
          </DrawerSection>

          <DrawerSection title="Bank transfer">
            <DrawerRow label="UTR number">
              <span className="inline-flex items-center gap-1">
                <span className="tabular-nums">{selectedPayout.utr}</span>
                <CopyButton value={selectedPayout.utr} label="Copy UTR" />
              </span>
            </DrawerRow>
            <DrawerRow label="Bank">{bankAccount.bankName}</DrawerRow>
            <DrawerRow label="Account">{bankAccount.accountNumber}</DrawerRow>
            <DrawerRow label="IFSC">{bankAccount.ifsc}</DrawerRow>
          </DrawerSection>

          <DrawerSection title="Timeline">
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-emerald-500 bg-emerald-500" />
                <div>
                  <p className="text-sm text-gray-900">Payments collected</p>
                  <p className="text-xs text-gray-500">{selectedPayout.period}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-emerald-500 bg-emerald-500" />
                <div>
                  <p className="text-sm text-gray-900">Payout created</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(selectedPayout.settledOn)}, {formatTime(selectedPayout.settledOn)}
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span
                  className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 ${
                    selectedPayout.status === "paid"
                      ? "border-emerald-500 bg-emerald-500"
                      : selectedPayout.status === "on_hold"
                      ? "border-amber-500 bg-white"
                      : "border-brand-500 bg-white"
                  }`}
                />
                <div>
                  <p className="text-sm text-gray-900">
                    {selectedPayout.status === "paid"
                      ? "Credited to your bank account"
                      : selectedPayout.status === "on_hold"
                      ? "Waiting for document verification"
                      : "Sent to the bank, waiting for credit"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedPayout.status === "paid" ? formatDate(selectedPayout.settledOn) : "Expected within 1 working day"}
                  </p>
                </div>
              </li>
            </ol>
          </DrawerSection>
        </SideDrawer>
      )}
    </AppShell>
  );
}
