"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, TrendingUp } from "lucide-react";
import TrendingBadge from "@/app/components/ui/TrendingBadge";

export interface CourseItem {
  _id: string;
  courseId?: string; // Original course ID for linking
  name: string;
  slug: string;
  thumbnail?: string | null;
  icon?: string; // Field from Course model
  shortDescription?: string;
  description?: string; // Field from Course model
  duration: string;
  minFees?: number;
  feeStarting?: number; // Field from Course model
  providerCount?: number;
  providerName?: string; // University name
  universities?: Array<{ name: string }>; // Populated universities from backend
  isTrending: boolean;
}

interface CourseCardProps {
  course: CourseItem;
  isActive?: boolean;
  isMobile?: boolean;
  isEmpty?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

function formatFees(amount: number) {
  if (!amount) return "Contact for Fees";
  if (amount >= 100000) return `Rs ${(amount / 100000).toFixed(0)} Lakh`;
  if (amount >= 1000) return `Rs ${(amount / 1000).toFixed(0)}K`;
  return `Rs ${amount.toLocaleString("en-IN")}`;
}

function isUrl(v?: string | null) {
  if (!v) return false;
  return v.startsWith("/") || v.startsWith("http");
}

export default function CourseCard({
  course,
  isActive = true,
  isMobile = false,
  isEmpty = false,
  animated = true,
  onClick,
}: CourseCardProps) {
  if (isMobile) {
    return (
      <div
        onClick={onClick}
        className="rounded-3xl"
        style={{
          width: 280,
          flexShrink: 0,
          border: "1px solid #E5E7EB",
          backgroundColor: "#fff",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "none",
          opacity: isActive ? 1 : 0.45,
          filter: isActive ? "none" : "blur(1.5px)",
          transform: isActive ? "scale(1)" : "scale(0.93)",
          transition: animated ? "all 0.45s cubic-bezier(0.4,0,0.2,1)" : "none",
          cursor: isActive ? "default" : "pointer",
        }}
      >
        {/* Thumbnail */}
        <div
          className="relative"
          style={{
            width: "100%",
            height: 160,
            background: "#F3E8FF",
            flexShrink: 0,
          }}
        >
          {!isEmpty && (isUrl(course.icon) || isUrl(course.thumbnail)) ? (
            <Image
              src={(isUrl(course.icon) ? course.icon : course.thumbnail) || ""}
              alt={course.name}
              fill
              className="object-cover"
              sizes="280px"
            />
          ) : (
            <Image
              src="/ProgramCategories (1).png"
              alt="program category"
              fill
              className="object-cover"
              sizes="280px"
            />
          )}

          {!isEmpty &&
            course.isTrending &&
            isActive &&
            (course.icon || course.thumbnail) && (
              <TrendingBadge className="absolute top-3 right-3" />
            )}
        </div>
        {/* Body */}
        <div
          style={{
            padding: "14px 16px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: 6,
          }}
        >
          {isEmpty ? (
            <>
              <div
                style={{
                  height: 16,
                  background: "#E5E7EB",
                  borderRadius: 4,
                  marginBottom: 4,
                  width: "70%",
                }}
              />
              <div
                style={{
                  height: 12,
                  background: "#F3F4F6",
                  borderRadius: 4,
                  width: "90%",
                }}
              />
              <div
                style={{
                  height: 12,
                  background: "#F3F4F6",
                  borderRadius: 4,
                  width: "60%",
                }}
              />
            </>
          ) : (
            <>
              <h3
                style={{
                  fontFamily: "Inter",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#101828",
                  lineHeight: "22px",
                  margin: 0,
                }}
              >
                {course.name}
              </h3>
              {(course.description || course.shortDescription) && (
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: 13,
                    color: "#6B7280",
                    lineHeight: "18px",
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {course.description || course.shortDescription}
                </p>
              )}
              {course.duration && (
                <div
                  className="flex items-center gap-1"
                  style={{ color: "#6B7280", fontSize: 13, marginTop: 2 }}
                >
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>{course.duration}</span>
                </div>
              )}
              <p
                style={{
                  color: "#7C3AED",
                  fontSize: 13,
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                Fees Starting from {formatFees(course.feeStarting || course.minFees || 0)}
              </p>
              <div
                className="mt-auto flex items-center justify-between"
                style={{ paddingTop: 8, borderTop: "1px solid #F1F5F9" }}
              >
                <span style={{ color: "#374151", fontSize: 13, fontWeight: 500 }}>
                  {course.providerName || (course.universities && course.universities.length > 0
                    ? `${course.universities.length}+ Universities`
                    : course.providerCount && course.providerCount > 0
                      ? `${course.providerCount}+ Universities`
                      : "—")}
                </span>
                <Link
                  href={`/course-detail?id=${course.courseId || course._id}`}
                  style={{ color: "#7C3AED", fontSize: 13, fontWeight: 600 }}
                >
                  Explore →
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Desktop Card
  if (isEmpty) {
    return (
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm animate-pulse h-full">
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
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative w-full h-52 md:h-60 bg-gray-100">
        {isUrl(course.icon) || isUrl(course.thumbnail) ? (
          <Image
            src={(isUrl(course.icon) ? course.icon : course.thumbnail) || ""}
            alt={course.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <Image
            src="/ProgramCategories (1).png"
            alt="program category"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}

        {/* Trending badge — top right (only when we have a real thumbnail, fallback image has badge baked in) */}
        {course.isTrending && (isUrl(course.icon) || isUrl(course.thumbnail)) && (
          <TrendingBadge className="absolute top-3 right-3" />
        )}
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-bold text-gray-900 mb-2"
          style={{ fontFamily: "Inter", fontSize: "20px", lineHeight: "28px" }}
        >
          {course.name}
        </h3>

        {(course.description || course.shortDescription) && (
          <p
            style={{
              color: "#6B7280",
              fontSize: 14,
              lineHeight: "20px",
              marginBottom: 12,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {course.description || course.shortDescription}
          </p>
        )}

        {/* Duration */}
        {course.duration && (
          <div
            className="flex items-center gap-1 mb-2"
            style={{ color: "#6B7280", fontSize: 14 }}
          >
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{course.duration}</span>
          </div>
        )}

        {/* Fees — purple to match design */}
        <p style={{ color: "#7C3AED", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
          Fees Starting from {formatFees(course.feeStarting || course.minFees || 0)}
        </p>

        {/* Footer */}
        <div
          className="mt-auto flex items-center justify-between"
          style={{ paddingTop: 8, borderTop: "1px solid #F1F5F9" }}
        >
          <span style={{ color: "#374151", fontSize: 14, fontWeight: 600 }}>
            {course.providerName || (course.universities && course.universities.length > 0
              ? `${course.universities.length}+ Universities`
              : course.providerCount && course.providerCount > 0
                ? `${course.providerCount}+ Universities`
                : "—")}
          </span>
          <Link
            href={`/course-detail?id=${course.courseId || course._id}`}
            className="text-purple-600 text-sm font-semibold hover:text-purple-800 transition-colors"
          >
            Explore →
          </Link>
        </div>
      </div>
    </div>
  );
}
