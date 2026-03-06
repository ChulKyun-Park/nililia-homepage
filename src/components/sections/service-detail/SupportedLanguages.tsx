import Section from "@/components/ui/Section";

export interface Language {
  name: string;
  code: string;
  flag: string;
}

const CORE_LANGUAGES: Language[] = [
  { name: "영어", code: "EN", flag: "🇺🇸" },
  { name: "일본어", code: "JA", flag: "🇯🇵" },
  { name: "중국어(간체)", code: "ZH", flag: "🇨🇳" },
  { name: "중국어(번체)", code: "ZH-TW", flag: "🇹🇼" },
  { name: "베트남어", code: "VI", flag: "🇻🇳" },
  { name: "스페인어", code: "ES", flag: "🇪🇸" },
  { name: "인도네시아어", code: "ID", flag: "🇮🇩" },
  { name: "태국어", code: "TH", flag: "🇹🇭" },
  { name: "러시아어", code: "RU", flag: "🇷🇺" },
];

const EXTENDED_LANGUAGES: Language[] = [
  { name: "독일어", code: "DE", flag: "🇩🇪" },
  { name: "프랑스어", code: "FR", flag: "🇫🇷" },
];

interface SupportedLanguagesProps {
  title?: string;
  description?: string;
}

export default function SupportedLanguages({
  title = "콘텐츠가 도달하는 언어",
  description,
}: SupportedLanguagesProps) {
  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <span className="mb-2 inline-block text-[length:var(--font-size-section-label)] font-semibold uppercase tracking-wider text-primary">
            Languages
          </span>
          <h2 className="text-[length:var(--font-size-section-h2)] font-bold tracking-tight text-foreground break-keep">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-[length:var(--font-size-body)] text-muted break-keep">
              {description}
            </p>
          )}
        </div>

        {/* 상시 지원 */}
        <div className="mb-6">
          <p className="mb-3 text-sm font-semibold text-foreground">상시 지원 · 9개 언어</p>
          <div className="flex flex-wrap gap-2">
            {CORE_LANGUAGES.map((lang) => (
              <div
                key={lang.code}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm"
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <span className="font-medium text-foreground">{lang.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 확장 지원 */}
        <div className="mb-6">
          <p className="mb-3 text-sm font-semibold text-foreground">프리미엄 확장 · 추가 대응</p>
          <div className="flex flex-wrap gap-2">
            {EXTENDED_LANGUAGES.map((lang) => (
              <div
                key={lang.code}
                className="inline-flex items-center gap-2 rounded-full border border-dashed border-primary/30 bg-primary/5 px-4 py-2 text-sm"
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <span className="font-medium text-foreground">{lang.name}</span>
              </div>
            ))}
            <div className="inline-flex items-center rounded-full border border-dashed border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              + 기타 언어 요청 가능
            </div>
          </div>
        </div>

        <p className="text-xs text-muted">
          * 언어별 인하우스 품질 책임자가 배정되며, 360명+ 검증된 전문 번역가 풀에서 작업합니다.
        </p>
      </div>
    </Section>
  );
}
