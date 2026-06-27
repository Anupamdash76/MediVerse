export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,.45)]",

    secondary:
      "border border-white/10 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10",

    ghost:
      "text-slate-300 hover:text-white",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}