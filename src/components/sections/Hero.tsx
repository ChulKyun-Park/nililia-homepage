import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-gradient-to-br from-foreground via-gray-900 to-gray-800">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--color-primary)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_var(--color-primary)_0%,_transparent_40%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl break-keep">
            언어의 장벽을 넘어,
            <br />
            <span className="text-primary">세계와 연결합니다</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 break-keep">
            전문 번역과 현지화 서비스로 글로벌 시장 진출을 지원합니다.
            AI 기술과 전문가의 노하우로 최상의 품질을 보장합니다.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#contact" variant="primary" className="px-8 py-4 text-base">
              무료 상담 받기
            </Button>
            <Button href="#services" variant="outline" className="border-white/30 px-8 py-4 text-base text-white hover:bg-white/10">
              서비스 알아보기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
