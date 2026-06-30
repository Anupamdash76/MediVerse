import DashboardLayout from "../../components/dashboard/DashboardLayout";

import useHistory from "../../hooks/useHistory";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function History() {
  const {
    history,
    loading,
    error,
    removePrediction,
  } = useHistory();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <h2 className="text-2xl font-semibold">
            Loading History...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="mx-auto max-w-6xl">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-slate-800">
            Prediction History
          </h1>

          <p className="mt-2 text-slate-500">
            View all your previous AI health analyses.
          </p>

        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-100 p-4 text-red-600">
            {error}
          </div>
        )}

        {!history.length ? (

          <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

            <h2 className="text-2xl font-bold text-slate-700">
              No Predictions Yet
            </h2>

            <p className="mt-3 text-slate-500">
              Your disease predictions will appear here once you
              analyze your symptoms.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {history.map((item) => {

              const disease =
                item.predictions?.[0];

              return (

                <div
                  key={item.id}
                  className="rounded-3xl bg-white p-8 shadow-sm transition hover:shadow-md"
                >

                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                      <h2 className="text-2xl font-bold text-slate-800">

                        {disease?.disease.replaceAll("_", " ")}

                      </h2>

                      <p className="mt-2 text-slate-500">

                        {formatDate(item.created_at)}

                      </p>

                      <p className="mt-4 text-slate-600">

                        <span className="font-semibold">
                          Symptoms:
                        </span>{" "}

                        {item.input_symptoms}

                      </p>

                    </div>

                    <div className="flex flex-col items-end gap-4">

                      <span
                        className={`
                          rounded-full
                          px-4
                          py-2
                          text-sm
                          font-semibold

                          ${
                            disease?.severity === "High"
                              ? "bg-red-100 text-red-600"
                              : disease?.severity === "Moderate"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-600"
                          }
                        `}
                      >
                        {disease?.severity}
                      </span>

                      <button
                        onClick={() =>
                          removePrediction(item.id)
                        }
                        className="rounded-xl bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}