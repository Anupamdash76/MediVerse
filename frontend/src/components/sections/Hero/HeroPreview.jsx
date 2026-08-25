import { motion } from "framer-motion";

export default function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative max-w-md mx-auto"
    >
      <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-lg shadow-slate-200/50 space-y-6">
        {/* Header Label */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">Clinical Assessment Output</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Real-Time ML Model Inference</p>
          </div>

          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-700">
            Verified
          </span>
        </div>

        {/* Patient Query */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Patient Symptom Input:
          </span>
          <p className="text-sm font-medium text-slate-800 leading-relaxed italic">
            "High fever for 3 days with dry cough and mild shortness of breath"
          </p>
        </div>

        {/* Condition Match */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Matched Condition
            </span>
            <span className="text-xs font-extrabold text-blue-600">
              91.8% Diagnostic Match
            </span>
          </div>

          <h4 className="text-xl font-extrabold text-slate-900 leading-tight">
            Viral Respiratory Infection
          </h4>

          <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: "91.8%" }} />
          </div>
        </div>

        {/* Doctor Referral */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
          <span className="text-slate-600">
            Recommended Care: <strong className="text-slate-900 font-bold">General Physician</strong>
          </span>

          <span className="text-blue-600 font-bold">
            Live Preview
          </span>
        </div>
      </div>
    </motion.div>
  );
}