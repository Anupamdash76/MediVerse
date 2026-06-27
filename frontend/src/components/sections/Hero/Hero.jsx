import Container from "../../common/Container";
import GlowBackground from "../../common/GlowBackground";

import HeroContent from "./HeroContent";
import HeroPreview from "./HeroPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-28">

      <GlowBackground />

      <Container>

        <div className="relative grid items-center gap-16 lg:grid-cols-2">

          <HeroContent />

          <HeroPreview />

        </div>

      </Container>

    </section>
  );
}