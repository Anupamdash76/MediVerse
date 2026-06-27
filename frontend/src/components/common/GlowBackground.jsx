import { motion } from "framer-motion";

export default function GlowBackground() {
  return (
    <>

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [.35, .5, .35],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
        className="
        absolute
        -left-52
        top-10

        h-[520px]
        w-[520px]

        rounded-full

        bg-blue-600/30

        blur-[160px]
        "
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [.25, .45, .25],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
        }}
        className="
        absolute

        right-[-180px]

        bottom-[-120px]

        h-[480px]

        w-[480px]

        rounded-full

        bg-violet-600/30

        blur-[160px]
        "
      />

    </>
  );
}