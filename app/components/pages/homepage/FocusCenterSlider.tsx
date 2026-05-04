"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface FocusCenterSliderProps {
  children: React.ReactNode[];
  interval?: number;
  cardWidth?: number;
  gap?: number;
  className?: string;
}

export default function FocusCenterSlider({
  children,
  interval = 3200,
  cardWidth = 280,
  gap = 12,
  className = "",
}: FocusCenterSliderProps) {
  const count = children.length;

  // offset: 0 = clone of last, 1..count = real items, count+1 = clone of first
  const [offset, setOffset] = useState(1);
  const [animated, setAnimated] = useState(true);

  // Measure container width — translatePx is then derived synchronously (no async state chain)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerWidth(el.getBoundingClientRect().width);
    const obs = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // translatePx is a derived value — always in sync with offset in the same render
  const step = cardWidth + gap;
  const translatePx =
    containerWidth > 0
      ? Math.round(containerWidth / 2 - cardWidth / 2 - offset * step)
      : 0;

  // real dot index (0-based)
  const realIndex = count > 0 ? ((offset - 1) % count + count) % count : 0;

  // extended array: [clone_last, ...real, clone_first]
  const extended = count > 0
    ? [children[count - 1], ...children, children[0]]
    : children;

  // touch swipe support
  const touchStartXRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    isPausedRef.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const delta = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 30) {
      setAnimated(true);
      setOffset((prev) => prev + (delta > 0 ? 1 : -1));
    }
    touchStartXRef.current = null;
    isPausedRef.current = false;
  };

  // auto-advance
  useEffect(() => {
    if (count === 0) return;
    const id = setInterval(() => {
      if (isPausedRef.current) return;
      setAnimated(true);
      setOffset((prev) => prev + 1);
    }, interval);
    return () => clearInterval(id);
  }, [count, interval]);

  // After CSS transition ends, silently snap if we landed on a clone.
  // setAnimated(false) + setOffset() batch in the same React render.
  // Because translatePx is derived synchronously, the correct snap position
  // is already computed in that render — no visible backward jump.
  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      // Ignore bubbled events from inner card transitions
      if (e.target !== e.currentTarget) return;
      setOffset((prev) => {
        if (prev === 0) {
          setAnimated(false);
          return count;
        }
        if (prev === count + 1) {
          setAnimated(false);
          return 1;
        }
        return prev;
      });
    },
    [count]
  );

  // Re-enable animation one frame after a silent snap
  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  return (
    <div
      ref={containerRef}
      className={`md:hidden relative ${className}`}
      style={{ overflow: "hidden" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{
          display: "flex",
          gap,
          transition: animated ? "transform 0.5s cubic-bezier(0.4,0,0.2,1)" : "none",
          transform: `translateX(${translatePx}px)`,
        }}
      >
        {extended.map((child, idx) => {
          const isActive = idx === offset;
          return (
            <div
              key={idx}
              onClick={() => {
                if (!isActive) {
                  const diff = idx - offset;
                  if (Math.abs(diff) === 1) {
                    setAnimated(true);
                    setOffset(offset + diff);
                  }
                }
              }}
              style={{
                width: cardWidth,
                flexShrink: 0,
                borderRadius: 20,
                opacity: isActive ? 1 : 0.45,
                filter: isActive ? "none" : "blur(1.5px)",
                transform: isActive ? "scale(1)" : "scale(0.93)",
                boxShadow: isActive
                  ? "0 10px 20px -5px rgba(0,0,0,0.1), 0 8px 8px -5px rgba(0,0,0,0.04)"
                  : "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
                transition: animated ? "all 0.45s cubic-bezier(0.4,0,0.2,1)" : "none",
                cursor: isActive ? "default" : "pointer",
              }}
            >
              {child}
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2" style={{ marginTop: 20 }}>
        {children.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { setAnimated(true); setOffset(idx + 1); }}
            style={{
              width: idx === realIndex ? 20 : 8,
              height: 8,
              borderRadius: 99,
              background: idx === realIndex ? "#7C3AED" : "#D1D5DB",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

