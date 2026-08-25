import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../../common/Section";
import Container from "../../common/Container";
import { technologies } from "./TechnologyData";
import { Activity, CheckCircle2 } from "lucide-react";

export default function Technology() {
  const [activeIndex, setActiveIndex] = useState(0);
  const coreRef = useRef(null);
  const activeIndexRef = useRef(activeIndex);
  const lastWheelTime = useRef(0);

  // Keep ref updated to avoid stale closures in non-passive wheel event listener
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Non-passive wheel event listener attached STRICTLY to the central MediVerse AI CORE circle
  useEffect(() => {
    const el = coreRef.current;
    if (!el) return;

    const handleWheelNative = (e) => {
      const now = Date.now();
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;
      const currentIndex = activeIndexRef.current;

      // Intercept scroll down if not yet at Stage 6/6 (index 5)
      if (isScrollingDown && currentIndex < 5) {
        e.preventDefault();
        if (now - lastWheelTime.current > 180) {
          lastWheelTime.current = now;
          setActiveIndex((prev) => Math.min(prev + 1, 5));
        }
      }
      // Intercept scroll up if not yet at Stage 1/6 (index 0)
      else if (isScrollingUp && currentIndex > 0) {
        e.preventDefault();
        if (now - lastWheelTime.current > 180) {
          lastWheelTime.current = now;
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
      }
      // Once index is 5 (6/6) scrolling down OR index is 0 (1/6) scrolling up, natural page scroll occurs!
    };

    el.addEventListener("wheel", handleWheelNative, { passive: false });
    return () => el.removeEventListener("wheel", handleWheelNative);
  }, []);

  const activeTech = technologies[activeIndex] || technologies[0];
  const totalNodes = technologies.length;
  const radiusPercent = 42; // Percentage radius from center

  return (
    <Section className="py-24 overflow-hidden" id="technology">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-blue-50/90 border border-blue-200 px-4 py-1 text-xs font-extrabold text-blue-700 uppercase tracking-widest mb-3">
            Clinical Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How MediVerse Clinical AI Operates
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            Scroll over the central MediVerse AI Core to step through pipeline stages. Once 6/6 is reached, page scroll resumes.
          </p>
        </div>

        {/* Container */}
        <div className="relative rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-xl p-6 sm:p-10 shadow-xl max-w-6xl mx-auto">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Interactive Circular Orbital Ring */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] rounded-full border-2 border-dashed border-blue-200 bg-slate-50/50 flex items-center justify-center shadow-inner">
                
                {/* Central MediVerse AI CORE Circle (Wheel Event Attached STRICTLY Here) */}
                <div
                  ref={coreRef}
                  className="relative flex flex-col items-center justify-center h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-600/30 z-10 border-4 border-white text-center p-3 cursor-pointer hover:scale-105 transition-transform"
                >
                  <Activity size={26} className="animate-pulse mb-1" />
                  <span className="text-xs font-extrabold leading-none">MediVerse</span>
                  <span className="text-[9px] font-bold text-blue-200 tracking-wider uppercase mt-0.5">
                    AI CORE
                  </span>
                </div>

                {/* 6 Circular Tech Nodes along the Ring */}
                {technologies.map((tech, idx) => {
                  const angle = (idx * 360) / totalNodes - 90; // Start top
                  const radians = (angle * Math.PI) / 180;
                  const x = 50 + radiusPercent * Math.cos(radians);
                  const y = 50 + radiusPercent * Math.sin(radians);
                  const isActive = activeIndex === idx;
                  const Icon = tech.icon;

                  return (
                    <button
                      key={tech.title}
                      onClick={() => setActiveIndex(idx)}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer z-20 ${
                        isActive
                          ? "h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/40 scale-110 border-2 border-white ring-4 ring-blue-500/20"
                          : "h-11 w-11 sm:h-13 sm:w-13 bg-white text-slate-700 border border-slate-200 shadow-md hover:scale-105 hover:border-blue-300"
                      }`}
                      aria-label={`Select stage ${idx + 1}`}
                    >
                      <Icon size={isActive ? 24 : 20} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Node Detail Inspection Panel */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTech.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 space-y-5"
                >
                  {/* Header Badge */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-blue-100 border border-blue-200 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-blue-700">
                      {activeTech.badge}
                    </span>
                    <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      STAGE {activeIndex + 1} OF 6
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                      {activeTech.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {activeTech.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    {activeTech.description}
                  </p>

                  {/* Highlights */}
                  <div className="pt-1 grid grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 p-2.5 rounded-xl shadow-2xs">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>Sub-100ms Inference</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 p-2.5 rounded-xl shadow-2xs">
                      <CheckCircle2 size={15} className="text-blue-600 shrink-0" />
                      <span>Clinical Precision</span>
                    </div>
                  </div>

                  {/* Pipeline Step Progress Bar */}
                  <div className="pt-3 border-t border-slate-200/80">
                    <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 mb-2">
                      <span>MediVerse Pipeline Step</span>
                      <span className="text-blue-600">{activeIndex + 1} / 6</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-200/80 overflow-hidden p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300"
                        style={{ width: `${((activeIndex + 1) / 6) * 100}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}