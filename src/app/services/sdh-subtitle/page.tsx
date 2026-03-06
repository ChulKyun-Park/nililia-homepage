import PageHero from "@/components/sections/PageHero";
import BottomCTA from "@/components/sections/BottomCTA";
import {
  ServiceWhy,
  ServiceProcess,
} from "@/components/sections/service-detail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SDH · 배리어프리 자막 제작 | 닐리리아",
  description:
    "모든 사람을 위한 자막(SDH · 배리어프리) 제작으로 콘텐츠 접근성을 향상시킵니다.",
};

const whyItems = [
  {
    title: "2020년 출시 이래 5년+ SDH 제작 경험",
    description: "국내외 접근성 가이드라인(WCAG, 방송통신표준 등)을 철저히 준수하며, 축적된 노하우로 작업합니다.",
  },
  {
    title: "음향 효과 · 음악 설명 포함",
    description: "대사뿐 아니라 배경 음악, 효과음 등 비언어적 요소도 자막으로 전달합니다.",
  },
  {
    title: "화자 식별 자막",
    description: "여러 화자를 명확히 구분하여 시청 이해도를 높입니다. 인하우스 품질 책임자가 접근성 기준 충족 여부를 검수합니다.",
  },
  {
    title: "다국어 SDH · 9개 언어 대응",
    description: "한국어뿐 아니라 상시 지원 9개 언어로 SDH · 배리어프리 자막을 제작할 수 있습니다.",
  },
];

const processSteps = [
  { title: "상담 & 분석", description: "영상 콘텐츠와 접근성 요구사항을 분석합니다." },
  { title: "스크립트 작성", description: "대사, 음향 효과, 음악 등을 포함한 스크립트를 작성합니다." },
  { title: "SDH 자막 제작", description: "화자 식별과 비언어적 요소를 포함한 자막을 제작합니다." },
  { title: "접근성 검수", description: "가이드라인 준수 여부와 가독성을 검증합니다." },
  { title: "납품", description: "플랫폼 요구 포맷으로 최종 파일을 납품합니다." },
];

export default function Page() {
  return (
    <>
      <PageHero
        label="Services"
        title="SDH · 배리어프리 자막 제작"
        description="모든 사람을 위한 자막(SDH · 배리어프리) 제작으로 콘텐츠 접근성을 향상시킵니다."
        imageSrc="/images/services/SDH·배리어프리 자막 제작.jpeg"
        imageAlt="SDH · 배리어프리 자막 제작 서비스"
      />
      {/* SDH는 지원 언어 섹션 생략 */}
      <ServiceWhy
        title="모든 시청자를 위한 자막을 만듭니다"
        items={whyItems}
      />
      <ServiceProcess steps={processSteps} />
      <BottomCTA />
    </>
  );
}
