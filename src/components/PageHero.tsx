import { useGSAP } from "@/lib/gsap";
import { useRef } from "react";
import gsap from "gsap";

type HeroProps = {
  bgBase: string;
  titleLine1: string;
  titleLine2: string;
  leftDesc?: string;
  rightDesc: string;
  ctaText: string;
  DecorComponent: React.FC;
};

export default function PageHero({ bgBase, titleLine1, titleLine2, leftDesc, rightDesc, ctaText, DecorComponent }: HeroProps) {
  const sectionRef = useRef<HTMLSectionElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "cubic-bezier(0.16,1,0.3,1)" } });
      tl.from(".page-bg", { scale: 1.1, clipPath: "inset(12%)", duration: 1.6 }, 0);
      tl.from(".title-1", { filter: "blur(10px)", y: 24, autoAlpha: 0, duration: 1 }, 0.2);
      tl.from(".title-2", { clipPath: "inset(0 0 100% 0)", yPercent: 30, autoAlpha: 0, duration: 1.1 }, 0.35);
      tl.from(".text-left", { y: 18, autoAlpha: 0, duration: 0.9 }, 0.7);
      tl.from(".text-right", { y: 18, autoAlpha: 0, duration: 0.9 }, 0.85);
      tl.from(".hero-btn", { scale: 0.92, autoAlpha: 0, duration: 0.7 }, 0.95);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden h-screen bg-black" style={{ height: "100dvh" }}>
      <div
        className="page-bg absolute inset-0 bg-center bg-cover bg-no-repeat z-10"
        style={{ backgroundImage: `url(${bgBase})` }}
      />
      <DecorComponent />

      <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
        <span
          className="title-1 block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl text-white"
          style={{ letterSpacing: "-0.05em" }}
        >
          {titleLine1}
        </span>
        <span
          className="title-2 block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 text-white"
          style={{ letterSpacing: "-0.08em" }}
        >
          {titleLine2}
        </span>
      </div>

      {leftDesc && (
        <div className="text-left hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50">
          <p className="text-sm text-white/80 leading-relaxed">{leftDesc}</p>
        </div>
      )}

      <div className="text-right absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 z-50">
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{rightDesc}</p>
        <button className="hero-btn bg-lithos-orange hover:bg-lithos-orangeDark text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30">
          {ctaText}
        </button>
      </div>
    </section>
  );
}