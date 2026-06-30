export default function MedicalInformation({
  form,
  handleChange,
}) {
  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">

          <span className="text-2xl">🩺</span>

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Medical Information
          </h2>

          <p className="text-slate-500">
            Optional information that helps improve AI prediction accuracy.
          </p>

        </div>

      </div>

      <div className="space-y-8">

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            Allergies
          </label>

          <input
            type="text"
            name="allergies"
            value={form.allergies}
            onChange={handleChange}
            placeholder="Dust, Pollen, Peanuts"
            className="form-input"
          />

          <p className="mt-2 text-sm text-slate-500">
            Separate multiple allergies using commas.
          </p>

        </div>

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            Chronic Diseases
          </label>

          <input
            type="text"
            name="chronic_diseases"
            value={form.chronic_diseases}
            onChange={handleChange}
            placeholder="Diabetes, Asthma"
            className="form-input"
          />

          <p className="mt-2 text-sm text-slate-500">
            List long-term medical conditions separated by commas.
          </p>

        </div>

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            Current Medications
          </label>

          <input
            type="text"
            name="current_medications"
            value={form.current_medications}
            onChange={handleChange}
            placeholder="Paracetamol, Vitamin D"
            className="form-input"
          />

          <p className="mt-2 text-sm text-slate-500">
            Enter medications separated by commas.
          </p>

        </div>

      </div>

    </div>

  );
}