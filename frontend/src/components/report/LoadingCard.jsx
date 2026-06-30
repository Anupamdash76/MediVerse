import {
  Brain,
  Search,
  Activity,
  FileText,
  CheckCircle2,
} from "lucide-react";

import { useEffect, useState } from "react";

const steps = [
  {
    icon: Brain,
    text: "Extracting symptoms",
  },
  {
    icon: Search,
    text: "Running semantic search",
  },
  {
    icon: Activity,
    text: "Matching disease patterns",
  },
  {
    icon: FileText,
    text: "Generating medical report",
  },
];

export default function LoadingCard() {

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setActiveStep((previous) => {

        if (previous >= steps.length - 1) {
          return previous;
        }

        return previous + 1;

      });

    }, 700);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">

      {/* Header */}

      <div className="border-b border-slate-800 px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-xl bg-blue-600">

            <Brain className="text-white" size={24} />

          </div>

          <div>

            <h3 className="text-xl font-bold text-white">

              AI Analysis in Progress

            </h3>

            <p className="text-sm text-slate-400">

              MediVerse is analyzing your symptoms...

            </p>

          </div>

        </div>

      </div>

      {/* Steps */}

      <div className="space-y-3 p-8">

        {steps.map((step, index) => {

          const Icon = step.icon;

          const completed = index < activeStep;

          const current = index === activeStep;

          return (

            <div
              key={step.text}
              className={`
                flex items-center gap-4 rounded-2xl p-4 transition-all duration-500

                ${
                  completed
                    ? "bg-green-500/10"
                    : current
                    ? "bg-blue-500/10"
                    : "bg-slate-800"
                }
              `}
            >

              {completed ? (

                <CheckCircle2
                  className="text-green-400"
                  size={22}
                />

              ) : (

                <Icon
                  size={22}
                  className={
                    current
                      ? "animate-pulse text-blue-400"
                      : "text-slate-500"
                  }
                />

              )}

              <span
                className={
                  completed
                    ? "text-green-300"
                    : current
                    ? "text-blue-300"
                    : "text-slate-400"
                }
              >
                {step.text}
              </span>

            </div>

          );

        })}

      </div>

    </div>

  );

}