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

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">

            {title}

          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">

            {value}

          </h2>

          <p className="mt-3 text-sm text-slate-400">

            {subtitle}

          </p>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${gradients[color]} text-white text-3xl shadow-lg`}
        >

          {icon}

        </div>

      </div>

    </div>

  );

}