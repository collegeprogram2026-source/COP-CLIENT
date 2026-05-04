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
      className="w-full"
      style={{
        background: "linear-gradient(90deg, #EAD8FF 0%, #E3CEFF 50%, #EAD8FF 100%)",
        padding: "clamp(20px, 4vw, 36px) clamp(8px, 2vw, 16px)",
      }}
    >
      {/* Single row — all 4 stats side by side */}
      <div className="flex flex-row items-center justify-between gap-1">
        {/* Stat 1: Students */}
        <div className="flex flex-col items-center justify-center text-center flex-1 min-w-0">
          <img src="/Container (52).png" alt="Students" style={{ height: "clamp(24px,5vw,44px)", width: "auto", marginBottom: 4, objectFit: "contain" }} />
          <div style={{ fontSize: "clamp(12px,3vw,22px)", fontWeight: 700, lineHeight: 1.2, color: "#101828" }}>{sStudents.value}</div>
          <div style={{ fontSize: "clamp(9px,2vw,13px)", fontWeight: 400, color: "#4A5565", marginTop: 2, lineHeight: 1.2, wordBreak: "break-word", textAlign: "center" }}>{sStudents.label || "Students"}</div>
        </div>

        {/* Stat 2: Counselling */}
        <div className="flex flex-col items-center justify-center text-center flex-1 min-w-0">
          <img src="/Container (53).png" alt="Counselling" style={{ height: "clamp(24px,5vw,44px)", width: "auto", marginBottom: 4, objectFit: "contain" }} />
          <div style={{ fontSize: "clamp(12px,3vw,22px)", fontWeight: 700, lineHeight: 1.2, color: "#101828" }}>{sCounselling.value}</div>
          <div style={{ fontSize: "clamp(9px,2vw,13px)", fontWeight: 400, color: "#4A5565", marginTop: 2, lineHeight: 1.2, wordBreak: "break-word", textAlign: "center" }}>{sCounselling.label || "Counselling"}</div>
        </div>

        {/* Stat 3: Partners */}
        <div className="flex flex-col items-center justify-center text-center flex-1 min-w-0">
          <img src="/Container (54).png" alt="Partners" style={{ height: "clamp(24px,5vw,44px)", width: "auto", marginBottom: 4, objectFit: "contain" }} />
          <div style={{ fontSize: "clamp(12px,3vw,22px)", fontWeight: 700, lineHeight: 1.2, color: "#101828" }}>{sPartners.value}</div>
          <div style={{ fontSize: "clamp(9px,2vw,13px)", fontWeight: 400, color: "#4A5565", marginTop: 2, lineHeight: 1.2, wordBreak: "break-word", textAlign: "center" }}>{sPartners.label || "Partners"}</div>
        </div>

        {/* Stat 4: Rating */}
        <div className="flex flex-col items-center justify-center text-center flex-1 min-w-0">
          <img src="/Container (55).png" alt="Rating" style={{ height: "clamp(24px,5vw,44px)", width: "auto", marginBottom: 4, objectFit: "contain" }} />
          <div style={{ fontSize: "clamp(12px,3vw,22px)", fontWeight: 700, lineHeight: 1.2, color: "#101828" }}>{sRating.value}</div>
          <div style={{ fontSize: "clamp(9px,2vw,13px)", fontWeight: 400, color: "#4A5565", marginTop: 2, lineHeight: 1.2, wordBreak: "break-word", textAlign: "center" }}>{sRating.label || "Rating"}</div>
        </div>
      </div>
    </div>
  );
}
