"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useRef } from "react";
import { Search as SearchIcon, TrendingUp, Sparkles, ArrowLeft } from "lucide-react";

// ─── Fallback data ────────────────────────────────────────────────────────────

const IN_DEMAND_SPECIALIZATIONS = [
  "Online MCA in Artificial Intelligence & Machine Learning",
  "Business Analytics",
  "Online MBA in Digital Marketing",
  "Online MCA in Cyber Security",
  "Online MBA in FinTech",
  "Healthcare and Hospital Administration",
  "IT Management",
  "Online MBA in Logistics & Supply Chain Management",
  "Online MBA in Marketing Management",
  "Operations Management",
];

// ─────────────────────────────────────────────────────────────────────────────

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [trendingCourses, setTrendingCourses] = useState<{ title: string; slug: string }[]>([]);
  const [providers, setProviders] = useState<{ name: string; slug: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    const matches = new Set<string>();

    providers.forEach((p) => {
      if (p.name.toLowerCase().includes(lowerQuery)) {
        matches.add(p.name);
      }
    });

    trendingCourses.forEach((c) => {
      if (c.title.toLowerCase().includes(lowerQuery)) {
        matches.add(c.title);
      }
    });

    IN_DEMAND_SPECIALIZATIONS.forEach((s) => {
      if (s.toLowerCase().includes(lowerQuery)) {
        matches.add(s);
      }
    });

    return Array.from(matches).slice(0, 5);
  }, [query, trendingCourses, providers]);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  // Fetch trending courses and providers from backend
  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    fetch(`${apiBase}/api/public/providers/programs/trending`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const courses = data
            .slice(0, 8)
            .map((p: any) => ({ title: p.title || p.name || "", slug: p.slug || "" }))
            .filter((c) => c.title);
          if (courses.length > 0) setTrendingCourses(courses);
        }
      })
      .catch(() => {/* no fallback */ });

    fetch(`${apiBase}/api/public/providers`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data)) {
          const provs = data.map((p: any) => ({ name: p.name || "", slug: p.slug || "" })).filter((p: any) => p.name);
          setProviders(provs);
        }
      })
      .catch(() => {/* no fallback */ });
  }, []);

  const handleSearch = (searchQuery?: string) => {
    const q = (searchQuery ?? query).trim();
    if (!q) return;

    const matchedProvider = providers.find(p => p.name.toLowerCase() === q.toLowerCase());
    if (matchedProvider && matchedProvider.slug) {
      router.push(`/universities/${matchedProvider.slug}`);
      return;
    }

    router.push(`/explore-programs?course=${encodeURIComponent(q)}`);
  };

  const handleTrendingClick = (course: { title: string; slug: string }) => {
    if (course.slug) {
      router.push(`/online-courses/${course.slug}`);
    } else {
      router.push(`/online-courses?search=${encodeURIComponent(course.title)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
      } else {
        setShowSuggestions(true);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (showSuggestions && selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div
      className="md:pt-18 px-5 pb-[60px]"
      style={{
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          width: "65vw",
          minHeight: "65vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ── Outer wrapper ── */}
        <div style={{ width: "100%" }}>

          {/* Back button */}
          <div style={{ marginBottom: 32 }}>
            <button
              onClick={() => router.back()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "transparent",
                padding: 0,
                border: "none",
                cursor: "pointer",
                color: "#7C3AED",
                fontWeight: 600,
                fontSize: 13,
                lineHeight: "20px",
              }}
            >
              <ArrowLeft style={{ width: 14, height: 14 }} />
              <span>Back</span>
            </button>
          </div>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1
              style={{
                fontWeight: 700,
                fontSize: 32,
                lineHeight: "40px",
                color: "#101828",
                margin: 0,
              }}
            >
              Find your path with the right information!
            </h1>
            <p
              style={{
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "24px",
                color: "#6B7280",
                marginTop: 8,
                marginBottom: 0,
              }}
            >
              Discover online courses, universities &amp; specializations.
            </p>
          </div>

          {/* ── Inner search box ── */}
          <div
            style={{
              width: "100%",
              background: "#FFFFFF",
              borderRadius: 12,
              border: "1px solid #E5E7EB",
              boxShadow: "0px 1px 3px rgba(0,0,0,0.08)",
              padding: "24px 28px",
            }}
          >
            {/* Search bar — mic removed */}
            <div style={{ position: "relative" }} ref={suggestionRef}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  border: "1px solid #E5E7EB",
                  borderRadius: 10,
                  padding: "12px 14px",
                  background: "#FAFAFA",
                }}
              >
                <SearchIcon style={{ width: 18, height: 18, color: "#9CA3AF", flexShrink: 0 }} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  placeholder='Search "University & Courses"'
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontFamily: "Inter, Arial, Helvetica, sans-serif",
                    fontSize: 14,
                    color: "#1F2937",
                    background: "transparent",
                  }}
                />
                {query.trim() && (
                  <button
                    onClick={() => handleSearch()}
                    style={{
                      padding: "6px 16px",
                      borderRadius: 8,
                      background: "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)",
                      color: "#fff",
                      border: "none",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    Search
                  </button>
                )}
              </div>

              {/* Suggestion Box */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: 8,
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: 10,
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.05)",
                    zIndex: 10,
                    overflow: "hidden",
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      style={{
                        padding: "10px 14px",
                        cursor: "pointer",
                        fontSize: 14,
                        color: "#374151",
                        borderBottom: index < suggestions.length - 1 ? "1px solid #F3F4F6" : "none",
                        fontFamily: "Inter, Arial, Helvetica, sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        backgroundColor: index === selectedIndex ? "#F9FAFB" : "#FFFFFF",
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onMouseLeave={() => setSelectedIndex(-1)}
                    >
                      <SearchIcon style={{ width: 14, height: 14, color: "#9CA3AF" }} />
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Trending Courses — only from CMS */}
            {trendingCourses.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <TrendingUp style={{ width: 16, height: 16, color: "#7C3AED" }} />
                  <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>Trending Courses</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {trendingCourses.map((course) => (
                    <button
                      key={course.title}
                      onClick={() => handleTrendingClick(course)}
                      style={{
                        border: "1px solid #D1D5DB",
                        borderRadius: 10,
                        background: "#F9FAFB",
                        padding: "7px 12px",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#374151",
                        cursor: "pointer",
                        fontFamily: "Inter, Arial, Helvetica, sans-serif",
                        lineHeight: "20px",
                      }}
                    >
                      {course.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* In-demand Specializations */}
            <div style={{ marginTop: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Sparkles style={{ width: 16, height: 16, color: "#7C3AED" }} />
                <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>Best ROI Specializations</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {IN_DEMAND_SPECIALIZATIONS.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => handleSearch(spec)}
                    style={{
                      border: "1px solid #D1D5DB",
                      borderRadius: 10,
                      background: "#F9FAFB",
                      padding: "7px 12px",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#374151",
                      cursor: "pointer",
                      fontFamily: "Inter, Arial, Helvetica, sans-serif",
                      lineHeight: "20px",
                    }}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* ── end inner search box ── */}
        </div>
        {/* ── end outer wrapper ── */}

        {/* ── Browse categories ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 24 }}>
          <p style={{ fontWeight: 400, fontSize: 13, color: "#6B7280", margin: 0 }}>Or explore by category</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => router.push("/explore-programs")}
              style={{
                padding: "8px 24px",
                borderRadius: 8,
                border: "1.5px solid #7C3AED",
                background: "#FFFFFF",
                color: "#7C3AED",
                fontWeight: 600,
                fontSize: 13,
                lineHeight: "20px",
                cursor: "pointer",
                fontFamily: "Inter, Arial, Helvetica, sans-serif",
              }}
            >
              Browse Programs
            </button>
            <button
              onClick={() => router.push("/universities")}
              style={{
                padding: "8px 24px",
                borderRadius: 8,
                border: "1.5px solid #7C3AED",
                background: "#FFFFFF",
                color: "#7C3AED",
                fontWeight: 600,
                fontSize: 13,
                lineHeight: "20px",
                cursor: "pointer",
                fontFamily: "Inter, Arial, Helvetica, sans-serif",
              }}
            >
              Browse Universities
            </button>
          </div>
        </div>
      </div>{/* ── end 65vw container ── */}
    </div>
  );
}
