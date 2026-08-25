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
    <div className="flex h-full flex-col bg-white border-r border-slate-200 text-slate-800 shadow-xs">
      {/* Logo Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Medi<span className="text-blue-600">Verse</span>
          </h1>
          <p className="text-slate-500 mt-0.5 text-xs font-medium">
            Digital Health Portal
          </p>
        </div>

        {/* Mobile Close Button */}
        {setOpen && (
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setOpen && setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3.5 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600 shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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
      <div className="border-t border-slate-200 p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200 shadow-xs cursor-pointer"
        >
          <FiLogOut size={18} />
          Sign Out
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