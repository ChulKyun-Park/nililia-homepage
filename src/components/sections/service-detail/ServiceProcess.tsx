import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";

export interface ProcessStep {
  title: string;
  description: string;
}

interface ServiceProcessProps {
  label?: string;
  title?: string;
  description?: string;
  steps: ProcessStep[];
}

export default function ServiceProcess({
  label = "Our Process",
  title = "체계적인 프로세스로 완성합니다",
  description = "검증된 워크플로우를 통해 일관된 품질의 결과물을 제공합니다.",
  steps,
}: ServiceProcessProps) {
  return (
    <Section>
      <SectionHeader label={label} title={title} description={description} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, idx) => (
          <Card key={idx} className="relative">
            <span className="text-3xl font-bold text-primary/20">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-[length:var(--font-size-card-title)] font-bold text-foreground break-keep">
              {step.title}
            </h3>
            <p className="mt-2 text-[length:var(--font-size-card-desc)] leading-relaxed text-muted break-keep">
              {step.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
