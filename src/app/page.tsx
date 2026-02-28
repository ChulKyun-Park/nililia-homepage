import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Mission from "@/components/sections/Mission";
import ServiceGrid from "@/components/sections/ServiceGrid";
import WhyUs from "@/components/sections/WhyUs";
import News from "@/components/sections/News";
import CaseStudy from "@/components/sections/CaseStudy";
import BottomCTA from "@/components/sections/BottomCTA";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Mission />
      <ServiceGrid />
      <WhyUs />
      <News />
      <CaseStudy />
      <BottomCTA />
    </>
  );
}
