import Container from "../common/Container";
import { Stethoscope, ShieldCheck, Lock, Share2, Mail, MessageCircle, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="relative mt-0 pt-0">
      {/* Multi-Layered Flowing Wave SVG Header */}
      <div className="w-full overflow-hidden leading-none bg-transparent">
        <svg
          className="relative block w-full h-28 sm:h-40"
          viewBox="0 0 1200 140"
          preserveAspectRatio="none"
        >
          {/* Layer 1: Soft Indigo/Periwinkle Back Wave Layer */}
          <path
            d="M0,20 C360,85 760,40 1200,10 L1200,140 L0,140 Z"
            fill="#818CF8"
            fillOpacity="0.2"
          />

          {/* Layer 2: Soft Coral Rose Middle Wave Layer */}
          <path
            d="M0,35 C330,105 720,70 1200,25 L1200,140 L0,140 Z"
            fill="#F472B6"
            fillOpacity="0.25"
          />

          {/* Subtle Top Accent Ribbon Wave Lines matching MediBuddy */}
          <path
            d="M600,45 C800,10 1000,35 1200,5"
            fill="none"
            stroke="#FDA4AF"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
          <path
            d="M550,60 C780,20 980,45 1200,15"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />

          {/* Layer 3: Main Flowing Sunset Wave Gradient Path */}
          <path
            d="M0,50 C300,125 700,115 1200,40 L1200,140 L0,140 Z"
            fill="url(#medibuddy-sunset-gradient)"
          />

          <defs>
            <linearGradient id="medibuddy-sunset-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A58AD" />
              <stop offset="35%" stopColor="#6F529B" />
              <stop offset="68%" stopColor="#A04770" />
              <stop offset="100%" stopColor="#C54652" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Footer Container matching MediBuddy Warm Palette */}
      <div className="bg-[linear-gradient(90deg,#4A58AD_0%,#6F529B_35%,#A04770_68%,#C54652_100%)] text-white pt-4 pb-12">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-white/20">
            {/* Brand & Mission */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#4A58AD] font-bold shadow-md">
                  <Stethoscope size={22} />
                </div>
                <h2 className="text-xl font-extrabold tracking-tight text-white">
                  Medi<span className="text-pink-200">Verse</span>
                </h2>
              </div>
              <p className="text-xs text-purple-100/90 leading-relaxed font-normal">
                Your trusted digital healthcare companion. Providing instant symptom risk assessment, diagnostic insights, and evidence-backed medication recommendations.
              </p>
              <div className="flex items-center gap-4 text-xs text-pink-100/90 pt-1">
                <span className="flex items-center gap-1 font-semibold text-emerald-300">
                  <ShieldCheck size={14} /> 100% Encrypted
                </span>
                <span className="flex items-center gap-1 font-semibold text-blue-200">
                  <Lock size={14} /> Private & Secure
                </span>
              </div>
            </div>

            {/* Health Column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/95 mb-4">
                Healthcare Services
              </h3>
              <ul className="space-y-2.5 text-xs text-purple-100/85 font-medium">
                <li><a href="/diagnosis" className="hover:text-white transition">AI Symptom Assessment</a></li>
                <li><a href="/diagnosis" className="hover:text-white transition">Disease Risk Classifier</a></li>
                <li><a href="/diagnosis" className="hover:text-white transition">Medication Guidance</a></li>
                <li><a href="/diagnosis" className="hover:text-white transition">Specialist Doctor Referral</a></li>
                <li><a href="/history" className="hover:text-white transition">Digital Health Records Vault</a></li>
              </ul>
            </div>

            {/* Platform Column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/95 mb-4">
                Platform & Resources
              </h3>
              <ul className="space-y-2.5 text-xs text-purple-100/85 font-medium">
                <li><a href="#home" className="hover:text-white transition">Home</a></li>
                <li><a href="#technology" className="hover:text-white transition">Clinical AI Technology</a></li>
                <li><a href="#faq" className="hover:text-white transition">Patient FAQs</a></li>
                <li><a href="/login" className="hover:text-white transition">Patient Portal Login</a></li>
                <li><a href="/register" className="hover:text-white transition">Create Free Account</a></li>
              </ul>
            </div>

            {/* About & Social */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/95 mb-4">
                About & Connect
              </h3>
              <p className="text-xs text-purple-100/85 leading-relaxed font-normal mb-4">
                MediVerse provides preliminary AI symptom evaluations. In case of acute emergencies, consult emergency services immediately.
              </p>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <a href="#footer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition cursor-pointer">
                  <Globe size={16} />
                </a>
                <a href="#footer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition cursor-pointer">
                  <Mail size={16} />
                </a>
                <a href="#footer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition cursor-pointer">
                  <MessageCircle size={16} />
                </a>
                <a href="#footer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/20 transition cursor-pointer">
                  <Share2 size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Rights Bar */}
          <div className="flex flex-col items-center justify-center pt-8 text-xs text-purple-200/70 font-medium">
            <p>© {new Date().getFullYear()} MediVerse Digital Healthcare. All rights reserved.</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}