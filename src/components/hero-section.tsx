"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const dots = dotsRef.current;

    gsap.fromTo(
      dots,
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      },
      {
        x: (i) => {
          const positions = [-250, -120, 0, 140, 260];
          return positions[i % positions.length];
        },
        y: (i) => {
          const rows = [-80, 40, 100];
          return rows[i % rows.length];
        },
        scale: 0.8,
        duration: 2,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0 opacity-20" />

      <div className="relative z-10 text-center">
        <p className="text-sm tracking-[0.3em] text-cyan-300">
          FLOW:HARBOR
        </p>

        <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
          관광 흐름을
          <br />
          다시 설계하다
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-slate-300">
          특정 핫스팟에 집중된 관광 소비를
          AI 기반 흐름 재분배를 통해
          도시 전체로 확장합니다.
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              dotsRef.current[i] = el;
            }}
            className="absolute h-4 w-4 rounded-full bg-cyan-400"
          />
        ))}
      </div>
    </section>
  );
}