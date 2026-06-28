import { Activity } from "lucide-react";

import GlassCard from "../common/GlassCard";
import MatchedSymptoms from "./MatchedSymptoms";
import AnalysisStatus from "./AnalysisStatus";

export default function HealthReport({ prediction, onReset }) {
  if (!prediction) return null;

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

      {/* Disease */}

      <div className="mt-10">

        <p className="text-sm uppercase tracking-widest text-slate-500">

          Predicted Condition

        </p>

        <h1 className="mt-2 text-4xl font-black text-white">

          {prediction.disease}

        </h1>

      </div>

      <MatchedSymptoms
        symptoms={prediction.matched_symptoms}
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

          ⚠ This AI-generated result is intended for informational
          purposes only and should not replace professional medical advice.

        </p>

      </div>

      {/* Button */}

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