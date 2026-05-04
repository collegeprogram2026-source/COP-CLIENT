"use client";

import React, { useState } from "react";
import {
  IconBrain,
  IconBook,
  IconNotebook,
  IconFileCertificate,
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconChartBar,
  IconFlame,
  IconLayoutGrid,
} from "@tabler/icons-react";
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
  <IconBook stroke={2} className="w-5 h-5" />,
  <IconNotebook stroke={2} className="w-5 h-5" />,
  <IconBrain stroke={2} className="w-5 h-5" />,
  <IconFileCertificate stroke={2} className="w-5 h-5" />,
];

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function FilterButton({ active, onClick, icon, label }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 active:scale-[0.98] cursor-pointer text-left ${
        active
          ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200"
          : "bg-white text-gray-700 border-gray-100 hover:bg-purple-50 hover:border-purple-200"
      }`}
    >
      <span className={active ? "text-white" : "text-purple-600"}>{icon}</span>
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );
}

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
    <aside className="w-full lg:w-[300px] shrink-0 space-y-4 lg:sticky lg:top-24 self-start h-fit">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden w-full flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-purple-600 text-purple-600 font-bold text-sm bg-white transition-all active:scale-[0.98] shadow-sm"
      >
        <IconAdjustmentsHorizontal className="w-5 h-5" stroke={2.5} />
        <span>Filters</span>
        <IconChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isMobileOpen ? "rotate-180" : ""
          }`}
          stroke={3}
        />
      </button>

      {/* Filters Content */}
      <div
        className={`${
          isMobileOpen ? "block" : "hidden"
        } lg:block space-y-4 lg:space-y-5 animate-in fade-in slide-in-from-top-4 duration-300`}
      >
        {/* Category Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-base font-bold mb-4 text-gray-900 tracking-tight">
            Explore by Category
          </h3>

          <div className="space-y-2">
            <FilterButton
              active={selectedDegreeTypeId === null}
              onClick={() => onSelectDegreeType(null)}
              icon={<IconLayoutGrid className="w-5 h-5" stroke={2} />}
              label="All Programs"
            />

            {degreeTypes.map((type, idx) => (
              <FilterButton
                key={type._id}
                active={selectedDegreeTypeId === type._id}
                onClick={() => onSelectDegreeType(type._id)}
                icon={icons[idx % icons.length]}
                label={type.name}
              />
            ))}
          </div>
        </div>

        {/* Sort Section */}
        {showSort && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold mb-4 text-gray-900 tracking-tight">
              Sort
            </h3>
            <div className="space-y-2">
              <FilterButton
                active={selectedSort === null}
                onClick={() => onSelectSort(null)}
                icon={<IconAdjustmentsHorizontal className="w-5 h-5" stroke={2} />}
                label="Default"
              />
              <FilterButton
                active={selectedSort === "roi"}
                onClick={() => onSelectSort("roi")}
                icon={<IconChartBar className="w-5 h-5" stroke={2} />}
                label="Best ROI"
              />
              <FilterButton
                active={selectedSort === "trending"}
                onClick={() => onSelectSort("trending")}
                icon={<IconFlame className="w-5 h-5" stroke={2} />}
                label="Trending"
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
