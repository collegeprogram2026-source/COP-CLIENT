"use client";

import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import { useState, useEffect, useRef } from "react";
import ProgramSliderGrid from "./ProgramSliderGrid";
import { Program } from "./ProgramCard";
import Link from "next/link";

interface Section6Props {
  section: SectionContent;
}

const MOCK_ROI: Program[] = [
  { _id: "p1", title: "Master of Computer Applications", fees: 120000, discountedFees: 100000, duration: "24 Months", trending: false, certifications: ["UGC", "NAAC A+"], features: ["Job Assistance", "Flexible Learning", "Industry Projects"], rating: 4.6, reviews: 189, providerName: "Amity Online", providerSlug: "amity-online" },
  { _id: "p2", title: "Executive MBA (Finance)", fees: 200000, discountedFees: 166667, duration: "18 Months", trending: true, certifications: ["UGC", "AIU"], features: ["Weekend Classes", "CFO Sessions", "Bloomberg Terminal"], rating: 4.9, reviews: 312, providerName: "Symbiosis Online", providerSlug: "symbiosis-online" },
  { _id: "p3", title: "MBA in Data Science", fees: 180000, discountedFees: 150000, duration: "24 Months", trending: false, certifications: ["UGC", "NAAC A+"], features: ["Industry Mentors", "Live Projects", "Placement Support"], rating: 4.7, reviews: 198, providerName: "NMIMS Online", providerSlug: "nmims-online" },
  { _id: "p4", title: "BBA in Business Analytics", fees: 120000, discountedFees: 100000, duration: "36 Months", trending: false, certifications: ["UGC", "AICTE"], features: ["Industry Projects", "Internships", "Job Assistance"], rating: 4.4, reviews: 134, providerName: "Jain Online", providerSlug: "jain-online" },
];

const MOCK_TRENDING: Program[] = [
  { _id: "t1", title: "MBA in Digital Marketing", fees: 150000, discountedFees: 125000, duration: "18 Months", trending: true, certifications: ["UGC", "NAAC A+"], features: ["Live Projects", "Agency Internship", "Google Certification"], rating: 4.7, reviews: 241, providerName: "Manipal Online", providerSlug: "manipal-online" },
  { _id: "t2", title: "B.Sc. in Data Science", fees: 130000, discountedFees: 108333, duration: "36 Months", trending: true, certifications: ["UGC", "AICTE"], features: ["Python & ML Labs", "Industry Mentors", "Placement Support"], rating: 4.8, reviews: 198, providerName: "LPU Online", providerSlug: "lpu-online" },
  { _id: "t3", title: "MBA in HR Management", fees: 160000, discountedFees: 133333, duration: "24 Months", trending: true, certifications: ["UGC", "AIU"], features: ["Case Study Method", "HR Simulations", "Global Exposure"], rating: 4.6, reviews: 175, providerName: "UPES Online", providerSlug: "upes-online" },
  { _id: "t4", title: "M.Com in Finance", fees: 110000, discountedFees: 91667, duration: "24 Months", trending: true, certifications: ["UGC", "NAAC A+"], features: ["CFA Prep Module", "Finance Labs", "Job Assistance"], rating: 4.5, reviews: 156, providerName: "Amity Online", providerSlug: "amity-online" },
];

type TabMode = "roi" | "trending";

