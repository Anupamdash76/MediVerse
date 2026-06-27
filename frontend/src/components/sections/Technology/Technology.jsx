import { motion } from "framer-motion";

import Section from "../../common/Section";

import TechnologyCard from "./TechnologyCard";

import { technologies } from "./technologyData";

export default function Technology() {
  return (
    <Section className="pt-10" id="technology">

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >

        <h2 className="text-center text-5xl font-black">

          Powered by Modern AI

        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-slate-400">

          Built using industry-standard technologies to provide
          intelligent disease prediction with scalable deployment.

        </p>

      </motion.div>

      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {technologies.map((tech) => (

          <TechnologyCard
            key={tech.title}
            {...tech}
          />

        ))}

      </div>

    </Section>
  );
}