import { motion } from "framer-motion";

export default function GlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-[120px]" />
      <div className="absolute top-1/2 -right-40 h-[450px] w-[450px] rounded-full bg-teal-50/60 blur-[120px]" />
    </div>
  );
}