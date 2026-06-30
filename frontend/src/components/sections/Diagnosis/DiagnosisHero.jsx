import { FiActivity } from "react-icons/fi";

export default function DiagnosisHero() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 p-10 text-white shadow-xl">

      <div className="flex items-center gap-5">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">

          <FiActivity size={30} />

        </div>

        <div>

          <h1 className="text-4xl font-bold">

            AI Disease Prediction

          </h1>

          <p className="mt-3 max-w-3xl text-lg text-blue-100">

            Describe your symptoms naturally.
            MediVerse uses AI and Machine Learning
            to intelligently predict diseases,
            recommend medicines,
            and suggest the appropriate specialist.

          </p>

        </div>

      </div>

    </div>
  );
}