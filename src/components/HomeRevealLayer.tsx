import { useEffect, useRef } from "react";

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
}
const SPOTLIGHT_R = 260;

export default function RevealLayer({ image, cursorX, cursorY }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskDivRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const resizeRef = useRef<() => void>();
  const mousePosRef = useRef({ x: -999, y: -999 });

  // 同步最新鼠标坐标
  useEffect(() => {
    mousePosRef.current.x = cursorX;
    mousePosRef.current.y = cursorY;
  }, [cursorX, cursorY]);

  const renderMask = () => {
    const canvas = canvasRef.current;
    const maskEl = maskDivRef.current;
    if (!canvas || !maskEl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = mousePosRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isInView = x >= 0 && y >= 0;

    if (isInView) {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, SPOTLIGHT_R);
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(0.4, "#ffffff");
      gradient.addColorStop(0.6, "rgba(255,255,255,0.75)");
      gradient.addColorStop(0.75, "rgba(255,255,255,0.4)");
      gradient.addColorStop(0.88, "rgba(255,255,255,0.12)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, SPOTLIGHT_R, 0, Math.PI * 2);
      ctx.fill();
    }

    const maskData = canvas.toDataURL("image/png");
    maskEl.style.maskImage = `url(${maskData})`;
    maskEl.style.webkitMaskImage = `url(${maskData})`;
    maskEl.style.maskSize = "100% 100%";
    maskEl.style.maskRepeat = "no-repeat";
  };

  // 初始化画布与动画循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeRef.current = resize;
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      renderMask();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeRef.current) window.removeEventListener("resize", resizeRef.current);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none hidden" />
      <div
        ref={maskDivRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${image})` }}
      />
    </>
  );
}