import {
  Brain,
  Zap,
  Database,
  Boxes,
  Cloud,
  Cpu,
} from "lucide-react";

export const technologies = [
  {
    icon: Brain,
    title: "Sentence Transformers",
    description:
      "Understands natural language symptoms using semantic embeddings.",
  },

  {
    icon: Cpu,
    title: "XGBoost",
    description:
      "Predicts diseases using an optimized machine learning classifier.",
  },

  {
    icon: Zap,
    title: "FastAPI",
    description:
      "Provides a fast and scalable backend prediction service.",
  },

  {
    icon: Database,
    title: "MongoDB",
    description:
      "Stores user prediction history and recommendation data.",
  },

  {
    icon: Boxes,
    title: "Docker",
    description:
      "Packages the application for consistent deployment.",
  },

  {
    icon: Cloud,
    title: "AWS EC2",
    description:
      "Hosts the backend securely in the cloud.",
  },
];