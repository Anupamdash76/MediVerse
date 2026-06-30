import { CheckCircle2 } from "lucide-react";

export default function DashboardMatchedSymptoms({
  symptoms = [],
}) {
  if (symptoms.length === 0) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <CheckCircle2
          className="text-green-600"
          size={24}
        />

        <h2 className="text-2xl font-bold text-slate-900">
          Matched Symptoms
        </h2>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {symptoms.map((symptom, index) => (

          <div
            key={index}
            className="rounded-xl border border-green-200 bg-green-50 p-4"
          >

            <p className="font-medium text-slate-800">
              {symptom.input}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Matched to <b>{symptom.matched}</b>
            </p>

            <p className="mt-2 text-sm font-semibold text-green-700">
              Confidence {(symptom.score * 100).toFixed(1)}%
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}