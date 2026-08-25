import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import MetricCard from "../../components/dashboard/MetricCard";
import useDashboard from "../../hooks/useDashboard";
import useAuth from "../../hooks/useAuth";
import { FiActivity, FiUser, FiClock, FiArrowRight } from "react-icons/fi";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loading, stats } = useDashboard();

  const username = user?.name?.split(" ")[0] || "Patient";

  const todayDateString = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <h2 className="text-sm font-semibold text-slate-600">
              Loading Your Dashboard...
            </h2>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hello {username} Body Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Hello, <span className="text-blue-600">{username}</span> 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {todayDateString} • Welcome to your MediVerse portal
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/diagnosis")}
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Run AI Symptom Assessment</span>
              <FiArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Overview Metrics Cards */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <MetricCard
            title="Total Predictions"
            value={stats.totalPredictions}
            subtitle="Predictions Saved"
            icon={<FiActivity />}
            color="blue"
          />

          <MetricCard
            title="Profile Completion"
            value={`${stats.profileCompletion}%`}
            subtitle="Health Profile"
            icon={<FiUser />}
            color="green"
          />

          <MetricCard
            title="Latest Diagnosis"
            value={stats.latestDisease}
            subtitle={
              stats.history.length
                ? formatDate(stats.history[0].created_at)
                : "No Predictions"
            }
            icon={<FiClock />}
            color="orange"
          />
        </section>

        {/* Recent Activity Table Card */}
        <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Recent Symptom Evaluations
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Your latest diagnostic history logs
              </p>
            </div>

            <button
              onClick={() => navigate("/history")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View All</span>
              <FiArrowRight size={14} />
            </button>
          </div>

          {stats.history.length === 0 ? (
            <div className="py-14 text-center">
              <p className="text-sm font-medium text-slate-500">
                No diagnostic history recorded yet.
              </p>
              <button
                onClick={() => navigate("/diagnosis")}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                <span>Run your first symptom assessment</span>
                <FiArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {stats.history.slice(0, 5).map((item) => {
                const disease = item.predictions[0];

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4 sm:p-5 transition hover:bg-slate-50 hover:border-slate-200"
                  >
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {disease.disease.replaceAll("_", " ")}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {formatDate(item.created_at)}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                        disease.severity === "High"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : disease.severity === "Moderate"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {disease.severity}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}