import { useState } from "react";
import {
  Activity,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import GlassCard from "../common/GlassCard";
import DiseaseCard from "./DiseaseCard";
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
  const [selectedDisease, setSelectedDisease] = useState(0);

  return (
    <GlassCard className="mt-8 p-6 sm:p-8 bg-white border border-slate-200 shadow-md rounded-2xl">
      {/* Report Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-6 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Activity size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Clinical Diagnostic Summary
            </h2>
            <p className="text-xs font-medium text-slate-500">
              Assessment generated on {new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700 w-fit">
          <CheckCircle2 size={16} />
          <span>Analysis Complete</span>
        </div>
      </div>

      {/* Possible Conditions */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-slate-900">
            Predicted Health Conditions
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Select a condition to expand details
          </span>
        </div>

        <div className="space-y-4">
          {prediction.predictions.map((disease, index) => (
            <DiseaseCard
              key={disease.disease}
              disease={disease}
              index={index}
              isSelected={selectedDisease === index}
              onSelect={() => setSelectedDisease(index)}
            />
          ))}
        </div>
      </div>

      {/* Unknown Symptoms */}
      <UnknownSymptoms symptoms={prediction.unknown_symptoms} />

      {/* Analysis Status */}
      <AnalysisStatus />

      {/* Disclaimer */}
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed text-amber-800 font-medium">
            <strong>Medical Notice:</strong> This AI-generated report is intended for informational and preliminary screening purposes only. It does not replace a formal clinical examination by a licensed physician. Please consult a qualified doctor for medical advice and prescriptions.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-100 pt-6">
        <button
          onClick={() => generateReportPDF(prediction, user)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition cursor-pointer shadow-xs"
        >
          <Download size={16} />
          <span>Download PDF Report</span>
        </button>

        <button
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition cursor-pointer shadow-sm"
        >
          <RotateCcw size={16} />
          <span>Start New Assessment</span>
        </button>
      </div>
    </GlassCard>
  );
}