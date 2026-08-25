import {
  FiArrowRight,
  FiShield,
  FiZap,
  FiPlus,
  FiActivity,
} from "react-icons/fi";
import VoiceInputButton from "../../common/VoiceInputButton";

const quickSymptoms = [
  "High Fever",
  "Severe Headache",
  "Persistent Cough",
  "Chest Tightness",
  "Body Pain",
  "Nausea & Vomiting",
  "Skin Rash",
  "Shortness of Breath",
];

export default function DiagnosisInputCard({
  symptoms,
  setSymptoms,
  onSubmit,
  error,
}) {
  const addQuickSymptom = (tag) => {
    if (!symptoms) {
      setSymptoms(tag);
    } else if (!symptoms.toLowerCase().includes(tag.toLowerCase())) {
      setSymptoms(`${symptoms.trim()}, ${tag}`);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(37,99,235,0.06)] transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 bg-slate-50/60 px-6 sm:px-8 py-5 gap-3">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-500/20">
            <FiActivity size={22} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Interactive AI Diagnosis Workspace
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Type or speak your symptoms below to get an instant ML risk prediction
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-emerald-50/90 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700 w-fit shadow-2xs">
          <FiShield className="text-emerald-600" />
          <span>100% Encrypted & Confidential</span>
        </div>
      </div>

      {/* Body */}
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-4">
        {/* Left Panel - Guidance & Examples */}
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 lg:col-span-1">
          <div className="flex items-center gap-2 text-blue-700 font-extrabold text-xs uppercase tracking-wider">
            <FiZap className="text-blue-600" />
            <span>Sample Patient Input</span>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-600 italic bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs font-normal">
            "I have had high fever for 2 days along with severe headache, body soreness, and dry cough..."
          </p>

          <div className="mt-5 rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Best Accuracy Tips
            </p>

            <ul className="mt-2.5 space-y-2 text-xs font-medium text-slate-600">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                Mention symptom duration
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                Include severity level
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                Add secondary feelings
              </li>
            </ul>
          </div>
        </div>

        {/* Right Input Area */}
        <div className="flex flex-col lg:col-span-3">
          {/* Quick Tag Chips */}
          <div className="mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
              Quick Symptom Selectors:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickSymptoms.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addQuickSymptom(tag)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition cursor-pointer active:scale-95"
                >
                  <FiPlus size={13} className="text-slate-400" />
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={4}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe your symptoms naturally (e.g. I have fever, sore throat, and body ache)..."
              className="min-h-[140px] w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-base text-slate-900 placeholder:text-slate-400 caret-blue-600 outline-none transition duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100/80 shadow-2xs font-normal"
            />
            
            <div className="absolute right-3 bottom-3">
              <VoiceInputButton setSymptoms={setSymptoms} />
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500 font-medium">
                {symptoms.length} / 1000 characters
              </p>
              {error && (
                <p className="mt-1 text-xs font-bold text-red-600">
                  {error}
                </p>
              )}
            </div>

            <button
              onClick={onSubmit}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 font-extrabold text-sm text-white shadow-md shadow-blue-600/20 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transition cursor-pointer active:scale-[0.98]"
            >
              <span>Analyze Symptoms</span>
              <FiArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}