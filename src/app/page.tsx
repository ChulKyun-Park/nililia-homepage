import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import ServiceGrid from "@/components/sections/ServiceGrid";
import WhyUs from "@/components/sections/WhyUs";
import NewsCaseStudy from "@/components/sections/NewsCaseStudy";
import BottomCTA from "@/components/sections/BottomCTA";
import PopupModal from "@/components/popup/PopupModal";
import { fetchPopupItems } from "@/lib/notion/homePreview";

export const revalidate = 10;

export default async function Home() {
  const popups = await fetchPopupItems();

  return (
    <>
      <PopupModal popups={popups} />
      <Hero />
      <SocialProof />
      <ServiceGrid />
      <WhyUs />
      <NewsCaseStudy />
      <BottomCTA />
    </>
  );
}
