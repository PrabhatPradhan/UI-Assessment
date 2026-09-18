# Paysetu – Payments Dashboard

A full dashboard for the operations team of an Indian payments platform.
Built with Next.js 14 (App Router), React 18, Tailwind CSS and plain CSS.
There is no backend: all data comes from the files in `data/`.

## How to run

```bash
npm install
npm run dev
```

Then open http://localhost:3000

To make a production build: `npm run build` and then `npm start`.

## Pages

Every item in the sidebar opens a real page.

| Page | Address | What is on it |
| ---- | ------- | ------------- |
| Overview | `/` | KPI cards, activity chart, payment method share, recent payments, next payout, a "needs your attention" list and top customers |
| Transactions | `/transactions` | Summary cards, chart, filters, table with pagination and a details drawer |
| Payouts | `/payouts` | Payout stats, last 7 payouts chart, bank account, payout history with tabs, drawer with the gross → fees → GST → refunds → net breakdown, UTR and timeline |
| Refunds | `/refunds` | Refund stats, reasons breakdown, speed guide, refunds table, drawer with the original payment, customer and timeline |
| Disputes | `/disputes` | Open cases, amount at risk, win rate, due dates with a countdown, drawer with a tickable evidence checklist and timeline |
| Customers | `/customers` | Customer stats, sorting, tabs, table, drawer with summary, contact details, a 6 month activity chart and recent payments |
| Reports | `/reports` | Date range and format pickers, six downloadable reports, month by month table, scheduled reports and recent downloads |
| Settings | `/settings` | Five tabs: business profile, team members, payment methods with on/off switches, notification preferences, API keys and webhooks |
| Help | `/help` | Help search, support channels, FAQ accordion with categories, system status, your tickets and step by step guides |

## Demo states (Transactions page)

| URL | What you see |
| --- | ------------ |
| `/transactions` | Normal page (loads in about 1 second) |
| `/transactions?state=loading` | Loading skeletons |
| `/transactions?state=empty` | "No transactions yet" empty state |
| `/transactions?state=error` | Error state with a Retry button |

The "no results" empty state appears on every list page when a search matches nothing.

## Folder structure

```
app/
  layout.js            Font (IBM Plex Sans) and page title
  globals.css          Plain CSS: layout and all responsive rules
  page.js              Overview
  transactions/page.js Payments list
  payouts/page.js      Settlements to your bank
  refunds/page.js      Money returned to customers
  disputes/page.js     Chargebacks
  customers/page.js    Customer list
  reports/page.js      Downloadable reports
  settings/page.js     Business, team, methods, notifications, developers
  help/page.js         Help centre
components/
  AppShell.js          Sidebar + header wrapper used by every page
  Sidebar.js           Navigation (full / icon rail / slide-in menu)
  Header.js            Title, search, notifications, profile
  StatCard.js          One number with a label
  Badge.js             Small coloured label
  Tabs.js              Row of tabs with counts
  SideDrawer.js        Slide-in panel (full screen sheet on mobile)
  CopyButton.js        Copy to clipboard with a tick
  SummaryCards.js, ActivityChart.js, PaymentMethods.js
  Filters.js, TransactionTable.js, Pagination.js, TransactionDrawer.js
  StatusBadge.js, Avatar.js, MethodIcon.js
  EmptyState.js, ErrorState.js, Skeleton.js
data/
  transactions.js, payouts.js, refunds.js, disputes.js,
  customers.js, reports.js, settings.js, help.js
utils/
  helpers.js           Formatting (₹, dates), fees, date maths, CSV export
```

## Styling: plain CSS vs Tailwind

- **Tailwind** is used for colours, spacing, typography, borders and hover states.
- **Plain CSS** (`app/globals.css`) is used for page layout and everything that changes
  between screen sizes.

One rule keeps the two from fighting: if an element changes its `display` at a breakpoint,
its `display` is written in `globals.css` only. That element never gets a Tailwind
display class like `flex` or `hidden`.

Two helper classes keep every table responsive without writing new media queries:

- `col-optional` – the column disappears below 1280px
- `col-secondary` – the column disappears below 1025px

## Responsive behaviour

| Screen width | What changes |
| ------------ | ------------ |
| 1280px and above | Full sidebar, 4 summary cards in a row, two column page grids, full tables |
| 1025px – 1279px | `col-optional` columns are hidden, filters move above the status tabs, the header description is hidden |
| 641px – 1024px | Sidebar becomes an icon rail, cards go 2×2, page grids become one column, `col-secondary` columns and table avatars are hidden, Previous/Next show only arrows |
| 641px – 767px | Tables are replaced by card lists, the rows-per-page selector is hidden |
| 640px and below | Hamburger menu with a slide-in sidebar, search opens from an icon, compact cards, filters and Export behind a "Filters" button, pagination shows "Page X of Y", drawers open as full screen sheets |

Every page was checked at every width from 320px to 1600px and never scrolls sideways.

## Small things worth knowing

- Press `/` to jump to the search box. Press `Esc` to close a drawer or the notifications.
- On the Transactions page, clicking a summary card filters the table by that status.
- Export buttons really download a CSV file built from the data on screen.
- The evidence checklist on a dispute and the switches in Settings keep your changes while the page is open.
- Dates are formatted by reading the date string directly (not with `new Date()`),
  so the server and the browser always show the same text.
- "Today" in the sample data is fixed to 17 Sep 2026 (see `TODAY` in `data/transactions.js`).
