import MethodIcon from "./MethodIcon";
import Skeleton from "./Skeleton";
import { formatCount } from "../utils/helpers";

export default function PaymentMethods({ methods, isLoading }) {
  return (
    <section className="panel-card rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-gray-900">Payment methods</h2>
      <p className="mt-1 text-xs text-gray-500">Share of transactions in the last 7 days</p>

      {isLoading ? (
        <div className="methods-list mt-5">
          {methods.map((method) => (
            <div key={method.name}>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-1.5 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <ul className="methods-list mt-5">
          {methods.map((method) => {
            const lowSuccess = method.successRate < 85;

            return (
              <li key={method.name}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-gray-700">
                    <MethodIcon method={method.name} className="text-gray-400" />
                    {method.name}
                  </span>
                  <span className="font-medium tabular-nums text-gray-900">{method.share}%</span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${method.share}%` }} />
                </div>

                <div className="mt-1.5 flex justify-between gap-3 text-xs tabular-nums text-gray-500">
                  <span>{formatCount(method.count)} transactions</span>
                  <span className={lowSuccess ? "font-medium text-amber-700" : ""}>
                    {method.successRate}% success
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
