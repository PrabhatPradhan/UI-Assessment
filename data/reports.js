// Reports the operations team downloads every month.

export const reportTemplates = [
  { id: "settlement", name: "Settlement report", description: "Payout wise breakdown of gross amount, fees, GST and net amount sent to the bank.", format: "XLSX", rows: "1 row per payout", updated: "17 Sep 2026" },
  { id: "transactions", name: "Transaction report", description: "Every payment with customer, method, status and order ID. Used for daily reconciliation.", format: "CSV", rows: "1 row per transaction", updated: "17 Sep 2026" },
  { id: "gst", name: "GST report", description: "Fees and 18% GST charged by Paysetu, ready for your accountant.", format: "XLSX", rows: "1 row per month", updated: "1 Sep 2026" },
  { id: "refunds", name: "Refund report", description: "All refunds with reason, type and the time taken to reach the customer.", format: "CSV", rows: "1 row per refund", updated: "16 Sep 2026" },
  { id: "disputes", name: "Dispute report", description: "Chargebacks with stage, due date and the final decision of the bank.", format: "CSV", rows: "1 row per dispute", updated: "15 Sep 2026" },
  { id: "customers", name: "Customer report", description: "Customers with number of payments, total spend and success rate.", format: "XLSX", rows: "1 row per customer", updated: "17 Sep 2026" },
];

// numbers for the last 6 months
export const monthlySummary = [
  { month: "Apr 2026", transactions: 3184, volume: 9846200, refunds: 184300, fees: 147693, net: 9514207, successRate: 92.4 },
  { month: "May 2026", transactions: 3562, volume: 10932400, refunds: 211600, fees: 163986, net: 10556814, successRate: 93.1 },
  { month: "Jun 2026", transactions: 3390, volume: 10284700, refunds: 176800, fees: 154270, net: 9953630, successRate: 91.8 },
  { month: "Jul 2026", transactions: 4021, volume: 12447900, refunds: 243500, fees: 186718, net: 12017682, successRate: 93.7 },
  { month: "Aug 2026", transactions: 4288, volume: 13106500, refunds: 198200, fees: 196597, net: 12711703, successRate: 94.2 },
  { month: "Sep 2026", transactions: 2476, volume: 7612800, refunds: 132900, fees: 114192, net: 7365708, successRate: 94.6 },
];

// reports that are emailed automatically
export const scheduledReports = [
  { id: "SCH-11", name: "Settlement report", frequency: "Every Monday, 8:00 AM", recipients: "finance@paysetu.in", format: "XLSX", status: "active" },
  { id: "SCH-12", name: "Transaction report", frequency: "Daily, 9:00 PM", recipients: "ops@paysetu.in, kriti@paysetu.in", format: "CSV", status: "active" },
  { id: "SCH-13", name: "GST report", frequency: "1st of every month", recipients: "accounts@paysetu.in", format: "XLSX", status: "active" },
  { id: "SCH-14", name: "Dispute report", frequency: "Every Friday, 6:00 PM", recipients: "risk@paysetu.in", format: "CSV", status: "paused" },
];

// last few files that were generated
export const recentDownloads = [
  { id: "DWN-4412", name: "Settlement report – 1 to 15 Sep 2026", size: "184 KB", createdOn: "2026-09-16T08:02:00", createdBy: "Kriti Sood", format: "XLSX" },
  { id: "DWN-4411", name: "Transaction report – 15 Sep 2026", size: "1.2 MB", createdOn: "2026-09-15T21:00:00", createdBy: "Scheduled", format: "CSV" },
  { id: "DWN-4410", name: "GST report – Aug 2026", size: "76 KB", createdOn: "2026-09-01T09:14:00", createdBy: "Scheduled", format: "XLSX" },
  { id: "DWN-4409", name: "Refund report – Aug 2026", size: "112 KB", createdOn: "2026-08-31T18:40:00", createdBy: "Aman Bedi", format: "CSV" },
];
