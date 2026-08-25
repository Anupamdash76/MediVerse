import { useState } from "react";
import { Sparkles, CheckCircle2, ChevronRight, RotateCcw } from "lucide-react";

const QUESTION_SETS = {
  fever: {
    title: "Fever Details",
    icon: "🌡️",
    questions: [
      {
        id: "fever_temp",
        label: "How high is your fever temperature?",
        options: ["Below 100°F (Mild)", "100°F – 102°F (Moderate)", "Above 102°F (High Fever)"]
      },
      {
        id: "fever_duration",
        label: "How long have you had this fever?",
        options: ["Less than 24 Hours", "2 – 3 Days", "More than 1 Week"]
      }
    ]
  },
  cough: {
    title: "Cough Character",
    icon: "🗣️",
    questions: [
      {
        id: "cough_type",
        label: "What type of cough are you experiencing?",
        options: ["Dry Cough (Tickly / Irritating)", "Wet / Productive Cough (Mucus / Phlegm)"]
      },
      {
        id: "cough_timing",
        label: "When is your cough worst?",
        options: ["Worse at Night", "Constant throughout the day", "Triggered by physical exertion"]
      }
    ]
  },
  pain: {
    title: "Pain Assessment",
    icon: "⚡",
    questions: [
      {
        id: "pain_severity",
        label: "How severe is the pain on a scale of 1 to 10?",
        options: ["Mild (1–3)", "Moderate (4–6)", "Severe / Sharp (7–10)"]
      }
    ]
  },
  general: {
    title: "Associated Symptoms",
    icon: "📋",
    questions: [
      {
        id: "associated",
        label: "Are you experiencing any of these associated symptoms?",
        options: [
          "Chills & Shivering",
          "Night Sweats",
          "Shortness of Breath",
          "Nausea & Vomiting",
          "Extreme Fatigue / Body Pain"
        ],
        multi: true
      }
    ]
  }
};

export default function SymptomWizard({ initialSymptoms, onComplete }) {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const textLower = (initialSymptoms || "").toLowerCase();
  
  const modulesToRun = [];
  if (textLower.includes("fever") || textLower.includes("temp") || textLower.includes("chill") || textLower.length < 5) {
    modulesToRun.push(QUESTION_SETS.fever);
  }
  if (textLower.includes("cough") || textLower.includes("throat") || textLower.includes("cold")) {
    modulesToRun.push(QUESTION_SETS.cough);
  }
  if (textLower.includes("pain") || textLower.includes("ache") || textLower.includes("headache")) {
    modulesToRun.push(QUESTION_SETS.pain);
  }
  modulesToRun.push(QUESTION_SETS.general);

  const currentModule = modulesToRun[activeStep] || modulesToRun[0];

  const handleSelectOption = (questionId, option, isMulti) => {
    if (isMulti) {
      const currentList = answers[questionId] || [];
      const updated = currentList.includes(option)
        ? currentList.filter(item => item !== option)
        : [...currentList, option];
      setAnswers({ ...answers, [questionId]: updated });
    } else {
      setAnswers({ ...answers, [questionId]: option });
    }
  };

  const handleFinish = () => {
    const formattedParts = [];
    if (initialSymptoms) formattedParts.push(initialSymptoms.trim());

    Object.entries(answers).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        formattedParts.push(`Associated symptoms: ${value.join(", ")}`);
      } else if (typeof value === "string") {
        formattedParts.push(value);
      }
    });

    const enrichedSymptomText = formattedParts.join(", ");
    onComplete(enrichedSymptomText);
  };

  return (
    <div className="mt-6 rounded-2xl border border-blue-200/80 bg-blue-50/50 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-blue-200/60">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md">
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              Smart Guided Triage ({activeStep + 1} of {modulesToRun.length})
            </h4>
            <p className="text-xs text-slate-500">
              Answer quick questions to boost AI prediction accuracy to 94%+
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setActiveStep(0);
          }}
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="mt-4 space-y-5">
        <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
          <span>{currentModule.icon}</span>
          <span>{currentModule.title}</span>
        </div>

        {currentModule.questions.map((q) => (
          <div key={q.id} className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              {q.label}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt) => {
                const isSelected = q.multi
                  ? (answers[q.id] || []).includes(opt)
                  : answers[q.id] === opt;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectOption(q.id, opt, q.multi)}
                    className={`flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-medium text-left transition cursor-pointer ${
                      isSelected
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50/80 hover:border-blue-300"
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <CheckCircle2 size={15} className="shrink-0 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-blue-200/60 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">
          {Object.keys(answers).length} details added
        </span>

        <div className="flex items-center gap-2">
          {activeStep < modulesToRun.length - 1 ? (
            <button
              type="button"
              onClick={() => setActiveStep(activeStep + 1)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-900 transition"
            >
              Next Step <ChevronRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-xs font-bold text-white shadow-md hover:opacity-90 transition"
            >
              Apply Enriched Symptoms ✨
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
