"use client";

import { useEffect, useState } from "react";
import { Clock, Download, FileText } from "lucide-react";

import AppShell from "../../components/AppShell";
import Badge from "../../components/Badge";
import Skeleton from "../../components/Skeleton";

import { monthlySummary, recentDownloads, reportTemplates, scheduledReports } from "../../data/reports";
import { downloadFile, formatDate, formatMoney, formatTime } from "../../utils/helpers";

const ranges = [
  { key: "this_month", label: "This month (1–17 Sep 2026)" },
  { key: "last_month", label: "Last month (Aug 2026)" },
  { key: "quarter", label: "This quarter (Jul–Sep 2026)" },
  { key: "year", label: "This financial year (Apr 2026 onwards)" },
];

export default function ReportsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [range, setRange] = useState("this_month");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const biggestMonth = Math.max(...monthlySummary.map((month) => month.volume));
  const rangeLabel = ranges.find((item) => item.key === range).label;
 
  function handleDownload(template) {
    const header = ["Month", "Transactions", "Volume", "Refunds", "Fees", "Net", "Success rate"];
    const rows = monthlySummary.map((month) => [
      month.month,
      month.transactions,
      month.volume,
      month.refunds,
      month.fees,
      month.net,
      month.successRate + "%",
    ]);
    const csv = [header, ...rows].map((row) => row.join(",")).join("\n");

    downloadFile(`${template.id}-report.csv`, csv, "text/csv");
    setMessage(`${template.name} downloaded for ${rangeLabel}`);
    setTimeout(() => setMessage(""), 4000);
  }

  return (
    <AppShell title="Reports" subtitle="Download the numbers your finance team needs">
      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="form-grid">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">Date range</span>
            <select
              value={range}
              onChange={(event) => setRange(event.target.value)}
              className="h-9 w-full cursor-pointer rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-700 hover:border-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {ranges.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">File format</span>
            <select className="h-9 w-full cursor-pointer rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-700 hover:border-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
              <option>CSV (opens in Excel)</option>
              <option>XLSX (Excel workbook)</option>
              <option>PDF (for printing)</option>
            </select>
          </label>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Reports are generated from your live data. Large ranges are emailed to you when they are ready.
        </p>

        {message && (
          <p className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            {message}
          </p>
        )}
      </section>

      <div>
        <h2 className="mb-3 text-base font-semibold text-gray-900">Reports you can download</h2>

        <div className="cards-grid-3">
          {reportTemplates.map((template) => (
            <section key={template.id} className="flex flex-col rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-200 text-gray-500">
                  <FileText size={18} strokeWidth={1.75} />
                </span>
                <Badge label={template.format} tone="gray" withDot={false} />
              </div>

              <h3 className="mt-3 text-sm font-semibold text-gray-900">{template.name}</h3>
              <p className="mt-1 flex-1 text-sm leading-5 text-gray-600">{template.description}</p>

              <p className="mt-3 text-xs text-gray-500">
                {template.rows} · updated {template.updated}
              </p>

              <button
                type="button"
                onClick={() => handleDownload(template)}
                className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Download size={16} />
                Download
              </button>
            </section>
          ))}
        </div>
      </div>

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">Month by month</h2>
          <p className="text-xs text-gray-500">Last 6 months, all merchants together</p>
        </div>

        {isLoading ? (
          <div className="space-y-3 px-4 pb-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <>
            <div className="table-wrap">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-gray-200 bg-gray-50 text-left text-xs text-gray-500">
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 font-medium">Month</th>
                    <th scope="col" className="col-secondary whitespace-nowrap px-4 py-2.5 text-right font-medium">Payments</th>
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 text-right font-medium">Volume</th>
                    <th scope="col" className="col-optional whitespace-nowrap px-4 py-2.5 text-right font-medium">Refunds</th>
                    <th scope="col" className="col-optional whitespace-nowrap px-4 py-2.5 text-right font-medium">Fees</th>
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 text-right font-medium">Net</th>
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 text-right font-medium">Success</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {monthlySummary.map((month) => (
                    <tr key={month.month} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{month.month}</td>
                      <td className="col-secondary px-4 py-3 text-right tabular-nums text-gray-600">
                        {month.transactions.toLocaleString("en-IN")}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-gray-900">
                        {formatMoney(month.volume)}
                      </td>
                      <td className="col-optional whitespace-nowrap px-4 py-3 text-right tabular-nums text-gray-600">
                        {formatMoney(month.refunds)}
                      </td>
                      <td className="col-optional whitespace-nowrap px-4 py-3 text-right tabular-nums text-gray-600">
                        {formatMoney(month.fees)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right font-medium tabular-nums text-gray-900">
                        {formatMoney(month.net)}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-gray-600">{month.successRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
            <ul className="txn-list divide-y divide-gray-100 border-t border-gray-200">
              {monthlySummary.map((month) => (
                <li key={month.month} className="px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-gray-900">{month.month}</span>
                    <span className="text-sm tabular-nums text-gray-900">{formatMoney(month.volume)}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100">
                    <div
                      className="h-1.5 rounded-full bg-brand-500/80"
                      style={{ width: `${Math.round((month.volume / biggestMonth) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">
                    {month.transactions.toLocaleString("en-IN")} payments · {month.successRate}% success · net{" "}
                    {formatMoney(month.net)}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <div className="split-grid">
        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Scheduled reports</h2>
              <p className="text-xs text-gray-500">Sent by email, no clicks needed</p>
            </div>
            <button
              type="button"
              className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              New schedule
            </button>
          </div>

          <ul className="divide-y divide-gray-100 border-t border-gray-100">
            {scheduledReports.map((report) => (
              <li key={report.id} className="flex items-start gap-3 px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gray-200 text-gray-400">
                  <Clock size={16} strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{report.name}</p>
                  <p className="text-xs text-gray-500">{report.frequency}</p>
                  <p className="mt-0.5 truncate text-xs text-gray-500">To {report.recipients}</p>
                </div>
                <Badge
                  label={report.status === "active" ? "Active" : "Paused"}
                  tone={report.status === "active" ? "green" : "gray"}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="px-4 py-3">
            <h2 className="text-sm font-semibold text-gray-900">Recent downloads</h2>
            <p className="text-xs text-gray-500">Files are kept for 30 days</p>
          </div>

          <ul className="divide-y divide-gray-100 border-t border-gray-100">
            {recentDownloads.map((file) => (
              <li key={file.id} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {file.format} · {file.size} · {formatDate(file.createdOn)}, {formatTime(file.createdOn)}
                  </p>
                  <p className="text-xs text-gray-400">By {file.createdBy}</p>
                </div>
                <button
                  type="button"
                  aria-label={`Download ${file.name}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                >
                  <Download size={16} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
