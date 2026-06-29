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
        rounded-2xl
        border
        transition-all
        duration-300
        cursor-pointer

        ${
          isSelected
            ? "border-blue-500 bg-blue-500/10"
            : "border-white/10 bg-white/5 hover:border-blue-400"
        }
      `}
      onClick={onSelect}
    >
      {/* Header */}

      <div className="flex items-center justify-between p-6">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-blue-500/10
              font-bold
              text-blue-400
            "
          >
            {index + 1}
          </div>

          <div>

            <h3 className="text-xl font-semibold">
              {formatTitle(disease.disease)}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Possible Condition
            </p>

          </div>

        </div>

        <SeverityBadge severity={disease.severity} />

      </div>

      {/* Expanded */}

      {isSelected && (
        <div
          className="
            border-t
            border-white/10
            px-6
            py-6
            space-y-8
          "
        >

          {/* Summary */}

          {disease.summary && (

            <div>

              <div className="mb-3 flex items-center gap-2">

                <FileText
                  size={18}
                  className="text-blue-400"
                />

                <h4 className="font-semibold">
                  Summary
                </h4>

              </div>

              <p className="leading-7 text-slate-300">
                {disease.summary}
              </p>

            </div>

          )}

          {/* Specialist */}

          {disease.doctor_speciality && (

            <div>

              <div className="mb-3 flex items-center gap-2">

                <Stethoscope
                  size={18}
                  className="text-blue-400"
                />

                <h4 className="font-semibold">
                  Recommended Specialist
                </h4>

              </div>

              <p className="text-slate-300">
                {disease.doctor_speciality}
              </p>

            </div>

          )}

          {/* Precautions */}

          {disease.precautions.length > 0 && (

            <div>

              <div className="mb-3 flex items-center gap-2">

                <ShieldCheck
                  size={18}
                  className="text-blue-400"
                />

                <h4 className="font-semibold">
                  Precautions
                </h4>

              </div>

              <ul className="space-y-2">

                {disease.precautions.map((item) => (

                  <li
                    key={item}
                    className="text-slate-300"
                  >
                    ✓ {item}
                  </li>

                ))}

              </ul>

            </div>

          )}

          {/* Medicines */}

          {disease.recommended_medicines.length > 0 && (

            <div>

              <div className="mb-3 flex items-center gap-2">

                <Pill
                  size={18}
                  className="text-blue-400"
                />

                <h4 className="font-semibold">
                  Recommended Medicines
                </h4>

              </div>

              <ul className="space-y-2">

                {disease.recommended_medicines.map((medicine) => (

                  <li
                    key={medicine}
                    className="text-slate-300"
                  >
                    • {medicine}
                  </li>

                ))}

              </ul>

            </div>

          )}

          {/* Empty State */}

          {!disease.summary &&
            !disease.doctor_speciality &&
            disease.precautions.length === 0 &&
            disease.recommended_medicines.length === 0 && (

              <div
                className="
                  rounded-xl
                  border
                  border-dashed
                  border-white/10
                  bg-white/5
                  p-6
                  text-center
                "
              >

                <p className="text-slate-400">

                  Detailed medical guidance for this condition
                  will be available in a future update.

                </p>

              </div>

          )}

        </div>
      )}

    </div>
  );
}