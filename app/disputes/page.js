"use client";

import { useEffect, useState } from "react";
import { Check, ChevronRight, CircleCheck, CircleX, ShieldAlert, TriangleAlert } from "lucide-react";

import AppShell from "../../components/AppShell";
import StatCard from "../../components/StatCard";
import Badge from "../../components/Badge";
import Tabs from "../../components/Tabs";
import Avatar from "../../components/Avatar";
import EmptyState from "../../components/EmptyState";
import CopyButton from "../../components/CopyButton";
import { TableSkeleton } from "../../components/Skeleton";
import SideDrawer, { DrawerRow, DrawerSection } from "../../components/SideDrawer";

import { disputeTips, disputes } from "../../data/disputes";
import { describeDays, daysUntil, formatAmount, formatDate, formatMoney } from "../../utils/helpers";

const stageInfo = {
  evidence_required: { label: "Evidence needed", tone: "red" },
  under_review: { label: "Under review", tone: "amber" },
  won: { label: "Won", tone: "green" },
  lost: { label: "Lost", tone: "gray" },
};

const tabs = [
  { key: "all", label: "All" },
  { key: "evidence_required", label: "Evidence needed" },
  { key: "under_review", label: "Under review" },
  { key: "won", label: "Won" },
  { key: "lost", label: "Lost" },
];

const timelineDots = {
  done: "border-emerald-500 bg-emerald-500",
  current: "border-amber-500 bg-white",
  upcoming: "border-gray-300 bg-white",
  failed: "border-red-500 bg-red-500",
};

