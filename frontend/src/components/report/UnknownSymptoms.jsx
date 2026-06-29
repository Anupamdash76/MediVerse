import { AlertCircle } from "lucide-react";

export default function UnknownSymptoms({
  symptoms,
}) {
  if (!symptoms?.length) return null;

  return (
    <div
      className="
        mt-8
        rounded-2xl
        border
        border-orange-500/20
        bg-orange-500/10
        p-6
      "
    >
      <div className="flex items-center gap-3">

        <AlertCircle
          size={22}
          className="text-orange-400"
        />

        <h3 className="text-lg font-semibold">

          Some symptoms couldn't be recognized

        </h3>

      </div>

      <p className="mt-3 text-slate-300">

        Try describing these symptoms differently.

      </p>

      <div className="mt-5 flex flex-wrap gap-3">

        {symptoms.map((symptom) => (

          <span
            key={symptom}
            className="
              rounded-full
              border
              border-orange-400/30
              bg-orange-400/10
              px-4
              py-2
              text-sm
              text-orange-300
            "
          >
            {symptom}
          </span>

        ))}

      </div>

    </div>
  );
}