"use client";

import FocusCenterSlider from "./FocusCenterSlider";
import ProgramCard, { Program } from "./ProgramCard";

interface ProgramSliderGridProps {
  programs: Program[];
  activeTab: string;
  isAnimating: boolean;
  desktopStartIndex: number;
}

export default function ProgramSliderGrid({
  programs,
  activeTab,
  isAnimating,
  desktopStartIndex
}: ProgramSliderGridProps) {
  return (
    <div className="w-full">
      {/* Mobile focus-center slider */}
      <FocusCenterSlider className="mt-8 mb-8" interval={7000}>
        {programs.map((p) => (
          <div key={`m-${p._id}`}>
            <ProgramCard program={p} variant="mobile" />
          </div>
        ))}
      </FocusCenterSlider>

      {/* Desktop grid: 2 cols on tablet, 4 cols on desktop */}
      <div
        className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5 lg:gap-6"
        style={{
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.4s ease'
        }}
      >
        {(() => {
          const displayPrograms = [];
          for (let i = 0; i < 4; i++) {
            if (programs.length > 0) {
              displayPrograms.push(programs[(desktopStartIndex + i) % programs.length]);
            }
          }
          return displayPrograms;
        })().map((p) => (
          <ProgramCard 
            key={p._id} 
            program={p} 
            variant="desktop" 
            showTrending={activeTab === 'trending'} 
          />
        ))}
      </div>
    </div>
  );
}
