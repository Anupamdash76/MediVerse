function formatSymptom(symptom) {
  return symptom
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function MatchedSymptoms({ symptoms = [] }) {
  if (!symptoms.length) return null;

  return (
    <div className="mt-10">
      <h3 className="mb-5 text-xl font-semibold">
        Recognized Symptoms
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
            ✓ {formatSymptom(symptom.matched)}
          </div>
        ))}
      </div>
    </div>
  );
}