const severityConfig = {
  low: {
    label: "Low",
    className:
      "border-green-500/20 bg-green-500/10 text-green-400",
  },

  medium: {
    label: "Medium",
    className:
      "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
  },

  high: {
    label: "High",
    className:
      "border-red-500/20 bg-red-500/10 text-red-400",
  },

  unknown: {
    label: "Information Pending",
    className:
      "border-slate-500/20 bg-slate-500/10 text-slate-300",
  },
};

export default function SeverityBadge({
  severity = "",
}) {
  const key =
    severity.trim().toLowerCase() || "unknown";

  const config =
    severityConfig[key] ??
    severityConfig.unknown;

  return (
    <span
      className={`
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-semibold
        tracking-wide
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
}