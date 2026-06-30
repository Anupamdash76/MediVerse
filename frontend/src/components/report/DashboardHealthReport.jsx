import { Activity, Download } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import generateReportPDF from "../../utils/generateReportPDF";

import DashboardDiseaseCard from "./DashboardDiseaseCard";
import DashboardMatchedSymptoms from "./DashboardMatchedSymptoms";
import DashboardUnknownSymptoms from "./DashboardUnknownSymptoms";
import DashboardAnalysisStatus from "./DashboardAnalysisStatus";

export default function DashboardHealthReport({
  prediction,
  onReset,
}) {

  const { user } = useAuth();

  if (!prediction) return null;

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-100 p-4">

              <Activity
                size={30}
                className="text-blue-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-900">

                AI Health Analysis

              </h1>

              <p className="mt-1 text-slate-500">

                Analysis completed successfully.

              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() =>
                generateReportPDF(
                  prediction,
                  user
                )
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-blue-200
                bg-blue-50
                px-5
                py-3
                font-medium
                text-blue-700
                transition
                hover:bg-blue-100
              "
            >

              <Download size={18} />

              Download PDF

            </button>

            <button
              onClick={onReset}
              className="
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                px-6
                py-3
                font-medium
                text-white
                transition
                hover:opacity-90
              "
            >

              New Diagnosis

            </button>

          </div>

        </div>

      </div>

      {/* Disease Cards */}

      <div className="space-y-6">

        {prediction.predictions.map(
          (disease) => (

            <DashboardDiseaseCard
              key={disease.disease}
              disease={disease}
            />

          )
        )}

      </div>

      {/* Matched Symptoms */}

      <DashboardMatchedSymptoms
        symptoms={
          prediction.matched_symptoms
        }
      />

      {/* Unknown Symptoms */}

      <DashboardUnknownSymptoms
        symptoms={
          prediction.unknown_symptoms
        }
      />

      {/* AI Status */}

      <DashboardAnalysisStatus />

    </div>

  );

}