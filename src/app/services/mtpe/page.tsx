import PageHero from "@/components/sections/PageHero";
import BottomCTA from "@/components/sections/BottomCTA";
import {
  SupportedLanguages,
  ServiceWhy,
  ServiceProcess,
} from "@/components/sections/service-detail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MTPE | 닐리리아",
  description:
    "AI 기계 번역과 전문가 감수를 결합한 MTPE 서비스로, 대규모 프로젝트도 빠르고 정확하게 처리합니다.",
};

const whyItems = [
  {
    title: "AI + 전문가 하이브리드",
    description: "AI 엔진이 초벌 번역을 수행하고, 전문 번역가가 문맥과 뉘앙스를 보정합니다.",
  },
  {
    title: "맞춤 용어집 & 번역 메모리",
    description: "프로젝트별 TB/TM 구축으로 일관된 용어와 문체를 유지합니다.",
  },
  {
    title: "빠른 납기 & 비용 효율",
    description: "순수 인력 번역 대비 납기를 단축하면서도 전문가 수준의 품질을 확보합니다.",
  },
  {
    title: "교정 수준 선택 가능",
    description: "Light PE부터 Full PE까지, 프로젝트 목적에 맞는 교정 수준을 선택할 수 있습니다.",
  },
];

const processSteps = [
  { title: "상담 & 분석", description: "프로젝트 요구사항과 적합한 PE 수준을 결정합니다." },
  { title: "AI 엔진 선정", description: "분야에 최적화된 기계 번역 엔진을 적용합니다." },
  { title: "AI 초벌 번역", description: "기계 번역 엔진이 초벌 번역을 수행합니다." },
  { title: "전문가 포스트에디팅", description: "전문 번역가가 오류를 수정하고 품질을 높입니다." },
  { title: "감수 & QC", description: "최종 검수를 통해 일관성과 정확성을 확인합니다." },
  { title: "납품", description: "원하는 형식으로 최종 결과물을 납품합니다." },
];

export default function Page() {
  return (
    <>
      <PageHero
        label="Services"
        title="MTPE"
        description="AI 기계 번역과 전문가 감수를 결합한 MTPE 서비스로, 대규모 프로젝트도 빠르고 정확하게 처리합니다."
        imageSrc="/images/services/MTPE.png"
        imageAlt="MTPE 서비스"
      />
      <SupportedLanguages />
      <ServiceWhy
        title="AI와 전문가의 시너지로 완성합니다"
        items={whyItems}
      />
      <ServiceProcess steps={processSteps} />
      <BottomCTA />
    </>
  );
}
