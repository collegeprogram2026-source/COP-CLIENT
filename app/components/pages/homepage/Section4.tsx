'use client';
import { useState, useRef, useEffect } from "react";
import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import { Star, BookOpen, Clock, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FocusCenterSlider from "./FocusCenterSlider";
import CounselorCard from "./CounselorCard";

interface Section4Props {
  section: SectionContent;
}

interface Counselor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  rating: number;
  reviewCount: number;
  expertise: string;
  experience: string;
  studentsGuided: string;
}

export default function Section4({ section }: Section4Props) {
  const v = section.values || {};

  // ════════════════════════════════════════════════════════════════════════════════
  // CASCADE PRIORITY SYSTEM: CMS > PLACEHOLDER > HARDCODED DEFAULT
  // ════════════════════════════════════════════════════════════════════════════════
  const getFieldValue = (keyAliases: string[], placeholder?: string): string => {
    for (const alias of keyAliases) {
      const foundKey = Object.keys(v).find((k) => k.toLowerCase() === alias.toLowerCase());
      if (foundKey) {
        const value = v[foundKey];
        if (value !== undefined && value !== null) {
          const text = richTextToPlain(value);
          if (text.trim()) return text;
        }
      }
    }
    if (placeholder) return placeholder;
    return "";
  };

  // Track which CMS keys are explicitly used
  const usedKeys = new Set<string>();
  const trackKey = (keyAliases: string[]) => {
    for (const alias of keyAliases) {
      const foundKey = Object.keys(v).find((k) => k.toLowerCase() === alias.toLowerCase());
      if (foundKey) usedKeys.add(foundKey);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────────────
  // EXPERT COUNSELORS SECTION FIELDS
  // ──────────────────────────────────────────────────────────────────────────────────
  const badgeAliases = [
    "Badge",
    "Badge Text",
    "Badge Label",
    "badge",
    "heading_label",
    "Heading",
    "Heading Label",
    "heading label",
    "headingLabel",
    "heading_label",
    "Label",
    "label",
  ];
  const badge = getFieldValue(badgeAliases, "EXPERT GUIDANCE");
  trackKey(badgeAliases);

  const titleAliases = ["Title", "Main Title", "Main Heading", "Section Title", "title"];
  const title = getFieldValue(titleAliases, "Meet Our Expert Counselors");
  trackKey(titleAliases);

  const subtitleAliases = ["Subtitle", "Subheading", "Description", "subtitle", "description"];
  const subtitle = getFieldValue(subtitleAliases, "Get personalized guidance from India's top education counselors");
  trackKey(subtitleAliases);

  const buttonTextAliases = ["Button Text", "CTA Text", "Call to Action", "button_text", "ViewAllButtonText"];
  const buttonText = getFieldValue(buttonTextAliases, "View All Counsellors");
  trackKey(buttonTextAliases);

  // Parse counselor data from CMS
  // ── Parse counselor data from 3 named CMS textarea fields ──────────────────
  // Each field value is 4 lines: title, specialty, experience, studentsGuided
  const COUNSELOR_DEFS = [
    { name: "Dr. Priya Sharma", cmsKey: "Dr. Priya sharma", image: "/Image (Dr. Priya Sharma).png", rating: 4.9, reviewCount: 1250 },
    { name: "Rahul Mehta", cmsKey: "Rahul Mehta", image: "/Image (Rahul Mehta).png", rating: 4.9, reviewCount: 1250 },
    { name: "Anita Desai", cmsKey: "Anita Desai", image: "/Image (Anita Desai).png", rating: 5.0, reviewCount: 1250 },
  ];

  const FALLBACK_LINES = [
    ["Senior Education Counselor", "MBA & Management Programs", "12 years experience", "3500+ students guided"],
    ["Career Guidance Expert", "Tech & Data Science", "10 years experience", "2800+ students guided"],
    ["Study Abroad Specialist", "International Programs", "15 years experience", "4200+ students guided"],
  ];

  const counselors: Counselor[] = COUNSELOR_DEFS.map((def, idx) => {
    const rawKey = Object.keys(v).find((k) => k.toLowerCase() === def.cmsKey.toLowerCase());
    const raw = rawKey ? richTextToPlain(v[rawKey]).trim() : "";
    const lines = raw.split("\n").map((l: string) => l.trim()).filter(Boolean);
    const fb = FALLBACK_LINES[idx];
    return {
      id: String(idx + 1),
      name: def.name,
      image: def.image,
      rating: def.rating,
      reviewCount: def.reviewCount,
      title: lines[0] || fb[0],
      specialty: lines[1] || fb[1],
      expertise: lines[1] || fb[1],
      experience: lines[2] || fb[2],
      studentsGuided: lines[3] || fb[3],
    };
  });

  const desktopSliderRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);
  const [sliderPage, setSliderPage] = useState(0);
  const GAP_DESKTOP = 32;

  useEffect(() => {
    const el = desktopSliderRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setCardW((w - GAP_DESKTOP * 2) / 3);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const maxPage = Math.max(0, counselors.length - 3);

  return (
    <section className="w-full bg-white py-10 md:py-16 -mt-6 md:-mt-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Badge (pill) */}
        <div className="flex justify-center mb-6">
          <div
            style={{
              maxWidth: "100%",
              minHeight: "44px",
              padding: "10px 20px",
              backgroundColor: "#EEF2FF",
              borderRadius: 9999,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "clamp(11px, 2.6vw, 14px)",
                lineHeight: "20px",
                letterSpacing: "0.7px",
                color: "#4F39F6",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                textAlign: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {badge}
            </div>
          </div>
        </div>

        {/* Title */}
        <h2
          className="text-center mb-4"
          style={{
            fontFamily: "Inter",
            fontSize: "clamp(22px, 5.5vw, 36px)",
            fontWeight: 700,
            color: "#101828",
            lineHeight: "1.2",
          }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p
          className="text-center mb-8 md:mb-16 mx-auto px-4"
          style={{
            fontFamily: "Inter",
            maxWidth: "672px",
            width: "100%",
            fontSize: "clamp(15px, 3vw, 20px)",
            fontWeight: 400,
            color: "#4A5565",
            lineHeight: "28px",
          }}
        >
          {subtitle}
        </p>

        {/* Counselor Cards — Mobile focus-center slider */}
        <FocusCenterSlider className="mt-8 mb-8">
          {counselors.map((counselor) => (
            <CounselorCard
              key={counselor.id}
              counselor={counselor}
              isMobile={true}
            />
          ))}
        </FocusCenterSlider>

        {/* Counselor Cards Grid — Desktop (horizontal slider) */}
        <div className="hidden md:block">
          {/* Overflow-hidden viewport; inner flex row slides via translateX */}
          <div ref={desktopSliderRef} style={{ overflow: 'hidden', width: '100%' }}>
            <div
              style={{
                display: 'flex',
                gap: GAP_DESKTOP + 'px',
                transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
                transform: cardW > 0 ? `translateX(-${sliderPage * (cardW + GAP_DESKTOP)}px)` : 'none',
              }}
            >
              {counselors.map((counselor) => (
                <div
                  key={counselor.id}
                  style={{
                    flex: `0 0 ${cardW > 0 ? cardW + 'px' : 'calc(33.33% - 22px)'}`,
                    minWidth: 0,
                  }}
                >
                  <CounselorCard counselor={counselor} isMobile={false} />
                </div>
              ))}
            </div>
          </div>

          {/* Slide button — only when there are more than 3 counselors */}
          {counselors.length > 3 && (
            <div className="flex justify-center mt-8 mb-12">
              <button
                onClick={() => setSliderPage(p => p < maxPage ? p + 1 : 0)}
                style={{
                  height: 48,
                  padding: '0 32px',
                  borderRadius: 10,
                  background: 'linear-gradient(to right, #9810FA, #8200DB)',
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: 16,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.10)',
                  transition: 'opacity 0.2s',
                }}
              >
                {sliderPage < maxPage ? buttonText : 'View Less'}
              </button>
            </div>
          )}
        </div>


      </div>
    </section>
  );
}

// Tell the SectionRenderer which CMS field names this component consumes
export const usedFields = [
  "Badge", "Badge Text", "Badge Label", "badge", "heading_label",
  "Main heading", "Main Heading", "Title", "Main Title", "Section Title", "title",
  "Below Main heading", "Below Main Heading", "Subtitle", "Subheading", "Description", "subtitle", "description",
  "Main pill",
  "Button Text", "CTA Text", "Call to Action", "button_text", "ViewAllButtonText",
  // Named counselor textarea fields
  "Dr. Priya sharma",
  "Rahul Mehta",
  "Anita Desai",
];
