// People who have paid through Paysetu at least once.
// "status" is our own label: new, active, or at_risk (many failed payments).

export const customers = [
  { id: "CUS-7101", name: "Aarav Sharma", email: "aarav.sharma@gmail.com", phone: "+91 98110 22841", city: "New Delhi", joinedOn: "2025-11-04", payments: 34, totalSpent: 184500, successRate: 97, failedPayments: 1, lastPaymentOn: "2026-09-17T14:32:00", preferredMethod: "UPI", status: "active" },
  { id: "CUS-7098", name: "Priya Nair", email: "priya.nair@outlook.com", phone: "+91 98450 71223", city: "Bengaluru", joinedOn: "2025-08-19", payments: 51, totalSpent: 421900, successRate: 94, failedPayments: 3, lastPaymentOn: "2026-09-17T14:18:00", preferredMethod: "Card", status: "active" },
  { id: "CUS-7092", name: "Rohan Mehta", email: "rohan.mehta@yahoo.in", phone: "+91 99201 45870", city: "Mumbai", joinedOn: "2026-02-11", payments: 12, totalSpent: 28640, successRate: 67, failedPayments: 4, lastPaymentOn: "2026-09-17T13:55:00", preferredMethod: "UPI", status: "at_risk" },
  { id: "CUS-7089", name: "Sneha Iyer", email: "sneha.iyer@gmail.com", phone: "+91 98404 33019", city: "Chennai", joinedOn: "2025-06-27", payments: 63, totalSpent: 612400, successRate: 98, failedPayments: 1, lastPaymentOn: "2026-09-17T13:40:00", preferredMethod: "Net Banking", status: "active" },
  { id: "CUS-7085", name: "Kabir Singh", email: "kabir.singh@gmail.com", phone: "+91 98730 66412", city: "Chandigarh", joinedOn: "2026-01-08", payments: 19, totalSpent: 46800, successRate: 95, failedPayments: 1, lastPaymentOn: "2026-09-17T12:57:00", preferredMethod: "Wallet", status: "active" },
  { id: "CUS-7081", name: "Ananya Gupta", email: "ananya.g@protonmail.com", phone: "+91 90045 78123", city: "Pune", joinedOn: "2025-09-30", payments: 41, totalSpent: 298700, successRate: 96, failedPayments: 2, lastPaymentOn: "2026-09-17T12:31:00", preferredMethod: "Card", status: "active" },
  { id: "CUS-7077", name: "Vikram Reddy", email: "vikram.reddy@gmail.com", phone: "+91 99490 21764", city: "Hyderabad", joinedOn: "2026-08-24", payments: 4, totalSpent: 32400, successRate: 75, failedPayments: 1, lastPaymentOn: "2026-09-17T11:48:00", preferredMethod: "UPI", status: "new" },
  { id: "CUS-7073", name: "Meera Joshi", email: "meera.joshi@rediffmail.com", phone: "+91 98220 90117", city: "Nagpur", joinedOn: "2025-12-14", payments: 23, totalSpent: 71250, successRate: 83, failedPayments: 4, lastPaymentOn: "2026-09-17T11:05:00", preferredMethod: "Card", status: "at_risk" },
  { id: "CUS-7070", name: "Arjun Patel", email: "arjun.patel@gmail.com", phone: "+91 98250 41188", city: "Ahmedabad", joinedOn: "2025-07-16", payments: 58, totalSpent: 143900, successRate: 99, failedPayments: 0, lastPaymentOn: "2026-09-17T10:22:00", preferredMethod: "UPI", status: "active" },
  { id: "CUS-7066", name: "Ishita Banerjee", email: "ishita.banerjee@gmail.com", phone: "+91 98300 55902", city: "Kolkata", joinedOn: "2025-10-02", payments: 37, totalSpent: 389200, successRate: 97, failedPayments: 1, lastPaymentOn: "2026-09-17T09:47:00", preferredMethod: "Net Banking", status: "active" },
  { id: "CUS-7062", name: "Dev Malhotra", email: "dev.malhotra@icloud.com", phone: "+91 98105 77433", city: "Gurugram", joinedOn: "2026-03-21", payments: 9, totalSpent: 54200, successRate: 89, failedPayments: 1, lastPaymentOn: "2026-09-16T21:14:00", preferredMethod: "Card", status: "active" },
  { id: "CUS-7058", name: "Nisha Verma", email: "nisha.verma@gmail.com", phone: "+91 94150 30288", city: "Lucknow", joinedOn: "2026-09-02", payments: 3, totalSpent: 5450, successRate: 100, failedPayments: 0, lastPaymentOn: "2026-09-16T19:36:00", preferredMethod: "UPI", status: "new" },
  { id: "CUS-7054", name: "Rahul Kapoor", email: "rahul.kapoor@gmail.com", phone: "+91 98111 60027", city: "New Delhi", joinedOn: "2025-05-11", payments: 72, totalSpent: 218600, successRate: 96, failedPayments: 3, lastPaymentOn: "2026-09-16T18:02:00", preferredMethod: "Wallet", status: "active" },
  { id: "CUS-7049", name: "Tanya Sethi", email: "tanya.sethi@gmail.com", phone: "+91 99710 84356", city: "Noida", joinedOn: "2025-08-05", payments: 46, totalSpent: 267300, successRate: 93, failedPayments: 3, lastPaymentOn: "2026-09-15T16:40:00", preferredMethod: "UPI", status: "active" },
  { id: "CUS-7044", name: "Rohit Saxena", email: "rohit.saxena@gmail.com", phone: "+91 97170 22908", city: "Jaipur", joinedOn: "2026-04-18", payments: 11, totalSpent: 88900, successRate: 91, failedPayments: 1, lastPaymentOn: "2026-09-17T12:10:00", preferredMethod: "Net Banking", status: "active" },
  { id: "CUS-7040", name: "Neha Pillai", email: "neha.pillai@outlook.com", phone: "+91 90350 61294", city: "Kochi", joinedOn: "2026-06-09", payments: 7, totalSpent: 41300, successRate: 86, failedPayments: 1, lastPaymentOn: "2026-09-17T09:02:00", preferredMethod: "Card", status: "active" },
  { id: "CUS-7036", name: "Farhan Qureshi", email: "farhan.q@gmail.com", phone: "+91 98690 17755", city: "Mumbai", joinedOn: "2025-12-29", payments: 26, totalSpent: 96400, successRate: 92, failedPayments: 2, lastPaymentOn: "2026-09-14T18:30:00", preferredMethod: "UPI", status: "active" },
  { id: "CUS-7031", name: "Simran Kaur", email: "simran.kaur@gmail.com", phone: "+91 98764 30021", city: "Amritsar", joinedOn: "2026-09-09", payments: 2, totalSpent: 2398, successRate: 50, failedPayments: 1, lastPaymentOn: "2026-09-13T20:15:00", preferredMethod: "Wallet", status: "new" },
];

// how many payments each customer made in the last 6 months,
// used for the small chart inside the customer panel
export const customerActivity = [
  { label: "Apr", count: 4 },
  { label: "May", count: 6 },
  { label: "Jun", count: 5 },
  { label: "Jul", count: 8 },
  { label: "Aug", count: 7 },
  { label: "Sep", count: 6 },
];
