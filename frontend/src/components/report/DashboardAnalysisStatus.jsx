import {
  Brain,
  Cpu,
  Search,
  CheckCircle2,
} from "lucide-react";

const items = [
  {
    title: "Semantic Search",
    icon: Search,
  },
  {
    title: "Sentence Transformer",
    icon: Brain,
  },
  {
    title: "XGBoost Prediction",
    icon: Cpu,
  },
];

export default function DashboardAnalysisStatus() {

  return (

    <div className="grid gap-6 md:grid-cols-3">

      {items.map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >

            <div className="flex items-center justify-between">

              <Icon
                size={26}
                className="text-blue-600"
              />

              <CheckCircle2
                className="text-green-600"
                size={22}
              />

            </div>

            <h3 className="mt-5 font-semibold text-slate-900">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Completed Successfully
            </p>

          </div>

        );

      })}

    </div>

  );

}