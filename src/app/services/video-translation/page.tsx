import PageHero from "@/components/sections/PageHero";
import BottomCTA from "@/components/sections/BottomCTA";
import {
  SupportedLanguages,
  ServiceWhy,
  ServiceProcess,
  ServiceTiers,
} from "@/components/sections/service-detail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "영상 번역 | 닐리리아",
  description:
    "자막, 더빙, 보이스오버 등 모든 영상 콘텐츠의 다국어 번역 서비스를 제공합니다.",
};

const whyItems = [
  {
    title: "360명+ 전문 번역가 풀에서 최적의 인력 배정",
    description: "영상 콘텐츠에 특화된 검증 번역가가 문맥과 뉘앙스를 살려 번역합니다. 언어별 인하우스 품질 책임자가 결과물을 관리합니다.",
  },
  {
    title: "플랫폼별 가이드라인 준수",
    description: "넷플릭스, 유튜브, 디즈니+ 등 주요 플랫폼의 자막 규격을 숙지하고 있습니다. 타임코드 싱크와 포맷 변환까지 원스톱으로 처리합니다.",
  },
  {
    title: "1,300만+ 문장 쌍 데이터로 일관된 품질",
    description: "10년간 축적한 번역 데이터가 용어 일관성과 문체 통일을 뒷받침합니다. 도메인별 전문 용어집(TB)을 프로젝트마다 구축합니다.",
  },
  {
    title: "설립 이래 납기 지연 0건",
    description: "시리즈물, 시즌 단위 대량 작업도 일정 내에 일관된 품질로 처리합니다. 실시간 대시보드로 진행 상황을 투명하게 공유합니다.",
  },
];

const processSteps = [
  { title: "상담 & 견적", description: "영상 파일과 요구사항을 분석하여 맞춤 견적을 제공합니다." },
  { title: "스크립트 추출", description: "원본 영상에서 대사 스크립트를 추출하고 타임코드를 설정합니다." },
  { title: "번역 & 현지화", description: "분야별 전문 번역가가 문맥에 맞게 번역합니다." },
  { title: "자막 싱크 & 편집", description: "타임코드에 맞춰 자막을 배치하고 포맷을 조정합니다." },
  { title: "감수 & QC", description: "전문 감수자가 품질을 최종 검수합니다." },
  { title: "납품", description: "플랫폼 요구 포맷으로 변환하여 납품합니다." },
];

export default function Page() {
  return (
    <>
      <PageHero
        label="Services"
        title="영상 번역"
        description="자막, 더빙, 보이스오버 등 모든 영상 콘텐츠의 다국어 번역 서비스를 제공합니다."
        imageSrc="/images/services/영상번역.jpeg"
        imageAlt="영상 번역 서비스"
      />
      <SupportedLanguages />
      <ServiceTiers />
      <ServiceWhy
        title="영상 콘텐츠에 최적화된 번역을 경험하세요"
        items={whyItems}
      />
      <ServiceProcess steps={processSteps} />
      <BottomCTA />
    </>
  );
}
