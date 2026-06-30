import { motion } from "framer-motion";

export default function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur
      "
    >
      <div className="text-blue-400">
        {icon}
      </div>

      <h3 className="mt-6 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}