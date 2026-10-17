import { EngineStrip } from "@/components/home/engine-strip";
import { FeatureGrid } from "@/components/home/feature-grid";
import { FeatureStory } from "@/components/home/feature-story";
import { FinalCta } from "@/components/home/final-cta";
import { GhostDemo } from "@/components/home/ghost-demo";
import { Hero } from "@/components/home/hero";
import { OpenSource } from "@/components/home/open-source";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EngineStrip />
      <FeatureStory />
      <GhostDemo />
      <FeatureGrid />
      <OpenSource />
      <FinalCta />
    </>
  );
}
