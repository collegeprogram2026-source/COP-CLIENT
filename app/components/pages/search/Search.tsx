"use client";

import { useRouter, useSearchParams } from "next/navigation";
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

type ProviderItem = { name: string; slug: string };
type CourseItem = { name: string; slug: string; id: string };
type TrendingItem = { title: string; slug: string; id: string };
type SpecializationItem = { name: string; slug: string; id: string };

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [trendingCourses, setTrendingCourses] = useState<TrendingItem[]>([]);
  const [providers, setProviders] = useState<ProviderItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [specializations, setSpecializations] = useState<SpecializationItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const didAutoSearch = useRef(false);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  // Pre-fill from `?q=` and auto-trigger once data is loaded
  useEffect(() => {
    const initial = searchParams.get("q");
    if (initial && !query) setQuery(initial);
  }, [searchParams]);

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
      if (p.name.toLowerCase().includes(lowerQuery)) matches.add(p.name);
    });
    courses.forEach((c) => {
      if (c.name.toLowerCase().includes(lowerQuery)) matches.add(c.name);
    });
    trendingCourses.forEach((c) => {
      if (c.title.toLowerCase().includes(lowerQuery)) matches.add(c.title);
    });
    specializations.forEach((s) => {
      if (s.name.toLowerCase().includes(lowerQuery)) matches.add(s.name);
    });
    IN_DEMAND_SPECIALIZATIONS.forEach((s) => {
      if (s.toLowerCase().includes(lowerQuery)) matches.add(s);
    });

    return Array.from(matches).slice(0, 8);
  }, [query, trendingCourses, providers, courses, specializations]);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  // Fetch trending courses, providers, courses, and specializations from backend
  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    fetch(`${apiBase}/api/public/providers/programs/trending`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const trending = data
            .slice(0, 8)
            .map((p: any) => ({
              title: p.title || p.name || "",
              slug: p.slug || "",
              // Prefer the parent Course id; fall back to provider-course id
              // (the course-detail endpoint resolves either).
              id: p.courseId?._id || p.courseId || p._id || "",
            }))
            .filter((c) => c.title);
          if (trending.length > 0) setTrendingCourses(trending);
        }
      })
      .catch(() => {/* no fallback */ });

    fetch(`${apiBase}/api/public/providers`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data)) {
          const provs = data
            .map((p: any) => ({ name: p.name || "", slug: p.slug || "" }))
            .filter((p) => p.name && p.slug);
          setProviders(provs);
        }
      })
      .catch(() => {/* no fallback */ });

    fetch(`${apiBase}/api/public/courses`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped = data
            .map((c: any) => ({
              name: c.name || "",
              slug: c.slug || "",
              id: c._id || c.id || "",
            }))
            .filter((c) => c.name && (c.id || c.slug));
          setCourses(mapped);
        }
      })
      .catch(() => {/* no fallback */ });

    fetch(`${apiBase}/api/public/specializations`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped = data
            .map((s: any) => ({
              name: s.name || "",
              slug: s.slug || "",
              id: s._id || s.id || "",
            }))
            .filter((s) => s.name);
          setSpecializations(mapped);
        }
      })
      .catch(() => {/* no fallback */ });
  }, []);

  const handleSearch = (searchQuery?: string) => {
    const q = (searchQuery ?? query).trim();
    if (!q) return;
    const lower = q.toLowerCase();

    // 1. Provider — exact, then partial
    const provider =
      providers.find((p) => p.name.toLowerCase() === lower) ||
      providers.find((p) => p.name.toLowerCase().includes(lower));
    if (provider?.slug) {
      router.push(`/universities/${provider.slug}`);
      return;
    }

    // 2. Course — exact, then partial. Course-detail accepts id OR slug.
    const course =
      courses.find((c) => c.name.toLowerCase() === lower) ||
      courses.find((c) => c.name.toLowerCase().includes(lower));
    if (course && (course.id || course.slug)) {
      router.push(`/course-detail?id=${course.id || course.slug}`);
      return;
    }

    // 3. Trending provider-course (course-detail endpoint resolves these too)
    const trending =
      trendingCourses.find((t) => t.title.toLowerCase() === lower) ||
      trendingCourses.find((t) => t.title.toLowerCase().includes(lower));
    if (trending && (trending.id || trending.slug)) {
      router.push(`/course-detail?id=${trending.id || trending.slug}`);
      return;
    }

    // 4. Specialization — route to explore-programs filtered by spec id
    const spec =
      specializations.find((s) => s.name.toLowerCase() === lower) ||
      specializations.find((s) => s.name.toLowerCase().includes(lower));
    if (spec?.id) {
      router.push(`/explore-programs?spec=${spec.id}`);
      return;
    }

    // 5. Fallback: free-text search inside explore-programs
    router.push(`/explore-programs?course=${encodeURIComponent(q)}`);
  };

  const handleTrendingClick = (course: TrendingItem) => {
    // Course-detail resolves provider-course id OR slug as well, so prefer id and fall back to slug
    const target = course.id || course.slug;
    if (target) {
      router.push(`/course-detail?id=${target}`);
      return;
    }
    router.push(`/explore-programs?course=${encodeURIComponent(course.title)}`);
  };

  // Auto-search if `?q=` was provided AND we now have data (or a provider match) to resolve it.
  useEffect(() => {
    if (didAutoSearch.current) return;
    const initial = searchParams.get("q");
    if (!initial) return;
    const ready = providers.length > 0 || courses.length > 0;
    if (!ready) return;
    didAutoSearch.current = true;
    handleSearch(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providers, courses, searchParams]);

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
      className="pt-8 md:pt-18 px-4 md:px-5 pb-[60px] bg-white flex flex-col items-center min-h-screen font-['Inter',_Arial,_Helvetica,_sans-serif]"
    >
      <div
        className="w-full md:w-[75vw] lg:w-[65vw] flex flex-col items-center"
      >
        {/* ── Outer wrapper ── */}
        <div className="w-full">

          {/* Back button */}
          <div className="mb-6 md:mb-8">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 bg-transparent p-0 border-none cursor-pointer text-[#7C3AED] font-semibold text-[13px] leading-5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>

          {/* Heading */}
          <div className="text-center mb-6 md:mb-8">
            <h1
              className="font-bold text-2xl md:text-[32px] leading-tight md:leading-10 text-[#101828] m-0"
            >
              Find your path with the right information!
            </h1>
            <p
              className="font-normal text-sm md:text-base leading-6 text-[#6B7280] mt-2 mb-0"
            >
              Discover online courses, universities &amp; specializations.
            </p>
          </div>

          {/* ── Inner search box ── */}
          <div
            className="w-full bg-white rounded-xl border border-[#E5E7EB] shadow-[0px_1px_3px_rgba(0,0,0,0.08)] p-4 md:p-6 md:px-7"
          >
            {/* Search bar — mic removed */}
            <div className="relative" ref={suggestionRef}>
              <div
                className="flex items-center gap-2 md:gap-3 border border-[#E5E7EB] rounded-lg p-2.5 md:p-3 px-3 md:px-3.5 bg-[#FAFAFA]"
              >
                <SearchIcon className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#9CA3AF] shrink-0" />
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
                  className="flex-1 border-none outline-none font-['Inter',_Arial,_Helvetica,_sans-serif] text-sm text-[#1F2937] bg-transparent min-w-0"
                />
                {query.trim() && (
                  <button
                    onClick={() => handleSearch()}
                    className="py-1.5 px-3 md:px-4 rounded-lg bg-gradient-to-br from-[#4F39F6] to-[#9810FA] text-white border-none text-[12px] md:text-[13px] font-semibold cursor-pointer shrink-0"
                  >
                    Search
                  </button>
                )}
              </div>

              {/* Suggestion Box */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E5E7EB] rounded-lg shadow-[0px_4px_6px_rgba(0,0,0,0.05)] z-10 overflow-hidden"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="py-2.5 px-3.5 cursor-pointer text-sm text-[#374151] font-['Inter',_Arial,_Helvetica,_sans-serif] flex items-center gap-2.5"
                      style={{
                        borderBottom: index < suggestions.length - 1 ? "1px solid #F3F4F6" : "none",
                        backgroundColor: index === selectedIndex ? "#F9FAFB" : "#FFFFFF",
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onMouseLeave={() => setSelectedIndex(-1)}
                    >
                      <SearchIcon className="w-3.5 h-3.5 text-[#9CA3AF]" />
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Trending Courses — only from CMS */}
            {trendingCourses.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#7C3AED]" />
                  <span className="font-semibold text-sm text-[#111827]">Trending Courses</span>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-2.5">
                  {trendingCourses.map((course) => (
                    <button
                      key={course.title}
                      onClick={() => handleTrendingClick(course)}
                      className="border border-[#D1D5DB] rounded-lg bg-[#F9FAFB] py-1.5 px-2.5 md:px-3 text-[12px] md:text-[13px] font-medium text-[#374151] cursor-pointer font-['Inter',_Arial,_Helvetica,_sans-serif] leading-5 transition-colors hover:bg-gray-50"
                    >
                      {course.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* In-demand Specializations */}
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#7C3AED]" />
                <span className="font-semibold text-sm text-[#111827]">Best ROI Specializations</span>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-2.5">
                {IN_DEMAND_SPECIALIZATIONS.map((spec) => (
                    <button
                      key={spec}
                      onClick={() => handleSearch(spec)}
                      className="border border-[#D1D5DB] rounded-lg bg-[#F9FAFB] py-1.5 px-2.5 md:px-3 text-[12px] md:text-[13px] font-medium text-[#374151] cursor-pointer font-['Inter',_Arial,_Helvetica,_sans-serif] leading-5 transition-colors hover:bg-gray-50"
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
        <div className="flex flex-col items-center gap-4 mt-8 md:mt-10 mb-10">
          <p className="font-normal text-[13px] text-[#6B7280] m-0">Or explore by category</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <button
              onClick={() => router.push("/explore-programs")}
              className="py-2.5 px-6 rounded-lg border-[1.5px] border-[#7C3AED] bg-white text-[#7C3AED] font-semibold text-[13px] leading-5 cursor-pointer font-['Inter',_Arial,_Helvetica,_sans-serif] hover:bg-[#F5F3FF] transition-colors w-full sm:w-auto"
            >
              Browse Programs
            </button>
            <button
              onClick={() => router.push("/universities")}
              className="py-2.5 px-6 rounded-lg border-[1.5px] border-[#7C3AED] bg-white text-[#7C3AED] font-semibold text-[13px] leading-5 cursor-pointer font-['Inter',_Arial,_Helvetica,_sans-serif] hover:bg-[#F5F3FF] transition-colors w-full sm:w-auto"
            >
              Browse Universities
            </button>
          </div>
        </div>
      </div>{/* ── end 65vw container ── */}
    </div>
  );
}
