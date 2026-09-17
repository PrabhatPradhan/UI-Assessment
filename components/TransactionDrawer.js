"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, CircleAlert, Clock, Copy, X } from "lucide-react";
import Avatar from "./Avatar";
import MethodIcon from "./MethodIcon";
import StatusBadge from "./StatusBadge";
import {
  downloadFile,
  formatAmount,
  formatDate,
  formatTime,
  getBankReference,
  getFeeDetails,
  getMethodDetailLabel,
  getTimeline,
} from "../utils/helpers";

const timelineDotStyles = {
  done: "border-emerald-500 bg-emerald-500",
  current: "border-amber-500 bg-white",
  upcoming: "border-gray-300 bg-white",
  failed: "border-red-500 bg-red-500",
};

const iconButtonClass =
  "flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent";

function Section({ title, children }) {
  return (
    <div className="border-t border-gray-100 px-5 py-4">
      <h3 className="mb-2 text-xs font-medium text-gray-500">{title}</h3>
      {children}
    </div>
  );
}

function DetailRow({ label, children }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5 text-sm">
      <span className="shrink-0 text-gray-500">{label}</span>
      <span className="min-w-0 break-words text-right font-medium text-gray-900">{children}</span>
    </div>
  );
}

export default function TransactionDrawer({ transaction, position, total, onClose, onPrevious, onNext }) {
  const [copied, setCopied] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const closeButtonRef = useRef(null);

  // focus the close button when the drawer opens
  useEffect(() => {
    if (closeButtonRef.current) closeButtonRef.current.focus();
  }, []);

  // Escape closes the drawer, and the page behind should not scroll
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

  // reset small messages when we move to another transaction
  useEffect(() => {
    setCopied(false);
    setActionMessage("");
  }, [transaction.id]);

  function copyId() {
    if (navigator.clipboard) navigator.clipboard.writeText(transaction.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function downloadReceipt() {
    const lines = [
      "Paysetu payment receipt",
      "",
      `Transaction ID: ${transaction.id}`,
      `Order ID: ${transaction.orderId}`,
      `Merchant: ${transaction.merchant}`,
      `Customer: ${transaction.customer} (${transaction.email})`,
      `Amount: INR ${transaction.amount.toFixed(2)}`,
      `Method: ${transaction.method}, ${transaction.methodDetail}`,
      `Date: ${formatDate(transaction.date)}, ${formatTime(transaction.date)}`,
      `Status: ${transaction.status}`,
    ];
    downloadFile(`receipt-${transaction.id}.txt`, lines.join("\n"), "text/plain");
    setActionMessage("Receipt downloaded");
  }

  const status = transaction.status;
  const fee = getFeeDetails(transaction);
  const timeline = getTimeline(transaction);
  const hasBankReference = status === "success" || status === "refunded";

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />

      <aside className="drawer border-l border-gray-200 bg-white" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        {/* top bar */}
        <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-gray-200 pl-5 pr-3">
          <h2 id="drawer-title" className="text-sm font-semibold text-gray-900">
            Transaction details
          </h2>

          <div className="flex items-center gap-1">
            {position > 0 && (
              <span className="mr-1 text-xs tabular-nums text-gray-500">
                {position} of {total}
              </span>
            )}
            <button type="button" onClick={onPrevious} disabled={position <= 1} className={iconButtonClass} aria-label="Previous transaction">
              <ChevronUp size={18} />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={position === 0 || position >= total}
              className={iconButtonClass}
              aria-label="Next transaction"
            >
              <ChevronDown size={18} />
            </button>
            <span className="mx-1 h-5 w-px bg-gray-200" />
            <button ref={closeButtonRef} type="button" onClick={onClose} className={iconButtonClass} aria-label="Close details">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 pb-5 pt-4">
            <div className="flex items-center justify-between gap-3">
              <StatusBadge status={status} />
              <span className="text-xs tabular-nums text-gray-500">
                {formatDate(transaction.date)}, {formatTime(transaction.date)}
              </span>
            </div>

            <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight text-gray-900">
              {formatAmount(transaction.amount)}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {status === "failed" ? "Attempted payment" : "Payment"} to {transaction.merchant}
            </p>

            {status === "failed" && (
              <div className="mt-4 flex gap-2.5 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm">
                <CircleAlert size={16} className="mt-0.5 shrink-0 text-red-600" />
                <div>
                  <p className="font-medium text-red-800">Payment failed</p>
                  <p className="mt-0.5 text-red-700">{transaction.failureReason}. No money was taken from the customer.</p>
                </div>
              </div>
            )}

            {status === "pending" && (
              <div className="mt-4 flex gap-2.5 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm">
                <Clock size={16} className="mt-0.5 shrink-0 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-900">Waiting for bank confirmation</p>
                  <p className="mt-0.5 text-amber-800">
                    Most pending payments update within 30 minutes. If the bank declines, the customer is not charged.
                  </p>
                </div>
              </div>
            )}
          </div>

          <Section title="Payment">
            <DetailRow label="Transaction ID">
              <span className="inline-flex items-center gap-1 align-top tabular-nums">
                {transaction.id}
                <button
                  type="button"
                  onClick={copyId}
                  aria-label="Copy transaction ID"
                  className="-my-1 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </span>
            </DetailRow>
            <DetailRow label="Order ID">{transaction.orderId}</DetailRow>
            <DetailRow label="Merchant">{transaction.merchant}</DetailRow>
            <DetailRow label="Method">
              <span className="inline-flex items-center gap-2 align-top">
                <MethodIcon method={transaction.method} size={15} className="text-gray-400" />
                {transaction.method}
              </span>
            </DetailRow>
            <DetailRow label={getMethodDetailLabel(transaction.method)}>{transaction.methodDetail}</DetailRow>
            {hasBankReference && <DetailRow label="Bank reference">{getBankReference(transaction)}</DetailRow>}
          </Section>

          {status === "success" && (
            <Section title="Settlement">
              <DetailRow label="Payment amount">{formatAmount(transaction.amount)}</DetailRow>
              <DetailRow label={`Processing fee (${fee.ratePercent}%)`}>−{formatAmount(fee.fee)}</DetailRow>
              <DetailRow label="GST on fee (18%)">−{formatAmount(fee.gst)}</DetailRow>
              <div className="mt-1.5 flex justify-between gap-4 border-t border-gray-100 pt-3 text-sm font-semibold text-gray-900">
                <span>Net to merchant</span>
                <span className="tabular-nums">{formatAmount(fee.net)}</span>
              </div>
            </Section>
          )}

          {status === "refunded" && (
            <Section title="Settlement">
              <DetailRow label="Payment amount">{formatAmount(transaction.amount)}</DetailRow>
              <DetailRow label="Refunded to customer">−{formatAmount(transaction.amount)}</DetailRow>
              <div className="mt-1.5 flex justify-between gap-4 border-t border-gray-100 pt-3 text-sm font-semibold text-gray-900">
                <span>Net to merchant</span>
                <span className="tabular-nums">{formatAmount(0)}</span>
              </div>
            </Section>
          )}

          <Section title="Customer">
            <div className="flex items-center gap-3 py-1">
              <Avatar name={transaction.customer} size="lg" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">{transaction.customer}</p>
                <p className="truncate text-sm text-gray-500">{transaction.email}</p>
              </div>
            </div>
          </Section>

          <Section title="Timeline">
            <ol className="pt-1">
              {timeline.map((step, index) => (
                <li key={step.title} className="relative flex gap-3 pb-4 last:pb-0">
                  {index < timeline.length - 1 && (
                    <span className="absolute bottom-0 left-[5px] top-4 w-px bg-gray-200" />
                  )}
                  <span className={`relative mt-1 h-[11px] w-[11px] shrink-0 rounded-full border-2 ${timelineDotStyles[step.state]}`} />
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${step.state === "upcoming" ? "text-gray-500" : "text-gray-900"}`}>
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">{step.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        </div>

        {/* actions */}
        <div className="shrink-0 border-t border-gray-200 px-5 py-4">
          {actionMessage && (
            <p className="mb-3 flex items-center gap-2 text-sm text-emerald-700" role="status">
              <Check size={16} />
              {actionMessage}
            </p>
          )}

          <div className="flex gap-2">
            {status === "success" && (
              <>
                <button
                  type="button"
                  onClick={() => setActionMessage(`Refund of ${formatAmount(transaction.amount)} started`)}
                  className="h-9 flex-1 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Refund payment
                </button>
                <button
                  type="button"
                  onClick={downloadReceipt}
                  className="h-9 flex-1 rounded-md bg-gray-900 px-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Download receipt
                </button>
              </>
            )}

            {status === "pending" && (
              <>
                <a
                  href={`mailto:${transaction.email}`}
                  className="flex h-9 flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Email customer
                </a>
                <button
                  type="button"
                  onClick={() => setActionMessage("Checked with bank: still waiting for a response")}
                  className="h-9 flex-1 rounded-md bg-gray-900 px-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Check status
                </button>
              </>
            )}

            {status === "failed" && (
              <>
                <a
                  href={`mailto:${transaction.email}`}
                  className="flex h-9 flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Email customer
                </a>
                <button
                  type="button"
                  onClick={() => setActionMessage(`Payment link sent to ${transaction.email}`)}
                  className="h-9 flex-1 rounded-md bg-gray-900 px-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Send payment link
                </button>
              </>
            )}

            {status === "refunded" && (
              <button
                type="button"
                onClick={downloadReceipt}
                className="h-9 flex-1 rounded-md bg-gray-900 px-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                Download receipt
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
