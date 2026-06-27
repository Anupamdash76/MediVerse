import { motion } from "framer-motion";

import {
  Brain,
  CheckCircle2,
  Sparkles,
  Search,
  Database,
  Cpu,
} from "lucide-react";

import GlassCard from "../../common/GlassCard";

const pipeline = [
  {
    icon: Brain,
    title: "Natural Language Parsing",
  },
  {
    icon: Search,
    title: "Semantic Matching",
  },
  {
    icon: Database,
    title: "Feature Engineering",
  },
  {
    icon: Cpu,
    title: "XGBoost Prediction",
  },
];

export default function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.4,
      }}
    >
      <GlassCard className="relative overflow-hidden p-8">

        {/* Background Glow */}

        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Header */}

        <div className="relative flex items-center gap-4">

          <div className="rounded-2xl bg-blue-500/10 p-4">

            <Brain
              size={28}
              className="text-blue-400"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              AI Analysis

            </h2>

            <p className="text-sm text-slate-400">

              Real-time prediction workflow

            </p>

          </div>

        </div>

        {/* Pipeline */}

        <div className="mt-10 space-y-5">

          {pipeline.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.6 + index * 0.15,
                }}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-4
                "
              >
                <div className="flex items-center gap-4">

                  <Icon
                    size={20}
                    className="text-blue-400"
                  />

                  <span className="text-slate-200">

                    {step.title}

                  </span>

                </div>

                <CheckCircle2
                  size={20}
                  className="text-green-400"
                />

              </motion.div>
            );
          })}

        </div>

        {/* Status */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.3,
          }}
          className="
            mt-8
            rounded-2xl
            border
            border-green-500/20
            bg-green-500/10
            p-5
          "
        >
          <div className="flex items-center gap-3">

            <Sparkles
              size={22}
              className="text-green-400"
            />

            <div>

              <h3 className="font-semibold">

                Analysis Ready

              </h3>

              <p className="text-sm text-slate-400">

                NLP pipeline initialized successfully

              </p>

            </div>

          </div>
        </motion.div>

        {/* Bottom Stats */}

        <div className="mt-8 grid grid-cols-2 gap-5">

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-5
            "
          >
            <h3 className="text-3xl font-bold">

              41

            </h3>

            <p className="mt-2 text-slate-400">

              Diseases Supported

            </p>

          </div>

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-5
            "
          >
            <h3 className="text-3xl font-bold">

              132

            </h3>

            <p className="mt-2 text-slate-400">

              Symptoms Tracked

            </p>

          </div>

        </div>

      </GlassCard>
    </motion.div>
  );
}