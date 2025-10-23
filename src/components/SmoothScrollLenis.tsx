"use client";

import { useEffect } from "react";
import { ReactLenis } from "lenis/react";
import Lenis from "lenis";
import type { ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 👇 Theo dõi thay đổi style của <html>
    const body = document.documentElement;
    const observer = new MutationObserver(() => {
      const overflowY = window.getComputedStyle(body).overflowY;
      if (overflowY === "hidden") {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    observer.observe(body, {
      attributes: true,
      attributeFilter: ["style", "class"], // style hoặc class thay đổi
    });

    return () => {
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return <ReactLenis root>{children}</ReactLenis>;
}
