import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, LogIn, UserPlus, ShieldCheck, HeartPulse, Sparkles } from "lucide-react";
import Section from "../../common/Section";
import Container from "../../common/Container";
import GlassCard from "../../common/GlassCard";
import Button from "../../common/Button";

export default function AuthCTASection() {
  const navigate = useNavigate();

  return (
    <Section id="predictor-access" className="py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="relative overflow-hidden p-8 sm:p-12 border-teal-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
            {/* Ambient Lighting */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Text Content */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-semibold text-teal-300">
                  <Lock size={14} className="text-teal-400" />
                  <span>Secure & Private Symptom Analysis</span>
                </div>

                <h2 className="text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">
                  Ready to Check Your Symptoms?
                </h2>

                <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                  To ensure your medical history remains private, encrypted, and accessible only to you, symptom analysis is exclusively available to authenticated members.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                    <span>Private & Encrypted Health Log</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <HeartPulse size={16} className="text-teal-400 shrink-0" />
                    <span>Instant Clinical Insights</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <Sparkles size={16} className="text-sky-400 shrink-0" />
                    <span>Specialist Doctor Guidance</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <Lock size={16} className="text-teal-400 shrink-0" />
                    <span>100% Free & Secure Account</span>
                  </div>
                </div>
              </div>

              {/* CTA Box */}
              <div className="lg:col-span-5 flex flex-col justify-center rounded-2xl border border-slate-700/60 bg-slate-950/80 p-6 sm:p-8 space-y-4 text-center">
                <h3 className="text-lg font-bold text-slate-100">
                  Access the AI Symptom Predictor
                </h3>
                <p className="text-xs text-slate-400">
                  Log in or create a free account to start your diagnosis immediately.
                </p>

                <div className="space-y-3 pt-2">
                  <Button
                    onClick={() => navigate("/login")}
                    className="w-full"
                  >
                    <LogIn size={18} className="mr-2" />
                    Log In to Continue
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={() => navigate("/register")}
                    className="w-full"
                  >
                    <UserPlus size={18} className="mr-2" />
                    Create Free Account
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </Container>
    </Section>
  );
}
