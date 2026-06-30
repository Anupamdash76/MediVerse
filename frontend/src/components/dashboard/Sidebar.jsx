import { NavLink, useNavigate } from "react-router-dom";

import {
  FiHome,
  FiActivity,
  FiClock,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

import useAuth from "../../hooks/useAuth";

export default function Sidebar() {

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

    logout();

    navigate("/login");

  }

  return (

    <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}

      <div className="px-8 py-8 border-b border-slate-800">

        <h1 className="text-4xl font-bold tracking-tight">

          MediVerse

        </h1>

        <p className="text-slate-400 mt-2 text-sm">

          AI Healthcare Assistant

        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-8 space-y-3">

        {

          menuItems.map((item) => (

            <NavLink

              key={item.path}

              to={item.path}

              className={({ isActive }) =>

                `flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300

                ${

                  isActive

                    ? "bg-blue-600 shadow-lg"

                    : "hover:bg-slate-800"

                }`

              }

            >

              {item.icon}

              <span className="font-medium">

                {item.title}

              </span>

            </NavLink>

          ))

        }

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-800 p-5">

        <button

          onClick={handleLogout}

          className="w-full flex items-center justify-center gap-3 rounded-xl bg-red-500 py-4 font-medium transition hover:bg-red-600"

        >

          <FiLogOut />

          Logout

        </button>

      </div>

    </aside>

  );

}