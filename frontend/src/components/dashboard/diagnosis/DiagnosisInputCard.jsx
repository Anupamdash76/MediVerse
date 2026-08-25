import { useState } from "react";
import { Activity, Sparkles } from "lucide-react";

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
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-8 lg:p-10 shadow-sm">

      {/* Header */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">

        <div className="rounded-2xl bg-blue-100 p-4">

          <Activity
            size={28}
            className="text-blue-600"
          />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-900">

            AI Symptom Analysis

          </h2>

          <p className="mt-1 text-slate-500">

            Describe your symptoms in natural language for
            an AI-powered health assessment.

          </p>

        </div>

      </div>

      {/* Textarea Label & Voice Button */}

      <div className="mt-8">

        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">

          <label className="font-medium text-slate-700">

            Describe Your Symptoms

          </label>

          <div className="flex items-center gap-2">

            <VoiceInputButton onTranscript={handleVoiceTranscript} />

            <button
              type="button"
              onClick={() => setShowWizard(!showWizard)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                showWizard
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              <Sparkles size={14} />
              {showWizard ? "Close Wizard" : "Launch Guided Wizard"}
            </button>

          </div>

        </div>

        <textarea
          rows={6}
          value={symptoms}
          onChange={(e) =>
            setSymptoms(e.target.value)
          }
          placeholder="Example: I have had a headache, fever and vomiting since yesterday..."
          className="form-textarea resize-none"
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

      {/* Error */}

      {error && (

        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">

          <p className="text-sm text-red-700">

            {error}

          </p>

        </div>

      )}

      {/* Example Prompts */}

      <ExamplePrompt
        onSelect={setSymptoms}
      />

      {/* Tips */}

      <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">

        <h3 className="font-semibold text-slate-800">

          Tips for Better Results

        </h3>

        <ul className="mt-4 space-y-2 text-sm text-slate-600">

          <li>
            • Mention all symptoms you're experiencing.
          </li>

          <li>
            • Include when the symptoms started.
          </li>

          <li>
            • Describe the severity if possible.
          </li>

          <li>
            • Use natural language instead of keywords.
          </li>

        </ul>

      </div>

      {/* Button */}

      <div className="mt-10 flex justify-center">

        <button
          onClick={onSubmit}
          className="
            w-full
            sm:w-auto
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            px-6
            sm:px-10
            py-3.5
            sm:py-4
            text-base
            sm:text-lg
            font-semibold
            text-white
            shadow-lg
            transition
            hover:scale-[1.02]
            hover:shadow-xl
          "
        >

          Analyze Symptoms

        </button>

      </div>

    </div>
  );
}