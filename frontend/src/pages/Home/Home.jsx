import Layout from "../../components/layout/Layout";

import Hero from "../../components/sections/Hero/Hero";
import Diagnosis from "../../components/sections/Diagnosis/Diagnosis";
import Technology from "../../components/sections/Technology/Technology";
import Features from "../../components/sections/Features/Features";

export default function Home() {
  return (
    <Layout>

      <Hero />

      <Features />
      
      <Technology />
      
      <Diagnosis />

    </Layout>
  );
}