import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  // Circle circumference calculations for progress ring
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 animate-in fade-in zoom-in">
      <button
        onClick={scrollToTop}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/90 text-blue-600 shadow-[0_10px_25px_rgba(0,0,0,0.12)] hover:bg-blue-600 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer group"
        aria-label="Scroll back to top"
      >
        {/* SVG Circular Progress Ring */}
        <svg className="absolute inset-0 h-12 w-12 -rotate-90 pointer-events-none">
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-slate-200"
            strokeWidth="2.5"
            fill="transparent"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-blue-600 group-hover:stroke-white transition-colors"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
}
