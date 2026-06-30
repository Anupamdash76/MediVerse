import { FiCheckCircle } from "react-icons/fi";

export default function ProfileCompletion({ percentage = 0 }) {

  return (

    <div className="mb-8 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">

            Profile Completion

          </h2>

          <p className="mt-1 text-slate-500">

            Complete your profile for more accurate AI predictions.

          </p>

        </div>

        <FiCheckCircle
          className="text-blue-600"
          size={34}
        />

      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">

        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <p className="mt-3 font-semibold text-blue-700">

        {percentage}% Complete

      </p>

    </div>

  );

}