 
export const TODAY = "2026-09-17";

export const transactions = [
  { id: "TXN-40852", customer: "Aarav Sharma", email: "aarav.sharma@gmail.com", method: "UPI", methodDetail: "aarav.sharma@okhdfcbank", amount: 2499, date: "2026-09-17T14:32:00", status: "success", merchant: "Kinetic Fitness", orderId: "ORD-88213" },
  { id: "TXN-40851", customer: "Priya Nair", email: "priya.nair@outlook.com", method: "Card", methodDetail: "Visa ending 4821", amount: 18750, date: "2026-09-17T14:18:00", status: "pending", merchant: "UrbanNest Furniture", orderId: "ORD-88212" },
  { id: "TXN-40850", customer: "Rohan Mehta", email: "rohan.mehta@yahoo.in", method: "UPI", methodDetail: "rohanm@ybl", amount: 649, date: "2026-09-17T13:55:00", status: "failed", merchant: "BrewBox Coffee", orderId: "ORD-88209", failureReason: "Customer entered an incorrect UPI PIN" },
  { id: "TXN-40849", customer: "Sneha Iyer", email: "sneha.iyer@gmail.com", method: "Net Banking", methodDetail: "ICICI Bank", amount: 42300, date: "2026-09-17T13:40:00", status: "success", merchant: "SkyWays Travel", orderId: "ORD-88207" },
  { id: "TXN-40848", customer: "Kabir Singh", email: "kabir.singh@gmail.com", method: "Wallet", methodDetail: "Paytm Wallet", amount: 1199, date: "2026-09-17T12:57:00", status: "success", merchant: "Cinebox Plus", orderId: "ORD-88204" },
  { id: "TXN-40847", customer: "Ananya Gupta", email: "ananya.g@protonmail.com", method: "Card", methodDetail: "Mastercard ending 1107", amount: 7890, date: "2026-09-17T12:31:00", status: "success", merchant: "Loom & Thread", orderId: "ORD-88201" },
  { id: "TXN-40846", customer: "Vikram Reddy", email: "vikram.reddy@gmail.com", method: "UPI", methodDetail: "vikram.r@oksbi", amount: 15000, date: "2026-09-17T11:48:00", status: "pending", merchant: "EduSpark Academy", orderId: "ORD-88196" },
  { id: "TXN-40845", customer: "Meera Joshi", email: "meera.joshi@rediffmail.com", method: "Card", methodDetail: "RuPay ending 6630", amount: 3240, date: "2026-09-17T11:05:00", status: "failed", merchant: "FreshCart Grocery", orderId: "ORD-88190", failureReason: "Card declined by the issuing bank" },
  { id: "TXN-40844", customer: "Arjun Patel", email: "arjun.patel@gmail.com", method: "UPI", methodDetail: "arjunpatel@paytm", amount: 899, date: "2026-09-17T10:22:00", status: "success", merchant: "BrewBox Coffee", orderId: "ORD-88184" },
  { id: "TXN-40843", customer: "Ishita Banerjee", email: "ishita.banerjee@gmail.com", method: "Net Banking", methodDetail: "HDFC Bank", amount: 26500, date: "2026-09-17T09:47:00", status: "success", merchant: "SkyWays Travel", orderId: "ORD-88179" },
  { id: "TXN-40842", customer: "Dev Malhotra", email: "dev.malhotra@icloud.com", method: "Card", methodDetail: "Visa ending 9012", amount: 5499, date: "2026-09-16T21:14:00", status: "refunded", merchant: "Loom & Thread", orderId: "ORD-88151" },
  { id: "TXN-40841", customer: "Nisha Verma", email: "nisha.verma@gmail.com", method: "UPI", methodDetail: "nisha.v@okicici", amount: 1850, date: "2026-09-16T19:36:00", status: "success", merchant: "FreshCart Grocery", orderId: "ORD-88143" },
  { id: "TXN-40840", customer: "Rahul Kapoor", email: "rahul.kapoor@gmail.com", method: "Wallet", methodDetail: "PhonePe Wallet", amount: 399, date: "2026-09-16T18:02:00", status: "success", merchant: "Cinebox Plus", orderId: "ORD-88137" },
  { id: "TXN-40839", customer: "Tanvi Desai", email: "tanvi.desai@outlook.com", method: "Card", methodDetail: "Amex ending 3005", amount: 64999, date: "2026-09-16T16:45:00", status: "success", merchant: "PixelPoint Electronics", orderId: "ORD-88126" },
  { id: "TXN-40838", customer: "Siddharth Rao", email: "sid.rao@gmail.com", method: "UPI", methodDetail: "sidrao@axl", amount: 12400, date: "2026-09-16T15:20:00", status: "failed", merchant: "UrbanNest Furniture", orderId: "ORD-88118", failureReason: "Customer's bank did not respond in time" },
  { id: "TXN-40837", customer: "Kavya Menon", email: "kavya.menon@gmail.com", method: "Net Banking", methodDetail: "Axis Bank", amount: 8200, date: "2026-09-16T13:11:00", status: "success", merchant: "EduSpark Academy", orderId: "ORD-88104" },
  { id: "TXN-40836", customer: "Aditya Kulkarni", email: "aditya.kulkarni@yahoo.in", method: "UPI", methodDetail: "aditya.k@okaxis", amount: 2150, date: "2026-09-16T11:38:00", status: "success", merchant: "Kinetic Fitness", orderId: "ORD-88097" },
  { id: "TXN-40835", customer: "Pooja Chauhan", email: "pooja.chauhan@gmail.com", method: "Card", methodDetail: "Visa ending 5544", amount: 9999, date: "2026-09-15T20:52:00", status: "success", merchant: "PixelPoint Electronics", orderId: "ORD-88062" },
  { id: "TXN-40834", customer: "Harsh Agarwal", email: "harsh.agarwal@gmail.com", method: "UPI", methodDetail: "harsh.agarwal@ybl", amount: 540, date: "2026-09-15T18:26:00", status: "success", merchant: "BrewBox Coffee", orderId: "ORD-88055" },
  { id: "TXN-40833", customer: "Riya Saxena", email: "riya.saxena@icloud.com", method: "Wallet", methodDetail: "Paytm Wallet", amount: 1499, date: "2026-09-15T16:09:00", status: "failed", merchant: "Cinebox Plus", orderId: "ORD-88041", failureReason: "Not enough balance in the wallet" },
  { id: "TXN-40832", customer: "Manish Tiwari", email: "manish.tiwari@gmail.com", method: "Net Banking", methodDetail: "State Bank of India", amount: 35000, date: "2026-09-15T12:44:00", status: "success", merchant: "SkyWays Travel", orderId: "ORD-88022" },
  { id: "TXN-40831", customer: "Divya Pillai", email: "divya.pillai@gmail.com", method: "Card", methodDetail: "Mastercard ending 2290", amount: 4320, date: "2026-09-14T19:31:00", status: "success", merchant: "Loom & Thread", orderId: "ORD-87988" },
  { id: "TXN-40830", customer: "Karan Bhatia", email: "karan.bhatia@outlook.com", method: "UPI", methodDetail: "karanb@okhdfcbank", amount: 22800, date: "2026-09-14T15:03:00", status: "refunded", merchant: "UrbanNest Furniture", orderId: "ORD-87970" },
  { id: "TXN-40829", customer: "Aisha Khan", email: "aisha.khan@gmail.com", method: "UPI", methodDetail: "aisha.khan@oksbi", amount: 760, date: "2026-09-14T10:17:00", status: "success", merchant: "FreshCart Grocery", orderId: "ORD-87951" },
  { id: "TXN-40828", customer: "Nikhil Jain", email: "nikhil.jain@gmail.com", method: "Card", methodDetail: "RuPay ending 7812", amount: 11250, date: "2026-09-13T17:42:00", status: "success", merchant: "EduSpark Academy", orderId: "ORD-87923" },
  { id: "TXN-40827", customer: "Shreya Das", email: "shreya.das@yahoo.in", method: "Wallet", methodDetail: "PhonePe Wallet", amount: 299, date: "2026-09-13T09:55:00", status: "success", merchant: "Cinebox Plus", orderId: "ORD-87904" },
  { id: "TXN-40826", customer: "Yash Thakur", email: "yash.thakur@gmail.com", method: "UPI", methodDetail: "yash.t@ibl", amount: 3899, date: "2026-09-12T20:08:00", status: "failed", merchant: "PixelPoint Electronics", orderId: "ORD-87881", failureReason: "Daily UPI limit exceeded for this account" },
  { id: "TXN-40825", customer: "Lakshmi Krishnan", email: "lakshmi.k@gmail.com", method: "Net Banking", methodDetail: "Kotak Mahindra Bank", amount: 18400, date: "2026-09-12T14:36:00", status: "success", merchant: "SkyWays Travel", orderId: "ORD-87862" },
  { id: "TXN-40824", customer: "Aman Chopra", email: "aman.chopra@gmail.com", method: "Card", methodDetail: "Visa ending 0417", amount: 2799, date: "2026-09-11T18:21:00", status: "success", merchant: "Kinetic Fitness", orderId: "ORD-87840" },
  { id: "TXN-40823", customer: "Neha Bhatt", email: "neha.bhatt@outlook.com", method: "UPI", methodDetail: "neha.bhatt@okaxis", amount: 1320, date: "2026-09-10T12:49:00", status: "success", merchant: "FreshCart Grocery", orderId: "ORD-87806" },
  { id: "TXN-40822", customer: "Varun Sethi", email: "varun.sethi@gmail.com", method: "Card", methodDetail: "Mastercard ending 6158", amount: 47500, date: "2026-09-09T16:14:00", status: "success", merchant: "PixelPoint Electronics", orderId: "ORD-87771" },
  { id: "TXN-40821", customer: "Pallavi Mishra", email: "pallavi.mishra@gmail.com", method: "UPI", methodDetail: "pallavi.m@ybl", amount: 950, date: "2026-09-08T11:02:00", status: "failed", merchant: "BrewBox Coffee", orderId: "ORD-87742", failureReason: "Customer did not approve the UPI request in time" },
  { id: "TXN-40820", customer: "Gaurav Yadav", email: "gaurav.yadav@yahoo.in", method: "Net Banking", methodDetail: "HDFC Bank", amount: 6500, date: "2026-09-06T15:47:00", status: "success", merchant: "EduSpark Academy", orderId: "ORD-87698" },
  { id: "TXN-40819", customer: "Simran Kaur", email: "simran.kaur@gmail.com", method: "Wallet", methodDetail: "Paytm Wallet", amount: 849, date: "2026-09-04T19:33:00", status: "success", merchant: "Cinebox Plus", orderId: "ORD-87655" },
  { id: "TXN-40818", customer: "Rajat Dubey", email: "rajat.dubey@gmail.com", method: "Card", methodDetail: "Visa ending 3381", amount: 13200, date: "2026-09-02T13:26:00", status: "success", merchant: "UrbanNest Furniture", orderId: "ORD-87611" },
  { id: "TXN-40817", customer: "Fatima Sheikh", email: "fatima.sheikh@outlook.com", method: "UPI", methodDetail: "fatima.s@okicici", amount: 2460, date: "2026-08-29T17:58:00", status: "success", merchant: "Loom & Thread", orderId: "ORD-87548" },
  { id: "TXN-40816", customer: "Mohit Arora", email: "mohit.arora@gmail.com", method: "Card", methodDetail: "RuPay ending 4470", amount: 5600, date: "2026-08-26T10:41:00", status: "refunded", merchant: "Kinetic Fitness", orderId: "ORD-87490" },
  { id: "TXN-40815", customer: "Anjali Srivastava", email: "anjali.s@gmail.com", method: "Net Banking", methodDetail: "ICICI Bank", amount: 29900, date: "2026-08-22T14:15:00", status: "success", merchant: "SkyWays Travel", orderId: "ORD-87432" },
  { id: "TXN-40814", customer: "Kunal Shah", email: "kunal.shah@gmail.com", method: "UPI", methodDetail: "kunal.shah@paytm", amount: 1150, date: "2026-08-18T20:30:00", status: "success", merchant: "FreshCart Grocery", orderId: "ORD-87376" },
  { id: "TXN-40813", customer: "Deepika Rawat", email: "deepika.rawat@yahoo.in", method: "Card", methodDetail: "Mastercard ending 8826", amount: 8750, date: "2026-08-12T12:05:00", status: "failed", merchant: "PixelPoint Electronics", orderId: "ORD-87301", failureReason: "3-D Secure verification failed" },
];

 
export const summaryStats = [
  { key: "all", label: "Total transactions", count: 1284, amount: 4862310, change: 8.4, goodWhenUp: true },
  { key: "success", label: "Successful payments", count: 1106, amount: 4418920, change: 6.1, goodWhenUp: true },
  { key: "pending", label: "Pending payments", count: 74, amount: 231400, change: -3.2, goodWhenUp: false },
  { key: "failed", label: "Failed payments", count: 104, amount: 211990, change: 1.8, goodWhenUp: false },
];
 
