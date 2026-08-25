import {
  FileText,
  ShieldCheck,
  Pill,
  Stethoscope,
} from "lucide-react";

import SeverityBadge from "./SeverityBadge";

function formatTitle(text) {
  return text
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function DiseaseCard({
  disease,
  index,
  isSelected,
  onSelect,
}) {
  return (
    <div
      className={`
        overflow-hidden
        rounded-xl
        border
        transition-all
        duration-200
        cursor-pointer
        ${
          isSelected
            ? "border-blue-500 bg-blue-50/30 shadow-xs"
            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
        }
      `}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 sm:p-6">
        <div className="flex items-center gap-3.5">
          <div
            className={`
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              font-bold
              text-sm
              ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700"
              }
            `}
          >
            {index + 1}
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              {formatTitle(disease.disease)}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Match Probability: {(disease.confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <SeverityBadge severity={disease.severity} />
      </div>

      {/* Expanded Details */}
      {isSelected && (
        <div className="border-t border-slate-200 bg-white p-5 sm:p-6 space-y-6">
          {/* Summary */}
          {disease.summary && (
            <div>
              <div className="mb-2 flex items-center gap-2 text-blue-700 font-bold text-sm">
                <FileText size={16} className="text-blue-600" />
                <h4>Condition Summary</h4>
              </div>
              <p className="leading-relaxed text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                {disease.summary}
              </p>
            </div>
          )}

          {/* Specialist */}
          {disease.doctor_speciality && (
            <div>
              <div className="mb-2 flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <Stethoscope size={16} className="text-indigo-600" />
                <h4>Consultation Recommendation</h4>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 border border-indigo-200 px-4 py-2 text-sm font-semibold text-indigo-800">
                <span>Specialist: {disease.doctor_speciality}</span>
              </div>
            </div>
          )}

          {/* Precautions */}
          {disease.precautions && disease.precautions.length > 0 && (
            <div>
              <div className="mb-2 flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <ShieldCheck size={16} className="text-emerald-600" />
                <h4>Key Care Precautions</h4>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {disease.precautions.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-emerald-50/50 border border-emerald-100 p-2.5 rounded-lg"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Medicines */}
          {disease.recommended_medicines && disease.recommended_medicines.length > 0 && (
            <div>
              <div className="mb-2 flex items-center gap-2 text-amber-700 font-bold text-sm">
                <Pill size={16} className="text-amber-600" />
                <h4>Commonly Associated Medications</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {disease.recommended_medicines.map((medicine) => (
                  <span
                    key={medicine}
                    className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-800"
                  >
                    💊 {medicine}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}