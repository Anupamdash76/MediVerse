export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs rounded-xl",
    md: "px-5 py-2.5 text-sm rounded-xl",
    lg: "px-6 py-3.5 text-base rounded-2xl",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30",

    secondary:
      "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-xs",

    outline:
      "border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50/60 font-bold",

    ghost:
      "text-slate-600 hover:text-blue-600 hover:bg-blue-50/50",
      
    pill:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-sm rounded-full",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}