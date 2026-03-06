import PageHero from "@/components/sections/PageHero";
import BottomCTA from "@/components/sections/BottomCTA";
import {
  SupportedLanguages,
  ServiceWhy,
  ServiceProcess,
} from "@/components/sections/service-detail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문서 번역 | 닐리리아",
  description:
    "계약서, 매뉴얼, 마케팅 자료 등 전문 문서 번역 서비스를 제공합니다.",
};

const whyItems = [
  {
    title: "컨텐츠플라이S 전담 매니저 배정",
    description: "의료, IT, 법률, 교육 등 분야별 전문 번역가를 배정하고, 전담 매니저가 1:1 밀착 케어로 프로젝트를 관리합니다.",
  },
  {
    title: "1,300만+ 문장 쌍 기반 용어 일관성",
    description: "프로젝트별 맞춤 용어집(TB)과 번역 메모리(TM)를 구축하여, 10년간 축적된 데이터로 일관성을 보장합니다.",
  },
  {
    title: "레이아웃 보존 번역",
    description: "원본 문서의 디자인과 레이아웃을 그대로 유지하며 번역합니다. DTP 작업이 포함됩니다.",
  },
  {
    title: "NDA 체결 · 보안 작업 환경",
    description: "NDA 체결과 내부 에디터 중심의 보안 작업 환경으로 미공개 문서도 안전하게 관리합니다.",
  },
];

const processSteps = [
  { title: "상담 & 견적", description: "문서 유형과 분량을 분석하여 맞춤 견적을 제공합니다." },
  { title: "전문가 배정", description: "해당 분야 전문 번역가를 매칭합니다." },
  { title: "번역", description: "용어집과 스타일 가이드에 맞춰 번역을 진행합니다." },
  { title: "감수 & 교정", description: "전문 감수자가 정확성과 자연스러움을 검증합니다." },
  { title: "레이아웃 작업", description: "원본 포맷에 맞게 레이아웃을 복원합니다." },
  { title: "납품", description: "최종 검수 후 원하는 형식으로 납품합니다." },
];

export default function Page() {
  return (
    <>
      <PageHero
        label="Services"
        title="문서 번역"
        description="계약서, 매뉴얼, 마케팅 자료 등 전문 문서 번역 서비스를 제공합니다."
        imageSrc="/images/services/문서번역.jpeg"
        imageAlt="문서 번역 서비스"
      />
      <SupportedLanguages />
      <ServiceWhy
        title="전문 문서, 정확한 번역이 핵심입니다"
        items={whyItems}
      />
      <ServiceProcess steps={processSteps} />
      <BottomCTA />
    </>
  );
}
