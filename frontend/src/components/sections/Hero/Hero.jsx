import { motion } from "framer-motion";

import Container from "../../common/Container";
import GlowBackground from "../../common/GlowBackground";

import HeroContent from "./HeroContent";
import HeroPreview from "./HeroPreview";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-36 pb-28"
    >
      <GlowBackground />

      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="
            relative
            z-10
            grid
            items-center
            gap-16
            lg:grid-cols-2
          "
        >
          <HeroContent />

          <HeroPreview />
        </motion.div>
      </Container>
    </section>
  );
}