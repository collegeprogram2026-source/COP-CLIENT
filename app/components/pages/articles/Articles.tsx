"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

// ─── Dummy Data (replace with CMS fetch later) ────────────────────────────────

// Default icons mapped by category name (case-insensitive match).
// Anything unmapped uses the fallback icon.
const CATEGORY_ICON_MAP: Record<string, string> = {
  "career guide": "/Icon (4).png",
  "technology": "/Icon (5).png",
  "business strategy": "/Icon (6).png",
  "marketing": "/Icon (7).png",
  "leadership": "/Icon (8).png",
  "data science": "/Icon (9).png",
  "study tips": "/Icon (5).png",
  "admission guide": "/Icon (6).png",
  "mba": "/Icon (4).png",
};
const FALLBACK_ICON = "/Icon (4).png";

const ALL_ARTICLES = [
  {
    slug: "top-10-mba-specializations-2026",
    category: "Career Guide",
    date: "March 8, 2026",
    readTime: "8 min read",
    title: "Top 10 MBA Specializations in 2026: Which One is Right for You?",
    description:
      "Explore the most in-demand MBA specializations and discover which one aligns with your career goals and industry trends.",
    author: "Dr. Priya Sharma",
    image: "/Blogs.png",
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
    image: "/Blogs.png",
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
    image: "/Blogs.png",
  },
  {
    slug: "top-10-mba-specializations-2026-b",
    category: "Career Guide",
    date: "March 8, 2026",
    readTime: "8 min read",
    title: "Top 10 MBA Specializations in 2026: Which One is Right for You?",
    description:
      "Explore the most in-demand MBA specializations and discover which one aligns with your career goals and industry trends.",
    author: "Dr. Priya Sharma",
    image: "/Blogs.png",
  },
  {
    slug: "how-to-balance-work-and-online-learning-b",
    category: "Study Tips",
    date: "March 5, 2026",
    readTime: "6 min read",
    title: "How to Balance Work and Online Learning: 5 Proven Strategies",
    description:
      "Working professionals share their tips for successfully managing full-time jobs while pursuing online degrees.",
    author: "Rahul Mehta",
    image: "/Blogs.png",
  },
  {
    slug: "online-mba-admission-process-2026-b",
    category: "Admission Guide",
    date: "March 2, 2026",
    readTime: "10 min read",
    title: "Online MBA Admission Process 2026: Complete Step-by-Step Guide",
    description:
      "Everything you need to know about applying to top online MBA programs, from eligibility to entrance exams.",
    author: "Anita Desai",
    image: "/Blogs.png",
  },
  {
    slug: "is-online-mba-worth-it-2026",
    category: "Career Guide",
    date: "February 28, 2026",
    readTime: "7 min read",
    title: "Is an Online MBA Worth It? Honest Review from 2026 Graduates",
    description:
      "We surveyed 200 online MBA graduates to bring you an unfiltered look at ROI, promotions, and career shifts.",
    author: "Dr. Priya Sharma",
    image: "/Blogs.png",
  },
  {
    slug: "5-best-note-taking-apps-2026",
    category: "Study Tips",
    date: "February 25, 2026",
    readTime: "5 min read",
    title: "5 Best Note-Taking Apps for Online Students in 2026",
    description:
      "Stay organized and ace your exams with these top-rated digital tools designed specifically for online learners.",
    author: "Rahul Mehta",
    image: "/Blogs.png",
  },
  {
    slug: "du-sol-admission-2026",
    category: "Admission Guide",
    date: "February 22, 2026",
    readTime: "9 min read",
    title: "Understanding DU-SOL Admission: Eligibility, Process & Fees",
    description:
      "A comprehensive guide to getting into Delhi University's School of Open Learning programs in 2026.",
    author: "Anita Desai",
    image: "/Blogs.png",
  },
  {
    slug: "top-companies-hiring-online-mba-2026",
    category: "Career Guide",
    date: "February 20, 2026",
    readTime: "6 min read",
    title: "Top Companies Hiring Online MBA Graduates in India – 2026 List",
    description:
      "Discover which top employers are actively recruiting candidates with online MBA degrees this year.",
    author: "Dr. Priya Sharma",
    image: "/Blogs.png",
  },
  {
    slug: "ai-ml-careers-online-mca",
    category: "Technology",
    date: "February 18, 2026",
    readTime: "8 min read",
    title: "AI & ML Careers: How to Get Started with an Online MCA",
    description:
      "A step-by-step roadmap for transitioning into Artificial Intelligence careers through online MCA programs.",
    author: "Rahul Mehta",
    image: "/Blogs.png",
  },
  {
    slug: "executive-education-vs-mba",
    category: "Leadership",
    date: "February 15, 2026",
    readTime: "7 min read",
    title: "Executive Education vs. MBA: Which Is Right for You?",
    description:
      "Breaking down the differences between short-term executive courses and full-degree MBA programs.",
    author: "Anita Desai",
    image: "/Blogs.png",
  },
];

