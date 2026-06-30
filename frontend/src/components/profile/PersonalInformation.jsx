export default function PersonalInformation({
  form,
  handleChange,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Section Header */}

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">

          <span className="text-2xl">👤</span>

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-800">

            Personal Information

          </h2>

          <p className="text-slate-500">

            Basic health information.

          </p>

        </div>

      </div>

      {/* Form */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Age */}

        <div>

          <label className="mb-2 block font-medium text-slate-700">

            Age
            <span className="text-red-500"> *</span>

          </label>

          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Enter your age"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* Gender */}

        <div>

          <label className="mb-2 block font-medium text-slate-700">

            Gender
            <span className="text-red-500"> *</span>

          </label>

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >

            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

        {/* Height */}

        <div>

          <label className="mb-2 block font-medium text-slate-700">

            Height (cm)
            <span className="text-red-500"> *</span>

          </label>

          <input
            type="number"
            name="height_cm"
            value={form.height_cm}
            onChange={handleChange}
            placeholder="170"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* Weight */}

        <div>

          <label className="mb-2 block font-medium text-slate-700">

            Weight (kg)
            <span className="text-red-500"> *</span>

          </label>

          <input
            type="number"
            name="weight_kg"
            value={form.weight_kg}
            onChange={handleChange}
            placeholder="65"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* Blood Group */}

        <div className="md:col-span-2">

          <label className="mb-2 block font-medium text-slate-700">

            Blood Group
            <span className="text-red-500"> *</span>

          </label>

          <select
            name="blood_group"
            value={form.blood_group}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >

            <option value="">
              Select Blood Group
            </option>

            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>

          </select>

        </div>

      </div>

    </div>
  );
}