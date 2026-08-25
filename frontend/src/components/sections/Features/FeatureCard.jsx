import { motion } from "framer-motion";
import { MessageSquareText, Cpu, Stethoscope, FileCheck } from "lucide-react";

export default function FeatureCard({
  stepNumber,
  icon,
  title,
  subtitle,
  description,
  color = "bg-blue-50 text-blue-600 border-blue-100",
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] hover:border-blue-300 transition-all group"
    >
      <div>
        {/* Step Pill */}
        <div className="flex items-center justify-between mb-6">
          <div className={`flex h-13 w-13 items-center justify-center rounded-2xl border ${color} group-hover:scale-105 transition-transform`}>
            {icon}
          </div>
          <span className="font-extrabold text-2xl text-slate-200 group-hover:text-blue-200 transition-colors">
            {stepNumber}
          </span>
        </div>

        <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600 block mb-1">
          {subtitle}
        </span>
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {title}
        </h3>

        <p className="mt-3 text-xs leading-relaxed text-slate-600 font-normal">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
        <span>Step {stepNumber} of 04</span>
        <span>→</span>
      </div>
    </motion.div>
  );
}