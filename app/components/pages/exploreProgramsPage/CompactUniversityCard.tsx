import React from "react";
import { Provider } from "@/app/lib/types";
import Link from "next/link";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";

interface CompactUniversityCardProps {
  university: Provider;
  courseId?: string;
  isCompare?: boolean;
  onToggleCompare?: () => void;
}

export default function CompactUniversityCard({
  university,
  courseId,
  isCompare,
  onToggleCompare,
}: CompactUniversityCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center gap-4 group w-full">
      {/* Logo */}
      <div className="h-20 w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <img
          src={university.logo || "/default-logo.png"}
          alt={university.name}
          className="max-h-full max-w-[85%] object-contain"
        />
      </div>

      {/* University Name */}
      <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight min-h-[2.5rem] flex items-center justify-center group-hover:text-purple-600 transition-colors">
        {university.name}
      </h3>

      {/* View Details Link */}
      <Link
        href={`/universities/${university.slug}${courseId ? `?courseId=${courseId}#fees-breakdown` : ""}`}
        className="text-purple-600 font-bold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
      >
        View Details <IconArrowRight size={16} stroke={2.5} />
      </Link>

      {/* Compare Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleCompare?.();
        }}
        className={`w-full mt-auto py-2.5 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold text-sm transition-all duration-200 active:scale-[0.97] cursor-pointer ${
          isCompare
            ? "bg-purple-50 border-purple-600 text-purple-600"
            : "bg-white border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
        }`}
      >
        {isCompare ? (
          <>
            <IconCheck size={16} stroke={3} />
            Added to Compare
          </>
        ) : (
          "Add to Compare"
        )}
      </button>
    </div>
  );
}
