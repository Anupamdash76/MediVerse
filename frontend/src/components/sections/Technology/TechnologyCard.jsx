export default function TechnologyCard({
  title,
  subtitle,
  description,
  badge,
  step,
}) {
  return (
    <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-400 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
      <div className="bg-white rounded-[22.5px] p-6 sm:p-7 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-700">
              {badge}
            </span>
            <span className="text-xs font-black text-slate-300 group-hover:text-blue-600 transition-colors">
              0{step}
            </span>
          </div>

          <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
            {subtitle}
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h3>

          <p className="mt-3 leading-relaxed text-xs sm:text-sm text-slate-600 font-normal">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}