export default function Section6({ section }: Section6Props) {
  const v = section.values || {};
  const [roiPrograms, setRoiPrograms] = useState<Program[]>(MOCK_ROI);
  const [trendingPrograms, setTrendingPrograms] = useState<Program[]>(MOCK_TRENDING);
  const [activeTab, setActiveTab] = useState<TabMode>("roi");
  const programs = activeTab === "roi" ? roiPrograms : trendingPrograms;

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

  const pill = getFieldValue(["Badge", "Pill", "Badge Text", "heading_label"], "MOST POPULAR");
  const title = getFieldValue(["Title", "Main Title", "Main Heading", "title"], "Trending Programs");
  const subtitle = getFieldValue(["Subtitle", "Subheading", "Description", "subtitle"], "Handpicked programs from top universities with excellent placement records");

  const [desktopStartIndex, setDesktopStartIndex] = useState(0);
  const [headingIndex, setHeadingIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const defaultHeadings = [
    title,
    "Top Rated Programs",
    "Best ROI Programs",
    "Most Popular Programs"
  ];
  const currentTitle = defaultHeadings[headingIndex] || title;

  const [totalPrograms, setTotalPrograms] = useState<number | null>(null);

  useEffect(() => {
    // Try to fetch real trending programs from API; fallback to mock
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const fetchROI = async () => {
      try {
        const res = await fetch(`${apiBase}/api/public/providers/programs/best-roi`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) setRoiPrograms(data);
        }
      } catch { /* fallback to mock */ }
    };

    const fetchTrending = async () => {
      try {
        const res = await fetch(`${apiBase}/api/public/providers/programs/trending`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) setTrendingPrograms(data);
        }
      } catch { /* fallback to mock */ }
    };

    const fetchTotalCount = async () => {
      try {
        const res = await fetch(`${apiBase}/api/public/provider-courses/count`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.count === "number") setTotalPrograms(data.count);
        }
      } catch (err) {
        console.error("Failed to fetch programs count:", err);
      }
    };

    fetchROI();
    fetchTrending();
    fetchTotalCount();
  }, []);

  useEffect(() => {
    if (programs.length <= 4) return;
    const intervalId = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setDesktopStartIndex((prev) => {
          const next = prev + 4;
          return next >= programs.length ? 0 : next;
        });
        setHeadingIndex((prev) => (prev + 1) % defaultHeadings.length);
        setIsAnimating(false);
      }, 400); // 400ms fade out before swapping content
    }, 7000);
    return () => clearInterval(intervalId);
  }, [programs.length, defaultHeadings.length]);


  return (
    <section className="w-full bg-white py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div
          className="text-center mb-8 md:mb-12"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
            transition: 'opacity 0.4s ease, transform 0.4s ease'
          }}
        >
          <div className="inline-block mb-4">
            <span style={{ background: '#EEF2FF', color: '#4F39F6', fontFamily: 'Inter', fontSize: 14, fontWeight: 700, lineHeight: '20px', letterSpacing: '0.7px', textTransform: 'uppercase', padding: '0 20px', height: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 9999 }}>{pill}</span>
          </div>
          {currentTitle && <h2 style={{ fontFamily: 'Inter', fontSize: 'clamp(22px,5vw,36px)', fontWeight: 800, color: '#101828', lineHeight: '1.2', marginBottom: 8 }}>{currentTitle}</h2>}
          {subtitle && <p style={{ fontFamily: 'Inter', fontSize: 'clamp(13px,3vw,16px)', fontWeight: 400, color: '#6A7282', lineHeight: '24px' }}>{subtitle}</p>}
        </div>

        <ProgramSliderGrid
          programs={programs}
          activeTab={activeTab}
          isAnimating={isAnimating}
          desktopStartIndex={desktopStartIndex}
        />
      </div>{/* end fade wrapper */}

      <div className="text-center mt-12">
        <Link href="/explore-programs?type=all" style={{ textDecoration: 'none' }}>
          <button
            className="hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
            style={{
              minWidth: 240,
              maxWidth: '90vw',
              minHeight: 52,
              borderRadius: 14,
              background: 'linear-gradient(135deg,#4F39F6 0%,#9810FA 100%)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: 'clamp(14px, 3.2vw, 16px)',
              lineHeight: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              border: 'none',
              padding: '12px 24px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <span>Browse All {totalPrograms !== null ? `${totalPrograms}+` : "2000+"} Programs</span>
            <img src="/Icon%20(3).png" alt="icon" style={{ width: 20, height: 20 }} />
          </button>
        </Link>
      </div>
    </section>
  );
}

export const usedFields = [
  'Badge', 'Pill', 'Badge Text', 'heading_label', 'Title', 'Main Title', 'Main Heading', 'title', 'Subtitle', 'Subheading', 'Description', 'subtitle'
];
