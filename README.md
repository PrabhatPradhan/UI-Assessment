# Paysetu – Payments Dashboard

Paysetu is a payments dashboard made for an Indian payment platform.

Built using **Next.js 14, React 18, Tailwind CSS and CSS**.

There is no backend in this project. All the demo data is stored inside the `data/` folder.

## How to Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

For production:

```bash
npm run build
npm start
```

## Pages

* **Overview** – Payment summary and recent activity
* **Transactions** – Transactions list, filters and details
* **Payouts** – Payout history and details
* **Refunds** – Refund list and details
* **Disputes** – Dispute cases and evidence
* **Customers** – Customer list and activity
* **Reports** – Reports and downloads
* **Settings** – Business, team, payment and API settings
* **Help** – FAQ and support section

## Features

* Responsive design
* Search and filters
* Pagination
* Transaction details drawer
* Export data as CSV
* Loading, empty and error states
* Responsive sidebar
* Settings switches
* Dispute evidence checklist

## Tech Stack

* Next.js 14
* React 18
* Tailwind CSS
* Plain CSS
* JavaScript

## Folder Structure

```text
app/          → Pages
components/   → Reusable components
data/         → Demo data
utils/        → Helper functions
```

This is a frontend-only dashboard project using local sample data.
