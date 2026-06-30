export default function SeverityBadge({
  severity = "Unknown",
}) {
  const colors = {
    High: "bg-red-100 text-red-700 border-red-200",
    Moderate:
      "bg-amber-100 text-amber-700 border-amber-200",
    Low: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-semibold
        ${
          colors[severity] ||
          "bg-slate-100 text-slate-600 border-slate-200"
        }
      `}
    >
      {severity}
    </span>
  );
}