import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Menu,
  LayoutDashboard,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";

import Button from "../common/Button";
import Container from "../common/Container";

const publicNavLinks = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Technology",
    href: "#technology",
  },
  {
    label: "About",
    href: "#footer",
  },
];

const privateNavLinks = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Diagnosis",
    path: "/diagnosis",
  },
  {
    label: "History",
    path: "/history",
  },
  {
    label: "Profile",
    path: "/profile",
  },
];

export default function Navbar() {
  const navigate = useNavigate();

  const {
    isAuthenticated,
    logout,
  } = useContext(AuthContext);

  const scrollToSection = (href) => {
    const id = href.replace("#", "");

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container>
        <nav
          className="
            mt-5
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-6
            py-4
            backdrop-blur-xl
            shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          "
        >
          {/* Logo */}

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-blue-500
                to-cyan-400
                font-bold
                text-white
              "
            >
              M
            </div>

            <h1 className="text-xl font-bold">
              Medi
              <span className="text-blue-400">
                Verse
              </span>
            </h1>
          </button>

          {/* Navigation */}

          <div className="hidden items-center gap-10 lg:flex">

            {!isAuthenticated ? (

              publicNavLinks.map((link) => (

                <button
                  key={link.label}
                  onClick={() =>
                    scrollToSection(link.href)
                  }
                  className="
                    relative
                    text-slate-300
                    transition
                    hover:text-white
                    after:absolute
                    after:left-0
                    after:-bottom-1
                    after:h-[2px]
                    after:w-0
                    after:bg-blue-500
                    after:transition-all
                    hover:after:w-full
                  "
                >
                  {link.label}
                </button>

              ))

            ) : (

              privateNavLinks.map((link) => (

                <button
                  key={link.label}
                  onClick={() =>
                    navigate(link.path)
                  }
                  className="
                    relative
                    text-slate-300
                    transition
                    hover:text-white
                    after:absolute
                    after:left-0
                    after:-bottom-1
                    after:h-[2px]
                    after:w-0
                    after:bg-blue-500
                    after:transition-all
                    hover:after:w-full
                  "
                >
                  {link.label}
                </button>

              ))

            )}

          </div>

          {/* Right */}

          <div className="flex items-center gap-3">

            {!isAuthenticated ? (

              <>
                <button
                  onClick={() =>
                    navigate("/login")
                  }
                  className="hidden md:flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <LogIn size={18} />
                  Login
                </button>

                <Button
                  onClick={() =>
                    navigate("/register")
                  }
                >
                  <UserPlus size={18} className="mr-2" />
                  Register
                </Button>
              </>

            ) : (

              <>
                <Button
                  onClick={() =>
                    navigate("/dashboard")
                  }
                >
                  <LayoutDashboard size={18} className="mr-2" />
                  Dashboard
                </Button>

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="
                    hidden
                    md:flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-red-500
                    px-4
                    py-2
                    text-red-400
                    hover:bg-red-500
                    hover:text-white
                  "
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>

            )}

            <button className="rounded-lg p-2 lg:hidden">
              <Menu className="text-white" />
            </button>

          </div>

        </nav>
      </Container>
    </header>
  );
}