import type { ReactElement } from "react";

// split a CMS stat like "50,000+ Students Enrolled" => { value: "50,000+", label: "Students Enrolled" }
function splitStat(full?: string) {
  if (!full) return { value: "", label: "" };
  // match leading number-like token including +,.,/
  const m = full.match(/^([\d,.\/+]+)\s*(.*)$/);
  if (m) return { value: m[1].trim(), label: (m[2] || "").trim() };
  return { value: full.trim(), label: "" };
}

export default function StatsBox({
  stats,
}: {
  stats: {
    students?: string;
    counselling?: string;
    partners?: string;
    rating?: string;
  };
}): ReactElement {
  const { students = "50,000+ Students Enrolled", counselling = "2,000+ Programs Available", partners = "500+ Partner Universities", rating = "4.8/5" } = stats || {};
  const sStudents = splitStat(students);
  const sCounselling = splitStat(counselling);
  const sPartners = splitStat(partners);
  const sRating = splitStat(rating);
  return (
    <div
      className="mt-5 md:mt-0 w-full bg-gradient-to-r from-[#EAD8FF] via-[#E3CEFF] to-[#EAD8FF] py-[clamp(20px,4vw,36px)] px-[clamp(8px,2vw,16px)]"
    >
      {/* Single row — all 4 stats side by side */}
      <div className="flex flex-row items-center justify-between gap-1">
        {/* Stat 1: Students */}
        <div className="flex flex-col items-center justify-center text-center flex-1 min-w-0">
          <img src="/Container (52).webp" alt="Students" width={44} height={44} loading="lazy" decoding="async" className="h-[clamp(24px,5vw,44px)] w-auto mb-1 object-contain" />
          <div className="text-[clamp(12px,3vw,22px)] font-bold leading-[1.2] text-[#101828]">{sStudents.value}</div>
          <div className="text-[clamp(9px,2vw,13px)] font-normal text-[#4A5565] mt-0.5 leading-[1.2] break-words text-center">{sStudents.label || "Students"}</div>
        </div>

        {/* Stat 2: Counselling */}
        <div className="flex flex-col items-center justify-center text-center flex-1 min-w-0">
          <img src="/Container (53).webp" alt="Counselling" width={44} height={44} loading="lazy" decoding="async" className="h-[clamp(24px,5vw,44px)] w-auto mb-1 object-contain" />
          <div className="text-[clamp(12px,3vw,22px)] font-bold leading-[1.2] text-[#101828]">{sCounselling.value}</div>
          <div className="text-[clamp(9px,2vw,13px)] font-normal text-[#4A5565] mt-0.5 leading-[1.2] break-words text-center">{sCounselling.label || "Counselling"}</div>
        </div>

        {/* Stat 3: Partners */}
        <div className="flex flex-col items-center justify-center text-center flex-1 min-w-0">
          <img src="/Container (54).webp" alt="Partners" width={44} height={44} loading="lazy" decoding="async" className="h-[clamp(24px,5vw,44px)] w-auto mb-1 object-contain" />
          <div className="text-[clamp(12px,3vw,22px)] font-bold leading-[1.2] text-[#101828]">{sPartners.value}</div>
          <div className="text-[clamp(9px,2vw,13px)] font-normal text-[#4A5565] mt-0.5 leading-[1.2] break-words text-center">{sPartners.label || "Partners"}</div>
        </div>

        {/* Stat 4: Rating */}
        <div className="flex flex-col items-center justify-center text-center flex-1 min-w-0">
          <img src="/Container (55).webp" alt="Rating" width={44} height={44} loading="lazy" decoding="async" className="h-[clamp(24px,5vw,44px)] w-auto mb-1 object-contain" />
          <div className="text-[clamp(12px,3vw,22px)] font-bold leading-[1.2] text-[#101828]">{sRating.value}</div>
          <div className="text-[clamp(9px,2vw,13px)] font-normal text-[#4A5565] mt-0.5 leading-[1.2] break-words text-center">{sRating.label || "Rating"}</div>
        </div>
      </div>
    </div>
  );
}
