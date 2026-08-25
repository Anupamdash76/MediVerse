import {
  FileText,
  Shield,
  Pill,
  Stethoscope,
  Microscope,
} from "lucide-react";

import SeverityBadge from "./SeverityBadge";

export default function DashboardDiseaseCard({
  disease,
}) {
  const recommendedTests = disease.recommended_tests || [
    "Complete Blood Count (CBC)",
    "Vital Signs Baseline Panel"
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-8 shadow-sm">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            {disease.disease}
          </h2>

          <p className="mt-1 text-slate-500">
            Possible AI Prediction
          </p>

        </div>

        <SeverityBadge severity={disease.severity} />

      </div>

      {/* Summary */}

      <div className="mt-8">

        <div className="mb-3 flex items-center gap-2">

          <FileText
            size={18}
            className="text-blue-600"
          />

          <h3 className="font-semibold text-slate-800">
            Summary
          </h3>

        </div>

        <p className="leading-7 text-slate-600">
          {disease.summary}
        </p>

      </div>

      {/* Specialist */}

      <div className="mt-8">

        <div className="mb-3 flex items-center gap-2">

          <Stethoscope
            size={18}
            className="text-blue-600"
          />

          <h3 className="font-semibold text-slate-800">
            Recommended Specialist
          </h3>

        </div>

        <p className="text-slate-600">
          {disease.doctor_speciality}
        </p>

      </div>

      {/* Recommended Lab Tests & Diagnostic Work */}

      <div className="mt-8 rounded-2xl border border-teal-100 bg-teal-50/70 p-5">

        <div className="mb-3 flex items-center gap-2">

          <Microscope
            size={19}
            className="text-teal-600"
          />

          <h3 className="font-semibold text-slate-800">
            Recommended Diagnostic Tests & Lab Work
          </h3>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">

          {recommendedTests.map((test, index) => (

            <div
              key={index}
              className="flex items-center gap-2.5 rounded-xl border border-teal-200/60 bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-2xs"
            >

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">

                🧪

              </span>

              <span className="font-medium text-slate-800">{test}</span>

            </div>

          ))}

        </div>

      </div>

      {/* Grid */}

      <div className="mt-8 grid gap-8 lg:grid-cols-2">

        {/* Precautions */}

        <div>

          <div className="mb-4 flex items-center gap-2">

            <Shield
              size={18}
              className="text-blue-600"
            />

            <h3 className="font-semibold text-slate-800">
              Precautions
            </h3>

          </div>

          <ul className="space-y-3">

            {disease.precautions.map(
              (item, index) => (

                <li
                  key={index}
                  className="flex items-start gap-3 text-slate-600"
                >

                  <span className="mt-1 text-green-600">
                    ✓
                  </span>

                  <span>{item}</span>

                </li>

              )
            )}

          </ul>

        </div>

        {/* Medicines */}

        <div>

          <div className="mb-4 flex items-center gap-2">

            <Pill
              size={18}
              className="text-blue-600"
            />

            <h3 className="font-semibold text-slate-800">
              Recommended Medicines
            </h3>

          </div>

          <ul className="space-y-3">

            {disease.recommended_medicines.map(
              (medicine, index) => (

                <li
                  key={index}
                  className="flex items-start gap-3 text-slate-600"
                >

                  <span className="mt-1 text-blue-600">
                    •
                  </span>

                  <span>{medicine}</span>

                </li>

              )
            )}

          </ul>

        </div>

      </div>

    </div>
  );
}