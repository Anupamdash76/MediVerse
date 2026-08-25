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

  // Track window scroll for Dynamic Island morphing and Active Section Scroll-Spy
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

      <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-8 pt-2.5 sm:pt-4 pointer-events-none">
        {/* Sleek Dynamic Island Capsule Container */}
        <div
          className={`mx-auto max-w-6xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-[0_10px_35px_rgba(0,0,0,0.08)] px-4 sm:px-8 py-2.5 sm:py-3.5 pointer-events-auto transition-all duration-300 ${
            mobileOpen ? "rounded-3xl" : "rounded-2xl md:rounded-full"
          }`}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo Icon Badge & MediVerse Title */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer group shrink-0"
            >
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 text-white font-bold shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Activity size={18} className="sm:hidden" />
                <Activity size={22} className="hidden sm:block" />
              </div>

              <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 leading-none group-hover:text-blue-600 transition-colors">
                Medi<span className="text-blue-600">Verse</span>
              </h1>
            </button>

            {/* Center Navigation Links with Active Scroll-Spy Underline Accent (Desktop) */}
            <div className="hidden items-center gap-6 lg:gap-8 md:flex">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className={`relative py-1.5 text-xs lg:text-sm font-semibold transition-all cursor-pointer uppercase tracking-wider ${
                      isActive
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

            {/* Right Action Buttons (Hidden on mobile screens to avoid crowding) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {!isAuthenticated ? (
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>

                  <button
                    onClick={() => navigate("/register")}
                    className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-xs transition-all cursor-pointer"
                  >
                    Get Started
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-xs transition-all cursor-pointer"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-red-600 transition cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}

              {/* Mobile Drawer Hamburger Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 md:hidden cursor-pointer shrink-0"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileOpen && (
            <div className="mt-3 border-t border-slate-100 pt-3 md:hidden space-y-2 animate-in fade-in slide-in-from-top-2">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <button
                      key={link.label}
                      onClick={() => scrollToSection(link.href)}
                      className={`px-3.5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 mt-1">
                  {!isAuthenticated ? (
                    <>
                      <button
                        onClick={() => {
                          setMobileOpen(false);
                          navigate("/register");
                        }}
                        className="w-full py-2.5 text-center text-xs font-bold text-white bg-blue-600 rounded-xl shadow-xs"
                      >
                        Get Started
                      </button>

                      <button
                        onClick={() => {
                          setMobileOpen(false);
                          navigate("/login");
                        }}
                        className="w-full py-2 text-center text-xs font-semibold text-slate-700 hover:text-blue-600"
                      >
                        Sign In →
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setMobileOpen(false);
                          navigate("/dashboard");
                        }}
                        className="w-full py-2.5 text-center text-xs font-bold text-white bg-blue-600 rounded-xl shadow-xs"
                      >
                        Go to Dashboard
                      </button>

                      <button
                        onClick={() => {
                          setMobileOpen(false);
                          logout();
                          navigate("/");
                        }}
                        className="w-full py-2 text-center text-xs font-semibold text-red-600 hover:underline"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}