import Section from "../../common/Section";
import Container from "../../common/Container";

import FeatureCard from "./FeatureCard";

import {
  Brain,
  Pill,
  Stethoscope,
  History,
} from "lucide-react";

export default function Features() {

  return (

    <Section id="features">

      <Container>

        <div className="text-center">

          <h2 className="text-5xl font-black">

            Why MediVerse?

          </h2>

          <p className="mt-6 text-slate-400">

            Everything you need for AI-powered healthcare.

          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          <FeatureCard
            icon={<Brain size={40} />}
            title="AI Prediction"
            description="Predict diseases using NLP and Machine Learning."
          />

          <FeatureCard
            icon={<Pill size={40} />}
            title="Medicines"
            description="Receive recommended medicines for each prediction."
          />

          <FeatureCard
            icon={<Stethoscope size={40} />}
            title="Specialist"
            description="Know which doctor to consult next."
          />

          <FeatureCard
            icon={<History size={40} />}
            title="History"
            description="Save and revisit previous diagnoses securely."
          />

        </div>

      </Container>

    </Section>

  );

}