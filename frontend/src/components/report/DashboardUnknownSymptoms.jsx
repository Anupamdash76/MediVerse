import { AlertTriangle } from "lucide-react";

export default function DashboardUnknownSymptoms({
  symptoms = [],
}) {
  if (symptoms.length === 0) return null;

  return (
    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 shadow-sm">

      <div className="mb-5 flex items-center gap-3">

        <AlertTriangle
          className="text-amber-600"
          size={24}
        />

        <h2 className="text-2xl font-bold text-slate-900">
          Unknown Symptoms
        </h2>

      </div>

      <div className="flex flex-wrap gap-3">

        {symptoms.map((item) => (

          <span
            key={item}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow"
          >
            {item}
          </span>

        ))}

      </div>

    </div>
  );
}