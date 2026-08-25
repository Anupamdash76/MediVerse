import { useState } from "react";
import { Activity, Sparkles, AlertCircle, ArrowRight } from "lucide-react";

import ExamplePrompt from "./ExamplePrompt";
import VoiceInputButton from "../../common/VoiceInputButton";
import SymptomWizard from "./SymptomWizard";

export default function DiagnosisInputCard({
  symptoms,
  setSymptoms,
  onSubmit,
  error,
}) {
  const [showWizard, setShowWizard] = useState(false);

  const handleVoiceTranscript = (transcriptText) => {
    setSymptoms((prev) => (prev ? `${prev} ${transcriptText}` : transcriptText));
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 lg:p-10 shadow-xs space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-xs shrink-0">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Clinical Symptom Assessment
            </h1>
            <p className="mt-0.5 text-xs sm:text-sm text-slate-500 font-normal">
              Describe your symptoms in natural language for multi-disease risk evaluation.
            </p>
          </div>
        </div>
      </div>

      {/* Textarea Label & Voice / Wizard Buttons */}
      <div>
        <div className="mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
            Describe Your Symptoms
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <VoiceInputButton onTranscript={handleVoiceTranscript} />

            <button
              type="button"
              onClick={() => setShowWizard(!showWizard)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition cursor-pointer ${
                showWizard
                  ? "border-blue-600 bg-blue-600 text-white shadow-xs"
                  : "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              <Sparkles size={14} />
              <span>{showWizard ? "Close Wizard" : "Launch Guided Wizard"}</span>
            </button>
          </div>
        </div>

        <textarea
          rows={5}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Example: I have had a severe headache, mild fever, and nausea since yesterday..."
          className="form-textarea resize-none font-medium text-xs sm:text-sm leading-relaxed p-4 rounded-2xl border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* Guided Symptom Questionnaire Wizard */}
      {showWizard && (
        <SymptomWizard
          initialSymptoms={symptoms}
          onComplete={(enrichedText) => {
            setSymptoms(enrichedText);
            setShowWizard(false);
          }}
        />
      )}

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-700 font-medium">
          <AlertCircle size={18} className="shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Example Prompts */}
      <ExamplePrompt onSelect={setSymptoms} />

      {/* Clinical Guidance Tips */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 space-y-2">
        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-900">
          Tips for Maximum AI Accuracy
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
          <li className="flex items-center gap-1.5">• Mention all concurrent symptoms</li>
          <li className="flex items-center gap-1.5">• Include symptom duration & onset</li>
          <li className="flex items-center gap-1.5">• Note severity (mild, moderate, acute)</li>
          <li className="flex items-center gap-1.5">• Use freeform natural descriptions</li>
        </ul>
      </div>

      {/* Submit Action Button */}
      <div className="pt-2 flex justify-center sm:justify-end">
        <button
          onClick={onSubmit}
          disabled={!symptoms.trim()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Run AI Assessment</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}