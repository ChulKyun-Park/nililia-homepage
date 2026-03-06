import Button from "@/components/ui/Button";

export default function BottomCTA() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-[length:var(--font-size-section-h2)] font-bold text-white break-keep">
          먼저 품질을 확인하세요
        </h2>
        <p className="mt-4 text-[length:var(--font-size-body)] text-white/80 break-keep">
          샘플 번역을 무료로 보내드립니다. 결과물로 판단해 주세요.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="/contact"
            className="bg-white px-8 py-4 text-base font-bold text-primary hover:bg-white/90"
          >
            무료 샘플 요청
          </Button>
          <Button
            href="/cases"
            variant="outline"
            className="border-white/40 px-8 py-4 text-base text-white hover:bg-white/10"
          >
            포트폴리오 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
