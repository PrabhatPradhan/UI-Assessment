// Content for the Help page.

export const faqs = [
  {
    id: "faq-1",
    category: "Payouts",
    question: "When does the money reach my bank account?",
    answer:
      "Payouts are sent on a T+2 working day cycle. A payment received on Monday is settled on Wednesday, usually before 11:30 AM. Bank holidays and Sundays are skipped, so a Friday payment reaches you on Tuesday.",
  },
  {
    id: "faq-2",
    category: "Payouts",
    question: "Why is my payout on hold?",
    answer:
      "A payout goes on hold when KYC documents need re-verification, when a dispute is open for a large amount, or when the bank account details fail a name match. Open the payout to see the exact reason and the document you need to upload.",
  },
  {
    id: "faq-3",
    category: "Refunds",
    question: "How long does a refund take to reach the customer?",
    answer:
      "UPI and wallet refunds are instant and usually land within a few minutes. Card and net banking refunds go through the customer's bank and take 5 to 7 working days. The refund fee is never charged back to you.",
  },
  {
    id: "faq-4",
    category: "Refunds",
    question: "Can I refund only a part of a payment?",
    answer:
      "Yes. Open the transaction, choose Refund, and enter any amount up to the original payment. You can issue several partial refunds as long as the total stays within the original amount.",
  },
  {
    id: "faq-5",
    category: "Disputes",
    question: "What happens if I miss the evidence due date?",
    answer:
      "The case is closed in the customer's favour automatically and the amount is debited from your next payout. Always upload whatever proof you have before the due date, even if it is incomplete.",
  },
  {
    id: "faq-6",
    category: "Disputes",
    question: "What evidence works best for a chargeback?",
    answer:
      "Delivery proof with a signature, the order confirmation email, and any chat with the customer. For 'payment not authorised' cases, past orders from the same card and matching billing and shipping addresses are the strongest proof.",
  },
  {
    id: "faq-7",
    category: "Payments",
    question: "Why do UPI payments fail?",
    answer:
      "The three most common reasons are a wrong UPI PIN, a daily limit that has been crossed, and a bank server that is down. The customer can simply retry, usually with a different UPI app.",
  },
  {
    id: "faq-8",
    category: "Account",
    question: "How do I add someone from my team?",
    answer:
      "Go to Settings, open the Team tab and send an invite. You can give access to only the sections they need, for example refunds for support staff or payouts and reports for finance.",
  },
];

export const guides = [
  { id: "g1", title: "Reconcile a payout with your order system", minutes: 6, description: "Match the settlement report with your own orders, line by line." },
  { id: "g2", title: "Set up refund rules that run on their own", minutes: 4, description: "Auto refund cancelled orders without touching the dashboard." },
  { id: "g3", title: "Win more disputes", minutes: 8, description: "What to collect at checkout so evidence is ready in advance." },
  { id: "g4", title: "Read the GST report", minutes: 5, description: "Which numbers your accountant needs and where to find them." },
  { id: "g5", title: "Test payments before going live", minutes: 3, description: "Use the test key and the test UPI ID to try every flow safely." },
  { id: "g6", title: "Reduce failed payments", minutes: 7, description: "Retry rules, smart routing and what to show the customer." },
];

export const supportChannels = [
  { id: "chat", title: "Chat with support", detail: "Replies in about 2 minutes", availability: "24 hours, all days", action: "Start chat" },
  { id: "email", title: "Email support", detail: "support@paysetu.in", availability: "Replies within 4 hours", action: "Send email" },
  { id: "phone", title: "Call the ops desk", detail: "+91 11 4050 2200", availability: "9:00 AM to 9:00 PM", action: "Call now" },
];

export const systemStatus = [
  { id: "upi", name: "UPI payments", status: "operational", note: "Success rate 87.6% in the last hour" },
  { id: "cards", name: "Card payments", status: "operational", note: "Success rate 83.1% in the last hour" },
  { id: "netbanking", name: "Net Banking", status: "degraded", note: "Axis Bank is slow, payments may take longer" },
  { id: "payouts", name: "Payouts", status: "operational", note: "Running on schedule" },
  { id: "dashboard", name: "Dashboard and API", status: "operational", note: "No issues reported" },
];

export const openTickets = [
  { id: "TKT-2291", subject: "Settlement report shows a missing order", openedOn: "16 Sep 2026", status: "with_support", lastReply: "Support replied 2 hours ago" },
  { id: "TKT-2288", subject: "Webhook for disputes keeps failing", openedOn: "15 Sep 2026", status: "waiting_on_you", lastReply: "Support asked for your server logs" },
];
