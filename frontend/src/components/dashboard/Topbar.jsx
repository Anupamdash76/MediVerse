import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { Stethoscope, Menu, X } from "lucide-react";

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Track window scroll state for Dynamic Island morphing
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside click for avatar dropdown
  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  function handleNavigate(path) {
    navigate(path);
    setDropdownOpen(false);
    setMobileOpen(false);
  }

  function handleLogout() {
    setDropdownOpen(false);
    setMobileOpen(false);
    logout();
    navigate("/login");
  }

  const navItems = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Diagnosis", path: "/diagnosis" },
    { title: "History", path: "/history" },
    { title: "Profile", path: "/profile" },
  ];

  return (
    <>
      {/* Top Backdrop Shield: Prevents any content from peeking above the navbar when scrolled */}
      {isScrolled && (
        <div className="fixed top-0 left-0 right-0 h-5 bg-slate-50/95 backdrop-blur-md z-40 pointer-events-none transition-opacity duration-300" />
      )}

      <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-8 pt-2.5 sm:pt-4 pointer-events-none">
        {/* Sleek Dynamic Island Capsule Container */}
        <div
          className={`mx-auto max-w-6xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-[0_10px_35px_rgba(0,0,0,0.08)] px-4 sm:px-8 py-2.5 sm:py-3.5 pointer-events-auto transition-all duration-300 ${
            mobileOpen ? "rounded-3xl" : "rounded-2xl md:rounded-full"
          }`}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Logo Icon Badge & MediVerse Title */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            >
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 text-white font-bold shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Stethoscope size={18} className="sm:hidden" />
                <Stethoscope size={22} className="hidden sm:block" />
              </div>

              <span className="font-extrabold text-slate-900 text-lg sm:text-2xl tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                Medi<span className="text-blue-600">Verse</span>
              </span>
            </Link>

            {/* Center: Clean Navigation Tabs (Desktop & Tablet) */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`rounded-full px-4 py-1.5 text-xs lg:text-sm transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 font-semibold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium"
                    }`}
                  >
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right: Patient Profile Avatar Dropdown & Mobile Hamburger */}
            <div className="flex items-center gap-2">
              {/* Patient Avatar Button (Desktop & Tablet) */}
              <div ref={dropdownRef} className="relative shrink-0 hidden sm:block">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white p-1 sm:px-3 sm:py-1.5 shadow-2xs hover:border-blue-300 transition-all cursor-pointer"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-xs font-bold text-white shadow-sm">
                    {user?.name?.charAt(0) || "P"}
                  </div>
                  <span className="hidden md:inline text-xs font-semibold text-slate-700">
                    {user?.name || "Patient"}
                  </span>
                  <FiChevronDown
                    size={14}
                    className={`text-slate-500 transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Avatar Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-5 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-base shadow-sm">
                          {user?.name?.charAt(0) || "P"}
                        </div>
                        <div className="overflow-hidden">
                          <h3 className="text-sm font-semibold text-slate-900 truncate">
                            {user?.name || "Patient"}
                          </h3>
                          <p className="text-xs text-slate-500 truncate font-normal">
                            {user?.email || "patient@mediverse.com"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      {navItems.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => handleNavigate(item.path)}
                          className="flex w-full items-center justify-between px-5 py-2.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition cursor-pointer"
                        >
                          <span>{item.title}</span>
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 p-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-xs font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer"
                      >
                        <FiLogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Drawer Hamburger Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 md:hidden cursor-pointer shrink-0"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileOpen && (
            <div className="mt-3 border-t border-slate-100 pt-3 md:hidden space-y-2 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-3 px-2 py-2 mb-2 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs shrink-0">
                  {user?.name?.charAt(0) || "P"}
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-xs font-bold text-slate-900 truncate">
                    {user?.name || "Patient"}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate font-normal">
                    {user?.email || "patient@mediverse.com"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigate(item.path)}
                      className={`px-3.5 py-2.5 text-left text-xs font-semibold rounded-xl transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white font-bold shadow-xs"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {item.title}
                    </button>
                  );
                })}

                <div className="pt-2 border-t border-slate-100 mt-1">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition"
                  >
                    <FiLogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}