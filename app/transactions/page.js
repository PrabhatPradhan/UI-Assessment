"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import AppShell from "../../components/AppShell";
import SummaryCards from "../../components/SummaryCards";
import ActivityChart from "../../components/ActivityChart";
import PaymentMethods from "../../components/PaymentMethods";
import Filters from "../../components/Filters";
import TransactionTable from "../../components/TransactionTable";
import Pagination from "../../components/Pagination";
import TransactionDrawer from "../../components/TransactionDrawer";
import EmptyState from "../../components/EmptyState";
import ErrorState from "../../components/ErrorState";
import { TableSkeleton } from "../../components/Skeleton";

import { activityData, methodStats, summaryStats, transactions } from "../../data/transactions";
import { downloadFile, isInDateRange, transactionsToCSV } from "../../utils/helpers";

export default function TransactionsPage() {
  // data + loading
  const [allTransactions, setAllTransactions] = useState(transactions);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ui
  const [selectedId, setSelectedId] = useState(null);

  // Fake API call.
  function loadData(demoState) {
    setIsLoading(true);
    setHasError(false);

    if (demoState === "loading") return;

    setTimeout(() => {
      if (demoState === "error") {
        setHasError(true);
      } else if (demoState === "empty") {
        setAllTransactions([]);
      } else {
        setAllTransactions(transactions);
      }
      setIsLoading(false);
    }, 900);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    loadData(params.get("state"));
  }, []);

  
  const searchText = search.trim().toLowerCase();

   
  const transactionsBeforeStatus = allTransactions.filter((txn) => {
    const matchesSearch =
      searchText === "" ||
      txn.id.toLowerCase().includes(searchText) ||
      txn.customer.toLowerCase().includes(searchText) ||
      txn.email.toLowerCase().includes(searchText);
    const matchesMethod = methodFilter === "all" || txn.method === methodFilter;
    const matchesDate = isInDateRange(txn.date, dateFilter);

    return matchesSearch && matchesMethod && matchesDate;
  });

   
  const filteredTransactions = transactionsBeforeStatus.filter((txn) => {
    return statusFilter === "all" || txn.status === statusFilter;
  });

    const statusCounts = { all: transactionsBeforeStatus.length, success: 0, pending: 0, failed: 0, refunded: 0 };
  transactionsBeforeStatus.forEach((txn) => {
    statusCounts[txn.status] += 1;
  });

  
  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * rowsPerPage;
  const pageTransactions = filteredTransactions.slice(startIndex, startIndex + rowsPerPage);
 
  const selectedTransaction = allTransactions.find((txn) => txn.id === selectedId);
  const selectedPosition = filteredTransactions.findIndex((txn) => txn.id === selectedId) + 1; // 0 = not in list

   
  function handleSearchChange(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleStatusChange(value) {
    setStatusFilter(value);
    setCurrentPage(1);
  }

  function handleMethodChange(value) {
    setMethodFilter(value);
    setCurrentPage(1);
  }

  function handleDateChange(value) {
    setDateFilter(value);
    setCurrentPage(1);
  }

  function handleRowsPerPageChange(value) {
    setRowsPerPage(value);
    setCurrentPage(1);
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
    setMethodFilter("all");
    setDateFilter("all");
    setCurrentPage(1);
  }

   
  function handleCardSelect(key) {
    const newStatus = key === statusFilter ? "all" : key;
    handleStatusChange(newStatus);
    const section = document.getElementById("transactions");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleExport() {
    downloadFile("transactions.csv", transactionsToCSV(filteredTransactions), "text/csv");
  }

  function showPreviousTransaction() {
    if (selectedPosition > 1) {
      setSelectedId(filteredTransactions[selectedPosition - 2].id);
    }
  }

  function showNextTransaction() {
    if (selectedPosition > 0 && selectedPosition < filteredTransactions.length) {
      setSelectedId(filteredTransactions[selectedPosition].id);
    }
  }

   
  let tableContent;

  if (isLoading) {
    tableContent = <TableSkeleton rows={6} />;
  } else if (hasError) {
    tableContent = <ErrorState onRetry={() => loadData(null)} />;
  } else if (allTransactions.length === 0) {
    tableContent = (
      <EmptyState
        type="no-data"
        title="No transactions yet"
        message="Payments will show up here as soon as customers start paying through Paysetu."
      />
    );
  } else if (filteredTransactions.length === 0) {
    tableContent = (
      <EmptyState
        title="No transactions match your filters"
        message="Check the spelling of the ID or name, or clear the filters to see all transactions."
        actionLabel="Clear filters"
        onAction={clearFilters}
      />
    );
  } else {
    tableContent = (
      <>
        <TransactionTable
          transactions={pageTransactions}
          selectedId={selectedId}
          onSelect={(txn) => setSelectedId(txn.id)}
        />
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </>
    );
  }

  return (
    <AppShell
      title="Transactions"
      subtitle="Monitor payments and review individual transactions"
      search={search}
      onSearchChange={handleSearchChange}
      searchPlaceholder="Search by ID, customer or email"
    >
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Last 7 days</h2>
            <p className="text-sm text-gray-500">11–17 Sep 2026 vs the previous week</p>
          </div>
          <button
            type="button"
            onClick={() => loadData(null)}
            disabled={isLoading}
            aria-label="Refresh data"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin motion-reduce:animate-none" : ""} />
            <span className="refresh-label">{isLoading ? "Refreshing" : "Refresh"}</span>
          </button>
        </div>

        <SummaryCards
          stats={summaryStats}
          isLoading={isLoading}
          activeStatus={statusFilter}
          onSelect={handleCardSelect}
        />

        <div className="split-grid">
          <ActivityChart data={activityData} isLoading={isLoading} />
          <PaymentMethods methods={methodStats} isLoading={isLoading} />
        </div>

        <section id="transactions" className="transactions-section overflow-hidden rounded-lg border border-gray-200 bg-white">
          <Filters
            search={search}
            statusFilter={statusFilter}
            methodFilter={methodFilter}
            dateFilter={dateFilter}
            statusCounts={statusCounts}
            resultCount={filteredTransactions.length}
            isLoading={isLoading}
            hasError={hasError}
            onStatusChange={handleStatusChange}
            onMethodChange={handleMethodChange}
            onDateChange={handleDateChange}
            onClearFilters={clearFilters}
            onExport={handleExport}
          />
          {tableContent}
        </section>

      {selectedTransaction && (
        <TransactionDrawer
          transaction={selectedTransaction}
          position={selectedPosition}
          total={filteredTransactions.length}
          onClose={() => setSelectedId(null)}
          onPrevious={showPreviousTransaction}
          onNext={showNextTransaction}
        />
      )}
    </AppShell>
  );
}