export interface ArticleData {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  author: string;
  image: string;
}

interface ArticlesPageProps {
  cmsArticles?: ArticleData[];
  pageTitle?: string;
  pageSubtitle?: string;
}

const ARTICLES_PER_PAGE = 6;
const ALL_LABEL = "All";

// ─────────────────────────────────────────────────────────────────────────────

export default function ArticlesPage({ cmsArticles, pageTitle, pageSubtitle }: ArticlesPageProps = {}) {
  const sourceArticles: ArticleData[] = cmsArticles && cmsArticles.length > 0 ? cmsArticles : ALL_ARTICLES;

  // Build the sidebar categories dynamically from the article data so every
  // entry actually filters to at least one article.
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const list: { label: string; icon: string; count: number }[] = [
      { label: ALL_LABEL, icon: FALLBACK_ICON, count: sourceArticles.length },
    ];
    for (const a of sourceArticles) {
      const key = a.category;
      if (!key || seen.has(key)) continue;
      seen.add(key);
      const icon = CATEGORY_ICON_MAP[key.toLowerCase()] || FALLBACK_ICON;
      const count = sourceArticles.filter((x) => x.category === key).length;
      list.push({ label: key, icon, count });
    }
    return list;
  }, [sourceArticles]);

  const [activeCategory, setActiveCategory] = useState(ALL_LABEL);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(
    () =>
      activeCategory === ALL_LABEL
        ? sourceArticles
        : sourceArticles.filter((a) => a.category === activeCategory),
    [sourceArticles, activeCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageArticles = filteredArticles.slice(
    (safePage - 1) * ARTICLES_PER_PAGE,
    safePage * ARTICLES_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSelectCategory = (label: string) => {
    setActiveCategory(label);
    setCurrentPage(1);
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* ── Header Section ── */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#FFFFFF",
          paddingTop: "clamp(24px, 4vw, 40px)",
          paddingBottom: "clamp(16px, 3vw, 24px)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Inter",
            fontSize: "clamp(24px, 5.5vw, 36px)",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#101828",
            margin: "0 0 8px 0",
            padding: "0 16px",
          }}
        >
          {pageTitle || "Latest Blogs & Resources"}
        </h1>
        <p
          style={{
            fontFamily: "Inter",
            fontSize: "clamp(14px, 3.5vw, 20px)",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "#4A5565",
            margin: 0,
            padding: "0 16px",
          }}
        >
          {pageSubtitle || "Expert insights on education and career growth"}
        </p>
      </div>

      {/* ── Breadcrumb ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 24px)",
          marginBottom: 24,
        }}
      >
        <nav style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              fontFamily: "Inter",
              fontSize: 13,
              fontWeight: 400,
              color: "#6B7280",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <span style={{ color: "#6B7280", fontSize: 13 }}>/</span>
          <Link
            href="/articles"
            style={{
              fontFamily: "Inter",
              fontSize: 13,
              fontWeight: 500,
              color: "#4F39F6",
              textDecoration: "none",
            }}
          >
            View Articles
          </Link>
          <span style={{ color: "#6B7280", fontSize: 13 }}>/</span>
          <span
            style={{
              fontFamily: "Inter",
              fontSize: 13,
              fontWeight: 400,
              color: "#6B7280",
            }}
          >
            Article Page
          </span>
        </nav>
      </div>

      {/* ── Mobile/Tablet: horizontal chip strip (lg+ uses sidebar instead) ── */}
      <div
        className="lg:hidden"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 24px)",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 4,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="no-scrollbar"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => onSelectCategory(cat.label)}
                style={{
                  flexShrink: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 14px",
                  borderRadius: 9999,
                  border: isActive ? "none" : "1px solid #E5E7EB",
                  cursor: "pointer",
                  background: isActive
                    ? "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)"
                    : "#FFFFFF",
                  fontFamily: "Inter",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#FFFFFF" : "#374151",
                  whiteSpace: "nowrap",
                  transition: "background 0.15s",
                }}
              >
                <Image src={cat.icon} alt="" width={16} height={16} />
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    opacity: 0.85,
                    background: isActive ? "rgba(255,255,255,0.2)" : "#F3F4F6",
                    padding: "1px 7px",
                    borderRadius: 9999,
                  }}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Content: Sidebar + Grid ── */}
      <div
        className="articles-main"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 24px) clamp(48px, 8vw, 80px)",
        }}
      >
        <div className="articles-layout">
          {/* ── Left Sidebar (lg+ only) ── */}
          <aside className="articles-sidebar hidden lg:block">
            <div
              style={{
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                padding: "20px 16px",
                background: "#FFFFFF",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                position: "sticky",
                top: 24,
              }}
            >
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#101828",
                  lineHeight: "28px",
                  margin: "0 0 16px 0",
                }}
              >
                Explore by Category
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.label;
                  return (
                    <li key={cat.label}>
                      <button
                        onClick={() => onSelectCategory(cat.label)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          borderRadius: 10,
                          border: "none",
                          cursor: "pointer",
                          background: isActive
                            ? "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)"
                            : "transparent",
                          transition: "background 0.15s",
                        }}
                      >
                        <span style={{ display: "inline-flex", width: 20, height: 20, flexShrink: 0 }}>
                          <Image src={cat.icon} alt={`${cat.label} icon`} width={20} height={20} />
                        </span>
                        <span
                          style={{
                            flex: 1,
                            textAlign: "left",
                            fontFamily: "Inter",
                            fontSize: 13,
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? "#FFFFFF" : "#374151",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {cat.label}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: isActive ? "#FFFFFF" : "#6B7280",
                            background: isActive ? "rgba(255,255,255,0.2)" : "#F3F4F6",
                            padding: "1px 7px",
                            borderRadius: 9999,
                          }}
                        >
                          {cat.count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* ── Articles Grid ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {pageArticles.length === 0 ? (
              <div
                style={{
                  border: "1px dashed #E5E7EB",
                  borderRadius: 16,
                  padding: "48px 24px",
                  textAlign: "center",
                  color: "#6B7280",
                  fontFamily: "Inter",
                  fontSize: 14,
                }}
              >
                No articles found in <strong>{activeCategory}</strong>.
              </div>
            ) : (
              <div className="articles-grid">
                {pageArticles.map((article, idx) => (
                  <ArticleCard key={`${article.slug}-${idx}`} article={article} />
                ))}
              </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 32, flexWrap: "wrap" }}>
                <PaginationBtn
                  label="‹"
                  onClick={() => handlePageChange(safePage - 1)}
                  disabled={safePage === 1}
                  active={false}
                />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationBtn
                    key={page}
                    label={String(page)}
                    onClick={() => handlePageChange(page)}
                    disabled={false}
                    active={page === safePage}
                  />
                ))}
                <PaginationBtn
                  label="›"
                  onClick={() => handlePageChange(safePage + 1)}
                  disabled={safePage === totalPages}
                  active={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Local CSS for layout breakpoints + scrollbar hide */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .articles-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: flex-start;
        }
        .articles-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        @media (min-width: 640px) {
          .articles-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }
        @media (min-width: 1024px) {
          .articles-layout { grid-template-columns: 220px 1fr; gap: 32px; }
          .articles-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
        @media (min-width: 1200px) {
          .articles-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  );
}

