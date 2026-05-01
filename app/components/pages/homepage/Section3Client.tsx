"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import AutoSlider from "./AutoSlider";
import { BookOpen, Award, FileText, Briefcase, FlaskConical, GraduationCap } from "lucide-react";
import CourseCard from "./CourseCard";

interface CourseItem {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string | null;
  shortDescription: string;
  duration: string;
  minFees: number;
  providerCount: number;
  isTrending: boolean;
}

interface CourseGroup {
  degreeType: { name: string; slug: string; order: number };
  courses: CourseItem[];
}

interface Props {
  courseGroups: CourseGroup[];
}

// Map degree type slugs to an icon component
function DegreeIcon({ slug, cls = 'w-5 h-5 text-purple-600' }: { slug: string; cls?: string }) {
  if (slug.includes("pg") || slug.includes("post")) return <GraduationCap className={cls} />;
  if (slug.includes("ug") || slug.includes("under")) return <BookOpen className={cls} />;
  if (slug.includes("diploma")) return <Award className={cls} />;
  if (slug.includes("cert")) return <FileText className={cls} />;
  if (slug.includes("exec")) return <Briefcase className={cls} />;
  if (slug.includes("doc") || slug.includes("phd")) return <FlaskConical className={cls} />;
  return <GraduationCap className={cls} />;
}

function formatFees(amount: number) {
  if (!amount) return "Contact for Fees";
  if (amount >= 100000) return `Rs ${(amount / 100000).toFixed(0)} Lakh`;
  if (amount >= 1000) return `Rs ${(amount / 1000).toFixed(0)}K`;
  return `Rs ${amount.toLocaleString("en-IN")}`;
}

export default function Section3Client({ courseGroups }: Props) {
  const [activeTab, setActiveTab] = useState(courseGroups[0]?.degreeType?.slug ?? "");

  // Mobile infinite-loop slider state
  // offset: 0 = clone of last, 1..count = real items, count+1 = clone of first
  const [offset, setOffset] = useState(1);
  const [animated, setAnimated] = useState(true);

  const activeGroup = courseGroups.find((g) => g.degreeType.slug === activeTab);
  const visibleCourses = activeGroup?.courses?.slice(0, 3) ?? [];
  const effectiveCourses = visibleCourses.length > 0
    ? visibleCourses
    : [{} as CourseItem, {} as CourseItem, {} as CourseItem];
  const sliderCount = effectiveCourses.length;

  // real dot index (0-based)
  const realIndex = sliderCount > 0 ? ((offset - 1) % sliderCount + sliderCount) % sliderCount : 0;

  // extended array: [clone_last, ...real, clone_first]
  const extendedCourses = sliderCount > 0
    ? [effectiveCourses[sliderCount - 1], ...effectiveCourses, effectiveCourses[0]]
    : effectiveCourses;

  // Reset slider when tab changes
  useEffect(() => { setOffset(1); setAnimated(false); }, [activeTab]);

  // container-relative translate for proper centering
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [translatePx, setTranslatePx] = useState(0);
  const step = 280 + 12;
  const updateTranslate = () => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // center relative to container: container width / 2 minus half card width, then shift by offset*step
    const value = Math.round(rect.width / 2 - 140 - offset * step);
    setTranslatePx(value);
  };
  useEffect(() => {
    updateTranslate();
    window.addEventListener('resize', updateTranslate);
    return () => window.removeEventListener('resize', updateTranslate);
  }, [offset]);

  // Re-enable animation one frame after a silent snap
  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  // Auto-advance
  useEffect(() => {
    if (sliderCount === 0) return;
    const id = setInterval(() => {
      setAnimated(true);
      setOffset((prev) => prev + 1);
    }, 3200);
    return () => clearInterval(id);
  }, [sliderCount]);

  // Seamless snap after landing on a clone
  function handleTransitionEnd() {
    setOffset((prev) => {
      if (prev === 0) { setAnimated(false); return sliderCount; }
      if (prev === sliderCount + 1) { setAnimated(false); return 1; }
      return prev;
    });
  }

  return (
    <>
      {/* Tabs + View All link */}
      <div className="mt-6 md:mt-10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-2">
          <div className="flex-1 overflow-x-auto scrollbar-hide flex justify-center pb-7">
            <div className="inline-flex items-center gap-2 bg-white rounded-full shadow-lg px-3 py-1.5 md:px-4 md:py-2 w-max">
              {courseGroups.map((group) => (
                <button
                  key={group.degreeType.slug}
                  onClick={() => setActiveTab(group.degreeType.slug)}
                  className={`px-3 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium rounded-full whitespace-nowrap transition-all ${activeTab === group.degreeType.slug
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {group.degreeType.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0">
            <Link href="/online-courses" className="text-purple-600 underline whitespace-nowrap font-medium text-xs md:text-sm">
              View all
            </Link>
          </div>
        </div>
      </div>

      {/* Course Cards — Mobile focus-center slider */}
      <div ref={containerRef} className="md:hidden mt-8 relative" style={{ overflow: 'hidden' }}>
        <div
          onTransitionEnd={handleTransitionEnd}
          style={{
            display: 'flex',
            gap: 12,
            transition: animated ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' : 'none',
            transform: `translateX(${translatePx}px)`,
          }}
        >
          {extendedCourses.map((course, idx) => {
            const isActive = idx === offset;
            const isEmpty = !course._id;
            return (
              <CourseCard
                key={idx}
                course={course as any}
                isActive={isActive}
                isMobile={true}
                isEmpty={isEmpty}
                animated={animated}
                onClick={() => {
                  if (!isActive) {
                    const diff = idx - offset;
                    if (Math.abs(diff) === 1) { setAnimated(true); setOffset(offset + diff); }
                  }
                }}
              />
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-5">
          {effectiveCourses.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setAnimated(true); setOffset(idx + 1); }}
              style={{
                width: idx === realIndex ? 20 : 8,
                height: 8,
                borderRadius: 99,
                background: idx === realIndex ? '#7C3AED' : '#D1D5DB',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Course Cards — Desktop grid */}
      <div className="mt-10 hidden md:grid md:grid-cols-3 gap-8">
        {visibleCourses.length > 0 ? (
          visibleCourses.map((course) => (
            <CourseCard key={course._id} course={course as any} />
          ))
        ) : (
          // Skeleton placeholders while loading or if no data
          [1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm animate-pulse">
              <div className="w-full h-48 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
                <div className="flex justify-between pt-2">
                  <div className="h-4 bg-gray-100 rounded w-28" />
                  <div className="h-4 bg-gray-100 rounded w-20" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View All CTA */}
      <div className="mt-12 flex justify-center">
        <Link
          href={`/explore-programs?degreeType=${activeTab}`}
          className="text-white font-semibold transition-all flex items-center justify-center"
          style={{
            width: "260px",
            height: "56px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)",
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
            textDecoration: "none",
            fontFamily: "Inter",
            fontSize: "16px",
          }}
        >
          View All {activeGroup?.degreeType?.name ?? "Courses"}
        </Link>
      </div>
    </>
  );
}
