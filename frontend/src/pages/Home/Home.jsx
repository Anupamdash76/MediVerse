import Layout from "../../components/layout/Layout";
import Hero from "../../components/sections/Hero/Hero";
import Technology from "../../components/sections/Technology/Technology";
import FaqSection from "../../components/sections/Faq/FaqSection";

export default function Home() {
  return (
    <Layout>
      <div className="mesh-gradient-bg min-h-screen">
        <Hero />
        <Technology />
        <FaqSection />
      </div>
    </Layout>
  );
}