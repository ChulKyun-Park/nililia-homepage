import PageHero from "@/components/sections/PageHero";
import BottomCTA from "@/components/sections/BottomCTA";
import {
  SupportedLanguages,
  ServiceWhy,
  ServiceProcess,
} from "@/components/sections/service-detail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "웹 · 앱 현지화 | 닐리리아",
  description:
    "웹사이트와 모바일 앱의 현지화로 글로벌 사용자 경험을 최적화합니다.",
};

const whyItems = [
  {
    title: "UI/UX 텍스트 현지화",
    description: "단순 번역이 아닌, 현지 사용자에게 자연스러운 인터페이스를 구현합니다.",
  },
  {
    title: "다국어 SEO 최적화",
    description: "검색 엔진에 최적화된 메타 태그와 키워드로 글로벌 트래픽을 확보합니다.",
  },
  {
    title: "CMS 연동 자동화",
    description: "다양한 CMS와 연동하여 번역 워크플로우를 자동화합니다.",
  },
  {
    title: "RTL 언어 레이아웃 지원",
    description: "아랍어, 히브리어 등 RTL 언어에 맞는 레이아웃 전환을 지원합니다.",
  },
];

const processSteps = [
  { title: "상담 & 분석", description: "웹/앱 구조를 분석하고 현지화 범위를 설정합니다." },
  { title: "리소스 추출", description: "UI 텍스트, 이미지, 메타데이터를 추출합니다." },
  { title: "번역 & 현지화", description: "전문 번역가가 현지 문화에 맞게 번역합니다." },
  { title: "QA 테스트", description: "다국어 환경에서 UI/UX와 기능을 검증합니다." },
  { title: "적용 & 배포", description: "번역본을 적용하고 배포를 지원합니다." },
  { title: "유지보수", description: "업데이트 시 변경된 콘텐츠를 신속하게 반영합니다." },
];

export default function Page() {
  return (
    <>
      <PageHero
        label="Services"
        title="웹 · 앱 현지화"
        description="웹사이트와 모바일 앱의 현지화로 글로벌 사용자 경험을 최적화합니다."
        imageSrc="/images/services/홈페이지 · 앱 현지화.png"
        imageAlt="웹 · 앱 현지화 서비스"
      />
      <SupportedLanguages />
      <ServiceWhy
        title="글로벌 사용자를 위한 완벽한 현지화"
        items={whyItems}
      />
      <ServiceProcess steps={processSteps} />
      <BottomCTA />
    </>
  );
}
