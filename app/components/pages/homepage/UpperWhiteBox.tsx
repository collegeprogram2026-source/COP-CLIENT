"use client";

import { richTextToPlain } from "./tuUtils";
import Link from "next/link";
import React, { ReactElement, useEffect, useRef, useState } from "react";

export default function UpperWhiteBox({
  title,
  universityLogos,
}: {
  title: string;
  universityLogos: Array<{ name: string; logo: any; slug?: string }>;
}): ReactElement {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [marqueeVars, setMarqueeVars] = useState<{ distance: string; duration: string }>({ distance: "0px", duration: "14s" });
  const [repeats, setRepeats] = useState<number>(2);

  useEffect(() => {
    if (!universityLogos || universityLogos.length === 0) return;
    let wrapperWidth = 0;
    let contentWidth = 0;
    function recalc() {
      if (!contentWidth || !wrapperWidth) return;
      const minRepeats = Math.max(2, Math.ceil((wrapperWidth + contentWidth) / contentWidth));
      setRepeats(minRepeats);
      const speed = 80;
      const duration = Math.max(8, Math.round(contentWidth / speed)) + "s";
      setMarqueeVars({ distance: `${contentWidth}px`, duration });
    }
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.round(entry.contentRect.width);
        if (entry.target === wrapperRef.current) wrapperWidth = w;
        if (entry.target === contentRef.current) contentWidth = w;
      }
      recalc();
    });
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    if (contentRef.current) ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, [universityLogos]);

  return (
    <div
      className="w-full bg-white p-[clamp(1.25rem,3.5vw,2.5rem)_clamp(0.75rem,3vw,1.5rem)] lg:min-h-[160px] flex flex-col items-center justify-start rounded-t-xl overflow-hidden"
    >
      {title && (
        <h2
          className="text-[clamp(22px, 5vw, 36px)] font-bold leading-[1.2] tracking-normal text-[#101828] mb-5 text-center"
        >
          {title}
        </h2>
      )}

      <div className="overflow-hidden w-full min-h-[clamp(72px, 9vw, 120px)]">
        <style>{`
          .logos-wrapper{overflow:hidden;width:100%;}
          /* no gap on the outer track so duplicated blocks sit flush */
          .logos-track{display:flex;align-items:center;gap:0}
          /* internal gap between logos — tighter so they feel like a cohesive band */
          .logos-content{display:flex;gap:2rem;align-items:center;padding:0}
          /* give each logo a consistent container width so spacing looks uniform */
          .logo-item{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;padding:0 0.5rem;width:clamp(120px,12vw,220px)}
          .logo-link{display:inline-flex;align-items:center;justify-content:center;width:100%;height:100%;cursor:pointer;transition:transform 0.2s ease}
          .logo-link:hover{transform:scale(1.06)}
          .logo-img{max-width:100%;height:auto;display:block;background:transparent}
          .logo-img--nmims{padding:0.4rem;border-radius:4px}
          @keyframes logos-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-1 * var(--logos-marquee-distance))); } }
          .logos-animate { animation: logos-marquee var(--logos-marquee-duration, 14s) linear infinite; will-change: transform; contain: layout style; }
          .logos-wrapper:hover .logos-animate { animation-play-state: paused; }
        `}</style>

        {universityLogos.length === 0 ? (
          <div
            className="text-[#9CA3AF] text-base font-medium"
          >
            Add university logos to CMS
          </div>
        ) : (
          <div className="logos-wrapper" ref={wrapperRef}>
            <div ref={trackRef} className="logos-track logos-animate" style={{ ['--logos-marquee-distance' as any]: marqueeVars.distance, ['--logos-marquee-duration' as any]: marqueeVars.duration } as React.CSSProperties}>
              {Array.from({ length: repeats }).map((_, idx) => (
                <div key={`logos-block-${idx}`} ref={idx === 0 ? contentRef : undefined} className="logos-content" aria-hidden={idx !== 0}>
                  {universityLogos.map(({ name: fieldKey, logo: fieldValue, slug }) => {
                    let logoCandidate: string;
                    if (typeof fieldValue === "string") {
                      logoCandidate = fieldValue;
                    } else if (fieldValue && typeof fieldValue === "object") {
                      logoCandidate = (fieldValue.url && String(fieldValue.url)) || (fieldValue.src && String(fieldValue.src)) || JSON.stringify(fieldValue);
                    } else {
                      logoCandidate = String(fieldValue || "");
                    }

                    const lower = (logoCandidate || "").toLowerCase();
                    const isImageUrl =
                      lower.includes("http") ||
                      lower.startsWith("data:image") ||
                      lower.endsWith(".png") ||
                      lower.endsWith(".jpg") ||
                      lower.endsWith(".jpeg") ||
                      lower.endsWith(".svg");

                    const lowerKey = String(fieldKey || "").toLowerCase();
                    const lowerLogo = String(logoCandidate || "").toLowerCase();
                    const isDypatil = lowerKey.includes("dypatil") || lowerLogo.includes("dypatil");
                    const isNmims = lowerLogo.includes("nmims");
                    const height = isDypatil ? "clamp(48px, 6vw, 80px)" : isNmims ? "clamp(56px, 6.5vw, 90px)" : "clamp(72px, 9vw, 120px)";

                    const img = isImageUrl ? (
                      <img
                        src={logoCandidate}
                        alt={fieldKey}
                        width={220}
                        height={120}
                        loading="lazy"
                        decoding="async"
                        className={`${isNmims ? "logo-img logo-img--nmims" : "logo-img"} w-auto object-contain block`}
                        style={{
                          height,
                        }}
                        onError={(e) => {
                          const el = e.currentTarget as HTMLImageElement;
                          const parent = el.closest(".logo-item") as HTMLElement | null;
                          if (parent) parent.style.display = "none";
                        }}
                      />
                    ) : null;

                    return (
                      <div key={String(fieldKey) + `-${idx}`} className="logo-item">
                        {img && slug ? (
                          <Link
                            href={`/universities/${slug}`}
                            className="logo-link"
                            aria-label={fieldKey}
                            tabIndex={idx === 0 ? 0 : -1}
                          >
                            {img}
                          </Link>
                        ) : img}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
