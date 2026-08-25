import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#FAFCFF] text-slate-900 font-sans">
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}