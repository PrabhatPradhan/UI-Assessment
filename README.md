# Paysetu – Payment Transactions Dashboard

A transactions dashboard for the operations team of an Indian payments platform.
Built with Next.js 14 (App Router), React 18, Tailwind CSS and plain CSS.
There is no backend: all data comes from `data/transactions.js`.

## How to run

```bash
npm install
npm run dev
```

Then open http://localhost:3000

To make a production build: `npm run build` and then `npm start`.

## Demo states

Add these to the URL to see the other states of the page:

| URL                              | What you see                          |
| -------------------------------- | ------------------------------------- |
| `http://localhost:3000`          | Normal page (loads in about 1 second) |
| `http://localhost:3000/?state=loading` | Loading skeletons (keeps loading) |
| `http://localhost:3000/?state=empty`   | "No transactions yet" empty state |
| `http://localhost:3000/?state=error`   | Error state with a Retry button   |

The "no results" empty state appears when you search for something that does not exist
(for example `xyz`).

## Folder structure

```
app/
  layout.js          Font (IBM Plex Sans) and page title
  page.js            The only page. All state lives here
  globals.css        Plain CSS: layout and all responsive rules
components/
  Sidebar.js         Navigation (full / icon rail / slide-in menu)
  Header.js          Title, search, notifications, user profile
  SummaryCards.js    Total / Successful / Pending / Failed cards
  ActivityChart.js   Stacked bar chart (7 or 14 days)
  PaymentMethods.js  UPI / Card / Net Banking / Wallet share
  Filters.js         Status tabs, method + date filters, Export CSV
  TransactionTable.js Table on bigger screens, card list on small screens
  Pagination.js      Page numbers and rows per page
  TransactionDrawer.js Details panel for the selected transaction
  StatusBadge.js, Avatar.js, MethodIcon.js     Small reusable pieces
  EmptyState.js, ErrorState.js, Skeleton.js    Page states
data/
  transactions.js    Sample transactions, summary numbers, chart data
utils/
  helpers.js         Formatting (₹, dates), fees, CSV export
```

## Styling: plain CSS vs Tailwind

- **Tailwind** is used for colours, spacing, typography, borders and hover states.
- **Plain CSS** (`app/globals.css`) is used for page layout and everything that changes
  between screen sizes.

One rule keeps the two from fighting: if an element changes its `display` at a breakpoint,
its `display` is written in `globals.css` only. That element never gets a Tailwind
display class like `flex` or `hidden`.

## Responsive behaviour

| Screen width     | What changes |
| ---------------- | ------------ |
| 1280px and above | Full sidebar, 4 summary cards in a row, chart next to payment methods, full table with all columns |
| 1025px – 1279px  | Payment method column hidden, filters move above the status tabs, header description hidden |
| 641px – 1024px   | Sidebar becomes an icon rail, cards in a 2×2 grid, chart and payment methods stacked, customer avatars hidden in the table, Previous/Next buttons show only arrows |
| 641px – 767px    | Table is replaced by a card list, rows-per-page selector hidden |
| 640px and below  | Hamburger menu with slide-in sidebar, search opens from an icon, compact summary cards, filters and Export CSV behind a "Filters" button, pagination shows "Page X of Y", details drawer opens as a full-screen sheet |

The page was checked at every width from 320px to 1600px and never scrolls sideways.

## Small things worth knowing

- Press `/` to jump to the search box. Press `Esc` to close the drawer or the notifications.
- Click a summary card to filter the table by that status.
- In the details drawer, use the arrows to move to the previous or next transaction.
- Dates are formatted by reading the date string directly (not with `new Date()`),
  so the server and the browser always show the same text.
- "Today" in the sample data is fixed to 17 Sep 2026 (see `TODAY` in `data/transactions.js`).
