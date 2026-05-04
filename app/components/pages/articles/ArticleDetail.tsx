"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── Dummy Article Data (replace with CMS fetch later) ────────────────────────

export interface ArticleDetailData {
  slug: string;
  category: string;
  title: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  heroImage: string;
  tags: string[];
  tableOfContents: { id: string; label: string }[];
  body: ArticleBlock[];
}

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "quote"; text: string }
  | { type: "casestudy"; heading: string; description: string; bullets: string[] }
  | { type: "takeaways"; items: string[] };

const DUMMY_ARTICLE: ArticleDetailData = {
  slug: "the-future-of-business-education",
  category: "Career Guide",
  title: "The Future of Business Education in a Digital Age",
  authorName: "Dr. Dinesh Jenkins",
  authorRole: "Head of Partnerships",
  authorAvatar: "/Image (Dr. Priya Sharma).png",
  date: "Oct 24, 2026",
  readTime: "3 min read",
  heroImage: "/Blogs.png",
  tags: ["TECHNOLOGY", "STRATEGY", "DIGITAL TRANSFORMATION"],
  tableOfContents: [
    { id: "paradigm-shift", label: "The Paradigm Shift" },
    { id: "hybrid-learning", label: "Hybrid Learning Model" },
    { id: "key-takeaways", label: "Key Takeaways" },
  ],
  body: [
    {
      type: "paragraph",
      text: "The traditional marble-pillared halls of business schools are undergoing a quiet yet profound revolution. As the global economy pivots toward a digital-first reality, the curriculum that defined the 20th-century executive is being rewritten in real-time — the executive that defined the 20th-century executive is being rewritten in real-time.",
    },
    {
      type: "h2",
      id: "paradigm-shift",
      text: "The Paradigm Shift in Executive Education",
    },
    {
      type: "paragraph",
      text: "For decades, the ideal proposition of a typical MBA was built on two pillars: access to a physical placement and the creation of legacy operations frameworks. Today, those pillars are being augmented by data literacy, algorithmic decision-making, and the ability to manage distributed global teams.",
    },
    {
      type: "quote",
      text: '"The modern business leader isn\'t just a manager of people; they are an orchestrator of digital ecosystems and human potential."',
    },
    {
      type: "h2",
      id: "hybrid-learning",
      text: "The Rise of the Hybrid Scholar",
    },
    {
      type: "paragraph",
      text: "Today's emerging manager no longer keeps a clear boundary between academics and practice. By leveraging asynchronous technical seminars with synchronous high-stakes simulations, modern education is transforming the very professional-student binary we once took for granted.",
    },
    {
      type: "casestudy",
      heading: "Case Study: The Virtual Boardroom",
      description:
        "A thriving ed-tech company ran a stimulated boardroom session where students must respond, debate and present strategies in real-time, testing how well students can strategically navigate both technical and human critical needs.",
      bullets: [
        "Digital Fluency: Understanding the mechanics of AI and Cloud as is essential as understanding a P&L.",
        "Agile Leadership: Shifting from rigid hierarchy to value-led spheres of influence.",
        "Continuous Pedagogical Evolution: to maintain a lifelong subscription system, not a one-time degree.",
      ],
    },
    {
      type: "h3",
      id: "key-takeaways",
      text: "Key Takeaways",
    },
    {
      type: "takeaways",
      items: [
        "Digital Fluency: Understanding the mechanics of AI and Cloud as is essential as understanding a P&L.",
        "Agile Leadership: Shifting from rigid hierarchy to value-led spheres of influence.",
        "Continuous Pedagogical Evolution: to maintain a lifelong subscription system, not a one-time degree.",
      ],
    },
  ],
};

// Map slug → detail data. All unknown slugs fall back to DUMMY_ARTICLE.
const ARTICLE_MAP: Record<string, ArticleDetailData> = {
  [DUMMY_ARTICLE.slug]: DUMMY_ARTICLE,
};

// Related reading cards shown at the bottom
const RELATED_ARTICLES = [
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
];

// ─────────────────────────────────────────────────────────────────────────────

