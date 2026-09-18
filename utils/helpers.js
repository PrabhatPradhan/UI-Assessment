import { TODAY } from "../data/transactions";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// 18750 -> "₹18,750.00"
export function formatAmount(amount) {
  return "₹" + amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// 4862310 -> "₹48,62,310"
export function formatMoney(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

// 1284 -> "1,284"
export function formatCount(number) {
  return number.toLocaleString("en-IN");
}

// We read the date string by hand (not with new Date)
// so the server and browser always show the same text.

// "2026-09-17T14:32:00" -> "17 Sep 2026"
export function formatDate(dateString) {
  const datePart = dateString.split("T")[0];
  const [year, month, day] = datePart.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

// "2026-09-17T14:32:00" -> "17 Sep"
export function formatShortDate(dateString) {
  const datePart = dateString.split("T")[0];
  const [, month, day] = datePart.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]}`;
}

// "2026-09-17T14:32:00" -> "2:32 PM"
export function formatTime(dateString) {
  const timePart = dateString.split("T")[1];
  const [hourText, minutes] = timePart.split(":");
  let hours = Number(hourText);
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes} ${period}`;
}

// "Priya Nair" -> "PN"
export function getInitials(name) {
  const parts = name.split(" ");
  const first = parts[0] ? parts[0][0] : "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

// How many days before TODAY this date is
function daysAgo(dateString) {
  const oneDay = 1000 * 60 * 60 * 24;
  const date = new Date(dateString.split("T")[0] + "T00:00:00Z");
  const today = new Date(TODAY + "T00:00:00Z");
  return Math.round((today - date) / oneDay);
}

export function isInDateRange(dateString, range) {
  const days = daysAgo(dateString);
  if (range === "today") return days === 0;
  if (range === "7days") return days <= 6;
  if (range === "30days") return days <= 29;
  return true; // "all"
}

// Fee rules for our mock platform
export function getFeeDetails(transaction) {
  const rates = { UPI: 0, Card: 0.02, "Net Banking": 0.015, Wallet: 0.018 };
  const rate = rates[transaction.method] || 0;

  const fee = Math.round(transaction.amount * rate * 100) / 100;
  const gst = Math.round(fee * 0.18 * 100) / 100;
  const net = Math.round((transaction.amount - fee - gst) * 100) / 100;

  return { ratePercent: +(rate * 100).toFixed(1), fee, gst, net };
}

export function getMethodDetailLabel(method) {
  if (method === "UPI") return "UPI ID";
  if (method === "Card") return "Card";
  if (method === "Net Banking") return "Bank";
  return "Wallet";
}

// Fake bank reference number made from the transaction ID
export function getBankReference(transaction) {
  const idNumber = transaction.id.replace("TXN-", "");
  const day = transaction.date.slice(8, 10);
  return "UTR" + "6260" + idNumber + day + "31";
}

// Steps shown in the drawer timeline
export function getTimeline(transaction) {
  const startNote = `${formatShortDate(transaction.date)}, ${formatTime(transaction.date)}`;

  if (transaction.status === "success") {
    return [
      { title: "Payment started", note: startNote, state: "done" },
      { title: "Approved by bank", note: "The customer's bank confirmed the payment", state: "done" },
      { title: "Amount captured", note: "Settles to the merchant on the next working day", state: "done" },
    ];
  }

  if (transaction.status === "pending") {
    return [
      { title: "Payment started", note: startNote, state: "done" },
      { title: "Waiting for bank", note: "No response from the bank yet", state: "current" },
      { title: "Amount captured", note: "Happens after the bank confirms", state: "upcoming" },
    ];
  }

  if (transaction.status === "failed") {
    return [
      { title: "Payment started", note: startNote, state: "done" },
      { title: "Payment failed", note: transaction.failureReason, state: "failed" },
    ];
  }

  // refunded
  return [
    { title: "Payment started", note: startNote, state: "done" },
    { title: "Amount captured", note: "Payment was completed", state: "done" },
    { title: "Refunded", note: "Full amount returned to the original payment method", state: "done" },
  ];
}

// Turn a list of transactions into CSV text
export function transactionsToCSV(list) {
  const header = ["Transaction ID", "Customer", "Email", "Payment method", "Amount (INR)", "Date", "Time", "Status"];
  const rows = list.map((t) => [t.id, t.customer, t.email, t.method, t.amount, formatDate(t.date), formatTime(t.date), t.status]);

  const allRows = [header, ...rows];
  // wrap every value in quotes so commas inside text don't break the file
  return allRows.map((row) => row.map((value) => `"${value}"`).join(",")).join("\n");
}

// Download any text as a file
export function downloadFile(fileName, content, type) {
  const blob = new Blob([content], { type: type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

// How many days are left until a date, counted from our fixed "today".
// We build the dates from numbers so the server and the browser agree.
export function daysUntil(dateString) {
  const [year, month, day] = dateString.split("T")[0].split("-").map(Number);
  const [todayYear, todayMonth, todayDay] = TODAY.split("-").map(Number);
  const target = Date.UTC(year, month - 1, day);
  const today = Date.UTC(todayYear, todayMonth - 1, todayDay);
  return Math.round((target - today) / 86400000);
}

// -3 -> "3 days ago", 0 -> "today", 2 -> "in 2 days"
export function describeDays(days) {
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  if (days === -1) return "yesterday";
  if (days > 1) return `in ${days} days`;
  return `${Math.abs(days)} days ago`;
}
