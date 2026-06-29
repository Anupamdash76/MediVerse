import { useState } from "react";
import { Activity } from "lucide-react";

import GlassCard from "../common/GlassCard";

import DiseaseCard from "./DiseaseCard";
import MatchedSymptoms from "./MatchedSymptoms";
import AnalysisStatus from "./AnalysisStatus";
import UnknownSymptoms from "./UnknownSymptoms";

export default function HealthReport({
  prediction,
  onReset,
}) {
  if (!prediction) return null;

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

      <MatchedSymptoms
        symptoms={prediction.matched_symptoms}
      />
      <UnknownSymptoms
       symptoms={prediction.unknown_symptoms}
      />

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

      {/* Reset */}

      <div className="mt-8 flex justify-center">

        <button
          onClick={onReset}
          className="
          rounded-xl
          bg-blue-600
          px-6
          py-3
          font-semibold
          transition
          hover:bg-blue-500
          "
        >
          Analyze Again
        </button>

      </div>

    </GlassCard>
  );
}