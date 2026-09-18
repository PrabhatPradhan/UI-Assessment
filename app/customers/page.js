"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Download, TrendingUp, UserPlus, Users } from "lucide-react";

import AppShell from "../../components/AppShell";
import StatCard from "../../components/StatCard";
import Badge from "../../components/Badge";
import Tabs from "../../components/Tabs";
import Avatar from "../../components/Avatar";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";
import CopyButton from "../../components/CopyButton";
import { TableSkeleton } from "../../components/Skeleton";
import SideDrawer, { DrawerRow, DrawerSection } from "../../components/SideDrawer";

import { customerActivity, customers } from "../../data/customers";
import { transactions } from "../../data/transactions";
import { downloadFile, formatAmount, formatDate, formatMoney, formatShortDate } from "../../utils/helpers";

const customerStatus = {
  active: { label: "Active", tone: "green" },
  new: { label: "New", tone: "blue" },
  at_risk: { label: "At risk", tone: "amber" },
};

const tabs = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "new", label: "New" },
  { key: "at_risk", label: "At risk" },
];

function customersToCSV(list) {
  const header = ["Customer ID", "Name", "Email", "Phone", "City", "Payments", "Total spent", "Success rate", "Status"];
  const rows = list.map((customer) => [
    customer.id,
    customer.name,
    customer.email,
    customer.phone,
    customer.city,
    customer.payments,
    customer.totalSpent,
    customer.successRate + "%",
    customerStatus[customer.status].label,
  ]);
  return [header, ...rows].map((row) => row.join(",")).join("\n");
}

