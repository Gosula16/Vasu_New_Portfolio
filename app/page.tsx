import { ContactCta } from "@/components/sections/contact-cta";
import { CertificatesGallery } from "@/components/sections/certificates-gallery";
import { FeaturedProjects } from "@/components/sections/featured-projects";
// import { GithubHeatmap } from "@/components/sections/github-heatmap";
import { Hero } from "@/components/sections/hero";
import { ServicesPreview } from "@/components/sections/services-preview";
import { StatsStrip } from "@/components/sections/stats-strip";
import { TerminalConsole } from "@/components/sections/terminal-console";
// import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <main className="flex flex-col gap-24 pb-28 pt-2 md:gap-28">
      <Hero />
      <StatsStrip />
      <FeaturedProjects />
      {/* <GithubHeatmap /> */}
      <CertificatesGallery />
      <TerminalConsole />
      <ServicesPreview />
      {/* <Testimonials /> */}
      <ContactCta />
    </main>
  );
}
