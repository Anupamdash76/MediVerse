export default function GlassCard({
  children,
  className = "",
  hover = true,
}) {
  return (
    <div
      className={`
      rounded-3xl
      border
      border-slate-100/90
      bg-white/90
      backdrop-blur-md
      shadow-[0_10px_35px_rgba(0,0,0,0.03)]
      ${hover ? "hover:shadow-[0_20px_45px_rgba(37,99,235,0.08)] hover:-translate-y-0.5" : ""}
      transition-all
      duration-300
      ${className}
      `}
    >
      {children}
    </div>
  );
}