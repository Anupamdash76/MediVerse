import { Activity } from "lucide-react";

import ExamplePrompt from "./ExamplePrompt";

export default function DiagnosisInputCard({
  symptoms,
  setSymptoms,
  onSubmit,
  error,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-4">

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

      {/* Textarea */}

      <div className="mt-8">

        <label className="mb-3 block font-medium text-slate-700">

          Describe Your Symptoms

        </label>

        <textarea
          rows={7}
          value={symptoms}
          onChange={(e) =>
            setSymptoms(e.target.value)
          }
          placeholder="Example: I have had a headache, fever and vomiting since yesterday..."
          className="form-textarea resize-none"
        />

      </div>

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
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            px-10
            py-4
            text-lg
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