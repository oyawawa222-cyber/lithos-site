import { useGSAP } from "@/lib/gsap";
import { useRef } from "react";
import gsap from "gsap";

// Field Guides 沙漠等高线
export const FieldGuideDecor = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!wrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".contour-line", {
        strokeDashoffset: (i, el) => el.getTotalLength(),
        duration: 1.4,
        stagger: 0.2,
        ease: "power2.out"
      });
      gsap.from(".survey-marker", { autoAlpha: 0, scale: 0.6, delay: 1, duration: 0.8 });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      <svg className="w-full h-full opacity-20" viewBox="0 0 1440 900">
        <path className="contour-line" stroke="#fff" strokeWidth="1" fill="none" d="M-100,200 Q360,120 720,240 T1440,220" />
        <path className="contour-line" stroke="#fff" strokeWidth="0.8" fill="none" d="M-100,320 Q360,420 720,300 T1440,340" />
        <path className="contour-line" stroke="#fff" strokeWidth="0.6" fill="none" d="M-100,480 Q360,560 720,440 T1440,460" />
        <circle className="survey-marker" cx="920" cy="360" r="4" fill="#e8702a" />
        <text className="survey-marker" x="930" y="360" fill="#fff" fontSize="12">PT-01</text>
      </svg>
    </div>
  );
};

// Geology 森林断层线
export const GeologyDecor = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!wrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".fault-line", { strokeDashoffset: (i, el) => el.getTotalLength(), duration: 1.2 });
      gsap.from(".geo-label", { autoAlpha: 0, y: 10, stagger: 0.3, delay: 0.8 });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      <svg className="w-full h-full opacity-20" viewBox="0 0 1440 900">
        <path className="fault-line" stroke="#fff" strokeWidth="1.2" fill="none" d="M100,400 L600,320 L1300,440" />
        <path className="fault-line" stroke="#fff" strokeWidth="0.8" fill="none" d="M200,520 L700,480 L1200,560" />
        <circle className="geo-label" cx="600" cy="320" r="3" fill="#fff" />
        <text className="geo-label" x="610" y="315" fill="#fff" fontSize="11">Fault Zone</text>
        <circle className="geo-label" cx="1200" cy="560" r="3" fill="#fff" />
        <text className="geo-label" x="1210" y="555" fill="#fff" fontSize="11">Stratum B</text>
      </svg>
    </div>
  );
};

// Plans 湖泊路线规划
export const PlanDecor = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!wrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".route-seg", { strokeDashoffset: (i, el) => el.getTotalLength(), stagger: 0.25, duration: 1.3 });
      gsap.from(".route-node", { autoAlpha: 0, scale: 0, stagger: 0.2, delay: 1 });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      <svg className="w-full h-full opacity-20" viewBox="0 0 1440 900">
        <path className="route-seg" stroke="#e8702a" strokeWidth="1.5" fill="none" d="M150,600 L450,420 L800,480 L1200,380" />
        <circle className="route-node" cx="150" cy="600" r="5" fill="#e8702a" />
        <circle className="route-node" cx="450" cy="420" r="5" fill="#e8702a" />
        <circle className="route-node" cx="800" cy="480" r="5" fill="#e8702a" />
        <circle className="route-node" cx="1200" cy="380" r="5" fill="#e8702a" />
      </svg>
    </div>
  );
};

// Live Tour 海岸采样点
export const LiveTourDecor = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!wrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".coast-line", { strokeDashoffset: (i, el) => el.getTotalLength(), duration: 1.5 });
      gsap.from(".sample-point", { autoAlpha: 0, stagger: 0.3, delay: 0.6 });
      gsap.to(".sample-point", { scale: 1.3, repeat: -1, yoyo: true, duration: 2, delay: 1 });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      <svg className="w-full h-full opacity-20" viewBox="0 0 1440 900">
        <path className="coast-line" stroke="#fff" strokeWidth="1" fill="none" d="M0,700 Q240,620 480,680 T960,640 T1440,690" />
        <circle className="sample-point" cx="320" cy="660" r="4" fill="#fff" />
        <circle className="sample-point" cx="720" cy="650" r="4" fill="#fff" />
        <circle className="sample-point" cx="1100" cy="665" r="4" fill="#fff" />
      </svg>
    </div>
  );
};