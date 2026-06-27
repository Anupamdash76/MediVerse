import { Menu } from "lucide-react";

import Button from "../common/Button";
import Container from "../common/Container";

export default function Navbar() {
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
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 font-bold text-white">
              M
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Medi
                <span className="text-blue-400">Verse</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 lg:flex">
            <a
              href="#technology"
              className="text-slate-300 transition hover:text-white"
            >
              Technology
            </a>

            <a
              href="#features"
              className="text-slate-300 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#diagnosis"
              className="text-slate-300 transition hover:text-white"
            >
              Diagnosis
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button>Get Started</Button>
            </div>

            <button className="rounded-lg p-2 text-white lg:hidden">
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </Container>
    </header>
  );
}