import {
  FiArrowRight,
  FiShield,
  FiZap,
} from "react-icons/fi";

export default function DiagnosisInputCard({
  symptoms,
  setSymptoms,
  onSubmit,
  error,
}) {

  return (

    <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800 px-8 py-6">

        <div>

          <h2 className="text-3xl font-bold text-white">

            AI Disease Prediction

          </h2>

          <p className="mt-2 text-slate-400">

            Describe your symptoms naturally.
            The more details you provide,
            the better the prediction.

          </p>

        </div>

        <div className="hidden md:flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2">

          <FiShield className="text-emerald-400" />

          <span className="text-sm font-semibold text-emerald-400">

            Secure Analysis

          </span>

        </div>

      </div>

      {/* Body */}

      <div className="grid gap-8 p-8 lg:grid-cols-4">

        {/* Left Panel */}

        <div className="rounded-2xl bg-slate-800 p-6">

          <div className="flex items-center gap-3">

            <FiZap className="text-cyan-400" />

            <h3 className="font-semibold text-white">

              Example

            </h3>

          </div>

          <p className="mt-5 text-sm leading-7 text-slate-400">

            I have fever for two days,

            headache,

            body pain,

            sore throat,

            and mild cough.

          </p>

          <div className="mt-8 rounded-xl bg-slate-900 p-4">

            <p className="text-xs uppercase tracking-wider text-slate-500">

              Tips

            </p>

            <ul className="mt-3 space-y-2 text-sm text-slate-400">

              <li>• Mention duration</li>

              <li>• Mention severity</li>

              <li>• Mention related symptoms</li>

            </ul>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col lg:col-span-3">

          <textarea

            rows={4}

            value={symptoms}

            onChange={(e) =>

              setSymptoms(e.target.value)

            }

            placeholder="Example: I have fever since yesterday with headache, nausea and body pain..."

            className="min-h-[170px] w-full resize-none rounded-2xl border border-slate-700 bg-slate-800 p-6 text-lg text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"

          />

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm text-slate-500">

                {symptoms.length} / 1000 characters

              </p>

              {

                error && (

                  <p className="mt-2 text-red-400">

                    {error}

                  </p>

                )

              }

            </div>

            <button

              onClick={onSubmit}

              className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40"

            >

              Analyze Symptoms

              <FiArrowRight

                className="transition group-hover:translate-x-1"

              />

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}