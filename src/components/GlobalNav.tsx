import { Link, useLocation } from "react-router-dom";
import { useGSAP } from "@/lib/gsap";
import { useRef } from "react";
import gsap from "gsap";

const navRoutes = [
  { path: "/", label: "Course" },
  { path: "/field-guides", label: "Field Guides" },
  { path: "/geology", label: "Geology" },
  { path: "/plans", label: "Plans" },
  { path: "/live-tour", label: "Live Tour" },
];

export default function GlobalNav() {
  const navRef = useRef<HTMLNavElement>(null);
  const location = useLocation();

  useGSAP(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".nav-pill").forEach((pill) => {
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(pill, { scale: 1.06, y: -2, opacity: 1, duration: 0.25 });
        pill.addEventListener("mouseenter", () => hoverTl.play());
        pill.addEventListener("mouseleave", () => hoverTl.reverse());
      });
      gsap.from(".nav-active", { scale: 0.9, opacity: 0.7, duration: 0.4 });
    }, navRef);
    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
      <Link to="/" className="flex items-center gap-2">
        <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff">
          <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
        </svg>
        <span className="text-white text-2xl font-playfair italic">Lithos</span>
      </Link>

      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
        {navRoutes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={`nav-pill px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              location.pathname === route.path
                ? "nav-active bg-white text-gray-900"
                : "text-white/80 hover:bg-white/200 hover:text-white"
            }`}
          >
            {route.label}
          </Link>
        ))}
      </div>

      <Link to="/signup" className="hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors">
        Sign Up
      </Link>

      <div className="md:hidden text-white text-lg">Menu</div>
    </nav>
  );
}