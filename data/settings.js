// Everything shown on the Settings page.

export const businessProfile = {
  businessName: "Paysetu Retail Private Limited",
  displayName: "Paysetu",
  website: "https://paysetu.in",
  supportEmail: "support@paysetu.in",
  supportPhone: "+91 11 4050 2200",
  gstin: "07AABCP2211M1Z8",
  pan: "AABCP2211M",
  category: "E-commerce and services",
  address: "4th Floor, Barakhamba Road, Connaught Place, New Delhi 110001",
  kycStatus: "verified",
};

export const teamMembers = [
  { id: "USR-01", name: "Kriti Sood", email: "kriti@paysetu.in", role: "Operations", access: "Full access", lastActive: "Today, 2:40 PM", status: "active" },
  { id: "USR-02", name: "Aman Bedi", email: "aman@paysetu.in", role: "Support", access: "Transactions and refunds", lastActive: "Today, 11:05 AM", status: "active" },
  { id: "USR-03", name: "Ritika Jain", email: "ritika@paysetu.in", role: "Finance", access: "Payouts and reports", lastActive: "Yesterday, 6:30 PM", status: "active" },
  { id: "USR-04", name: "Sameer Dutt", email: "sameer@paysetu.in", role: "Risk", access: "Disputes only", lastActive: "14 Sep 2026", status: "active" },
  { id: "USR-05", name: "Neelam Rawat", email: "neelam@paysetu.in", role: "Support", access: "Transactions and refunds", lastActive: "Invite sent 12 Sep 2026", status: "invited" },
];

export const paymentMethodSettings = [
  { id: "upi", name: "UPI", note: "Google Pay, PhonePe, Paytm and any UPI app", fee: "0% per payment", enabled: true },
  { id: "card", name: "Cards", note: "Visa, Mastercard and RuPay, Indian and international", fee: "2% per payment", enabled: true },
  { id: "netbanking", name: "Net Banking", note: "58 banks including HDFC, ICICI, SBI and Axis", fee: "1.5% per payment", enabled: true },
  { id: "wallet", name: "Wallets", note: "Paytm, PhonePe and Amazon Pay wallets", fee: "1.8% per payment", enabled: true },
  { id: "emi", name: "EMI", note: "Card EMI from 6 to 24 months", fee: "2.5% per payment", enabled: false },
  { id: "paylater", name: "Pay Later", note: "Simpl, LazyPay and ICICI PayLater", fee: "2.2% per payment", enabled: false },
];

export const notificationSettings = [
  { id: "payment_success", label: "Successful payments", note: "A daily summary instead of one email per payment", email: true, sms: false },
  { id: "payment_failed", label: "Failed payments", note: "Only when more than 10 payments fail in an hour", email: true, sms: true },
  { id: "payout", label: "Payout sent to bank", note: "Every time money reaches your bank account", email: true, sms: true },
  { id: "dispute", label: "New dispute", note: "Sent to the risk team the moment a bank opens a case", email: true, sms: true },
  { id: "refund", label: "Refund completed", note: "When a refund reaches the customer", email: false, sms: false },
];

export const apiKeys = [
  { id: "KEY-01", label: "Live key", value: "pk_live_4f9a•••••••••2c71", createdOn: "12 Jan 2026", lastUsed: "Today, 2:38 PM", mode: "Live" },
  { id: "KEY-02", label: "Test key", value: "pk_test_9b2d•••••••••7e40", createdOn: "12 Jan 2026", lastUsed: "16 Sep 2026", mode: "Test" },
];

export const webhooks = [
  { id: "WHK-01", url: "https://api.paysetu.in/hooks/payments", events: "payment.success, payment.failed", status: "active", lastDelivery: "Today, 2:39 PM" },
  { id: "WHK-02", url: "https://api.paysetu.in/hooks/refunds", events: "refund.created, refund.completed", status: "active", lastDelivery: "Today, 10:12 AM" },
  { id: "WHK-03", url: "https://ops.paysetu.in/hooks/disputes", events: "dispute.created", status: "failing", lastDelivery: "Failed 3 times, 15 Sep 2026" },
];
