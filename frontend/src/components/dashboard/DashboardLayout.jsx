import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({

  children,

}) {

  return (

    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="flex-1 overflow-y-auto p-10">

          {children}

        </main>

      </div>

    </div>

  );

}