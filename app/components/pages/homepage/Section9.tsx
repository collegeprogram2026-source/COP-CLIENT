"use client";

import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import Image from "next/image";
import Link from "next/link";
import FocusCenterSlider from "./FocusCenterSlider";
import TrendingBadge from "@/app/components/ui/TrendingBadge";

interface Section9Props {
  section: SectionContent;
}

// Parse article textarea: split into title and description
function parseArticle(raw: string): { title: string; description: string } {
  const text = raw.trim();
  if (!text) return { title: "", description: "" };

  // Try newline split first
  const newlineIdx = text.indexOf("\n");
  if (newlineIdx > 0) {
    return { title: text.slice(0, newlineIdx).trim(), description: text.slice(newlineIdx + 1).trim() };
  }
  // Split at "? " after at least 10 chars
  const qIdx = text.indexOf("? ");
  if (qIdx > 10) {
    return { title: text.slice(0, qIdx + 1).trim(), description: text.slice(qIdx + 2).trim() };
  }
  // Split at first ". " after at least 30 chars
  for (let i = 30; i < text.length - 1; i++) {
    if (text[i] === "." && text[i + 1] === " ") {
      return { title: text.slice(0, i + 1).trim(), description: text.slice(i + 2).trim() };
    }
  }
  // Fallback: whole text is title
  return { title: text, description: "" };
}

const DEFAULT_ARTICLES = [
  {
    slug: "top-10-mba-specializations-2026",
    category: "Career Guide",
    date: "March 8, 2026",
    readTime: "8 min read",
    title: "Top 10 MBA Specializations in 2026: Which One is Right for You?",
    description:
      "Explore the most in-demand MBA specializations and discover which one aligns with your career goals and industry trends.",
    author: "Dr. Priya Sharma",
  },
  {
    slug: "how-to-balance-work-and-online-learning",
    category: "Study Tips",
    date: "March 5, 2026",
    readTime: "6 min read",
    title: "How to Balance Work and Online Learning: 5 Proven Strategies",
    description:
      "Working professionals share their tips for successfully managing full-time jobs while pursuing online degrees.",
    author: "Rahul Mehta",
  },
  {
    slug: "online-mba-admission-process-2026",
    category: "Admission Guide",
    date: "March 2, 2026",
    readTime: "10 min read",
    title: "Online MBA Admission Process 2026: Complete Step-by-Step Guide",
    description:
      "Everything you need to know about applying to top online MBA programs, from eligibility to entrance exams.",
    author: "Anita Desai",
  },
  {
    slug: "best-online-universities-india-2026",
    category: "University Guide",
    date: "February 28, 2026",
    readTime: "7 min read",
    title: "Best Online Universities in India 2026: Rankings & Reviews",
    description:
      "A comprehensive ranking of India's top online universities based on faculty, placement support, and student satisfaction.",
    author: "Anita Desai",
  },
];

