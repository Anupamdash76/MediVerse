import { FiArrowRight, FiActivity } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function HeroBanner() {

  const navigate = useNavigate();

  return (

    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 p-10 text-white shadow-2xl">

      {/* Background Glow */}

      <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

        <div className="max-w-2xl">

          <p className="mb-3 text-blue-100">

            AI Powered Healthcare

          </p>

          <h1 className="text-5xl font-black leading-tight">

            Your Personal

            <br />

            Health Assistant

          </h1>

          <p className="mt-6 text-lg text-blue-100">

            Analyze symptoms using Natural Language Processing,
            Machine Learning,
            and Semantic Search in seconds.

          </p>

          <button

            onClick={() => navigate("/diagnosis")}

            className="mt-8 flex items-center gap-3 rounded-xl bg-white px-6 py-4 font-semibold text-blue-700 transition hover:scale-105"

          >

            Start Diagnosis

            <FiArrowRight />

          </button>

        </div>

        <div className="hidden lg:flex">

          <div className="flex h-48 w-48 items-center justify-center rounded-full bg-white/20 backdrop-blur">

            <FiActivity size={90} />

          </div>

        </div>

      </div>

    </section>

  );

}   