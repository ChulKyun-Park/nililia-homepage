import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "문의하기 | Nililia",
  description:
    "Nililia에 프로젝트 상담, 견적 요청, 파트너십 문의를 해주세요. 전문 컨설턴트가 빠르게 답변드립니다.",
  openGraph: {
    title: "문의하기 | Nililia",
    description:
      "Nililia에 프로젝트 상담, 견적 요청, 파트너십 문의를 해주세요.",
  },
};

const contactInfo = [
  {
    icon: Mail,
    title: "이메일",
    value: "hello@nililia.com",
    href: "mailto:hello@nililia.com",
    description: "24시간 내 답변 보장",
  },
  {
    icon: Phone,
    title: "전화",
    value: "02-1234-5678",
    href: "tel:02-1234-5678",
    description: "평일 09:00 ~ 18:00",
  },
  {
    icon: MapPin,
    title: "주소",
    value: "서울특별시 강남구",
    href: null,
    description: "오시는 길 안내",
  },
  {
    icon: Clock,
    title: "영업시간",
    value: "평일 09:00 ~ 18:00",
    href: null,
    description: "주말/공휴일 휴무",
  },
];

const inquiryTypes = [
  {
    icon: MessageCircle,
    title: "프로젝트 상담",
    description: "번역 및 현지화 프로젝트에 대한 무료 상담을 받아보세요.",
  },
  {
    icon: Mail,
    title: "견적 요청",
    description: "프로젝트 사양에 맞는 정확한 견적을 요청하세요.",
  },
  {
    icon: Phone,
    title: "파트너십 문의",
    description: "전략적 파트너십 및 협업에 대해 상의하세요.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-surface flex items-center min-h-[420px] py-4 lg:py-6">
        <div className="mx-auto max-w-7xl px-6 lg:pl-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Contact Us
          </p>
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl break-keep">
            문의하기
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted break-keep">
            프로젝트 상담, 견적 요청, 파트너십 등 무엇이든 문의해 주세요.
            전문 컨설턴트가 빠르게 답변드립니다.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <Card key={info.title} className="text-center">
                <div className="mx-auto mb-4 inline-flex rounded-xl bg-primary-light p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  {info.title}
                </h3>
                {info.href ? (
                  <a
                    href={info.href}
                    className="mt-2 block text-lg font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="mt-2 text-lg font-bold text-foreground">{info.value}</p>
                )}
                <p className="mt-1 text-xs text-muted">{info.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Contact Form + Inquiry Types */}
      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-foreground break-keep">
              문의 양식
            </h2>
            <p className="mt-2 text-sm text-muted break-keep">
              아래 양식을 작성해 주시면, 영업일 기준 1일 이내에 답변드립니다.
            </p>
            <form className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">
                    이름 / 담당자명
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="홍길동"
                    className="mt-2 block w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground">
                    회사명
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="(주)회사이름"
                    className="mt-2 block w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                    className="mt-2 block w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                    연락처
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="010-1234-5678"
                    className="mt-2 block w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-foreground">
                  관심 서비스
                </label>
                <select
                  id="service"
                  name="service"
                  className="mt-2 block w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">서비스를 선택해 주세요</option>
                  <option value="video">영상 번역</option>
                  <option value="document">문서 번역</option>
                  <option value="web-app">웹 · 앱 현지화</option>
                  <option value="game">게임 현지화</option>
                  <option value="webnovel">웹소설 번역</option>
                  <option value="sdh">SDH · 배리어프리 자막 제작</option>
                  <option value="other">기타</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                  문의 내용
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="프로젝트에 대해 자세히 알려주세요."
                  className="mt-2 block w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
              >
                문의 보내기
              </button>
            </form>
          </div>

          {/* Inquiry Types */}
          <div>
            <h2 className="text-2xl font-bold text-foreground break-keep">
              문의 유형
            </h2>
            <p className="mt-2 text-sm text-muted break-keep">
              어떤 종류의 문의든 환영합니다.
            </p>
            <div className="mt-8 space-y-6">
              {inquiryTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card key={type.title} className="flex items-start gap-4">
                    <div className="shrink-0 rounded-xl bg-primary-light p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{type.title}</h3>
                      <p className="mt-1 text-sm text-muted break-keep">{type.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
