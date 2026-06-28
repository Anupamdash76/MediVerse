import { useState } from "react";

import Section from "../../common/Section";
import GlassCard from "../../common/GlassCard";
import Button from "../../common/Button";

import HealthReport from "../../report/HealthReport";

import usePrediction from "../../../hooks/usePrediction";

export default function Diagnosis() {
  const [symptoms, setSymptoms] = useState("");

    const {
  loading,
  prediction,
  error,
  predict,
  reset,
} = usePrediction();

  const handleSubmit = async () => {
    if (!symptoms.trim()) return;

    await predict(symptoms);
  };

  const handleReset = () => {
  setSymptoms("");
  reset();
};

  return (
    <Section id="diagnosis">
      <div className="mx-auto max-w-5xl">
        {!prediction ? (
          <GlassCard className="p-10">
            <h2 className="text-center text-5xl font-black">
              Start Your AI Diagnosis
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-slate-400">
              Describe your symptoms naturally.
              Our AI will analyze them using semantic search
              and machine learning.
            </p>

            <textarea
              rows={6}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Example: I've had headache and vomiting since morning..."
              className="
                mt-10
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
                text-white
                outline-none
                transition
                placeholder:text-slate-500
                focus:border-blue-500
              "
            />

            {error && (
              <p className="mt-4 text-center text-red-400">
                {error}
              </p>
            )}

            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? "Analyzing..."
                  : "Analyze Symptoms"}
              </Button>
            </div>
          </GlassCard>
        ) : (
          <HealthReport
            prediction={prediction}
            onReset={handleReset}
          />
        )}
      </div>
    </Section>
  );
}