export default function ArticleDetailPage({ slug }: { slug: string }) {
  const router = useRouter();
  const article = ARTICLE_MAP[slug] ?? DUMMY_ARTICLE;

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* ── Breadcrumb ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px clamp(16px, 4vw, 24px) 0" }}>
        {/* Back button */}
        <button
          onClick={() => router.back()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#6B7280",
            fontFamily: "Inter",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            padding: 0,
            marginBottom: 10,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>

        {/* Breadcrumb trail */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 28, flexWrap: "wrap" }}>
          <Link href="/" style={{ fontFamily: "Inter", fontSize: 13, color: "#6B7280", textDecoration: "none" }}>
            Home
          </Link>
          <span style={{ color: "#6B7280", fontSize: 13 }}>/</span>
          <Link href="/articles" style={{ fontFamily: "Inter", fontSize: 13, color: "#6B7280", textDecoration: "none" }}>
            View Articles
          </Link>
          <span style={{ color: "#6B7280", fontSize: 13 }}>/</span>
          <span style={{ fontFamily: "Inter", fontSize: 13, color: "#4F39F6", fontWeight: 500 }}>
            Article Page
          </span>
        </nav>
      </div>

      {/* ── Full-width header: badge + title + author ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px, 4vw, 24px) 0" }}>

        {/* Category badge */}
        <span
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)",
            color: "#FFFFFF",
            fontFamily: "Inter",
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 14px",
            borderRadius: 9999,
            marginBottom: 16,
          }}
        >
          {article.category}
        </span>

        {/* Title */}
        <h1
          style={{
            fontFamily: "Inter",
            fontSize: "clamp(24px, 5vw, 36px)",
            fontWeight: 800,
            lineHeight: 1.2,
            color: "#101828",
            margin: "0 0 20px 0",
          }}
        >
          {article.title}
        </h1>

        {/* Author row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
            paddingBottom: 20,
            borderBottom: "1px solid #E5E7EB",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
            <Image
              src={article.authorAvatar}
              alt={article.authorName}
              fill
              sizes="40px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <p style={{ fontFamily: "Inter", fontSize: 14, fontWeight: 700, color: "#101828", margin: 0 }}>
              {article.authorName}
            </p>
            <p style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 400, color: "#6B7280", margin: 0 }}>
              {article.authorRole}
            </p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "Inter", fontSize: 13, color: "#6B7280" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {article.date}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "Inter", fontSize: 13, color: "#6B7280" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {article.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* ── Full-width Hero Image ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px, 4vw, 24px)", marginBottom: 40 }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", maxHeight: 400, borderRadius: 16, overflow: "hidden" }}>
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1152px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>

      {/* ── Two-column below image: body + sidebar ── */}
      <div
        className="article-detail-layout"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 24px) clamp(48px, 8vw, 80px)",
        }}
      >
        {/* ══ LEFT — Article Body ══ */}
        <article style={{ minWidth: 0 }}>

          {/* Article Body */}
          {article.body.map((block, idx) => (
            <ArticleBodyBlock key={idx} block={block} />
          ))}

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32 }}>
            {article.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "Inter",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#374151",
                  background: "#F3F4F6",
                  border: "1px solid #E5E7EB",
                  borderRadius: 9999,
                  padding: "6px 16px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* ══ RIGHT — Sticky Sidebar (lg+ only; on smaller screens it stacks above) ══ */}
        <aside className="article-detail-sidebar">
          {/* Table of Contents */}
          <div
            style={{
              border: "1px solid #E5E7EB",
              borderRadius: 14,
              padding: "18px 16px",
              background: "#FFFFFF",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              marginBottom: 16,
            }}
          >
            <p style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 700, color: "#101828", margin: "0 0 14px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Contents
            </p>
            <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {article.tableOfContents.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontFamily: "Inter",
                      fontSize: 13,
                      fontWeight: 400,
                      color: "#374151",
                      textDecoration: "none",
                      lineHeight: "18px",
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)",
                        color: "#FFFFFF",
                        fontFamily: "Inter",
                        fontSize: 11,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {i + 1}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Share */}
          <div
            style={{
              border: "1px solid #E5E7EB",
              borderRadius: 14,
              padding: "18px 16px",
              background: "#FFFFFF",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <p style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 700, color: "#101828", margin: "0 0 12px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Share
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {/* Twitter/X */}
              <button
                aria-label="Share on X"
                style={shareIconStyle}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.642zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              {/* LinkedIn */}
              <button
                aria-label="Share on LinkedIn"
                style={shareIconStyle}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z" />
                </svg>
              </button>
              {/* Copy link */}
              <button
                aria-label="Copy link"
                style={shareIconStyle}
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* ══ Related Reading ══ */}
      <div
        style={{
          width: "100%",
          background: "#F5F3FF",
          paddingTop: "clamp(36px, 6vw, 56px)",
          paddingBottom: "clamp(40px, 7vw, 64px)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px, 4vw, 24px)" }}>
          {/* Header row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, gap: 12, flexWrap: "wrap" }}>
            <h2
              style={{
                fontFamily: "Inter",
                fontSize: "clamp(20px, 4vw, 28px)",
                fontWeight: 700,
                color: "#101828",
                margin: 0,
              }}
            >
              Related Reading
            </h2>
            <Link
              href="/articles"
              style={{
                fontFamily: "Inter",
                fontSize: 14,
                fontWeight: 600,
                color: "#4F39F6",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 4,
                whiteSpace: "nowrap",
              }}
            >
              View All Articles &#8594;
            </Link>
          </div>
          <p style={{ fontFamily: "Inter", fontSize: "clamp(13px, 3vw, 15px)", color: "#6B7280", margin: "0 0 clamp(20px, 4vw, 32px) 0" }}>
            Explore more with our curated expert insights.
          </p>

          {/* Cards */}
          <div className="article-detail-related-grid">
            {RELATED_ARTICLES.map((a) => (
              <RelatedCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </div>

      {/* Layout CSS: stack on mobile/tablet, 2-col on lg+ */}
      <style jsx>{`
        .article-detail-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: flex-start;
        }
        .article-detail-sidebar {
          min-width: 0;
        }
        .article-detail-related-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .article-detail-related-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }
        @media (min-width: 1024px) {
          .article-detail-layout {
            grid-template-columns: 1fr 240px;
            gap: 40px;
          }
          .article-detail-sidebar {
            position: sticky;
            top: 24px;
            align-self: flex-start;
          }
          .article-detail-related-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
        }
      `}</style>
    </div>
  );
}

// ─── Article Body Block Renderer ────────────────────────────────────────────

function ArticleBodyBlock({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          style={{
            fontFamily: "Inter",
            fontSize: 15,
            fontWeight: 400,
            lineHeight: "26px",
            color: "#374151",
            margin: "0 0 20px 0",
          }}
        >
          {block.text}
        </p>
      );

    case "h2":
      return (
        <h2
          id={block.id}
          style={{
            fontFamily: "Inter",
            fontSize: "clamp(18px, 4vw, 22px)",
            fontWeight: 700,
            lineHeight: 1.35,
            color: "#101828",
            margin: "32px 0 14px 0",
            scrollMarginTop: 80,
          }}
        >
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3
          id={block.id}
          style={{
            fontFamily: "Inter",
            fontSize: 18,
            fontWeight: 700,
            lineHeight: "26px",
            color: "#101828",
            margin: "28px 0 12px 0",
            scrollMarginTop: 80,
          }}
        >
          {block.text}
        </h3>
      );

    case "quote":
      return (
        <blockquote
          style={{
            background: "linear-gradient(135deg, #4F39F6 0%, #7C3AED 100%)",
            borderRadius: 14,
            padding: "clamp(20px, 4vw, 28px) clamp(20px, 4vw, 32px)",
            margin: "28px 0",
          }}
        >
          <p
            style={{
              fontFamily: "Inter",
              fontSize: "clamp(15px, 3.2vw, 17px)",
              fontWeight: 600,
              fontStyle: "italic",
              lineHeight: 1.55,
              color: "#FFFFFF",
              margin: 0,
              textAlign: "center",
            }}
          >
            {block.text}
          </p>
        </blockquote>
      );

    case "casestudy":
      return (
        <div
          style={{
            background: "#F9FAFB",
            border: "1px solid #E5E7EB",
            borderRadius: 14,
            padding: "clamp(16px, 3.5vw, 22px) clamp(16px, 3.5vw, 24px)",
            margin: "24px 0",
          }}
        >
          <p
            style={{
              fontFamily: "Inter",
              fontSize: 11,
              fontWeight: 700,
              color: "#9810FA",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              margin: "0 0 6px 0",
            }}
          >
            Case Study
          </p>
          <h4
            style={{
              fontFamily: "Inter",
              fontSize: 16,
              fontWeight: 700,
              color: "#101828",
              margin: "0 0 10px 0",
            }}
          >
            {block.heading}
          </h4>
          <p
            style={{
              fontFamily: "Inter",
              fontSize: 14,
              lineHeight: "22px",
              color: "#4B5563",
              margin: "0 0 14px 0",
            }}
          >
            {block.description}
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {block.bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)",
                    flexShrink: 0,
                    marginTop: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{ fontFamily: "Inter", fontSize: 13, lineHeight: "20px", color: "#374151" }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "takeaways":
      return (
        <ul style={{ margin: "0 0 20px 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: "2px solid #4F39F6",
                  flexShrink: 0,
                  marginTop: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#4F39F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ fontFamily: "Inter", fontSize: 14, lineHeight: "22px", color: "#374151" }}>{item}</span>
            </li>
          ))}
        </ul>
      );

    default:
      return null;
  }
}

// ─── Related Reading Card ────────────────────────────────────────────────────

function RelatedCard({
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
      {/* Image + badge */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", flexShrink: 0 }}>
        <Image
          src="/Blogs.png"
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
        />
        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)",
            color: "#FFFFFF",
            fontFamily: "Inter",
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 12px",
            borderRadius: 9999,
          }}
        >
          {article.category}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 18px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Date + read time */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "Inter", fontSize: 12, color: "#6B7280" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {article.date}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "Inter", fontSize: 12, color: "#6B7280" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            fontSize: 15,
            fontWeight: 700,
            lineHeight: "21px",
            color: "#101828",
            margin: "0 0 7px 0",
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
            lineHeight: "19px",
            color: "#6B7280",
            margin: "0 0 14px 0",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.description}
        </p>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "Inter", fontSize: 12, color: "#6B7280" }}>
            By <strong style={{ color: "#101828", fontWeight: 600 }}>{article.author}</strong>
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
            }}
          >
            Read &#8594;
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Share button style ─────────────────────────────────────────────────────

const shareIconStyle: React.CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: 8,
  border: "1px solid #E5E7EB",
  background: "#F9FAFB",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#374151",
};
