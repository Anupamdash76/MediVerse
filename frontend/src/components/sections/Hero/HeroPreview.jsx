import { motion } from "framer-motion";

import {
  Brain,
  CheckCircle2,
  Sparkles,
  Activity,
  Database,
} from "lucide-react";

import GlassCard from "../../common/GlassCard";

const steps = [
  "Natural Language Parsing",
  "Semantic Matching",
  "Feature Engineering",
  "XGBoost Prediction",
];

export default function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
      }}
    >
      <GlassCard className="relative overflow-hidden p-8">

        {/* Top Glow */}

        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Header */}

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-500/15 p-3">

            <Brain className="text-blue-400" size={24} />

          </div>

          <div>

            <h3 className="text-xl font-bold">

              AI Analysis

            </h3>

            <p className="text-sm text-slate-400">

              Processing health information

            </p>

          </div>

        </div>

        {/* Divider */}

        <div className="my-8 h-px bg-white/10" />

        {/* Steps */}

        <div className="space-y-5">

          {steps.map((step, index) => (

            <motion.div
              key={step}
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.6 + index * 0.2,
              }}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-5 py-4"
            >

              <span className="text-slate-200">

                {step}

              </span>

              <CheckCircle2
                size={20}
                className="text-green-400"
              />

            </motion.div>

          ))}

        </div>

        {/* Divider */}

        <div className="my-8 h-px bg-white/10" />

        {/* Status */}

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

          <div className="flex items-center gap-3">

            <Sparkles
              className="text-green-400"
              size={22}
            />

            <div>

              <h4 className="font-semibold">

                Diagnosis Ready

              </h4>

              <p className="text-sm text-slate-400">

                AI pipeline completed successfully

              </p>

            </div>

          </div>

        </div>

        {/* Bottom Stats */}

        <div className="mt-8 grid grid-cols-2 gap-5">

          <div className="rounded-xl border border-white/5 bg-white/5 p-5">

            <Activity
              className="mb-3 text-blue-400"
              size={22}
            />

            <h2 className="text-3xl font-bold">

              41

            </h2>

            <p className="text-slate-400">

              Diseases

            </p>

          </div>

          <div className="rounded-xl border border-white/5 bg-white/5 p-5">

            <Database
              className="mb-3 text-cyan-400"
              size={22}
            />

            <h2 className="text-3xl font-bold">

              132

            </h2>

            <p className="text-slate-400">

              Symptoms

            </p>

          </div>

        </div>

      </GlassCard>
    </motion.div>
  );
}