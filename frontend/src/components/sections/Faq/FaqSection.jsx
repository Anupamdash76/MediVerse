import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Section from "../../common/Section";
import Container from "../../common/Container";

const faqs = [
  {
    question: "How accurate is the MediVerse AI Symptom Checker?",
    answer: "MediVerse utilizes trained sentence transformers and XGBoost machine learning classifiers mapped against 300+ medical conditions and 280+ symptoms. While it delivers high diagnostic similarity precision, it is designed as a preliminary health screening tool and does not replace formal physician consultation.",
  },
  {
    question: "Is my personal health information kept private and secure?",
    answer: "Yes, absolute privacy is guaranteed. All symptom queries and patient diagnostic history sessions are encrypted in transit and at rest using enterprise TLS encryption. We never sell patient data or share individual health profiles with third parties.",
  },
  {
    question: "Can I use voice commands to speak my symptoms?",
    answer: "Yes. Simply click the microphone button in the symptom input box and speak naturally. Our automatic speech recognition system converts your spoken description directly into text for natural language processing.",
  },
  {
    question: "How do I share my diagnostic results with my doctor?",
    answer: "After completing a diagnostic assessment, click the 'Download PDF Health Report' button. MediVerse generates a standardized, clinical summary document that you can print or email directly to your healthcare provider.",
  },
  {
    question: "Is MediVerse completely free to use?",
    answer: "Yes, MediVerse's core AI symptom assessment, disease risk profiling, medication reference, and PDF report exports are completely free for all patients.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section className="pt-20 pb-6 border-t border-slate-200/80" id="faq">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-blue-50/90 border border-blue-200/80 px-3.5 py-1 text-xs font-semibold text-blue-700 mb-3">
            Patient Support
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-normal">
            Clear, authoritative answers regarding our clinical AI symptom screening platform.
          </p>
        </div>

        {/* Simple & Classy Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-base font-bold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl transition-transform shrink-0 ${
                      isOpen ? "rotate-180 bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
