import { motion } from "framer-motion";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Button from "../../common/Button";

const stats = [
  {
    value: "280+",
    label: "Symptoms Tracked",
  },
  {
    value: "300+",
    label: "Diseases Covered",
  },
  {
    value: "< 2 Min",
    label: "Fast Analysis",
  },
];

export default function HeroContent() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleStartChecker = () => {
    if (isAuthenticated) {
      navigate("/diagnosis");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-3xl mx-auto text-center space-y-6">
      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
        }}
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight"
      >
        {isAuthenticated ? (
          <>
            Welcome Back to Your <span className="text-blue-600">Health Portal</span>
          </>
        ) : (
          <>
            Your Health, <span className="text-blue-600">Our Mission</span>
          </>
        )}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2,
        }}
        className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-slate-600 font-normal"
      >
        {isAuthenticated
          ? "View previous diagnostic reports, track symptom history, manage your health profile, and perform instant AI symptom assessments."
          : "Transform complex, freeform symptom descriptions into clear clinical insights. Evaluate risks across 300+ diseases with evidence-backed care guidance."}
      </motion.p>

      {/* Quick Highlights */}
      {!isAuthenticated && (
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-slate-600">
          <span>• Free 2-Minute Screening</span>
          <span>• Voice & Text Input</span>
          <span>• Encrypted & Private</span>
        </div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.35,
        }}
        className="pt-2 flex flex-wrap items-center justify-center gap-4"
      >
        {isAuthenticated ? (
          <>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate("/diagnosis")}
            >
              Start Assessment
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              size="md"
              onClick={handleStartChecker}
            >
              Sign In to Start Assessment →
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate("/register")}
            >
              Create Free Account
            </Button>
          </>
        )}
      </motion.div>

      {/* Factual Stats Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5,
        }}
        className="pt-8 border-t border-slate-200/80 max-w-xl mx-auto grid grid-cols-3 gap-6 text-center"
      >
        {stats.map((item) => (
          <div key={item.label}>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {item.value}
            </h3>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              {item.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}