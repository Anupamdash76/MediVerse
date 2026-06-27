import Section from "../../common/Section";
import GlassCard from "../../common/GlassCard";

import DiagnosisInput from "./DiagnosisInput";
import DiagnosisActions from "./DiagnosisActions";

export default function Diagnosis() {
  return (
    <Section id="diagnosis">

      <div className="mx-auto max-w-5xl">

        <GlassCard className="p-10">

          <h2 className="text-center text-5xl font-black">

            Start Your AI Diagnosis

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-400">

            Describe how you're feeling in natural language.
            Our AI will analyze your symptoms and generate
            intelligent healthcare recommendations.

          </p>

          <DiagnosisInput />

          <DiagnosisActions />

        </GlassCard>

      </div>

    </Section>
  );
}