// ─── ArticleCard ──────────────────────────────────────────────────────────────

function ArticleCard({
  article,
}: {
  article: {
    slug: string;
    category: string;
    date: string;
    readTime: string;
    title: string;
    description: string;
    author: string;
    image: string;
  };
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image + category badge */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", flexShrink: 0 }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
        <span
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)",
            color: "#FFFFFF",
            fontFamily: "Inter",
            fontSize: 11,
            fontWeight: 600,
            lineHeight: "16px",
            padding: "4px 12px",
            borderRadius: 9999,
          }}
        >
          {article.category}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Date + read time */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10, flexWrap: "wrap" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
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
              gap: 4,
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
            fontSize: "clamp(15px, 2.2vw, 16px)",
            fontWeight: 700,
            lineHeight: 1.35,
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 400, color: "#6B7280", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            By{" "}
            <strong style={{ color: "#101828", fontWeight: 600 }}>{article.author}</strong>
          </span>
          <Link
            href={`/articles/${article.slug}`}
            style={{
              fontFamily: "Inter",
              fontSize: 13,
              fontWeight: 600,
              color: "#4F39F6",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
              flexShrink: 0,
            }}
          >
            Read &#8594;
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── PaginationBtn ────────────────────────────────────────────────────────────

function PaginationBtn({
  label,
  onClick,
  disabled,
  active,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        minWidth: 36,
        height: 36,
        padding: "0 10px",
        borderRadius: 8,
        border: active ? "none" : "1px solid #E5E7EB",
        background: active
          ? "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)"
          : "#FFFFFF",
        color: active ? "#FFFFFF" : disabled ? "#D1D5DB" : "#374151",
        fontFamily: "Inter",
        fontSize: 14,
        fontWeight: active ? 700 : 400,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s",
        boxShadow: active ? "0 2px 8px rgba(79,57,246,0.3)" : "none",
      }}
    >
      {label}
    </button>
  );
}
