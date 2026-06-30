import { Activity } from "lucide-react";

export default function DiagnosisHero() {

  return (

    <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 p-10 text-white shadow-lg">

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-white/20 p-4">

          <Activity size={34} />

        </div>

        <div>

          <h1 className="text-4xl font-bold">

            AI Symptom Analysis

          </h1>

          <p className="mt-2 max-w-2xl text-blue-100">

            Describe your symptoms in natural language.
            MediVerse will analyze them using semantic search,
            NLP and Machine Learning to predict possible diseases.

          </p>

        </div>

      </div>

    </div>

  );

}