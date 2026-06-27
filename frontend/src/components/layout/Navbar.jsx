import { Menu } from "lucide-react";

import Button from "../common/Button";
import Container from "../common/Container";

const navLinks = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "Diagnosis",
    href: "#diagnosis",
  },
  {
    label: "Technology",
    href: "#technology",
  },
  
];

export default function Navbar() {
  const scrollToSection = (href) => {
    const id = href.replace("#", "");

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
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
            onClick={() => scrollToSection("#home")}
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

            <h1 className="text-xl font-bold tracking-tight">
              Medi
              <span className="text-blue-400">Verse</span>
            </h1>
          </button>

          {/* Desktop Links */}

          <div className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="
                  relative
                  text-slate-300
                  transition
                  duration-300
                  hover:text-white
                  after:absolute
                  after:left-0
                  after:-bottom-1
                  after:h-[2px]
                  after:w-0
                  after:bg-blue-500
                  after:transition-all
                  after:duration-300
                  hover:after:w-full
                "
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Side */}

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button
                onClick={() => scrollToSection("#diagnosis")}
              >
                Get Started
              </Button>
            </div>

            <button className="rounded-lg p-2 lg:hidden">
              <Menu className="text-white" />
            </button>
          </div>
        </nav>
      </Container>
    </header>
  );
}