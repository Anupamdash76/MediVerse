import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import Button from "../../common/Button";

const stats = [
  {
    value: "41",
    label: "Diseases",
  },
  {
    value: "132",
    label: "Symptoms",
  },
  {
    value: "AI",
    label: "Powered",
  },
];

export default function HeroContent() {
  return (
    <div className="max-w-2xl">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-300 backdrop-blur">
          <Sparkles size={16} />
          AI-Powered Healthcare Platform
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-5xl font-black leading-tight tracking-tight lg:text-7xl"
      >
        Your Personal
        <br />
        <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
          AI Health Assistant
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-lg leading-8 text-slate-400"
      >
        Describe your symptoms naturally and receive intelligent disease
        predictions powered by semantic search, sentence transformers and
        machine learning.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <Button className="group">
          Start Diagnosis
          <ArrowRight
            size={18}
            className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Button>

        <Button variant="secondary">
          Learn More
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 grid grid-cols-3 gap-8"
      >
        {stats.map((item) => (
          <div key={item.label}>
            <h3 className="text-4xl font-bold text-white">
              {item.value}
            </h3>

            <p className="mt-2 text-slate-500">
              {item.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}