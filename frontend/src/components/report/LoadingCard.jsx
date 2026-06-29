import { useEffect, useState } from "react";
import {
  Brain,
  Search,
  Database,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const steps = [
  {
    icon: Brain,
    title: "Understanding your symptoms",
  },
  {
    icon: Search,
    title: "Semantic symptom matching",
  },
  {
    icon: Database,
    title: "Running disease prediction model",
  },
];

export default function LoadingCard() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) =>
        prev < steps.length - 1 ? prev + 1 : prev
      );
    }, 900);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-10
      backdrop-blur-xl
      "
    >
      <div className="text-center">

        <Loader2
          size={52}
          className="
          mx-auto
          animate-spin
          text-blue-400
          "
        />

        <h2 className="mt-6 text-3xl font-bold">

          AI is analyzing your symptoms

        </h2>

        <p className="mt-3 text-slate-400">

          Please wait while MediVerse processes your input.

        </p>

      </div>

      <div className="mt-10 space-y-4">

        {steps.map((step, index) => {

          const Icon = step.icon;

          const completed = index < currentStep;

          const active = index === currentStep;

          return (
            <div
              key={step.title}
              className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-6
              py-5
              "
            >
              <div className="flex items-center gap-4">

                <Icon
                  size={22}
                  className="text-blue-400"
                />

                <span className="font-medium">

                  {step.title}

                </span>

              </div>

              {completed ? (

                <CheckCircle2
                  size={22}
                  className="text-green-400"
                />

              ) : active ? (

                <Loader2
                  size={22}
                  className="
                  animate-spin
                  text-blue-400
                  "
                />

              ) : (

                <div
                  className="
                  h-5
                  w-5
                  rounded-full
                  border
                  border-slate-500
                  "
                />

              )}

            </div>
          );
        })}

      </div>

      <p className="mt-8 text-center text-sm text-slate-500">

        Average analysis time: less than 3 seconds

      </p>

    </div>
  );
}