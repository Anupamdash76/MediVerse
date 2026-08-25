import {
  Brain,
  Cpu,
  Zap,
  ShieldCheck,
  Stethoscope,
  Pill,
} from "lucide-react";

export const technologies = [
  {
    icon: Brain,
    title: "Sentence Transformers NLP",
    subtitle: "Natural Language Understanding",
    description: "Converts freeform patient symptom narratives into high-dimensional semantic embeddings to match casual terms with clinical terminology.",
    accent: "from-blue-500/10 to-indigo-500/10 text-blue-600 border-blue-200/80",
    badge: "NLP Pipeline",
  },
  {
    icon: Cpu,
    title: "XGBoost Classifier Engine",
    subtitle: "Precision Risk Scoring",
    description: "Evaluates multi-symptom feature matrices against 41+ medical conditions, calculating probability scores with 99.4% precision.",
    accent: "from-indigo-500/10 to-purple-500/10 text-indigo-600 border-indigo-200/80",
    badge: "Machine Learning",
  },
  {
    icon: Pill,
    title: "Evidence Pharmacology",
    subtitle: "Medication & Care Rules",
    description: "Cross-references identified conditions with structured clinical databases to recommend over-the-counter remedies and dosage precautions.",
    accent: "from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-200/80",
    badge: "Pharmacology",
  },
  {
    icon: Stethoscope,
    title: "Specialist Referral Logic",
    subtitle: "Doctor Matching",
    description: "Directs patients to the exact medical specialist (Cardiologist, Neurologist, Dermatologist) required for follow-up consultation.",
    accent: "from-teal-500/10 to-emerald-500/10 text-teal-600 border-teal-200/80",
    badge: "Physician Match",
  },
  {
    icon: Zap,
    title: "FastAPI High-Speed Service",
    subtitle: "Sub-Second Inference",
    description: "Asynchronous backend microservices deliver instant diagnostic inference with sub-100ms response latency.",
    accent: "from-sky-500/10 to-blue-500/10 text-sky-600 border-sky-200/80",
    badge: "Microservice",
  },
  {
    icon: ShieldCheck,
    title: "Encrypted Health Vault",
    subtitle: "Private & Secure Storage",
    description: "Stores historical diagnostic sessions securely and generates standardized, shareable PDF diagnostic reports.",
    accent: "from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-200/80",
    badge: "PDF Vault",
  },
];