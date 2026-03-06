import PageHero from "@/components/sections/PageHero";
import BottomCTA from "@/components/sections/BottomCTA";
import {
  SupportedLanguages,
  ServiceWhy,
  ServiceProcess,
} from "@/components/sections/service-detail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "웹소설 · 웹툰 번역 | 닐리리아",
  description:
    "웹소설, 웹툰 등 한류 콘텐츠의 고품질 번역 서비스를 제공합니다.",
};

const whyItems = [
  {
    title: "장르별 전문 번역가 매칭",
    description: "로맨스, 판타지, 무협 등 장르에 특화된 번역가를 배정합니다.",
  },
  {
    title: "독자 몰입감을 살리는 번역",
    description: "원작의 문체와 분위기를 살려 현지 독자가 자연스럽게 몰입할 수 있도록 합니다.",
  },
  {
    title: "대량 에피소드 일괄 처리",
    description: "연재 일정에 맞춰 대량 에피소드도 빠르고 일관되게 처리합니다.",
  },
  {
    title: "글로벌 플랫폼 동시 연재",
    description: "다양한 국가의 플랫폼에 맞춰 동시 연재를 지원합니다.",
  },
];

const processSteps = [
  { title: "상담 & 견적", description: "작품 장르, 분량, 일정을 분석하여 견적을 제공합니다." },
  { title: "번역가 매칭", description: "장르와 문체에 맞는 전문 번역가를 매칭합니다." },
  { title: "번역", description: "원작의 톤과 뉘앙스를 살려 번역합니다." },
  { title: "감수", description: "전문 감수자가 번역 품질과 일관성을 검증합니다." },
  { title: "레터링 (웹툰)", description: "웹툰의 경우 대사 레터링 작업을 진행합니다." },
  { title: "납품", description: "플랫폼 규격에 맞게 최종 파일을 납품합니다." },
];

export default function Page() {
  return (
    <>
      <PageHero
        label="Services"
        title="웹소설 · 웹툰 번역"
        description="웹소설, 웹툰 등 한류 콘텐츠의 고품질 번역 서비스를 제공합니다."
        imageSrc="/images/services/웹툰번역.jpeg"
        imageAlt="웹소설 · 웹툰 번역 서비스"
      />
      <SupportedLanguages />
      <ServiceWhy
        title="글로벌 독자를 사로잡는 번역"
        items={whyItems}
      />
      <ServiceProcess steps={processSteps} />
      <BottomCTA />
    </>
  );
}