export const activityData = [
  { date: "2026-09-04", label: "4 Sep", fullLabel: "Fri, 4 Sep", success: 146, pending: 9, failed: 15 },
  { date: "2026-09-05", label: "5 Sep", fullLabel: "Sat, 5 Sep", success: 124, pending: 8, failed: 13 },
  { date: "2026-09-06", label: "6 Sep", fullLabel: "Sun, 6 Sep", success: 112, pending: 6, failed: 10 },
  { date: "2026-09-07", label: "7 Sep", fullLabel: "Mon, 7 Sep", success: 138, pending: 7, failed: 12 },
  { date: "2026-09-08", label: "8 Sep", fullLabel: "Tue, 8 Sep", success: 156, pending: 11, failed: 14 },
  { date: "2026-09-09", label: "9 Sep", fullLabel: "Wed, 9 Sep", success: 160, pending: 10, failed: 17 },
  { date: "2026-09-10", label: "10 Sep", fullLabel: "Thu, 10 Sep", success: 149, pending: 9, failed: 13 },
  { date: "2026-09-11", label: "11 Sep", fullLabel: "Fri, 11 Sep", success: 152, pending: 8, failed: 14 },
  { date: "2026-09-12", label: "12 Sep", fullLabel: "Sat, 12 Sep", success: 138, pending: 9, failed: 12 },
  { date: "2026-09-13", label: "13 Sep", fullLabel: "Sun, 13 Sep", success: 121, pending: 7, failed: 11 },
  { date: "2026-09-14", label: "14 Sep", fullLabel: "Mon, 14 Sep", success: 164, pending: 12, failed: 17 },
  { date: "2026-09-15", label: "15 Sep", fullLabel: "Tue, 15 Sep", success: 171, pending: 10, failed: 16 },
  { date: "2026-09-16", label: "16 Sep", fullLabel: "Wed, 16 Sep", success: 185, pending: 13, failed: 18 },
  { date: "2026-09-17", label: "17 Sep", fullLabel: "Today, 17 Sep", success: 175, pending: 15, failed: 16 },
];
 
export const methodStats = [
  { name: "UPI", count: 745, share: 58, successRate: 87.6 },
  { name: "Card", count: 308, share: 24, successRate: 83.1 },
  { name: "Net Banking", count: 141, share: 11, successRate: 86.5 },
  { name: "Wallet", count: 90, share: 7, successRate: 84.4 },
];

export const notifications = [
  { id: 1, title: "UPI failure rate is above normal", message: "14% of UPI payments failed in the last hour. The usual rate is under 8%.", time: "12 min ago", unread: true },
  { id: 2, title: "Settlement completed", message: "₹12,48,300 was settled to 38 merchants.", time: "1 hr ago", unread: true },
  { id: 3, title: "New dispute opened", message: "A cardholder disputed TXN-40811 for ₹4,999.", time: "3 hrs ago", unread: false },
];
