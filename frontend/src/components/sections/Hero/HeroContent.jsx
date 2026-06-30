import { motion } from "framer-motion";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  UserPlus,
  Play,
} from "lucide-react";

import { AuthContext } from "../../../context/AuthContext";

import Button from "../../common/Button";

const stats = [
  {
    value: "41",
    label: "Diseases",
  },
  {
    value: "132",
    label: "Symptoms",
  },
  {
    value: "24/7",
    label: "AI Analysis",
  },
];

export default function HeroContent() {

  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);

  const scrollToDiagnosis = () => {

    const section = document.getElementById("diagnosis");

    if (section) {

      section.scrollIntoView({
        behavior: "smooth",
      });

    }

  };

  return (

    <div className="max-w-2xl">

      {/* Badge */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-blue-500/20
            bg-blue-500/10
            px-5
            py-2
            text-sm
            text-blue-300
            backdrop-blur
          "
        >

          <Sparkles size={16} />

          AI Powered Healthcare

        </div>

      </motion.div>

      {/* Heading */}

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.6,
        }}
        className="
          mt-8
          text-5xl
          font-black
          leading-tight
          tracking-tight
          md:text-6xl
          lg:text-7xl
        "
      >

        {isAuthenticated
          ? "Welcome Back"
          : "Your Personal"}

        <br />

        <span
          className="
            bg-gradient-to-r
            from-blue-400
            via-cyan-300
            to-violet-400
            bg-clip-text
            text-transparent
          "
        >

          {isAuthenticated
            ? "Continue Your Health Journey"
            : "AI Health Assistant"}

        </span>

      </motion.h1>

      {/* Description */}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.45,
        }}
        className="
          mt-8
          max-w-xl
          text-lg
          leading-8
          text-slate-400
        "
      >

        {isAuthenticated
          ? "Access your dashboard, review previous diagnoses, update your health profile and continue using MediVerse."
          : "Describe your symptoms naturally and receive intelligent disease prediction powered by semantic search, sentence transformers and machine learning."}

      </motion.p>

      {/* Buttons */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.6,
        }}
        className="mt-10 flex flex-wrap gap-4"
      >

        {isAuthenticated ? (

          <>
            <Button
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard
                size={18}
                className="mr-2"
              />

              Dashboard
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/diagnosis")}
            >
              Start New Diagnosis
            </Button>
          </>

        ) : (

          <>
            <Button
              onClick={scrollToDiagnosis}
            >
              <Play
                size={18}
                className="mr-2"
              />

              Try Demo

              <ArrowRight
                size={18}
                className="ml-2"
              />
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                navigate("/register")
              }
            >
              <UserPlus
                size={18}
                className="mr-2"
              />

              Get Started
            </Button>
          </>

        )}

      </motion.div>

      {/* Stats */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.8,
        }}
        className="
          mt-16
          grid
          max-w-lg
          grid-cols-3
          gap-8
        "
      >

        {stats.map((item) => (

          <div key={item.label}>

            <h3 className="text-4xl font-bold">

              {item.value}

            </h3>

            <p className="mt-2 text-slate-500">

              {item.label}

            </p>

          </div>

        ))}

      </motion.div>

    </div>

  );

}