import { ContactCta } from "@/components/sections/contact-cta";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { GithubHeatmap } from "@/components/sections/github-heatmap";
import { Hero } from "@/components/sections/hero";
import { ServicesPreview } from "@/components/sections/services-preview";
import { StatsStrip } from "@/components/sections/stats-strip";
import { TerminalConsole } from "@/components/sections/terminal-console";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <main className="flex flex-col gap-24 pb-28 pt-2 md:gap-28">
      <section id="home" className="scroll-mt-24">
        <Hero />
      </section>
      <section id="about" className="scroll-mt-24">
        <StatsStrip />
      </section>
      <section id="projects" className="scroll-mt-24">
        <FeaturedProjects />
      </section>
      <section id="experience" className="scroll-mt-24">
        <GithubHeatmap />
      </section>
      <section id="certifications" className="scroll-mt-24">
        <TerminalConsole />
      </section>
      <section id="services" className="scroll-mt-24">
        <ServicesPreview />
      </section>
      <section id="blog" className="scroll-mt-24">
        <Testimonials />
      </section>
      <section id="contact" className="scroll-mt-24">
        <ContactCta />
      </section>
    </main>
  );
}
