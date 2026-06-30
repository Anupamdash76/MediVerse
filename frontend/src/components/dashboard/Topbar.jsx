import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import {
  FiChevronDown,
  FiGrid,
  FiActivity,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

export default function Topbar() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  );

  useEffect(() => {

    function handleOutsideClick(event) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {

        setOpen(false);

      }

    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

  }, []);

  function handleNavigate(path) {

    navigate(path);

    setOpen(false);

  }

  function handleLogout() {

    logout();

    navigate("/login");

  }

  return (

    <header className="border-b border-slate-200 bg-white px-10 py-6">

      <div className="flex items-center justify-between">

        {/* Greeting */}

        <div>

          <h1 className="text-4xl font-bold text-slate-800">

            {greeting},

            <span className="text-blue-600">

              {" "}
              {user?.name?.split(" ")[0]}

            </span>

            👋

          </h1>

          <p className="mt-2 text-slate-500">

            {today}

          </p>

        </div>

        {/* User */}

        <div
          ref={dropdownRef}
          className="relative"
        >

          <button

            onClick={() => setOpen(!open)}

            className="
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              shadow-sm
              transition-all
              hover:shadow-md
            "
          >

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                text-xl
                font-bold
                text-white
              "
            >

              {user?.name?.charAt(0)}

            </div>

            <div className="text-left">

              <h3 className="font-semibold text-slate-900">

                {user?.name}

              </h3>

              <span
                className="
                  mt-1
                  inline-block
                  rounded-full
                  bg-blue-100
                  px-2.5
                  py-0.5
                  text-xs
                  font-medium
                  text-blue-700
                "
              >

                Patient

              </span>

            </div>

            <FiChevronDown
              size={18}
              className={`text-slate-500 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />

          </button>

          {open && (

            <div
              className="
                absolute
                right-0
                mt-4
                w-72
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-2xl
                z-50
              "
            >

              {/* Header */}

              <div className="p-6">

                <div className="flex items-center gap-4">

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-r
                      from-blue-600
                      to-cyan-500
                      text-lg
                      font-bold
                      text-white
                    "
                  >

                    {user?.name?.charAt(0)}

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-slate-900">

                      {user?.name}

                    </h3>

                    <p className="mt-1 text-sm text-slate-500">

                      {user?.email}

                    </p>

                  </div>

                </div>

              </div>

              <div className="border-t border-slate-100" />

              {/* Menu */}

              <button
                onClick={() => handleNavigate("/dashboard")}
                className="flex w-full items-center gap-4 px-6 py-4 text-left text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
              >

                <FiGrid size={19} />

                Dashboard

              </button>

              <button
                onClick={() => handleNavigate("/diagnosis")}
                className="flex w-full items-center gap-4 px-6 py-4 text-left text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-600"
              >

                <FiActivity size={19} />

                Diagnosis

              </button>

              <button
                onClick={() => handleNavigate("/profile")}
                className="flex w-full items-center gap-4 px-6 py-4 text-left text-slate-700 transition hover:bg-violet-50 hover:text-violet-600"
              >

                <FiUser size={19} />

                Profile

              </button>

              <div className="border-t border-slate-100" />

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-4 px-6 py-4 text-left text-red-600 transition hover:bg-red-50"
              >

                <FiLogOut size={19} />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </header>

  );

}