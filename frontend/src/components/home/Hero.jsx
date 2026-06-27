import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">

      {/* Background Blur */}
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200 blur-3xl opacity-40"></div>

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl font-extrabold tracking-tight text-slate-800 md:text-7xl"
        >
          MediVerse AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-3xl text-xl leading-8 text-gray-600"
        >
          Describe your symptoms naturally and receive AI-powered disease
          prediction along with medicines, precautions and healthcare
          recommendations.
        </motion.p>

        <motion.a
          href="#prediction"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:scale-105"
        >
          Analyze Symptoms
        </motion.a>

      </div>
    </section>
  );
}

export default Hero;