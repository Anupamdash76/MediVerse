import { motion } from "framer-motion";
import Container from "../../common/Container";
import GlowBackground from "../../common/GlowBackground";
import HeroContent from "./HeroContent";
import QuickServicesGrid from "./QuickServicesGrid";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 sm:pt-40 pb-20 mesh-gradient-bg"
    >
      <GlowBackground />

      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full"
        >
          <HeroContent />
        </motion.div>

        {/* MediBuddy Centerpiece & Features */}
        <QuickServicesGrid />
      </Container>
    </section>
  );
}