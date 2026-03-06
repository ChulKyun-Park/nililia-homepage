import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

export interface Language {
  name: string;
  code: string;
}

const DEFAULT_LANGUAGES: Language[] = [
  { name: "영어", code: "EN" },
  { name: "중국어", code: "ZH" },
  { name: "대만어", code: "ZH-TW" },
  { name: "일본어", code: "JA" },
  { name: "베트남어", code: "VI" },
  { name: "스페인어", code: "ES" },
  { name: "인도네시아어", code: "ID" },
  { name: "태국어", code: "TH" },
  { name: "러시아어", code: "RU" },
  { name: "독일어", code: "DE" },
];

interface SupportedLanguagesProps {
  languages?: Language[];
  title?: string;
  description?: string;
}

export default function SupportedLanguages({
  languages = DEFAULT_LANGUAGES,
  title = "다양한 언어로 더 글로벌하게",
  description = "총 10개 언어를 상시 지원합니다. 상시 지원 언어 외에도 요청에 따라 추가 언어 번역이 가능합니다.",
}: SupportedLanguagesProps) {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <SectionHeader
            label="Supported Languages"
            title={title}
            description={description}
            align="left"
            className="mb-0"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className="flex items-center gap-1 sm:gap-2 rounded-xl border border-border bg-white px-2 py-2 sm:px-4 sm:py-3"
            >
              <span className="text-[10px] sm:text-xs font-bold text-primary">{lang.code}</span>
              <span className="text-xs sm:text-sm text-foreground truncate">{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
