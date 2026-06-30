import { useState } from "react";

import Section from "../../common/Section";

import DiagnosisHero from "./DiagnosisHero";
import DiagnosisInputCard from "./DiagnosisInputCard";

import LoadingCard from "../../report/LoadingCard";
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

  async function handleSubmit() {

    if (!symptoms.trim()) return;

    await predict(symptoms);

  }

  function handleReset() {

    setSymptoms("");

    reset();

  }

  return (

    <Section id="diagnosis">

      <div className="mx-auto max-w-6xl space-y-8">

        <DiagnosisHero />

        <DiagnosisInputCard
          symptoms={symptoms}
          setSymptoms={setSymptoms}
          onSubmit={handleSubmit}
          error={error}
        />

        {loading && (

          <LoadingCard />

        )}

        {prediction && (

          <HealthReport
            prediction={prediction}
            onReset={handleReset}
          />

        )}

      </div>

    </Section>

  );

}