import Button from "@/components/ui/Button";

export default function BottomCTA() {
  return (
    <section
      id="contact"
      className="bg-gradient-to-r from-primary to-primary-dark py-24"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl break-keep">
          글로벌 진출, 지금 시작하세요
        </h2>
        <p className="mt-4 text-lg text-white/80 break-keep">
          전문 컨설턴트가 프로젝트에 맞는 최적의 솔루션을 제안해 드립니다.
          지금 바로 무료 상담을 신청하세요.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="mailto:hello@nililia.com"
            className="bg-white px-8 py-4 text-base font-bold text-primary hover:bg-white/90"
          >
            무료 상담 신청
          </Button>
          <Button
            href="#services"
            variant="outline"
            className="border-white/40 px-8 py-4 text-base text-white hover:bg-white/10"
          >
            서비스 둘러보기
          </Button>
        </div>
      </div>
    </section>
  );
}
