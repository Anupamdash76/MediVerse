import Section from "../../common/Section";
import Container from "../../common/Container";
import FeatureCard from "./FeatureCard";

import {
  MessageSquareText,
  Search,
  Cpu,
  FileCheck,
} from "lucide-react";

const steps = [
  {
    stepNumber: "01",
    icon: <MessageSquareText size={26} />,
    subtitle: "Input Phase",
    title: "Describe Symptoms in Plain Language",
    description: "Type naturally or use our high-fidelity microphone assistant to speak your symptoms without complex medical jargon.",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    stepNumber: "02",
    icon: <Search size={26} />,
    subtitle: "NLP Semantic Extraction",
    title: "Clinical Feature Tokenization",
    description: "Sentence transformers parse your input into 280+ standardized clinical symptom vectors for precise machine matching.",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    stepNumber: "03",
    icon: <Cpu size={26} />,
    subtitle: "Classifier Engine",
    title: "Multi-Disease Risk Prediction",
    description: "Trained XGBoost models calculate similarity scores across 41+ medical conditions, ordering results by probability.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    stepNumber: "04",
    icon: <FileCheck size={26} />,
    subtitle: "Action Plan",
    title: "Care Guidance & Exportable PDF",
    description: "Receive recommended specialist types, evidence-backed dosage guides, care precautions, and exportable PDF reports.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
];

export default function Features() {
  return (
    <Section id="journey" className="py-24 bg-gradient-to-b from-white via-slate-50/70 to-white border-y border-slate-200/60">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-extrabold text-blue-700 uppercase tracking-widest mb-3">
            The Patient Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            From Confusion to Clarity in 4 Simple Steps
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            Discover how MediVerse turns raw, multi-symptom inputs into a structured clinical roadmap in under 2 minutes.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <FeatureCard key={step.stepNumber} {...step} />
          ))}
        </div>
      </Container>
    </Section>
  );
}