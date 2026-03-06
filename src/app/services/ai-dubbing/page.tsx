import PageHero from "@/components/sections/PageHero";
import BottomCTA from "@/components/sections/BottomCTA";
import {
  SupportedLanguages,
  ServiceWhy,
  ServiceProcess,
} from "@/components/sections/service-detail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 번역 · 더빙 | 닐리리아",
  description:
    "AI 음성 합성과 립싱크 기술로 영상 콘텐츠를 다국어로 자연스럽게 더빙하여 글로벌 시청자에게 전달합니다.",
};

const whyItems = [
  {
    title: "AI 음성 클로닝",
    description: "원본 화자의 음색과 톤을 보존한 자연스러운 다국어 더빙을 제공합니다.",
  },
  {
    title: "립싱크 기술 적용",
    description: "입 모양과 음성이 자연스럽게 일치하는 영상을 제작합니다.",
  },
  {
    title: "비용 & 시간 절감",
    description: "전통 더빙 대비 제작 시간과 비용을 획기적으로 절감합니다.",
  },
  {
    title: "전문가 스크립트 감수",
    description: "전문 번역가의 감수를 거쳐 문화적 뉘앙스와 정확성을 보장합니다.",
  },
];

const processSteps = [
  { title: "상담 & 분석", description: "영상 콘텐츠와 타겟 언어를 분석합니다." },
  { title: "스크립트 번역", description: "전문 번역가가 더빙용 스크립트를 번역합니다." },
  { title: "AI 음성 생성", description: "AI 엔진으로 다국어 음성을 생성합니다." },
  { title: "립싱크 적용", description: "영상에 맞춰 립싱크를 자동 조정합니다." },
  { title: "감수 & 편집", description: "전문가가 음성 품질과 싱크를 최종 검수합니다." },
  { title: "납품", description: "완성된 다국어 더빙 영상을 납품합니다." },
];

export default function Page() {
  return (
    <>
      <PageHero
        label="Services"
        title="AI 번역 · 더빙"
        description="AI 음성 합성과 립싱크 기술로 영상 콘텐츠를 다국어로 자연스럽게 더빙하여 글로벌 시청자에게 전달합니다."
        imageSrc="/images/services/AI 번역·더빙.jpeg"
        imageAlt="AI 번역 · 더빙 서비스"
      />
      <SupportedLanguages />
      <ServiceWhy
        title="AI 기술로 더빙의 새로운 기준을 제시합니다"
        items={whyItems}
      />
      <ServiceProcess steps={processSteps} />
      <BottomCTA />
    </>
  );
}
