export default function Mission() {
  return (
    <section
      className="relative flex min-h-[50vh] items-center bg-gradient-to-r from-primary to-primary-dark"
    >
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
          Our Mission
        </p>
        <h2 className="text-3xl font-bold leading-snug text-white sm:text-4xl lg:text-5xl break-keep">
          모든 콘텐츠가 언어의 경계를 넘어
          <br className="hidden sm:block" />
          전 세계에 전달되는 세상을 만듭니다
        </h2>
        <p className="mt-6 text-lg text-white/80 break-keep">
          기술과 전문성의 조화로 완벽한 현지화 경험을 제공합니다.
        </p>
      </div>
    </section>
  );
}
