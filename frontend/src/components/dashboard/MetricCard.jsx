export default function MetricCard({

  title,

  value,

  subtitle,

  icon,

  color = "blue",

}) {

  const gradients = {

    blue: "from-blue-500 to-cyan-500",

    green: "from-green-500 to-emerald-500",

    orange: "from-orange-500 to-yellow-500",

    purple: "from-purple-500 to-pink-500",

  };

  return (

    <div
      className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >

      {/* Gradient Glow */}

      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradients[color]}`}
      />

      <div className="flex items-center justify-between gap-3">

        <div className="min-w-0 flex-1">

          <p className="text-xs sm:text-sm font-medium text-slate-500 truncate">

            {title}

          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 truncate">

            {value}

          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-400 truncate">

            {subtitle}

          </p>

        </div>

        <div
          className={`flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r ${gradients[color]} text-white text-xl sm:text-3xl shadow-lg`}
        >

          {icon}

        </div>

      </div>

    </div>

  );

}