import { getInitials } from "../utils/helpers";

export default function Avatar({ name, size = "md" }) {
  const sizeClass = size === "lg" ? "h-10 w-10 text-sm" : "h-8 w-8 text-xs";

  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-600 ${sizeClass}`}>
      {getInitials(name)}
    </span>
  );
}
