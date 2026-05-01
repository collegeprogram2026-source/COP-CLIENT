"use client";

import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import { useState, useEffect } from "react";
import Image from "next/image";
import FocusCenterSlider from "./FocusCenterSlider";

interface Section8Props {
  section: SectionContent;
}

export default function Section8({ section }: Section8Props) {
  const v = section.values || {};
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const getFieldValue = (aliases: string[], fallback = "") => {
    for (const a of aliases) {
      const key = Object.keys(v).find((k) => k.toLowerCase() === a.toLowerCase());
      if (key) {
        const text = richTextToPlain(v[key]).trim();
        if (text) return text;
      }
    }
    return fallback;
  };

  const pill = getFieldValue(["Pill", "Badge", "pill", "badge"], "STUDENT TESTIMONIALS");
  const mainHeading = getFieldValue(["Main Heading", "Title", "Main Title", "heading"], "Trusted Because We Don't Sell Your Number");
  const belowHeading = getFieldValue(
    ["Below Main Heading", "below main heading", "Subtitle", "Subheading", "Description"],
    "Because we respect your privacy, not exploit it."
  );

  const cards = [
    {
      quote: getFieldValue(
        ["First Card", "first card", "Card 1", "card1"],
        "Finally, a platform that doesn't spam! I compared 5 MBAs without a single call. When I was ready, I invited them — and they called exactly when scheduled."
      ),
      name: "Rahul Sharma",
      degree: "MBA Student",
      university: "IIMS",
      avatar: "/Girl.png",
    },
    {
      quote: getFieldValue(
        ["Second Card", "second card", "Card 2", "card2"],
        "The honest downsides section saved me from making a costly mistake. They showed me Manipal's proctored exams wouldn't work with my 12-hour shifts."
      ),
      name: "Priya Nair",
      degree: "MCA Student",
      university: "ALTIUS",
      avatar: "/image 15.png",
    },
    {
      quote: getFieldValue(
        ["Third Card", "third card", "Card 3", "card3"],
        "I was skeptical at first. But no calls, no pressure. Just clean data. When I asked for validation, their expert called in 2 hours — very professional."
      ),
      name: "Aditya Patel",
      degree: "BBA Student",
      university: "LPU",
      avatar: "/Container (40).png",
    },
    {
      quote: getFieldValue(
        ["Fourth Card", "fourth card", "Card 4", "card4"],
        "The comparison tool helped me choose between 3 universities in under an hour. The counselor's follow-up was timely and extremely helpful. Highly recommended!"
      ),
      name: "Sneha Gupta",
      degree: "MBA Student",
      university: "Amity Online",
      avatar: "/Girl.png",
    },
    {
      quote: getFieldValue(
        ["Fifth Card", "fifth card", "Card 5", "card5"],
        "I was confused about UGC and AICTE approval. The platform clearly marked which universities had what. The transparency is refreshing."
      ),
      name: "Vikram Singh",
      degree: "B.Tech Student",
      university: "VIT Online",
      avatar: "/image 15.png",
    },
    {
      quote: getFieldValue(
        ["Sixth Card", "sixth card", "Card 6", "card6"],
        "Found exactly what I needed without the typical sales pitch. The comparison between Manipal and Amity was detailed and honest."
      ),
      name: "Ananya Rao",
      degree: "MBA Student",
      university: "Manipal Online",
      avatar: "/Girl.png",
    },
    {
      quote: getFieldValue(
        ["Seventh Card", "seventh card", "Card 7", "card7"],
        "The career counseling session was eye-opening. They didn't just push a university; they analyzed my profile first."
      ),
      name: "Rohan Mehta",
      degree: "MCA Student",
      university: "LPU",
      avatar: "/Container (40).png",
    },
    {
      quote: getFieldValue(
        ["Eighth Card", "eighth card", "Card 8", "card8"],
        "Very smooth process. From comparison to admission, everything was handled professionally. No spam calls at all!"
      ),
      name: "Megha Jain",
      degree: "B.Com Student",
      university: "Jain Online",
      avatar: "/Girl.png",
    },
  ];

  const totalDots = Math.ceil(cards.length / 4);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalDots);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalDots, isPaused]);

  const prev = () => setActiveSlide((p) => (p - 1 + totalDots) % totalDots);
  const next = () => setActiveSlide((p) => (p + 1) % totalDots);

  return (
    <section style={{ width: "100%", backgroundColor: "#FFFFFF", paddingTop: "clamp(32px,6vw,64px)", paddingBottom: "clamp(32px,6vw,64px)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {/* Pill */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <span
            style={{
              background: "#EEF2FF",
              color: "#4F39F6",
              fontFamily: "Inter",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: "20px",
              letterSpacing: "0.7px",
              textTransform: "uppercase",
              width: 253,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
            }}
          >
            {pill}
          </span>
        </div>

        {/* Main Heading */}
        <h2
          style={{
            fontFamily: "Inter",
            fontSize: "clamp(22px,5vw,36px)",
            fontWeight: 800,
            lineHeight: "1.2",
            letterSpacing: "0px",
            color: "#101828",
            textAlign: "center",
            margin: "0 0 12px 0",
            padding: "0 16px",
          }}
        >
          {mainHeading}
        </h2>

        {/* Below Heading */}
        <p
          style={{
            fontFamily: "Inter",
            fontSize: 16,
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: "24px",
            color: "#6A7282",
            textAlign: "center",
            margin: "0 0 48px 0",
          }}
        >
          {belowHeading}
        </p>

        {/* Carousel: Cards with overlaid arrows */}
        <div style={{ position: "relative" }}>
          {/* Mobile: focus-center slider */}
          <FocusCenterSlider className="mb-8" interval={5000}>
            {cards.map((card, idx) => (
              <div
                key={`m8-${idx}`}
                style={{ width: '100%', minHeight: 280, borderRadius: 16, border: '1px solid #E5E7EB', backgroundColor: '#fff', padding: '20px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: 48, lineHeight: 1, color: '#E5E7EB', marginBottom: 6, userSelect: 'none' }}>&ldquo;</div>
                  <p style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#374151', margin: 0 }}>{card.quote}</p>
                </div>
                <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', background: '#E5E7EB', flexShrink: 0, position: 'relative' }}>
                    <Image src={card.avatar} alt={card.name} fill sizes="40px" style={{ objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#101828', lineHeight: '20px' }}>{card.name}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: 12, color: '#6B7280', lineHeight: '17px' }}>{card.degree} · {card.university}</div>
                  </div>
                </div>
              </div>
            ))}
          </FocusCenterSlider>

          {/* Desktop: Left Arrow */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="hidden md:flex"
            style={{
              position: "absolute",
              left: -20,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid #E5E7EB",
              background: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Desktop: Cards Carousel */}
          <div 
            className="hidden md:block overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              style={{ 
                display: "flex", 
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)", 
                transform: `translateX(-${(activeSlide / totalDots) * 100}%)`,
                width: `${totalDots * 100}%`
              }}
            >
              {Array.from({ length: totalDots }).map((_, pageIdx) => (
                <div 
                  key={pageIdx}
                  style={{ 
                    flex: `0 0 ${100 / totalDots}%`, 
                    display: "grid", 
                    gridTemplateColumns: "repeat(4, 1fr)", 
                    gap: "24px",
                    padding: "10px" 
                  }}
                >
                  {cards.slice(pageIdx * 4, pageIdx * 4 + 4).map((card, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderRadius: "16px",
                        padding: "24px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                        height: "100%"
                      }}
                    >
                      {/* Quote mark + text */}
                      <div>
                        <div
                          style={{
                            fontFamily: "Georgia, serif",
                            fontSize: 48,
                            lineHeight: "1",
                            color: "#E5E7EB",
                            marginBottom: "8px",
                            userSelect: "none",
                          }}
                        >
                          &ldquo;
                        </div>
                        <p
                          style={{
                            fontFamily: "Inter",
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: "22px",
                            color: "#374151",
                            margin: 0,
                          }}
                        >
                          {card.quote}
                        </p>
                      </div>

                      {/* Author row */}
                      <div style={{ marginTop: "20px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {/* Avatar */}
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                overflow: "hidden",
                                background: "#E5E7EB",
                                flexShrink: 0,
                                position: "relative",
                              }}
                            >
                              <Image
                                src={card.avatar}
                                alt={card.name}
                                fill
                                sizes="40px"
                                style={{ objectFit: "cover" }}
                                onError={(e) => {
                                  const img = e?.target as HTMLImageElement | null;
                                  if (img) img.style.display = "none";
                                }}
                              />
                            </div>
                            {/* Name + Degree */}
                            <div>
                              <div
                                style={{
                                  fontFamily: "Inter",
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: "#101828",
                                  lineHeight: "20px",
                                }}
                              >
                                {card.name}
                              </div>
                              <div
                                style={{
                                  fontFamily: "Inter",
                                  fontSize: 12,
                                  fontWeight: 400,
                                  color: "#6B7280",
                                  lineHeight: "16px",
                                }}
                              >
                                {card.degree}
                              </div>
                            </div>
                          </div>

                          {/* LinkedIn icon */}
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              background: "#0077B5",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect x="2" y="9" width="4" height="12" />
                              <circle cx="4" cy="4" r="2" />
                            </svg>
                          </div>
                        </div>

                        {/* University */}
                        <div
                          style={{
                            textAlign: "right",
                            fontFamily: "Inter",
                            fontSize: 12,
                            fontWeight: 500,
                            color: "#9CA3AF",
                            marginTop: "8px",
                          }}
                        >
                          {card.university}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow — desktop only */}
          <button
            onClick={next}
            aria-label="Next"
            className="hidden md:flex"
            style={{
              position: "absolute",
              right: -20,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid #E5E7EB",
              background: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots — desktop only (mobile uses FocusCenterSlider dots) */}
        <div className="hidden md:flex" style={{ justifyContent: "center", alignItems: "center", gap: "6px", marginTop: "24px" }}>
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === activeSlide ? 24 : 8,
                height: 8,
                borderRadius: 9999,
                background: i === activeSlide ? "#4F39F6" : "#D1D5DB",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.2s ease, background 0.2s ease",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export const usedFields = [
  "Pill",
  "Badge",
  "pill",
  "badge",
  "Main Heading",
  "Title",
  "Main Title",
  "heading",
  "Below Main Heading",
  "below main heading",
  "Subtitle",
  "Subheading",
  "Description",
  "First Card",
  "first card",
  "Card 1",
  "card1",
  "Second Card",
  "second card",
  "Card 2",
  "card2",
  "Third Card",
  "third card",
  "Card 3",
  "card3",
  "Fourth Card",
  "fourth card",
  "Card 4",
  "card4",
  "Fifth Card",
  "fifth card",
  "Card 5",
  "card5",
  "Sixth Card",
  "sixth card",
  "Card 6",
  "card6",
  "Seventh Card",
  "seventh card",
  "Card 7",
  "card7",
  "Eighth Card",
  "eighth card",
  "Card 8",
  "card8",
];
