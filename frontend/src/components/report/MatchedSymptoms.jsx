export default function MatchedSymptoms({ symptoms }) {
  return (
    <div className="mt-10">

      <h3 className="mb-5 text-xl font-semibold">

        Matched Symptoms

      </h3>

      <div className="flex flex-wrap gap-3">

        {symptoms.map((symptom) => (

          <div
            key={symptom.matched}
            className="
            rounded-full
            border
            border-green-500/20
            bg-green-500/10
            px-4
            py-2
            text-green-300
            "
          >
            ✓ {symptom.matched.replaceAll("_", " ")}

          </div>

        ))}

      </div>

    </div>
  );
}