"use client";

import React, { useState } from "react";
import { IconBrain, IconBook, IconNotebook, IconFileCertificate, IconAdjustmentsHorizontal, IconChevronDown, IconChartBar, IconFlame, IconTrendingUp } from '@tabler/icons-react';
import { DegreeType } from "@/app/lib/types";

interface SidebarFiltersProps {
  degreeTypes: DegreeType[];
  selectedDegreeTypeId: string | null;
  onSelectDegreeType: (id: string | null) => void;
  selectedSort: string | null;
  onSelectSort: (sort: string | null) => void;
  showSort: boolean;
}

const icons = [
  <IconBook stroke={2} />,
  <IconNotebook stroke={2} />,
  <IconBrain stroke={2} />,
  <IconFileCertificate stroke={2} />
];

export default function SidebarFilters({
  degreeTypes,
  selectedDegreeTypeId,
  onSelectDegreeType,
  selectedSort,
  onSelectSort,
  showSort,
}: SidebarFiltersProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <aside className="w-full lg:w-[320px] shrink-0 space-y-6 lg:sticky lg:top-36 self-start h-fit">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden w-full flex items-center justify-center gap-2 h-[56px] rounded-[14px] border-2 border-[#7C3AED] text-[#7C3AED] font-bold text-[16px] bg-white transition-all active:scale-95 shadow-sm"
      >
        <IconAdjustmentsHorizontal className="w-6 h-6" stroke={2.5} />
        <span>Filters</span>
        <IconChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMobileOpen ? 'rotate-180' : ''}`} stroke={3} />
      </button>

      {/* Filters Content */}
      <div className={`${isMobileOpen ? 'block' : 'hidden'} lg:block space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-top-4 duration-300`}>
        {/* Category Section */}
        <div className="bg-[#FFFFFF] rounded-2xl p-6 shadow-xl border border-[#E5E7EB] ">
          <h3 className="text-xl font-bold mb-6 text-gray-900">Explore by Category</h3>

          <div className="space-y-3">
            <button
              onClick={() => onSelectDegreeType(null)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 active:scale-[0.98] cursor-pointer ${selectedDegreeTypeId === null
                ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200"
                : "bg-white text-gray-700 border-gray-100 hover:bg-purple-50 hover:border-purple-200"
                }`}
            >
              <span className={selectedDegreeTypeId === null ? "text-white" : "text-purple-600"}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </span>
              <span className="font-semibold">All Programs</span>
            </button>

            {degreeTypes.map((type, idx) => (
              <button
                key={type._id}
                onClick={() => onSelectDegreeType(type._id)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 active:scale-[0.98] cursor-pointer ${selectedDegreeTypeId === type._id
                  ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200"
                  : "bg-white text-gray-700 border-gray-100 hover:bg-purple-50 hover:border-purple-200"
                  }`}
              >
                <span className={selectedDegreeTypeId === type._id ? "text-white" : "text-purple-600"}>
                  {icons[idx % icons.length]}
                </span>
                <span className="font-semibold">{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Section */}
        {showSort && (
          <div className="bg-[#FFFFFF] rounded-2xl p-6 shadow-xl border border-[#E5E7EB] ">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Sort</h3>
            <div className="space-y-3">
              <button
                onClick={() => onSelectSort(null)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 active:scale-[0.98] cursor-pointer ${selectedSort === null
                  ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200"
                  : "bg-white text-gray-700 border-gray-100 hover:bg-purple-50 hover:border-purple-200"
                  }`}
              >
                <span className={selectedSort === null ? "text-white" : "text-purple-600"}>
                  <IconAdjustmentsHorizontal className="w-5 h-5" />
                </span>
                <span className="font-semibold">Default</span>
              </button>

              <button
                onClick={() => onSelectSort("roi")}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 active:scale-[0.98] cursor-pointer ${selectedSort === "roi"
                  ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200"
                  : "bg-white text-gray-700 border-gray-100 hover:bg-purple-50 hover:border-purple-200"
                  }`}
              >
                <span className={selectedSort === "roi" ? "text-white" : "text-purple-600"}>
                  <IconChartBar className="w-5 h-5" />
                </span>
                <span className="font-semibold">Best ROI</span>
              </button>

              <button
                onClick={() => onSelectSort("trending")}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 active:scale-[0.98] cursor-pointer ${selectedSort === "trending"
                  ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200"
                  : "bg-white text-gray-700 border-gray-100 hover:bg-purple-50 hover:border-purple-200"
                  }`}
              >
                <span className={selectedSort === "trending" ? "text-white" : "text-purple-600"}>
                  <IconFlame className="w-5 h-5" />
                </span>
                <span className="font-semibold">Trending</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
