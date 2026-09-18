"use client";

import { useEffect, useState } from "react";
import { ChevronRight, CircleAlert, Clock, Download, RotateCcw } from "lucide-react";

import AppShell from "../../components/AppShell";
import StatCard from "../../components/StatCard";
import Badge from "../../components/Badge";
import Tabs from "../../components/Tabs";
import Avatar from "../../components/Avatar";
import MethodIcon from "../../components/MethodIcon";
import EmptyState from "../../components/EmptyState";
import CopyButton from "../../components/CopyButton";
import { TableSkeleton } from "../../components/Skeleton";
import SideDrawer, { DrawerRow, DrawerSection } from "../../components/SideDrawer";

import { refundReasons, refundSpeeds, refunds } from "../../data/refunds";
import { downloadFile, formatAmount, formatDate, formatMoney, formatTime } from "../../utils/helpers";

const refundStatus = {
  processing: { label: "Processing", tone: "amber" },
  completed: { label: "Completed", tone: "green" },
  failed: { label: "Failed", tone: "red" },
};

const tabs = [
  { key: "all", label: "All" },
  { key: "processing", label: "Processing" },
  { key: "completed", label: "Completed" },
  { key: "failed", label: "Failed" },
];

function refundsToCSV(list) {
  const header = ["Refund ID", "Transaction ID", "Customer", "Amount", "Type", "Reason", "Requested on", "Status"];
  const rows = list.map((refund) => [
    refund.id,
    refund.transactionId,
    refund.customer,
    refund.amount,
    refund.type,
    `"${refund.reason}"`,
    formatDate(refund.requestedOn),
    refundStatus[refund.status].label,
  ]);
  return [header, ...rows].map((row) => row.join(",")).join("\n");
}

