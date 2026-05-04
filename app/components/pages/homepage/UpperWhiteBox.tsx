"use client";

import { richTextToPlain } from "./tuUtils";
import React, { ReactElement, useEffect, useRef, useState } from "react";

export default function UpperWhiteBox({
  title,
  universityLogos,
}: {
  title: string;
  universityLogos: Array<[string, any]>;
}): ReactElement {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [marqueeVars, setMarqueeVars] = useState<{ distance: string; duration: string }>({ distance: "0px", duration: "14s" });
  const [repeats, setRepeats] = useState<number>(2);

  useEffect(() => {
    if (!universityLogos || universityLogos.length === 0) return;
    function recalc() {
      const contentEl = contentRef.current;
      const wrapperEl = wrapperRef.current;
      if (!contentEl || !wrapperEl) return;
      // width of a single content block
      const contentWidth = Math.round(contentEl.getBoundingClientRect().width) || 0;
      const wrapperWidth = Math.round(wrapperEl.getBoundingClientRect().width) || 0;

      // ensure we have enough repeated blocks so that when one block scrolls out,
      // the next block is immediately adjacent (no visible gap). We need enough
      // total length so that contentWidth * repeats >= wrapperWidth + contentWidth
      const minRepeats = Math.max(2, Math.ceil((wrapperWidth + contentWidth) / contentWidth));
      setRepeats(minRepeats);

      const speed = 80;
      const duration = Math.max(8, Math.round(contentWidth / speed)) + "s";
      setMarqueeVars({ distance: `${contentWidth}px`, duration });
    }
    // run twice: first after paint, then after layout changes
    const t = setTimeout(recalc, 10);
    recalc();
    window.addEventListener("resize", recalc);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", recalc);
    };
  }, [universityLogos]);

  return (
    <div
      className="w-full bg-white"
      style={{
        padding: "clamp(1.25rem, 3.5vw, 2.5rem) clamp(0.75rem, 3vw, 1.5rem)",
        minHeight: "160px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: "hidden",
      }}
    >
      {title && (
        <h2
          style={{
            fontSize: "clamp(22px, 5vw, 36px)",
            fontWeight: 700,
            lineHeight: "1.2",
            letterSpacing: "0px",
            color: "#101828",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {title}
        </h2>
      )}

      <div style={{ overflow: "hidden", width: "100%" }}>
        <style>{`
          .logos-wrapper{overflow:hidden;width:100%;}
          /* no gap on the outer track so duplicated blocks sit flush */
          .logos-track{display:flex;align-items:center;gap:0}
          /* internal gap between logos — tighter so they feel like a cohesive band */
          .logos-content{display:flex;gap:2rem;align-items:center;padding:0}
          /* give each logo a consistent container width so spacing looks uniform */
          .logo-item{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;padding:0 0.5rem;width:clamp(120px,12vw,220px)}
          .logo-img{max-width:100%;height:auto;display:block;background:transparent}
          .logo-img--nmims{padding:0.4rem;border-radius:4px}
          @keyframes logos-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-1 * var(--logos-marquee-distance))); } }
          .logos-animate { animation: logos-marquee var(--logos-marquee-duration, 14s) linear infinite; }
        `}</style>

        {universityLogos.length === 0 ? (
          <div
            style={{
              color: "#9CA3AF",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Add university logos to CMS
          </div>
        ) : (
          <div className="logos-wrapper" ref={wrapperRef}>
            <div ref={trackRef} className="logos-track logos-animate" style={{ ['--logos-marquee-distance' as any]: marqueeVars.distance, ['--logos-marquee-duration' as any]: marqueeVars.duration } as React.CSSProperties}>
              {Array.from({ length: repeats }).map((_, idx) => (
                <div key={`logos-block-${idx}`} ref={idx === 0 ? contentRef : undefined} className="logos-content" aria-hidden={idx !== 0}>
                  {universityLogos.map(([fieldKey, fieldValue]) => {
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

                    return (
                      <div key={String(fieldKey) + `-${idx}`} className="logo-item">
                        {isImageUrl ? (
                          (() => {
                            const lowerKey = String(fieldKey || "").toLowerCase();
                            const lowerLogo = String(logoCandidate || "").toLowerCase();
                            const isDypatil = lowerKey.includes("dypatil") || lowerLogo.includes("dypatil");
                            const isNmims = lowerLogo.includes("nmims");
                            const height = isDypatil ? "clamp(48px, 6vw, 80px)" : isNmims ? "clamp(56px, 6.5vw, 90px)" : "clamp(72px, 9vw, 120px)";
                            return (
                              <img
                                src={logoCandidate}
                                alt={fieldKey}
                                className={isNmims ? "logo-img logo-img--nmims" : "logo-img"}
                                style={{
                                  height,
                                  width: "auto",
                                  objectFit: "contain",
                                  display: "block",
                                }}
                                onError={(e) => {
                                  const el = e.currentTarget as HTMLImageElement;
                                  const parent = el.closest(".logo-item") as HTMLElement | null;
                                  if (parent) parent.style.display = "none";
                                }}
                              />
                            );
                          })()
                        ) : null}
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