export default function Section9({ section }: Section9Props) {
  const v = section.values || {};

  const getFieldValue = (aliases: string[], fallback = ""): string => {
    for (const alias of aliases) {
      const key = Object.keys(v).find((k) => k.toLowerCase() === alias.toLowerCase());
      if (key) {
        const text = richTextToPlain(v[key]).trim();
        if (text) return text;
      }
    }
    return fallback;
  };

  const pill = getFieldValue(["Pill", "pill", "Badge", "badge"], "KNOWLEDGE CENTRE");
  const mainHeading = getFieldValue(
    ["Main Heading", "main heading", "Title", "title", "heading"],
    "Latest Blogs & Resources"
  );
  const belowHeading = getFieldValue(
    ["Below Main Heading", "below main heading", "Subtitle", "subtitle", "Description", "description"],
    "Expert insights on education and career growth"
  );

  // Known non-article fields to skip when scanning for article content
  const NON_ARTICLE_KEYS = new Set([
    "pill", "badge", "main heading", "title", "heading",
    "below main heading", "subtitle", "description",
  ]);

  // First try explicit aliases, then fall back to scanning ALL string values
  // in the section that aren't header fields — this way any field name works.
  const articleAliasGroups = [
    ["First Article", "first article", "Article 1", "article1", "article_1"],
    ["Second Article", "second article", "Article 2", "article2", "article_2"],
    ["Third Article", "third article", "Article 3", "article3", "article_3"],
    ["Fourth Article", "fourth article", "Article 4", "article4", "article_4"],
  ];

  // Collect raw article strings: try aliases first, then pick up any remaining
  // non-header textarea values in field order.
  const aliasHits = articleAliasGroups.map((aliases) => getFieldValue(aliases, ""));
  const anyAliasMatched = aliasHits.some(Boolean);

  let rawArticleValues: string[];
  if (anyAliasMatched) {
    rawArticleValues = aliasHits;
  } else {
    // No alias matched — collect every non-empty string value whose key isn't a header field
    rawArticleValues = Object.keys(v)
      .filter((k) => !NON_ARTICLE_KEYS.has(k.toLowerCase()))
      .map((k) => richTextToPlain(v[k]).trim())
      .filter(Boolean)
      .slice(0, 4);
  }

  const articles = rawArticleValues.length > 0
    ? rawArticleValues.map((raw, i) => {
      const parsed = parseArticle(raw);
      const def = DEFAULT_ARTICLES[i] || DEFAULT_ARTICLES[0];
      return {
        ...def,
        title: parsed.title || def.title,
        description: parsed.description || def.description,
      };
    })
    : DEFAULT_ARTICLES;

  return (
    <section style={{ width: "100%", paddingTop: "clamp(32px,6vw,64px)", paddingBottom: "clamp(32px,6vw,64px)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {/* Pill */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <span
            style={{
              background: "#EEF2FF",
              color: "#4F39F6",
              fontFamily: "Inter",
              fontSize: "clamp(11px, 2.6vw, 14px)",
              fontWeight: 700,
              lineHeight: "20px",
              letterSpacing: "0.7px",
              textTransform: "uppercase",
              padding: "10px 22px",
              minHeight: 44,
              maxWidth: "100%",
              whiteSpace: "nowrap",
              display: "inline-flex",
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
            fontWeight: 700,
            lineHeight: "1.2",
            letterSpacing: "0px",
            color: "#101828",
            textAlign: "center",
            margin: "0 0 12px 0",
          }}
        >
          {mainHeading}
        </h2>

        {/* Below Heading */}
        <p
          style={{
            fontFamily: "Inter",
            fontSize: "clamp(14px, 4vw, 20px)",
            fontWeight: 400,
            lineHeight: "28px",
            letterSpacing: "0px",
            color: "#4A5565",
            textAlign: "center",
            margin: "0 0 48px 0",
          }}
        >
          {belowHeading}
        </p>

        {/* Mobile: focus-center slider */}
        <FocusCenterSlider className="mt-8 mb-8" cardWidth={280}>
          {articles.map((article, idx) => (
            <div
              key={`m9-${idx}`}
              className="bg-[#FFFFFF] flex flex-col h-full overflow-hidden"
              style={{ minHeight: 360, borderRadius: 20 }}
            >
              <div style={{ position: 'relative', width: '100%', height: 160, flexShrink: 0 }}>
                <Image src="/Blogs.png" alt={article.title} fill sizes="280px" style={{ objectFit: 'cover' }} />
                <span style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  background: 'rgba(79, 57, 246, 0.9)',
                  backdropFilter: 'blur(8px)',
                  color: '#fff',
                  fontFamily: 'Inter',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: 9999,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>{article.category}</span>
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                <div style={{ fontFamily: 'Inter', fontSize: 11, color: '#64748B', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {article.date} · {article.readTime}
                </div>
                <h3 style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: '#101828', lineHeight: '22px', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#6B7280', lineHeight: '19px', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.description}</p>
                <Link href={`/articles/${article.slug}`} className="hover:opacity-70 transition-opacity duration-200 mt-auto pt-2" style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 700, color: '#4F39F6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>Read More <span style={{ fontSize: 16 }}>→</span></Link>
              </div>
            </div>
          ))}
        </FocusCenterSlider>

        {/* Desktop: Cards Grid — 2 cols on tablet, 4 cols on desktop */}
        <div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4"
          style={{
            gap: "clamp(16px, 2.5vw, 24px)",
            marginBottom: "48px",
          }}
        >
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="rounded-xl sha"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image with category badge overlay */}
              <div style={{ position: "relative", width: "100%", height: "160px", flexShrink: 0 }}>
                <Image
                  src="/Blogs.png"
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <TrendingBadge
                  icon={null}
                  className="absolute top-3 left-3 !px-3 !py-0.5 text-[11px] font-semibold"
                >
                  {article.category}
                </TrendingBadge>
              </div>

              {/* Card content */}
              <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>

                {/* Date + read time */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontFamily: "Inter",
                      fontSize: 12,
                      color: "#6B7280",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {article.date}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontFamily: "Inter",
                      fontSize: 12,
                      color: "#6B7280",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "Inter",
                    fontSize: 16,
                    fontWeight: 700,
                    lineHeight: "22px",
                    color: "#101828",
                    margin: "0 0 8px 0",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {article.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: 13,
                    fontWeight: 400,
                    lineHeight: "20px",
                    color: "#6B7280",
                    margin: "0 0 16px 0",
                    flex: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {article.description}
                </p>

                {/* Footer: Author + Read link */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "Inter",
                      fontSize: 13,
                      fontWeight: 400,
                      color: "#6B7280",
                    }}
                  >
                    By{" "}
                    <strong style={{ color: "#101828", fontWeight: 600 }}>{article.author}</strong>
                  </span>
                  <Link
                    href={`/articles/${article.slug || "the-future-of-business-education"}`}
                    className="hover:opacity-70 transition-opacity duration-200"
                    style={{
                      fontFamily: "Inter",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#4F39F6",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Read &#8594;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Articles Button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link
            href="/articles"
            className="hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
            style={{
              minWidth: 220,
              maxWidth: "90vw",
              minHeight: 52,
              padding: "12px 24px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)",
              boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
              fontFamily: "Inter",
              fontSize: "clamp(14px, 3.2vw, 16px)",
              fontWeight: 600,
              color: "#FFFFFF",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            View All Articles &#8594;
          </Link>
        </div>

      </div>
    </section>
  );
}

// CMS field names consumed by this component — prevents auto-render duplicates
export const usedFields = [
  "Pill", "pill", "Badge", "badge",
  "Main Heading", "main heading", "Title", "title", "heading",
  "Below Main Heading", "below main heading", "Subtitle", "subtitle", "Description", "description",
  "First Article", "first article", "Article 1", "article1", "article_1",
  "Second Article", "second article", "Article 2", "article2", "article_2",
  "Third Article", "third article", "Article 3", "article3", "article_3",
];