export default function CustomersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const searchText = search.trim().toLowerCase();

  const customersBeforeStatus = customers.filter((customer) => {
    return (
      searchText === "" ||
      customer.name.toLowerCase().includes(searchText) ||
      customer.email.toLowerCase().includes(searchText) ||
      customer.phone.includes(searchText) ||
      customer.city.toLowerCase().includes(searchText)
    );
  });

  const matchingCustomers = customersBeforeStatus.filter((customer) => {
    return statusFilter === "all" || customer.status === statusFilter;
  });

  // sorting
  const filteredCustomers = [...matchingCustomers].sort((a, b) => {
    if (sortBy === "spend") return b.totalSpent - a.totalSpent;
    if (sortBy === "payments") return b.payments - a.payments;
    return a.lastPaymentOn < b.lastPaymentOn ? 1 : -1;
  });

  const tabsWithCounts = tabs.map((tab) => ({
    ...tab,
    count:
      tab.key === "all" ? customersBeforeStatus.length : customersBeforeStatus.filter((c) => c.status === tab.key).length,
  }));

  const selectedCustomer = customers.find((customer) => customer.id === selectedId);

   
  const customerPayments = selectedCustomer
    ? transactions.filter((txn) => txn.email === selectedCustomer.email).slice(0, 5)
    : [];

  const totalSpentAll = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const newCustomers = customers.filter((c) => c.status === "new").length;
  const repeatCustomers = customers.filter((c) => c.payments >= 5).length;
  const repeatRate = Math.round((repeatCustomers / customers.length) * 100);
  const busiestMonth = Math.max(...customerActivity.map((month) => month.count));

  function handleExport() {
    downloadFile("customers.csv", customersToCSV(filteredCustomers), "text/csv");
  }

  return (
    <AppShell
      title="Customers"
      subtitle="Everyone who has paid you through Paysetu"
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search by name, email, phone or city"
    >
      <div className="cards-grid">
        <StatCard
          label="Total customers"
          value={String(customers.length)}
          note="Across 13 cities"
          icon={Users}
          iconColor="text-brand-600"
          isLoading={isLoading}
        />
        <StatCard
          label="New this month"
          value={String(newCustomers)}
          note="Joined in September"
          noteTone="green"
          icon={UserPlus}
          iconColor="text-emerald-600"
          isLoading={isLoading}
        />
        <StatCard
          label="Repeat customers"
          value={`${repeatRate}%`}
          note="Paid 5 or more times"
          icon={TrendingUp}
          iconColor="text-gray-400"
          isLoading={isLoading}
        />
        <StatCard label="Lifetime value" value={formatMoney(totalSpentAll)} note="Total spent by all customers" isLoading={isLoading} />
      </div>

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="px-4 pt-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Customer list</h2>
              <p className="text-xs text-gray-500">
                {isLoading ? "Loading customers" : `${filteredCustomers.length} customers`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="rows-per-page items-center gap-2 whitespace-nowrap text-sm text-gray-500">
                Sort by
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="h-9 cursor-pointer rounded-md border border-gray-300 bg-white px-2 text-sm text-gray-700 hover:border-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="recent">Recently active</option>
                  <option value="spend">Highest spend</option>
                  <option value="payments">Most payments</option>
                </select>
              </label>

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
          </div>

          <div className="mt-2 border-b border-gray-200">
            <Tabs tabs={tabsWithCounts} activeKey={statusFilter} onChange={setStatusFilter} />
          </div>
        </div>

        {isLoading ? (
          <TableSkeleton rows={7} />
        ) : filteredCustomers.length === 0 ? (
          <EmptyState
            title="No customers match your search"
            message="Check the spelling of the name or email, or switch back to the All tab."
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
                    <th scope="col" className="px-4 py-2.5 font-medium">Customer</th>
                    <th scope="col" className="col-optional whitespace-nowrap px-4 py-2.5 font-medium">City</th>
                    <th scope="col" className="col-secondary whitespace-nowrap px-4 py-2.5 text-right font-medium">Payments</th>
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 text-right font-medium">Total spent</th>
                    <th scope="col" className="col-optional whitespace-nowrap px-4 py-2.5 text-right font-medium">Success</th>
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 font-medium">Last payment</th>
                    <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
                    <th scope="col" className="col-arrow w-10 px-2 py-2.5">
                      <span className="sr-only">Open</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      tabIndex={0}
                      onClick={() => setSelectedId(customer.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") setSelectedId(customer.id);
                      }}
                      className={`group cursor-pointer hover:bg-gray-50 ${
                        selectedId === customer.id ? "bg-brand-50 shadow-[inset_3px_0_0_0_#3358D4]" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="table-avatar">
                            <Avatar name={customer.name} />
                          </span>
                          <div className="min-w-0 max-w-[190px]">
                            <p className="truncate font-medium text-gray-900">{customer.name}</p>
                            <p className="truncate text-xs text-gray-500">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="col-optional whitespace-nowrap px-4 py-3 text-gray-600">{customer.city}</td>
                      <td className="col-secondary px-4 py-3 text-right tabular-nums text-gray-600">{customer.payments}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-right font-medium tabular-nums text-gray-900">
                        {formatMoney(customer.totalSpent)}
                      </td>
                      <td className="col-optional px-4 py-3 text-right tabular-nums text-gray-600">{customer.successRate}%</td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">{formatDate(customer.lastPaymentOn)}</td>
                      <td className="px-4 py-3">
                        <Badge label={customerStatus[customer.status].label} tone={customerStatus[customer.status].tone} />
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
              {filteredCustomers.map((customer) => (
                <li key={customer.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(customer.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <Avatar name={customer.name} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-gray-900">{customer.name}</span>
                      <span className="block truncate text-xs text-gray-500">
                        {customer.payments} payments · {customer.city}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-sm font-medium tabular-nums text-gray-900">
                        {formatMoney(customer.totalSpent)}
                      </span>
                      <span className="mt-1 flex justify-end">
                        <Badge label={customerStatus[customer.status].label} tone={customerStatus[customer.status].tone} />
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {selectedCustomer && (
        <SideDrawer
          title={selectedCustomer.name}
          subtitle={selectedCustomer.id}
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
                Send payment link
              </button>
            </div>
          }
        >
          <div className="flex items-center gap-3 px-5 py-4">
            <Avatar name={selectedCustomer.name} size="lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">{selectedCustomer.name}</p>
              <p className="truncate text-xs text-gray-500">{selectedCustomer.email}</p>
            </div>
            <Badge label={customerStatus[selectedCustomer.status].label} tone={customerStatus[selectedCustomer.status].tone} />
          </div>

          {selectedCustomer.status === "at_risk" && (
            <div className="mx-5 mb-4 rounded-md border border-amber-200 bg-amber-50 p-3">
              <p className="text-sm leading-5 text-amber-900">
                {selectedCustomer.failedPayments} payments failed recently. A payment link over UPI usually works better
                for this customer.
              </p>
            </div>
          )}

          <DrawerSection title="Summary">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md border border-gray-200 p-3">
                <p className="text-xs text-gray-500">Total spent</p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-gray-900">
                  {formatMoney(selectedCustomer.totalSpent)}
                </p>
              </div>
              <div className="rounded-md border border-gray-200 p-3">
                <p className="text-xs text-gray-500">Payments</p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-gray-900">{selectedCustomer.payments}</p>
              </div>
              <div className="rounded-md border border-gray-200 p-3">
                <p className="text-xs text-gray-500">Success rate</p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-gray-900">{selectedCustomer.successRate}%</p>
              </div>
              <div className="rounded-md border border-gray-200 p-3">
                <p className="text-xs text-gray-500">Average payment</p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-gray-900">
                  {formatMoney(Math.round(selectedCustomer.totalSpent / selectedCustomer.payments))}
                </p>
              </div>
            </div>
          </DrawerSection>

          <DrawerSection title="Contact">
            <DrawerRow label="Email">
              <span className="inline-flex items-center gap-1">
                {selectedCustomer.email}
                <CopyButton value={selectedCustomer.email} label="Copy email" />
              </span>
            </DrawerRow>
            <DrawerRow label="Phone">{selectedCustomer.phone}</DrawerRow>
            <DrawerRow label="City">{selectedCustomer.city}</DrawerRow>
            <DrawerRow label="Customer since">{formatDate(selectedCustomer.joinedOn + "T00:00:00")}</DrawerRow>
            <DrawerRow label="Prefers">{selectedCustomer.preferredMethod}</DrawerRow>
          </DrawerSection>

          <DrawerSection title="Payments in the last 6 months">
            <div className="flex h-20 items-end gap-2">
              {customerActivity.map((month) => (
                <div key={month.label} className="flex h-full flex-1 flex-col justify-end" title={`${month.count} payments`}>
                  <div
                    className="rounded-t bg-brand-500/80"
                    style={{ height: `${Math.round((month.count / busiestMonth) * 100)}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1.5 flex gap-2">
              {customerActivity.map((month) => (
                <span key={month.label} className="flex-1 text-center text-[11px] text-gray-500">
                  {month.label}
                </span>
              ))}
            </div>
          </DrawerSection>

          <DrawerSection title="Recent payments">
            {customerPayments.length === 0 ? (
              <p className="text-sm text-gray-500">No payments from this customer in the last 40 transactions.</p>
            ) : (
              <ul className="space-y-2">
                {customerPayments.map((txn) => (
                  <li key={txn.id} className="flex items-center justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <p className="truncate text-gray-900">{txn.id}</p>
                      <p className="text-xs text-gray-500">
                        {formatShortDate(txn.date)} · {txn.method}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-medium tabular-nums text-gray-900">{formatAmount(txn.amount)}</p>
                      <span className="mt-1 flex justify-end">
                        <StatusBadge status={txn.status} />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </DrawerSection>
        </SideDrawer>
      )}
    </AppShell>
  );
}
