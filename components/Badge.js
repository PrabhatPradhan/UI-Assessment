// A small coloured label. "tone" decides the colour.
const tones = {
  green: { box: "bg-emerald-50 text-emerald-700 ring-emerald-600/20", dot: "bg-emerald-500" },
  amber: { box: "bg-amber-50 text-amber-800 ring-amber-600/25", dot: "bg-amber-500" },
  red: { box: "bg-red-50 text-red-700 ring-red-600/20", dot: "bg-red-500" },
  gray: { box: "bg-gray-100 text-gray-700 ring-gray-500/20", dot: "bg-gray-400" },
  blue: { box: "bg-brand-50 text-brand-700 ring-brand-500/20", dot: "bg-brand-500" },
};

export default function Badge({ label, tone = "gray", withDot = true }) {
  const style = tones[tone] || tones.gray;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${style.box}`}
    >
      {withDot && <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />}
      {label}
    </span>
  );
}
