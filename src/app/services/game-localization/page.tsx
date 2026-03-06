import PageHero from "@/components/sections/PageHero";
import BottomCTA from "@/components/sections/BottomCTA";
import {
  SupportedLanguages,
  ServiceWhy,
  ServiceProcess,
} from "@/components/sections/service-detail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "게임 현지화 | 닐리리아",
  description:
    "게임 UI, 스토리, 마케팅 자료까지 완벽한 게임 현지화를 지원합니다.",
};

const whyItems = [
  {
    title: "게임 전문 번역가 매칭",
    description: "게임 장르와 플랫폼에 맞는 전문 번역가를 배정합니다.",
  },
  {
    title: "스토리 & 대화 현지화",
    description: "캐릭터 성격과 세계관을 반영한 몰입감 있는 번역을 제공합니다.",
  },
  {
    title: "인게임 에셋 현지화",
    description: "UI 텍스트, 이미지, 폰트 등 게임 내 모든 에셋을 현지화합니다.",
  },
  {
    title: "LQA 테스트 지원",
    description: "실제 플레이 환경에서 번역 품질과 UI 적합성을 검증합니다.",
  },
];

const processSteps = [
  { title: "상담 & 분석", description: "게임 장르, 플랫폼, 타겟 시장을 분석합니다." },
  { title: "용어집 구축", description: "게임 세계관에 맞는 전문 용어집을 구축합니다." },
  { title: "번역", description: "게임 전문 번역가가 스토리와 UI를 번역합니다." },
  { title: "에셋 현지화", description: "이미지, 폰트, 레이아웃을 현지화합니다." },
  { title: "LQA 테스트", description: "실제 게임 환경에서 품질을 검증합니다." },
  { title: "납품 & 지원", description: "최종 파일을 납품하고 출시 후 지원합니다." },
];

export default function Page() {
  return (
    <>
      <PageHero
        label="Services"
        title="게임 현지화"
        description="게임 UI, 스토리, 마케팅 자료까지 완벽한 게임 현지화를 지원합니다."
        imageSrc="/images/services/게임번역.jpeg"
        imageAlt="게임 현지화 서비스"
      />
      <SupportedLanguages />
      <ServiceWhy
        title="몰입감을 살리는 게임 현지화"
        items={whyItems}
      />
      <ServiceProcess steps={processSteps} />
      <BottomCTA />
    </>
  );
}
