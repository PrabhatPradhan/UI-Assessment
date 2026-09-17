"use client";

import { useState } from "react";
import Skeleton from "./Skeleton";
import { formatCount } from "../utils/helpers";

const ranges = [7, 14];

function LegendItem({ colorClass, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-sm ${colorClass}`} />
      {label}
    </span>
  );
}

function TooltipRow({ colorClass, label, value }) {
  return (
    <div className="mt-1 flex items-center justify-between gap-4">
      <span className="flex items-center gap-1.5 text-gray-300">
        <span className={`h-2 w-2 rounded-sm ${colorClass}`} />
        {label}
      </span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

export default function ActivityChart({ data, isLoading }) {
  const [range, setRange] = useState(7);
  const [hoverIndex, setHoverIndex] = useState(null);

  const days = data.slice(-range);

  // work out totals and the top of the chart
  let totalInRange = 0;
  let biggestDay = 0;
  days.forEach((day) => {
    const dayTotal = day.success + day.pending + day.failed;
    totalInRange += dayTotal;
    if (dayTotal > biggestDay) biggestDay = dayTotal;
  });

  const chartMax = Math.ceil(biggestDay / 50) * 50;
  const ticks = [];
  for (let i = 5; i >= 0; i--) {
    ticks.push((chartMax / 5) * i);
  }

  function changeRange(value) {
    setRange(value);
    setHoverIndex(null);
  }

  return (
    <section className="panel-card rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Transaction activity</h2>
          {isLoading ? (
            <Skeleton className="mt-2 h-7 w-44" />
          ) : (
            <p className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-semibold tabular-nums tracking-tight text-gray-900">
                {formatCount(totalInRange)}
              </span>
              <span className="text-sm text-gray-500">transactions in {range} days</span>
            </p>
          )}
        </div>

        <div className="flex rounded-md border border-gray-200 p-0.5" role="group" aria-label="Chart range">
          {ranges.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => changeRange(value)}
              aria-pressed={range === value}
              className={`h-7 rounded px-2.5 text-xs font-medium ${
                range === value ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {value} days
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
        <LegendItem colorClass="bg-emerald-500" label="Successful" />
        <LegendItem colorClass="bg-amber-400" label="Pending" />
        <LegendItem colorClass="bg-red-400" label="Failed" />
      </div>

      {isLoading ? (
        <Skeleton className="mt-5 h-[232px] w-full" />
      ) : (
        <div className="mt-5">
          {/* chart area */}
          <div className="relative h-52">
            {/* grid lines + y axis numbers */}
            {ticks.map((tick) => (
              <div
                key={tick}
                className={`absolute left-9 right-0 border-t ${tick === 0 ? "border-gray-200" : "border-dashed border-gray-100"}`}
                style={{ bottom: `${(tick / chartMax) * 100}%` }}
              >
                <span className="absolute -left-9 w-7 -translate-y-1/2 text-right text-[11px] tabular-nums text-gray-400">
                  {tick}
                </span>
              </div>
            ))}

            {/* bars */}
            <div className="absolute bottom-0 left-9 right-0 top-0 flex items-end gap-1.5">
              {days.map((day, index) => {
                const dayTotal = day.success + day.pending + day.failed;
                const barHeight = (dayTotal / chartMax) * 100;
                const isHovered = hoverIndex === index;
                const isDimmed = hoverIndex !== null && !isHovered;

                // tooltip opens on the right of bars in the first half, on the left for the rest
                const tooltipPosition = index < Math.floor(days.length / 2) ? "left-full ml-2" : "right-full mr-2";

                return (
                  <div
                    key={day.date}
                    className="relative flex h-full min-w-0 flex-1 cursor-default items-end justify-center"
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onClick={() => setHoverIndex(index)}
                  >
                    <div
                      className={`flex w-full max-w-[32px] flex-col gap-px overflow-hidden rounded-t-sm transition-opacity ${
                        isDimmed ? "opacity-40" : ""
                      }`}
                      style={{ height: `${barHeight}%` }}
                    >
                      <div className="bg-red-400" style={{ height: `${(day.failed / dayTotal) * 100}%` }} />
                      <div className="bg-amber-400" style={{ height: `${(day.pending / dayTotal) * 100}%` }} />
                      <div className="flex-1 bg-emerald-500" />
                    </div>

                    {isHovered && (
                      <div
                        className={`pointer-events-none absolute top-0 z-10 w-36 rounded-md bg-gray-900 px-3 py-2 text-xs text-white shadow-lg ${tooltipPosition}`}
                      >
                        <p className="font-medium">{day.fullLabel}</p>
                        <TooltipRow colorClass="bg-emerald-400" label="Successful" value={day.success} />
                        <TooltipRow colorClass="bg-amber-400" label="Pending" value={day.pending} />
                        <TooltipRow colorClass="bg-red-400" label="Failed" value={day.failed} />
                        <div className="mt-1.5 flex justify-between border-t border-white/15 pt-1.5 font-medium">
                          <span>Total</span>
                          <span className="tabular-nums">{dayTotal}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* x axis labels */}
          <div className="mt-2 flex gap-1.5 pl-9">
            {days.map((day, index) => {
              // on small screens with 14 days, show every second label (always keep the latest day)
              const hideOnMobile = range === 14 && (days.length - 1 - index) % 2 === 1;

              return (
                <span key={day.date} className="relative h-4 min-w-0 flex-1">
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] ${
                      hoverIndex === index ? "font-medium text-gray-900" : "text-gray-500"
                    } ${hideOnMobile ? "chart-label-odd" : ""}`}
                  >
                    {day.label}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
