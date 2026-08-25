import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Dynamic Island Header */}
      <Topbar />

      {/* Main Content Area spanning full width */}
      <main className="pt-24 sm:pt-28 pb-16 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}