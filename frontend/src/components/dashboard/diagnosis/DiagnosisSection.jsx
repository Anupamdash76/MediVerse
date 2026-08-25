import { useState } from "react";

import usePrediction from "../../../hooks/usePrediction";

import DashboardHealthReport from "../../report/DashboardHealthReport";
import LoadingCard from "../../report/LoadingCard";

import DiagnosisInputCard from "./DiagnosisInputCard";

export default function DiagnosisSection() {
  const [symptoms, setSymptoms] = useState("");

  const {
    loading,
    prediction,
    error,
    predict,
    reset,
  } = usePrediction();

  async function handleSubmit() {
    if (!symptoms.trim()) return;
    await predict(symptoms);
  }

  function handleReset() {
    setSymptoms("");
    reset();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {loading ? (
        <LoadingCard />
      ) : prediction ? (
        <DashboardHealthReport
          prediction={prediction}
          onReset={handleReset}
        />
      ) : (
        <DiagnosisInputCard
          symptoms={symptoms}
          setSymptoms={setSymptoms}
          onSubmit={handleSubmit}
          error={error}
        />
      )}
    </div>
  );
}