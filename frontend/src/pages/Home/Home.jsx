import Layout from "../../components/layout/Layout";

import Hero from "../../components/sections/Hero/Hero";
import Diagnosis from "../../components/sections/Diagnosis/Diagnosis";
import Technology from "../../components/sections/Technology/Technology";

export default function Home() {
  return (
    <Layout>

      <Hero />

      <Diagnosis />

      <Technology />

    </Layout>
  );
}