export default function DisputesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  // evidence the user has ticked inside the drawer
  const [checkedEvidence, setCheckedEvidence] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const searchText = search.trim().toLowerCase();

  const disputesBeforeStage = disputes.filter((dispute) => {
    return (
      searchText === "" ||
      dispute.id.toLowerCase().includes(searchText) ||
      dispute.transactionId.toLowerCase().includes(searchText) ||
      dispute.customer.toLowerCase().includes(searchText)
    );
  });

  const filteredDisputes = disputesBeforeStage.filter((dispute) => {
    return stageFilter === "all" || dispute.stage === stageFilter;
  });

  const tabsWithCounts = tabs.map((tab) => ({
    ...tab,
    count: tab.key === "all" ? disputesBeforeStage.length : disputesBeforeStage.filter((d) => d.stage === tab.key).length,
  }));

  const selectedDispute = disputes.find((dispute) => dispute.id === selectedId);

  const openDisputes = disputes.filter((d) => d.stage === "evidence_required" || d.stage === "under_review");
  const amountAtRisk = openDisputes.reduce((sum, d) => sum + d.amount, 0);
  const wonCount = disputes.filter((d) => d.stage === "won").length;
  const decidedCount = disputes.filter((d) => d.stage === "won" || d.stage === "lost").length;
  const winRate = Math.round((wonCount / decidedCount) * 100);

  // is this evidence item ticked? (saved answers win, otherwise the value from the data)
  function isEvidenceDone(dispute, index, fallback) {
    const key = dispute.id + "-" + index;
    return checkedEvidence[key] === undefined ? fallback : checkedEvidence[key];
  }

  function toggleEvidence(dispute, index, current) {
    setCheckedEvidence({ ...checkedEvidence, [dispute.id + "-" + index]: !current });
  }

  return (
    <AppShell
      title="Disputes"
      subtitle="Chargebacks raised by customers' banks"
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search by dispute ID, payment ID or customer"
    >
      <div className="cards-grid">
        <StatCard
          label="Open disputes"
          value={String(openDisputes.length)}
          note="2 need evidence from you"
          noteTone="red"
          icon={ShieldAlert}
          iconColor="text-red-600"
          isLoading={isLoading}
        />
        <StatCard
          label="Amount at risk"
          value={formatMoney(amountAtRisk)}
          note="Held back from your payouts"
          noteTone="amber"
          isLoading={isLoading}
        />
        <StatCard
          label="Win rate"
          value={`${winRate}%`}
          note={`${wonCount} won of ${decidedCount} decided`}
          noteTone="green"
          icon={CircleCheck}
          iconColor="text-emerald-600"
          isLoading={isLoading}
        />
        <StatCard
          label="Earliest due date"
          value="19 Sep"
          note={describeDays(daysUntil("2026-09-19"))}
          noteTone="red"
          icon={TriangleAlert}
          iconColor="text-amber-600"
          isLoading={isLoading}
        />
      </div>

      <section className="rounded-lg border border-brand-100 bg-brand-50 p-4">
        <h2 className="text-sm font-semibold text-gray-900">Three things that win disputes</h2>
        <ul className="mt-2 space-y-1.5">
          {disputeTips.map((tip) => (
            <li key={tip} className="flex gap-2 text-sm leading-5 text-gray-700">
              <Check size={16} className="mt-0.5 shrink-0 text-brand-600" />
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="px-4 pt-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">All disputes</h2>
            <p className="text-xs text-gray-500">
              {isLoading ? "Loading disputes" : `${filteredDisputes.length} disputes`}
            </p>
          </div>

          <div className="mt-2 border-b border-gray-200">
            <Tabs tabs={tabsWithCounts} activeKey={stageFilter} onChange={setStageFilter} />
          </div>
        </div>

        {isLoading ? (
          <TableSkeleton rows={5} />
        ) : filteredDisputes.length === 0 ? (
          <EmptyState
            title="No disputes here"
            message="Nothing matches this filter right now. Switch back to the All tab to see every case."
            actionLabel="Clear filters"
            onAction={() => {
              setSearch("");
              setStageFilter("all");
            }}
          />
        ) : (
          <>
            <div className="table-wrap">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-gray-200 bg-gray-50 text-left text-xs text-gray-500">
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 font-medium">Dispute ID</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Customer</th>
                    <th scope="col" className="col-optional px-4 py-2.5 font-medium">Reason</th>
                    <th scope="col" className="col-secondary whitespace-nowrap px-4 py-2.5 font-medium">Network</th>
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 text-right font-medium">Amount</th>
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 font-medium">Due date</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Stage</th>
                    <th scope="col" className="col-arrow w-10 px-2 py-2.5">
                      <span className="sr-only">Open</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredDisputes.map((dispute) => {
                    const daysLeft = daysUntil(dispute.dueOn);
                    const isUrgent = dispute.stage === "evidence_required" && daysLeft <= 3;

                    return (
                      <tr
                        key={dispute.id}
                        tabIndex={0}
                        onClick={() => setSelectedId(dispute.id)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") setSelectedId(dispute.id);
                        }}
                        className={`group cursor-pointer hover:bg-gray-50 ${
                          selectedId === dispute.id ? "bg-brand-50 shadow-[inset_3px_0_0_0_#3358D4]" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <p className="whitespace-nowrap font-medium text-gray-900">{dispute.id}</p>
                          <p className="whitespace-nowrap text-xs text-gray-500">{dispute.transactionId}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="table-avatar">
                              <Avatar name={dispute.customer} />
                            </span>
                            <div className="min-w-0 max-w-[170px]">
                              <p className="truncate font-medium text-gray-900">{dispute.customer}</p>
                              <p className="truncate text-xs text-gray-500">{dispute.merchant}</p>
                            </div>
                          </div>
                        </td>
                        <td className="col-optional px-4 py-3 text-gray-600">
                          <span className="block max-w-[200px] truncate">{dispute.reason}</span>
                        </td>
                        <td className="col-secondary whitespace-nowrap px-4 py-3 text-gray-600">{dispute.network}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-right font-medium tabular-nums text-gray-900">
                          {formatAmount(dispute.amount)}
                        </td>
                        <td className="px-4 py-3">
                          <p className="whitespace-nowrap text-gray-900">{formatDate(dispute.dueOn)}</p>
                          <p className={`text-xs ${isUrgent ? "font-medium text-red-700" : "text-gray-500"}`}>
                            {describeDays(daysLeft)}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge label={stageInfo[dispute.stage].label} tone={stageInfo[dispute.stage].tone} />
                        </td>
                        <td className="col-arrow px-2 py-3 text-gray-300 group-hover:text-gray-500">
                          <ChevronRight size={16} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <ul className="txn-list divide-y divide-gray-100 border-t border-gray-200">
              {filteredDisputes.map((dispute) => (
                <li key={dispute.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(dispute.id)}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <Avatar name={dispute.customer} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-gray-900">{dispute.customer}</span>
                      <span className="block truncate text-xs text-gray-500">
                        {dispute.id} · {dispute.reason}
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        Due {formatDate(dispute.dueOn)} ({describeDays(daysUntil(dispute.dueOn))})
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-sm font-medium tabular-nums text-gray-900">
                        {formatAmount(dispute.amount)}
                      </span>
                      <span className="mt-1 flex justify-end">
                        <Badge label={stageInfo[dispute.stage].label} tone={stageInfo[dispute.stage].tone} />
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {selectedDispute && (
        <SideDrawer
          title={selectedDispute.id}
          subtitle={`${selectedDispute.network} · ${selectedDispute.transactionId}`}
          onClose={() => setSelectedId(null)}
          footer={
            selectedDispute.stage === "evidence_required" || selectedDispute.stage === "under_review" ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  className="h-9 flex-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Accept dispute
                </button>
                <button
                  type="button"
                  className="h-9 flex-1 rounded-md bg-gray-900 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Submit evidence
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="h-9 w-full rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Download case file
              </button>
            )
          }
        >
          <div className="px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <Badge label={stageInfo[selectedDispute.stage].label} tone={stageInfo[selectedDispute.stage].tone} />
              <span className="text-xs text-gray-500">Opened {formatDate(selectedDispute.openedOn)}</span>
            </div>
            <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight text-gray-900">
              {formatAmount(selectedDispute.amount)}
            </p>
            <p className="text-xs text-gray-500">{selectedDispute.reason}</p>
          </div>

          {selectedDispute.stage === "evidence_required" && (
            <div className="mx-5 mb-4 flex gap-2.5 rounded-md border border-red-200 bg-red-50 p-3">
              <TriangleAlert size={16} className="mt-0.5 shrink-0 text-red-600" />
              <p className="text-sm leading-5 text-red-900">
                Send your evidence by {formatDate(selectedDispute.dueOn)} ({describeDays(daysUntil(selectedDispute.dueOn))}).
                After that the case is closed in the customer's favour.
              </p>
            </div>
          )}

          {selectedDispute.stage === "lost" && (
            <div className="mx-5 mb-4 flex gap-2.5 rounded-md border border-gray-200 bg-gray-50 p-3">
              <CircleX size={16} className="mt-0.5 shrink-0 text-gray-500" />
              <p className="text-sm leading-5 text-gray-700">
                This case was lost and {formatAmount(selectedDispute.amount)} was taken from your payout.
              </p>
            </div>
          )}

          <DrawerSection title="What the customer says">
            <p className="text-sm leading-6 text-gray-700">{selectedDispute.description}</p>
          </DrawerSection>

          <DrawerSection title="Evidence checklist">
            <ul className="space-y-1">
              {selectedDispute.evidence.map((item, index) => {
                const done = isEvidenceDone(selectedDispute, index, item.done);

                return (
                  <li key={item.label}>
                    <label className="flex cursor-pointer items-start gap-2.5 rounded-md px-1 py-1.5 text-sm hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => toggleEvidence(selectedDispute, index, done)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                      />
                      <span className={done ? "text-gray-500 line-through" : "text-gray-800"}>{item.label}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 text-xs text-gray-500">
              Tick an item once the file is uploaded. Everything is sent together when you submit.
            </p>
          </DrawerSection>

          <DrawerSection title="Case details">
            <DrawerRow label="Payment ID">
              <span className="inline-flex items-center gap-1">
                {selectedDispute.transactionId}
                <CopyButton value={selectedDispute.transactionId} label="Copy payment ID" />
              </span>
            </DrawerRow>
            <DrawerRow label="Card network">{selectedDispute.network}</DrawerRow>
            <DrawerRow label="Merchant">{selectedDispute.merchant}</DrawerRow>
            <DrawerRow label="Opened on">{formatDate(selectedDispute.openedOn)}</DrawerRow>
            <DrawerRow label="Evidence due">{formatDate(selectedDispute.dueOn)}</DrawerRow>
          </DrawerSection>

          <DrawerSection title="Customer">
            <div className="flex items-center gap-3">
              <Avatar name={selectedDispute.customer} size="lg" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">{selectedDispute.customer}</p>
                <p className="truncate text-xs text-gray-500">{selectedDispute.email}</p>
              </div>
            </div>
          </DrawerSection>

          <DrawerSection title="Timeline">
            <ol className="space-y-3">
              {selectedDispute.timeline.map((step) => (
                <li key={step.label} className="flex gap-3">
                  <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 ${timelineDots[step.state]}`} />
                  <div>
                    <p className="text-sm text-gray-900">{step.label}</p>
                    <p className="text-xs text-gray-500">{step.date ? formatDate(step.date) : "Not done yet"}</p>
                  </div>
                </li>
              ))}
            </ol>
          </DrawerSection>
        </SideDrawer>
      )}
    </AppShell>
  );
}
