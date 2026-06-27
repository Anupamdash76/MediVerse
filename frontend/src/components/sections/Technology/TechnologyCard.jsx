import GlassCard from "../../common/GlassCard";

export default function TechnologyCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <GlassCard
      className="
      h-full
      p-8
      transition-all
      duration-300

      hover:-translate-y-2
      hover:border-blue-500/30
      hover:bg-white/8
      "
    >
      <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4">

        <Icon
          className="text-blue-400"
          size={30}
        />

      </div>

      <h3 className="text-xl font-bold">

        {title}

      </h3>

      <p className="mt-4 leading-7 text-slate-400">

        {description}

      </p>
    </GlassCard>
  );
}