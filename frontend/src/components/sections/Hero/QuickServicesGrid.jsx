import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Stethoscope } from "lucide-react";

const promoSlides = [
  {
    id: 1,
    title: "Book AI Disease Risk Screening & Symptom Assessment",
    subtitle: "Fast 2-minute clinical machine learning prediction & dosage guidance",
    badge1: "280+ Symptoms",
    badge2: "300+ Diseases",
    linkText: "KNOW MORE >",
    action: "/diagnosis",
    bgColor: "bg-[#FFF7ED] border-orange-200/80 text-orange-950",
    badgeBg: "bg-orange-100/80 border-orange-200 text-orange-800",
  },
  {
    id: 2,
    title: "Get Evidence-Based Medication & Dosage References",
    subtitle: "Cross-referenced against clinical databases for patient safety",
    badge1: "Pharmacology Data",
    badge2: "Over-the-Counter",
    linkText: "EXPLORE NOW >",
    action: "/diagnosis",
    bgColor: "bg-[#EFF6FF] border-blue-200/80 text-blue-950",
    badgeBg: "bg-blue-100/80 border-blue-200 text-blue-800",
  },
  {
    id: 3,
    title: "Encrypted Health History & Shareable PDF Reports",
    subtitle: "Download standardized diagnostic summaries for your physician",
    badge1: "100% Encrypted",
    badge2: "PDF Reports",
    linkText: "VIEW VAULT >",
    action: "/history",
    bgColor: "bg-[#F0FDF4] border-emerald-200/80 text-emerald-950",
    badgeBg: "bg-emerald-100/80 border-emerald-200 text-emerald-800",
  },
];

export default function QuickServicesGrid() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % promoSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = promoSlides[currentSlideIndex];

  const handleActionClick = (target) => {
    if (!isAuthenticated && target !== "/login") {
      navigate("/login");
    } else {
      navigate(target);
    }
  };

  return (
    <div className="mt-12 w-full space-y-8">
      {/* 1. MediBuddy Top Centerpiece Consultation Pill Banner */}
      <div className="mx-auto max-w-4xl rounded-full border border-slate-200/90 bg-white p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
            <Stethoscope size={22} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Consult with AI Health Assistant, 24x7
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Free preliminary screening across 280+ symptoms & 300+ diseases
            </p>
          </div>
        </div>

        <button
          onClick={() => handleActionClick("/diagnosis")}
          className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-white border border-blue-400 hover:border-blue-600 hover:bg-blue-50/50 rounded-full transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2"
        >
          <span>Start Consultation</span>
          <span>→</span>
        </button>
      </div>

      {/* 2. MediBuddy Soft Pastel Promo Slide Banner */}
      <div className="mx-auto max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className={`rounded-3xl border ${activeSlide.bgColor} p-7 sm:p-9 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden`}
          >
            {/* Left Badge Highlights */}
            <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
              <span className={`px-3 py-1 text-xs font-bold rounded-xl border ${activeSlide.badgeBg}`}>
                {activeSlide.badge1}
              </span>
              <span className={`px-3 py-1 text-xs font-bold rounded-xl border ${activeSlide.badgeBg}`}>
                {activeSlide.badge2}
              </span>
            </div>

            {/* Right Text Content */}
            <div className="flex-1 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                {activeSlide.title}
              </h3>
              <p className="text-sm font-normal opacity-85">
                {activeSlide.subtitle}
              </p>

              <div className="pt-3">
                <button
                  onClick={() => handleActionClick(activeSlide.action)}
                  className="text-sm font-extrabold tracking-wider hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>{activeSlide.linkText}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {promoSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentSlideIndex === idx ? "w-7 bg-blue-600" : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
