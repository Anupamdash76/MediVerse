import { useState } from "react";

import {
  Activity,
  Download,
} from "lucide-react";

import GlassCard from "../common/GlassCard";

import DiseaseCard from "./DiseaseCard";
import MatchedSymptoms from "./MatchedSymptoms";
import AnalysisStatus from "./AnalysisStatus";
import UnknownSymptoms from "./UnknownSymptoms";

import useAuth from "../../hooks/useAuth";

import generateReportPDF from "../../utils/generateReportPDF";

export default function HealthReport({
  prediction,
  onReset,
}) {

  if (!prediction) return null;

  const { user } = useAuth();

  const [selectedDisease, setSelectedDisease] =
    useState(0);

  return (

    <GlassCard className="mt-10 p-8">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-blue-500/10 p-3">

          <Activity
            size={24}
            className="text-blue-400"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold">

            AI Health Analysis

          </h2>

          <p className="text-slate-400">

            Analysis completed successfully

          </p>

        </div>

      </div>

      {/* Possible Conditions */}

      <div className="mt-10">

        <h3 className="mb-5 text-xl font-semibold">

          Possible Conditions

        </h3>

        <div className="space-y-5">

          {prediction.predictions.map(
            (disease, index) => (

              <DiseaseCard
                key={disease.disease}
                disease={disease}
                index={index}
                isSelected={
                  selectedDisease === index
                }
                onSelect={() =>
                  setSelectedDisease(index)
                }
              />

            )
          )}

        </div>

      </div>

      {/* Matched Symptoms */}

      <MatchedSymptoms
        symptoms={prediction.matched_symptoms}
      />

      {/* Unknown Symptoms */}

      <UnknownSymptoms
        symptoms={prediction.unknown_symptoms}
      />

      {/* Analysis Status */}

      <AnalysisStatus />

      {/* Disclaimer */}

      <div
        className="
          mt-8
          rounded-2xl
          border
          border-yellow-500/20
          bg-yellow-500/10
          p-5
        "
      >

        <p className="text-sm text-yellow-200">

          ⚠ This AI-generated analysis is intended
          for informational purposes only and should
          not replace professional medical advice.
          Please consult a qualified healthcare
          professional before making medical decisions.

        </p>

      </div>

      {/* Actions */}

      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

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
            justify-center
            gap-2
            rounded-xl
            border
            border-blue-500/20
            bg-blue-500/10
            px-6
            py-3
            font-semibold
            text-blue-300
            transition
            hover:bg-blue-500/20
          "
        >

          <Download size={18} />

          Download Health Report

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
            font-semibold
            text-white
            transition
            hover:opacity-90
          "
        >

          Analyze Again

        </button>

      </div>

    </GlassCard>

  );

}