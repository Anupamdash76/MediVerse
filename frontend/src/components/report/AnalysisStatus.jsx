import {
  Brain,
  Search,
  Database,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: Brain,
    title: "Natural Language Parsing",
  },
  {
    icon: Search,
    title: "Semantic Matching",
  },
  {
    icon: Database,
    title: "Disease Classification",
  },
];

export default function AnalysisStatus() {
  return (
    <div className="mt-10">

      <h3 className="mb-5 text-xl font-semibold">

        Analysis Pipeline

      </h3>

      <div className="space-y-4">

        {steps.map((step) => {

          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-5
              py-4
              "
            >
              <div className="flex items-center gap-4">

                <Icon
                  size={20}
                  className="text-blue-400"
                />

                <span>

                  {step.title}

                </span>

              </div>

              <CheckCircle2
                size={20}
                className="text-green-400"
              />

            </div>
          );
        })}

      </div>

    </div>
  );
}