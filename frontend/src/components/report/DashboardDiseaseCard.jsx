import {
  FileText,
  Shield,
  Pill,
  Stethoscope,
} from "lucide-react";

import SeverityBadge from "./SeverityBadge";

export default function DashboardDiseaseCard({
  disease,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

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

      {/* Grid */}

      <div className="mt-10 grid gap-8 lg:grid-cols-2">

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