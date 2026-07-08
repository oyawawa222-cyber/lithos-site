import { BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import GlobalNav from "@/components/GlobalNav";
import CourseHero from "@/pages/CourseHero";
import FieldGuidesHero from "@/pages/FieldGuidesHero";
import GeologyHero from "@/pages/GeologyHero";
import PlansHero from "@/pages/PlansHero";
import LiveTourHero from "@/pages/LiveTourHero";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// 页面从上到下顺序
const pageList = [
  { path: "/", component: <CourseHero /> },
  { path: "/field-guides", component: <FieldGuidesHero /> },
  { path: "/geology", component: <GeologyHero /> },
  { path: "/plans", component: <PlansHero /> },
  { path: "/live-tour", component: <LiveTourHero /> },
];

function FullPageScrollWrapper() {
  const scrollWrap = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isAnimating = useRef(false);
  const pageHeight = window.innerHeight;

  // 路由切换自动滚动到对应页面
  useEffect(() => {
    if (!scrollWrap.current || isAnimating.current) return;
    const currentIdx = pageList.findIndex(item => item.path === location.pathname);
    gsap.to(scrollWrap.current, {
      scrollTop: currentIdx * pageHeight,
      duration: 0.7,
      ease: "power2.out"
    });
  }, [location.pathname, pageHeight]);

  // 鼠标滚轮平滑翻页（上滑露出下一页，无瞬间跳转）
  useEffect(() => {
    const container = scrollWrap.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (isAnimating.current) return;
      const currentScrollY = container.scrollTop;
      const currentIndex = Math.round(currentScrollY / pageHeight);
      let targetIdx = currentIndex;

      if (e.deltaY > 20 && currentIndex < pageList.length - 1) {
        targetIdx = currentIndex + 1;
      } else if (e.deltaY < -20 && currentIndex > 0) {
        targetIdx = currentIndex - 1;
      }

      if (targetIdx === currentIndex) return;
      isAnimating.current = true;

      gsap.to(container, {
        scrollTop: targetIdx * pageHeight,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
          isAnimating.current = false;
          navigate(pageList[targetIdx].path);
        }
      });
    };

    container.addEventListener("wheel", onWheel);
    return () => container.removeEventListener("wheel", onWheel);
  }, [pageHeight, navigate]);

  return (
    <div
      ref={scrollWrap}
      className="w-full h-screen overflow-y-auto overflow-x-hidden"
      style={{ scrollBehavior: "auto" }}
    >
      {pageList.map((page, idx) => (
        <div key={idx} style={{ height: "100dvh", width: "100%" }}>
          {page.component}
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div 
      className="min-h-screen bg-black tracking-[-0.02em]" 
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <BrowserRouter>
        <GlobalNav />
        <FullPageScrollWrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;