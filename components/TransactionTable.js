import { ChevronRight } from "lucide-react";
import Avatar from "./Avatar";
import MethodIcon from "./MethodIcon";
import StatusBadge from "./StatusBadge";
import { formatAmount, formatDate, formatShortDate, formatTime } from "../utils/helpers";

export default function TransactionTable({ transactions, selectedId, onSelect }) {
  
  function handleRowKeyDown(event, transaction) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(transaction);
    }
  }

  return (
    <>
      {/* Desktop + tablet: table */}
      <div className="table-wrap">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs text-gray-500">
              <th scope="col" className="whitespace-nowrap px-4 py-2.5 font-medium">Transaction ID</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Customer</th>
              <th scope="col" className="col-method whitespace-nowrap px-4 py-2.5 font-medium">Payment method</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">Amount</th>
              <th scope="col" className="whitespace-nowrap px-4 py-2.5 font-medium">Date &amp; time</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
              <th scope="col" className="col-arrow w-10 px-2 py-2.5">
                <span className="sr-only">Open</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((txn) => {
              const isSelected = txn.id === selectedId;

              return (
                <tr
                  key={txn.id}
                  tabIndex={0}
                  onClick={() => onSelect(txn)}
                  onKeyDown={(event) => handleRowKeyDown(event, txn)}
                  aria-selected={isSelected}
                  className={`group cursor-pointer whitespace-nowrap border-b border-gray-100 last:border-b-0 ${
                    isSelected ? "bg-brand-50" : "hover:bg-gray-50"
                  }`}
                >
                  <td
                    className={`px-4 py-3 font-medium tabular-nums text-gray-900 ${
                      isSelected ? "shadow-[inset_2px_0_0_0_#3358D4]" : ""
                    }`}
                  >
                    {txn.id}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="table-avatar">
                        <Avatar name={txn.customer} />
                      </span>
                      <div className="min-w-0 max-w-[200px]">
                        <p className="truncate font-medium text-gray-900">{txn.customer}</p>
                        <p className="truncate text-xs text-gray-500">{txn.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="col-method px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500">
                        <MethodIcon method={txn.method} size={15} />
                      </span>
                      <div className="min-w-0 max-w-[180px]">
                        <p className="text-gray-900">{txn.method}</p>
                        <p className="truncate text-xs text-gray-500">{txn.methodDetail}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right font-medium tabular-nums text-gray-900">
                    {formatAmount(txn.amount)}
                  </td>

                  <td className="px-4 py-3">
                    <p className="text-gray-900">{formatDate(txn.date)}</p>
                    <p className="text-xs tabular-nums text-gray-500">{formatTime(txn.date)}</p>
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={txn.status} />
                  </td>

                  <td className="col-arrow px-2 py-3 text-gray-300 group-hover:text-gray-500">
                    <ChevronRight size={16} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: simple list */}
      <ul className="txn-list divide-y divide-gray-100">
        {transactions.map((txn) => {
          const isSelected = txn.id === selectedId;

          return (
            <li key={txn.id}>
              <button
                type="button"
                onClick={() => onSelect(txn)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left ${
                  isSelected ? "bg-brand-50" : "active:bg-gray-50"
                }`}
              >
                <Avatar name={txn.customer} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-medium text-gray-900">{txn.customer}</p>
                    <p className="shrink-0 text-sm font-medium tabular-nums text-gray-900">{formatAmount(txn.amount)}</p>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <p className="flex min-w-0 gap-2 text-xs text-gray-500">
                      <span className="shrink-0 tabular-nums">{txn.id}</span>
                      <span className="truncate">
                        {formatShortDate(txn.date)}, {formatTime(txn.date)}
                      </span>
                    </p>
                    <StatusBadge status={txn.status} />
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
