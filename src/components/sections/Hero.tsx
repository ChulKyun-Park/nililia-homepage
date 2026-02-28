import Button from "@/components/ui/Button";
import { Globe, Languages, FileText, Video, Gamepad2, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-dark-bg">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(0,151,254,0.12)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(0,151,254,0.08)_0%,_transparent_50%)]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center px-6 py-20 lg:py-24">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text */}
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl break-keep">
              언어의 장벽을 넘어,
              <br />
              <span className="text-primary">세계와 연결합니다</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60 break-keep">
              전문 번역과 현지화 서비스로 글로벌 시장 진출을 지원합니다.
              AI 기술과 전문가의 노하우로 최상의 품질을 보장합니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="/contact"
                variant="primary"
                className="px-8 py-4 text-base"
              >
                무료 상담 받기
              </Button>
              <Button
                href="/services"
                variant="outline"
                className="border-white/20 px-8 py-4 text-base text-white hover:bg-white/10"
              >
                서비스 알아보기
              </Button>
            </div>
          </div>

          {/* Right: Animated visual */}
          <div className="relative hidden lg:block">
            {/* Central globe */}
            <div className="relative mx-auto flex h-[400px] w-[400px] items-center justify-center">
              {/* Pulsing rings */}
              <div className="animate-pulse-ring absolute h-80 w-80 rounded-full border border-primary/20" />
              <div className="animate-pulse-ring absolute h-64 w-64 rounded-full border border-primary/10" style={{ animationDelay: "1s" }} />
              <div className="animate-pulse-ring absolute h-48 w-48 rounded-full border border-primary/5" style={{ animationDelay: "2s" }} />

              {/* Center icon */}
              <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/30">
                <Globe className="h-12 w-12 text-white" />
              </div>

              {/* Floating language badges */}
              <div className="animate-float absolute -top-2 left-12 rounded-xl border border-dark-border bg-dark-card px-4 py-2.5 shadow-lg">
                <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-white">50+ 언어</span>
                </div>
              </div>

              <div className="animate-float-delay absolute -right-4 top-20 rounded-xl border border-dark-border bg-dark-card px-4 py-2.5 shadow-lg">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-white">영상 번역</span>
                </div>
              </div>

              <div className="animate-float-slow absolute -right-6 bottom-24 rounded-xl border border-dark-border bg-dark-card px-4 py-2.5 shadow-lg">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-white">게임 현지화</span>
                </div>
              </div>

              <div className="animate-float absolute -left-6 bottom-16 rounded-xl border border-dark-border bg-dark-card px-4 py-2.5 shadow-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-white">문서 번역</span>
                </div>
              </div>

              <div className="animate-float-delay absolute -left-2 top-28 rounded-xl border border-dark-border bg-dark-card px-4 py-2.5 shadow-lg">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-white">웹소설</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
