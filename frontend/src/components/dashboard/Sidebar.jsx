import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiActivity,
  FiClock,
  FiUser,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FiHome size={20} />,
    },
    {
      title: "Diagnosis",
      path: "/diagnosis",
      icon: <FiActivity size={20} />,
    },
    {
      title: "History",
      path: "/history",
      icon: <FiClock size={20} />,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: <FiUser size={20} />,
    },
  ];

  function handleLogout() {
    if (setOpen) setOpen(false);
    logout();
    navigate("/login");
  }

  const sidebarContent = (
    <div className="flex h-full flex-col bg-slate-900 text-white shadow-2xl">
      {/* Logo Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Medi<span className="text-teal-400">Verse</span>
          </h1>
          <p className="text-slate-400 mt-1 text-xs sm:text-sm">
            AI Healthcare Assistant
          </p>
        </div>

        {/* Mobile Close Button */}
        {setOpen && (
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setOpen && setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 font-semibold text-white shadow-lg shadow-blue-900/40"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span className="font-medium text-sm sm:text-base">
              {item.title}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-800 p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-red-500/90 py-3 font-medium text-white transition hover:bg-red-600 shadow-md"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (lg and above) */}
      <aside className="hidden lg:flex w-72 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[80vw] shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}