export default function RefundsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const searchText = search.trim().toLowerCase();

  const refundsBeforeStatus = refunds.filter((refund) => {
    return (
      searchText === "" ||
      refund.id.toLowerCase().includes(searchText) ||
      refund.transactionId.toLowerCase().includes(searchText) ||
      refund.customer.toLowerCase().includes(searchText) ||
      refund.email.toLowerCase().includes(searchText)
    );
  });

  const filteredRefunds = refundsBeforeStatus.filter((refund) => {
    return statusFilter === "all" || refund.status === statusFilter;
  });

  const tabsWithCounts = tabs.map((tab) => ({
    ...tab,
    count: tab.key === "all" ? refundsBeforeStatus.length : refundsBeforeStatus.filter((r) => r.status === tab.key).length,
  }));

  const selectedRefund = refunds.find((refund) => refund.id === selectedId);

  const totalRefunded = refunds.filter((r) => r.status === "completed").reduce((sum, r) => sum + r.amount, 0);
  const processingCount = refunds.filter((r) => r.status === "processing").length;
  const processingAmount = refunds.filter((r) => r.status === "processing").reduce((sum, r) => sum + r.amount, 0);

  function handleExport() {
    downloadFile("refunds.csv", refundsToCSV(filteredRefunds), "text/csv");
  }

  return (
    <AppShell
      title="Refunds"
      subtitle="Money sent back to customers"
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search by refund ID, payment ID or customer"
    >
      <div className="cards-grid">
        <StatCard
          label="Refunded this month"
          value={formatMoney(totalRefunded)}
          note="9 completed refunds"
          icon={RotateCcw}
          iconColor="text-gray-400"
          isLoading={isLoading}
        />
        <StatCard
          label="Processing"
          value={String(processingCount)}
          note={`${formatMoney(processingAmount)} on the way`}
          noteTone="amber"
          icon={Clock}
          iconColor="text-amber-600"
          isLoading={isLoading}
        />
        <StatCard label="Refund rate" value="2.8%" note="of all successful payments" isLoading={isLoading} />
        <StatCard
          label="Failed refunds"
          value="1"
          note="Customer's account was closed"
          noteTone="red"
          icon={CircleAlert}
          iconColor="text-red-600"
          isLoading={isLoading}
        />
      </div>

      <div className="split-grid">
        <section className="panel-card rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-900">Why customers ask for refunds</h2>
          <p className="text-xs text-gray-500">Last 90 days, 90 refunds in total</p>

          <ul className="mt-4 space-y-3">
            {refundReasons.map((item) => (
              <li key={item.reason}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate text-gray-700">{item.reason}</span>
                  <span className="shrink-0 tabular-nums text-gray-500">
                    {item.count} · {item.share}%
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-gray-100">
                  <div className="h-1.5 rounded-full bg-gray-400" style={{ width: `${item.share}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel-card rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-900">How long refunds take</h2>
          <p className="text-xs text-gray-500">The customer's bank decides the final speed</p>

          <ul className="mt-4 space-y-3">
            {refundSpeeds.map((item) => (
              <li key={item.speed} className="rounded-md border border-gray-200 p-3">
                <Badge label={item.speed} tone={item.speed === "Instant" ? "green" : "gray"} />
                <p className="mt-2 text-sm leading-5 text-gray-600">{item.note}</p>
              </li>
            ))}
          </ul>

          <p className="mt-3 text-xs text-gray-500">
            Paysetu does not charge a fee for refunds. The original payment fee is not returned.
          </p>
        </section>
      </div>

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="px-4 pt-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">All refunds</h2>
              <p className="text-xs text-gray-500">
                {isLoading ? "Loading refunds" : `${filteredRefunds.length} refunds`}
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
        ) : filteredRefunds.length === 0 ? (
          <EmptyState
            title="No refunds match your filters"
            message="Try another refund ID or customer name, or switch back to the All tab."
            actionLabel="Clear filters"
            onAction={() => {
              setSearch("");
              setStatusFilter("all");
            }}
          />
        ) : (
          <>
            <div className="table-wrap">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-gray-200 bg-gray-50 text-left text-xs text-gray-500">
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 font-medium">Refund ID</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Customer</th>
                    <th scope="col" className="col-optional whitespace-nowrap px-4 py-2.5 font-medium">Reason</th>
                    <th scope="col" className="col-secondary whitespace-nowrap px-4 py-2.5 font-medium">Type</th>
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 text-right font-medium">Amount</th>
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 font-medium">Requested</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
                    <th scope="col" className="col-arrow w-10 px-2 py-2.5">
                      <span className="sr-only">Open</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRefunds.map((refund) => (
                    <tr
                      key={refund.id}
                      tabIndex={0}
                      onClick={() => setSelectedId(refund.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") setSelectedId(refund.id);
                      }}
                      className={`group cursor-pointer hover:bg-gray-50 ${
                        selectedId === refund.id ? "bg-brand-50 shadow-[inset_3px_0_0_0_#3358D4]" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <p className="whitespace-nowrap font-medium text-gray-900">{refund.id}</p>
                        <p className="whitespace-nowrap text-xs text-gray-500">{refund.transactionId}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="table-avatar">
                            <Avatar name={refund.customer} />
                          </span>
                          <div className="min-w-0 max-w-[180px]">
                            <p className="truncate font-medium text-gray-900">{refund.customer}</p>
                            <p className="truncate text-xs text-gray-500">{refund.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="col-optional px-4 py-3 text-gray-600">
                        <span className="block max-w-[200px] truncate">{refund.reason}</span>
                      </td>
                      <td className="col-secondary whitespace-nowrap px-4 py-3 text-gray-600">{refund.type}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-right font-medium tabular-nums text-gray-900">
                        {formatAmount(refund.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <p className="whitespace-nowrap text-gray-900">{formatDate(refund.requestedOn)}</p>
                        <p className="text-xs tabular-nums text-gray-500">{formatTime(refund.requestedOn)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge label={refundStatus[refund.status].label} tone={refundStatus[refund.status].tone} />
                      </td>
                      <td className="col-arrow px-2 py-3 text-gray-300 group-hover:text-gray-500">
                        <ChevronRight size={16} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="txn-list divide-y divide-gray-100 border-t border-gray-200">
              {filteredRefunds.map((refund) => (
                <li key={refund.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(refund.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <Avatar name={refund.customer} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-gray-900">{refund.customer}</span>
                      <span className="block truncate text-xs text-gray-500">
                        {refund.id} · {formatDate(refund.requestedOn)}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-sm font-medium tabular-nums text-gray-900">
                        {formatAmount(refund.amount)}
                      </span>
                      <span className="mt-1 flex justify-end">
                        <Badge label={refundStatus[refund.status].label} tone={refundStatus[refund.status].tone} />
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {selectedRefund && (
        <SideDrawer
          title={selectedRefund.id}
          subtitle={`Refund for ${selectedRefund.transactionId}`}
          onClose={() => setSelectedId(null)}
          footer={
            <div className="flex gap-2">
              <button
                type="button"
                className="h-9 flex-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Email customer
              </button>
              <button
                type="button"
                className="h-9 flex-1 rounded-md bg-gray-900 text-sm font-medium text-white hover:bg-gray-800"
              >
                {selectedRefund.status === "failed" ? "Retry refund" : "View payment"}
              </button>
            </div>
          }
        >
          <div className="px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <Badge label={refundStatus[selectedRefund.status].label} tone={refundStatus[selectedRefund.status].tone} />
              <span className="text-xs text-gray-500">{selectedRefund.type} refund</span>
            </div>
            <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight text-gray-900">
              {formatAmount(selectedRefund.amount)}
            </p>
            <p className="text-xs text-gray-500">
              Original payment was {formatAmount(selectedRefund.originalAmount)}
            </p>
          </div>

          {selectedRefund.status === "failed" && (
            <div className="mx-5 mb-4 flex gap-2.5 rounded-md border border-red-200 bg-red-50 p-3">
              <CircleAlert size={16} className="mt-0.5 shrink-0 text-red-600" />
              <p className="text-sm leading-5 text-red-900">
                The bank returned this refund because the customer's account is closed. Ask the customer for new account
                details and retry.
              </p>
            </div>
          )}

          <DrawerSection title="Refund">
            <DrawerRow label="Reason">{selectedRefund.reason}</DrawerRow>
            {selectedRefund.note && <DrawerRow label="Note">{selectedRefund.note}</DrawerRow>}
            <DrawerRow label="Speed">{selectedRefund.speed}</DrawerRow>
            <DrawerRow label="Started by">{selectedRefund.initiatedBy}</DrawerRow>
            <DrawerRow label="Refund ID">
              <span className="inline-flex items-center gap-1">
                {selectedRefund.id}
                <CopyButton value={selectedRefund.id} label="Copy refund ID" />
              </span>
            </DrawerRow>
          </DrawerSection>

          <DrawerSection title="Original payment">
            <DrawerRow label="Payment ID">
              <span className="inline-flex items-center gap-1">
                {selectedRefund.transactionId}
                <CopyButton value={selectedRefund.transactionId} label="Copy payment ID" />
              </span>
            </DrawerRow>
            <DrawerRow label="Method">
              <span className="inline-flex items-center gap-2">
                <MethodIcon method={selectedRefund.method} />
                {selectedRefund.methodDetail}
              </span>
            </DrawerRow>
            <DrawerRow label="Merchant">{selectedRefund.merchant}</DrawerRow>
            <DrawerRow label="Amount paid">{formatAmount(selectedRefund.originalAmount)}</DrawerRow>
          </DrawerSection>

          <DrawerSection title="Customer">
            <div className="flex items-center gap-3">
              <Avatar name={selectedRefund.customer} size="lg" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">{selectedRefund.customer}</p>
                <p className="truncate text-xs text-gray-500">{selectedRefund.email}</p>
              </div>
            </div>
          </DrawerSection>

          <DrawerSection title="Timeline">
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-emerald-500 bg-emerald-500" />
                <div>
                  <p className="text-sm text-gray-900">Refund requested</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(selectedRefund.requestedOn)}, {formatTime(selectedRefund.requestedOn)}
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span
                  className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 ${
                    selectedRefund.status === "completed"
                      ? "border-emerald-500 bg-emerald-500"
                      : selectedRefund.status === "failed"
                      ? "border-red-500 bg-red-500"
                      : "border-amber-500 bg-white"
                  }`}
                />
                <div>
                  <p className="text-sm text-gray-900">
                    {selectedRefund.status === "completed"
                      ? "Money reached the customer"
                      : selectedRefund.status === "failed"
                      ? "Refund returned by the bank"
                      : "Sent to the customer's bank"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedRefund.completedOn
                      ? `${formatDate(selectedRefund.completedOn)}, ${formatTime(selectedRefund.completedOn)}`
                      : selectedRefund.speed === "Instant"
                      ? "Expected within a few minutes"
                      : "Expected in 5 to 7 working days"}
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
