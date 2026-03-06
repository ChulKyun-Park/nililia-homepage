import PageHero from "@/components/sections/PageHero";
import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "문의하기 | 닐리리아",
  description:
    "닐리리아에 프로젝트 상담, 견적 요청, 파트너십 문의를 해주세요. 전문 컨설턴트가 빠르게 답변드립니다.",
  openGraph: {
    title: "문의하기 | 닐리리아",
    description:
      "닐리리아에 프로젝트 상담, 견적 요청, 파트너십 문의를 해주세요.",
  },
};

const contactInfo = [
  {
    icon: Mail,
    title: "이메일",
    value: "sales@nililia.com",
    href: "mailto:sales@nililia.com",
    description: "24시간 내 답변 보장",
  },
  {
    icon: Phone,
    title: "전화",
    value: "070-8820-3116",
    href: "tel:070-8820-3116",
    description: "평일 10:00 ~ 19:00",
  },
  {
    icon: MapPin,
    title: "주소",
    value: "경기도 안양시 동안구",
    href: null,
    description: "시민대로 327번길 11-41, 6층",
  },
  {
    icon: Clock,
    title: "영업시간",
    value: "평일 10:00 ~ 19:00",
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
      <PageHero
        label="Contact Us"
        title="문의하기"
        description="프로젝트 상담, 견적 요청, 파트너십 등 무엇이든 문의해 주세요. 전문 컨설턴트가 빠르게 답변드립니다."
      />

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
                <p className="mt-1 text-sm text-muted">{info.description}</p>
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
            <div className="mt-8">
              <ContactForm />
            </div>
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
