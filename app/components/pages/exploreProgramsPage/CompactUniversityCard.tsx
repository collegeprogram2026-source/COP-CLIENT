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
    <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-300 flex flex-col items-center text-center gap-4 group w-full">
      {/* Logo */}
      <div className="h-20 w-full flex items-center justify-center mb-1 transition-transform duration-300 group-hover:scale-105">
        <img
          src={university.logo || "/default-logo.png"}
          alt={university.name}
          className="max-h-full max-w-[85%] object-contain"
        />
      </div>

      {/* University Name */}
      <h3 className="text-lg font-bold text-[#1F2937] leading-tight px-1 min-h-[2.5rem] flex items-center justify-center">
        {university.name}
      </h3>

      {/* View Details Link */}
      <Link
        href={`/universities/${university.slug}${courseId ? `?courseId=${courseId}#fees-breakdown` : ""}`}
        className="text-[#9333EA] font-bold text-base flex items-center gap-1 hover:gap-2 transition-all"
      >
        View Details <IconArrowRight size={18} />
      </Link>

      {/* Compare Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleCompare?.();
        }}
        className={`w-full mt-1 py-2.5 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold text-sm transition-all duration-200 active:scale-[0.97] cursor-pointer ${isCompare
          ? "bg-[#FAF5FF] border-[#9333EA] text-[#9333EA]"
          : "bg-white border-[#9333EA] text-[#9333EA] hover:bg-[#9333EA] hover:text-white"
          }`}
      >
        {isCompare ? (
          <>
            <IconCheck size={18} stroke={3} />
            Added to Compare
          </>
        ) : (
          "Add to Compare"
        )}
      </button>
    </div>
  );
}
