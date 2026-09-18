 
export const bankAccount = {
  bankName: "HDFC Bank",
  accountName: "Paysetu Retail Private Limited",
  accountNumber: "XXXX XXXX 7742",
  ifsc: "HDFC0001284",
  branch: "Connaught Place, New Delhi",
  schedule: "Daily, T+2 working days",
};

export const payouts = [
  { id: "PYT-20841", settledOn: "2026-09-17T11:30:00", period: "15 Sep 2026", gross: 486200, fees: 7290, gst: 1312, refunds: 5499, net: 472099, transactionCount: 58, utr: "HDFC26091712841", status: "in_transit" },
  { id: "PYT-20840", settledOn: "2026-09-16T11:30:00", period: "14 Sep 2026", gross: 512750, fees: 7691, gst: 1384, refunds: 0, net: 503675, transactionCount: 64, utr: "HDFC26091612775", status: "paid" },
  { id: "PYT-20839", settledOn: "2026-09-15T11:30:00", period: "13 Sep 2026", gross: 398400, fees: 5976, gst: 1076, refunds: 2499, net: 388849, transactionCount: 47, utr: "HDFC26091512710", status: "paid" },
  { id: "PYT-20838", settledOn: "2026-09-14T11:30:00", period: "12 Sep 2026", gross: 441900, fees: 6629, gst: 1193, refunds: 12400, net: 421678, transactionCount: 52, utr: "HDFC26091412648", status: "paid" },
  { id: "PYT-20837", settledOn: "2026-09-13T11:30:00", period: "11 Sep 2026", gross: 367250, fees: 5509, gst: 992, refunds: 0, net: 360749, transactionCount: 44, utr: "HDFC26091312580", status: "paid" },
  { id: "PYT-20836", settledOn: "2026-09-12T11:30:00", period: "10 Sep 2026", gross: 289600, fees: 4344, gst: 782, refunds: 3240, net: 281234, transactionCount: 38, utr: "HDFC26091212511", status: "paid" },
  { id: "PYT-20835", settledOn: "2026-09-11T11:30:00", period: "9 Sep 2026", gross: 415300, fees: 6230, gst: 1121, refunds: 0, net: 407949, transactionCount: 49, utr: "HDFC26091112446", status: "paid" },
  { id: "PYT-20834", settledOn: "2026-09-10T11:30:00", period: "8 Sep 2026", gross: 328750, fees: 4931, gst: 888, refunds: 1199, net: 321732, transactionCount: 41, utr: "HDFC26091012377", status: "on_hold" },
  { id: "PYT-20833", settledOn: "2026-09-09T11:30:00", period: "7 Sep 2026", gross: 476100, fees: 7142, gst: 1286, refunds: 0, net: 467672, transactionCount: 56, utr: "HDFC26090912309", status: "paid" },
  { id: "PYT-20832", settledOn: "2026-09-08T11:30:00", period: "6 Sep 2026", gross: 254900, fees: 3824, gst: 688, refunds: 4500, net: 245888, transactionCount: 33, utr: "HDFC26090812240", status: "paid" },
  { id: "PYT-20831", settledOn: "2026-09-07T11:30:00", period: "5 Sep 2026", gross: 391450, fees: 5872, gst: 1057, refunds: 0, net: 384521, transactionCount: 46, utr: "HDFC26090712178", status: "paid" },
  { id: "PYT-20830", settledOn: "2026-09-06T11:30:00", period: "4 Sep 2026", gross: 302600, fees: 4539, gst: 817, refunds: 899, net: 296345, transactionCount: 39, utr: "HDFC26090612104", status: "paid" },
];
 

export const upcomingPayout = {
  amount: 517430,
  transactionCount: 61,
  expectedOn: "18 Sep 2026",
  period: "16 Sep 2026",
};
 

export const holdReason = "KYC document re-verification is pending. Upload the latest bank statement to release this payout.";

export const payoutTrend = [
  { label: "11 Sep", amount: 296345 },
  { label: "12 Sep", amount: 384521 },
  { label: "13 Sep", amount: 245888 },
  { label: "14 Sep", amount: 467672 },
  { label: "15 Sep", amount: 321732 },
  { label: "16 Sep", amount: 407949 },
  { label: "17 Sep", amount: 281234 },
];
