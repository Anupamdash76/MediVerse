import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import MetricCard from "../../components/dashboard/MetricCard";

import useDashboard from "../../hooks/useDashboard";

import {
  FiActivity,
  FiUser,
  FiClock,
} from "react-icons/fi";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Dashboard() {

  const navigate = useNavigate();

  const {
    loading,
    stats,
  } = useDashboard();

  if (loading) {

    return (

      <DashboardLayout>

        <div className="flex items-center justify-center py-20">

          <h2 className="text-2xl font-bold">
            Loading Dashboard...
          </h2>

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <div className="space-y-10">

        {/* Hero */}

        <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 p-10 text-white shadow-xl">

          <h1 className="text-4xl font-bold">

            Welcome Back 👋

          </h1>

          <p className="mt-4 max-w-3xl text-lg text-blue-100">

            Continue managing your health using AI-powered
            disease prediction and personalized healthcare insights.

          </p>

        </section>

        {/* Heading */}

        <section>

          <h2 className="text-3xl font-bold text-slate-800">

            Dashboard

          </h2>

          <p className="mt-2 text-slate-500">

            Your healthcare overview at a glance.

          </p>

        </section>

        {/* Metrics */}

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">

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

        {/* Recent Activity */}

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold text-slate-800">

              Recent Activity

            </h2>

            <button
              onClick={() => navigate("/history")}
              className="font-medium text-blue-600 hover:underline"
            >

              View All

            </button>

          </div>

          {stats.history.length === 0 ? (

            <div className="py-12 text-center">

              <p className="text-slate-500">

                No predictions available.

              </p>

            </div>

          ) : (

            <div className="mt-8 space-y-4">

              {stats.history
                .slice(0, 5)
                .map((item) => {

                  const disease =
                    item.predictions[0];

                  return (

                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border border-slate-100 p-5 transition hover:bg-slate-50"
                    >

                      <div>

                        <h3 className="font-semibold text-slate-800">

                          {disease.disease.replaceAll(
                            "_",
                            " "
                          )}

                        </h3>

                        <p className="text-sm text-slate-500">

                          {formatDate(
                            item.created_at
                          )}

                        </p>

                      </div>

                      <span
                        className={`
                          rounded-full
                          px-4
                          py-1
                          text-sm
                          font-medium

                          ${
                            disease.severity === "High"
                              ? "bg-red-100 text-red-600"
                              : disease.severity ===
                                "Moderate"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-600"
                          }
                        `}
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