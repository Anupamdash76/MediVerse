import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Activity } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Clinical Tech", href: "#technology" },
  { label: "Patient FAQs", href: "#faq" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const { isAuthenticated, logout } = useContext(AuthContext);

  // Track window scroll for Dynamic Island capsule morphing and Active Section Scroll-Spy
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect current active section in viewport
      const sections = [
        { id: "home", href: "#home" },
        { id: "technology", href: "#technology" },
        { id: "faq", href: "#faq" },
      ];

      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].href);
          break;
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Backdrop Shield: Ensures no scrolled content is ever seen above the navbar */}
      {isScrolled && (
        <div className="fixed top-0 left-0 right-0 h-5 bg-[#FAFCFF] z-40 pointer-events-none transition-opacity duration-300" />
      )}

      <header className="fixed inset-x-0 top-0 z-50 px-4 sm:px-8 pt-3 sm:pt-4 pointer-events-none">
        {/* Sleek Dynamic Island Capsule */}
        <div className="mx-auto max-w-6xl rounded-full bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-[0_10px_35px_rgba(0,0,0,0.08)] px-6 sm:px-8 py-3 sm:py-3.5 pointer-events-auto transition-all">
          <div className="flex items-center justify-between gap-4">
            {/* Logo Icon Badge & MediVerse Title */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 text-left cursor-pointer group shrink-0"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 text-white font-bold shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Activity size={22} />
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 leading-none group-hover:text-blue-600 transition-colors">
                Medi<span className="text-blue-600">Verse</span>
              </h1>
            </button>

            {/* Center Navigation Links with Active Scroll-Spy Underline Accent */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className={`relative py-1.5 text-sm font-semibold transition-all cursor-pointer uppercase tracking-wider ${isActive
                        ? "text-blue-600 font-bold"
                        : "text-slate-600 hover:text-blue-600"
                      }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full animate-in fade-in zoom-in-95 duration-200" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>

                  <button
                    onClick={() => navigate("/register")}
                    className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm transition-all cursor-pointer"
                  >
                    Get Started
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm transition-all cursor-pointer"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 md:hidden cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileOpen && (
            <div className="mt-3.5 border-t border-slate-100 pt-3.5 md:hidden">
              <div className="flex flex-col gap-2.5">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <button
                      key={link.label}
                      onClick={() => scrollToSection(link.href)}
                      className={`py-2 text-left text-sm font-semibold uppercase tracking-wider transition-colors ${isActive ? "text-blue-600 font-bold underline" : "text-slate-800 hover:text-blue-600"
                        }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
                {!isAuthenticated && (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/login");
                    }}
                    className="py-2 text-left text-sm font-medium text-blue-600"
                  >
                    Sign In →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}