import { SectionContent } from "@/app/lib/types";
import Image from "next/image";
interface HeroProps {
  section: SectionContent;
}

function resolveValue(values: Record<string, any> | undefined, keys: string[]) {
  if (!values) return undefined;
  for (const k of keys) {
    const val = values[k];
    if (val !== undefined && val !== null && val !== "") return val;
  }
  return undefined;
}

function richTextToPlain(value: any) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value.type === "doc" && Array.isArray(value.content)) {
    return value.content
      .map((block: any) => {
        if (block.type === "paragraph") {
          return (block.content || []).map((c: any) => c.text || "").join("");
        }
        return "";
      })
      .join("\n");
  }
  return String(value);
}

export default function Hero({ section }: HeroProps) {
  const v = section.values || {};

  // ════════════════════════════════════════════════════════════════════════════════
  // CASCADE PRIORITY SYSTEM: CMS > PLACEHOLDER > HARDCODED DEFAULT
  // ════════════════════════════════════════════════════════════════════════════════
  const getFieldValue = (keyAliases: string[], placeholder?: string): string => {
    // Priority 1: Try to find CMS value with case-insensitive key matching
    for (const alias of keyAliases) {
      const foundKey = Object.keys(v).find((k) => k.toLowerCase() === alias.toLowerCase());
      if (foundKey) {
        const value = v[foundKey];
        if (value !== undefined && value !== null) {
          const text = richTextToPlain(value);
          if (text.trim()) return text; // ✅ CMS value found and not empty
        }
      }
    }
    // Priority 2: Use placeholder if provided
    if (placeholder) return placeholder;
    // Priority 3: Return empty string
    return "";
  };

  // Track which CMS keys are explicitly used so we can auto-render remaining ones
  const usedKeys = new Set<string>();
  const trackKey = (keyAliases: string[]) => {
    for (const alias of keyAliases) {
      const foundKey = Object.keys(v).find((k) => k.toLowerCase() === alias.toLowerCase());
      if (foundKey) usedKeys.add(foundKey);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────────────
  // HERO CORE FIELDS using cascading priority
  // ──────────────────────────────────────────────────────────────────────────────────
  const titleAliases = ["Title", "Main heading", "Main Heading", "title", "main_heading"];
  const title = getFieldValue(titleAliases);
  trackKey(titleAliases);

  const descAliases = ["Description", "description", "Subtitle", "Subheading", "Below main heading", "Below Main heading"];
  const description = getFieldValue(descAliases);
  trackKey(descAliases);

  const privacyAliases = ["Above main heading pill", "Above main heading", "Privacy pill", "Your Privacy Matters"];
  const privacyText = getFieldValue(privacyAliases, "Your Privacy Matters — No Spam Calls Guaranteed");
  trackKey(privacyAliases);

  // ──────────────────────────────────────────────────────────────────────────────────
  // STATS with cascading priority
  // ──────────────────────────────────────────────────────────────────────────────────
  const uniAliases = ["500 Universities", "500 universities", "500 Universities +", "500 Universities + Partnerships", "500 UNIVERSITIES"];
  const statUniversities = getFieldValue(uniAliases, "500 Universities +");
  trackKey(uniAliases);

  const progAliases = ["2000 programs", "2000+ programs", "2000 +Programs", "2000+ Programs", "2000+PROGRAMS"];
  const statPrograms = getFieldValue(progAliases, "2000 +Programs");
  trackKey(progAliases);

  const studAliases = ["50K Students", "50K+ Students", "50K+ Students Enrolled", "50K+ STUDENTS"];
  const statStudents = getFieldValue(studAliases, "50K+ Students");
  trackKey(studAliases);

  const trustedAliases = ["Trusted by 2.5 Lakh+ Students", "Trusted by", "Trusted Text", "trusted_text"];
  const trustedText = getFieldValue(trustedAliases, "");
  if (trustedText) trackKey(trustedAliases);

  const onlineCourseAliases = ["Online Courses", "online_courses", "Online courses", "online courses"];
  const onlineCourseText = getFieldValue(onlineCourseAliases, "");
  if (onlineCourseText) trackKey(onlineCourseAliases);

  return (
    <section className="relative w-full bg-white text-gray-900 overflow-visible">
      {/* Responsive container with proper scaling */}
      {/* pt accounts for sticky promo bar (~36px) + fixed navbar pill (~92px) minus the outer pt-10 (40px) = ~88px needed */}
      <div className="w-full pt-5 lg:pt-[32px] pb-4 lg:pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
            {/* Left column: text */}
            <div
              className="w-full lg:w-1/2 text-center lg:text-left relative px-4 lg:px-0 animate-[heroFadeUp_0.55s_ease-out_both]"
            >
              {/* Privacy matters pill - text based (match CMS field if present) */}
              {(() => {
                const privacyAliases = ["Above main heading pill", "Above main heading", "Privacy pill", "Your Privacy Matters", "privacy_pill"];
                const privacyText = getFieldValue(privacyAliases, "Your Privacy Matters — No Spam Calls Guaranteed");
                trackKey(privacyAliases);

                return (
                  <div
                    className="mb-3 sm:mb-6 inline-flex items-center rounded-full max-w-full bg-gradient-to-br from-[#7C3AED] to-[#C026D3] text-white pl-[clamp(8px,2.4vw,18px)] pr-[clamp(10px,3vw,22px)] pt-[clamp(5px,0.8vw,8px)] pb-[clamp(5px,0.8vw,8px)] gap-[clamp(6px,1.2vw,12px)]"
                  >
                    <img
                      src="/SVG%20(2).webp"
                      alt="Privacy shield icon"
                      aria-hidden="true"
                      width={22}
                      height={22}
                      className="object-contain flex-shrink-0 w-[clamp(14px,2.4vw,22px)] h-[clamp(14px,2.4vw,22px)]"
                    />
                    <span
                      title={privacyText}
                      className="text-[clamp(10px,2.8vw,18px)] font-semibold leading-[1.3] whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
                    >
                      {privacyText}
                    </span>
                  </div>
                );
              })()}

              {title && (
                <h1 className="max-w-[min(720px,100%)] whitespace-normal text-[clamp(32px,5vw,56px)] font-semibold leading-[1.4] tracking-[0.02em] text-[#161C2D] font-['edupath-streethemes',-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] mt-2">
                  {(() => {
                    const words = title.split(/\s+/);
                    return words.map((word: string, idx: number) => {
                      const isSecondWord = idx === 1; // always highlight the second word
                      const isFrom = word.toLowerCase() === "from";
                      return (
                        <span key={idx}>
                          {isSecondWord ? (
                            <>
                              <span
                                className="inline-block mx-[clamp(2px,0.5vw,6px)] -skew-y-[5deg] bg-gradient-to-br from-[#7C3AED] to-[#C026D3] p-0"
                              >
                                <span
                                  className="inline-block py-[clamp(4px,1vw,8px)] px-[clamp(10px,2vw,16px)] text-white skew-y-[5deg] italic font-bold"
                                >
                                  {word}
                                </span>
                              </span>
                              {" "}
                            </>
                          ) : isFrom ? (
                            <>
                              <br />
                              <span>{word} </span>
                            </>
                          ) : (
                            <span>{word} </span>
                          )}
                        </span>
                      );
                    });
                  })()}
                </h1>
              )}

              {description && (
                <p
                  className="mx-auto lg:mx-0 mt-[clamp(1.5rem,3vw,2rem)] text-[clamp(16px,2vw,18px)] text-[#6A7282] max-w-[38rem] leading-[1.6] tracking-[0.01em]">
                  {description}
                </p>
              )}

              {/* Mobile-only hero image — above the fold, so eager + high priority */}
              <div className="block lg:hidden mt-5 mb-2 w-full rounded-2xl overflow-hidden">
                <Image
                  src="/Margin.webp"
                  alt="Student exploring online degree programs on CollegeProgram"
                  width={1100}
                  height={1331}
                  priority
                  fetchPriority="high"
                  sizes="95vw"
                  className="w-full h-auto block"
                />
              </div>

              {/* Stats row */}
              <div className="mt-10 sm:mt-10 lg:mt-10 xl:mt-12 flex flex-row gap-2 sm:gap-8 lg:gap-10 items-start justify-center lg:justify-start">
                {[
                  { icon: '/Container (47).webp', label: statUniversities, sub: 'Partnerships' },
                  { icon: '/Container (48).webp', label: statPrograms, sub: 'Available' },
                  { icon: '/Container (49).webp', label: statStudents, sub: 'Enrolled' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center lg:flex-row lg:items-start gap-1.5 sm:gap-2 text-center lg:text-left" style={{ flex: 1, minWidth: 0 }}>
                    <img src={stat.icon} alt={`${stat.label || "Statistic"} icon`} aria-hidden="true" width={36} height={36} loading="lazy" className="flex-shrink-0 w-[clamp(24px,5vw,36px)] h-[clamp(24px,5vw,36px)] object-contain" />
                    <div style={{ minWidth: 0 }}>
                      {(() => {
                        const lbl = String(stat.label || "").trim();
                        // Try to capture a leading numeric token (e.g. "500", "50K+")
                        const m = lbl.match(/^\s*([0-9][0-9,]*[A-Za-z]*\+?)\s*(.*)$/i);
                        let numberPart = lbl;
                        let textPart = "";
                        if (m) {
                          numberPart = m[1];
                          textPart = m[2] || "";

                          // If the text part begins with a '+' (e.g. "2000 +Programs"),
                          // move the '+' to the number so it becomes "2000+" and the
                          // remaining text becomes the label on the next line.
                          const plusLeading = textPart.match(/^\s*\+\s*(.*)$/);
                          if (plusLeading) {
                            numberPart = String(numberPart).replace(/\s*\+\s*$/, '') + '+';
                            textPart = plusLeading[1] || '';
                          }

                          // If the text part ends with a '+' (e.g. "Universities +"),
                          // move that '+' to the number as well so it becomes "500+".
                          const plusTrailing = textPart.match(/^(.*)\s*\+\s*$/);
                          if (plusTrailing) {
                            textPart = (plusTrailing[1] || '').trim();
                            numberPart = String(numberPart).replace(/\s*\+\s*$/, '') + '+';
                          }
                        } else {
                          // fallback: keep trailing + attached
                          numberPart = lbl.replace(/\s*\+\s*$/, '+');
                        }

                        // Normalize any stray whitespace around '+' and keep it attached
                        numberPart = String(numberPart).replace(/\s*\+\s*$/, '+');

                        return (
                          <>
                            <div className="text-[clamp(12px,3.2vw,15px)] font-bold text-[#161C2D] leading-[1.05] whitespace-nowrap">{numberPart}</div>
                            {textPart ? (
                              <div className="text-[clamp(11px,2.8vw,13px)] font-bold text-[#161C2D] leading-[1.2]">{textPart}</div>
                            ) : null}
                            <div className="text-[clamp(9px,2.4vw,11px)] text-[#6A7282] mt-[clamp(3px,1vw,6px)]">{stat.sub}</div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trusted badge */}
              {trustedText && (
                <div className="mt-10 lg:mt-8 text-[clamp(13px,1.5vw,15px)] text-[#6A7282] font-medium leading-[1.5]">
                  {trustedText}
                </div>
              )}

              {/* 4-badge static row */}
              <div className="mt-4 lg:mt-8 flex items-center gap-2 lg:gap-4 w-full justify-center lg:justify-start">
                {[
                  { src: '/Stats.webp', alt: 'Trusted programs badge' },
                  { src: '/Container (43).webp', alt: 'Top universities badge' },
                  { src: '/Container (44).webp', alt: 'Verified providers badge' },
                  { src: '/Container (45).webp', alt: 'Industry recognition badge' },
                ].map((b, i) => (
                  <div key={i} className="flex-shrink-0 h-[clamp(28px,5vw,44px)] flex-1 max-w-[150px]">
                    <img src={b.src} alt={b.alt} aria-hidden="true" width={150} height={44} loading="lazy" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: image + decorative circle + overlays — hidden on mobile */}
            <div
              className="hidden lg:flex w-full lg:w-1/2 items-start justify-center relative pl-0 pr-[clamp(0px,2vw,32px)] min-h-[400px] animate-[heroFadeRight_0.6s_ease-out_0.1s_both]">
              {/* Decorative purple circle - responsive */}
              {/* <motion.div initial={{ scale: 0.85 }} className="absolute rounded-full bg-gradient-to-br from-purple-300 to-purple-600 opacity-30 -z-10" style={{
                width: "clamp(300px, 50vw, 600px)",
                height: "clamp(300px, 50vw, 600px)",
                left: "0%",
                top: "0%",
                transform: "translateY(-50%)"
              }} /> */}

              {/* Main image - without white background box - responsive */}
              <Image
                src="/Margin.webp"
                alt="Student exploring online degree programs on CollegeProgram"
                width={1100}
                height={1331}
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, 548px"
                className="relative z-10 rounded-2xl object-cover shadow-none bg-transparent w-[clamp(300px,80vw,548px)] h-auto aspect-[548/663.42]"
              />

              {/* Small top-right badge - Online Course Box - CMS driven - responsive */}
              {onlineCourseText && (
                <div
                  className="absolute rounded-lg w-auto h-auto p-[clamp(8px,1.5vw,12px)] bg-white flex items-start justify-start gap-[clamp(10px,1.5vw,14px)] z-20 top-[clamp(30px,8vw,80px)] right-[clamp(-30px,-5vw,-50px)] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                >
                  {/* Icon - circular badge */}
                  <div
                    className="w-14 h-14 min-w-[56px] min-h-[56px] rounded-full bg-[rgba(124,58,237,0.05)] flex items-center justify-center shrink-0"
                  >
                    <img
                      src="/Container (51).webp"
                      alt="Online courses feature icon"
                      aria-hidden="true"
                      width={52}
                      height={52}
                      loading="lazy"
                      className="w-[52px] h-[52px] object-contain"
                    />
                  </div>

                  {/* Text content - stacked vertically */}
                  <div
                    className="flex flex-col items-start justify-center gap-1"
                  >
                    {/* Label */}
                    <div
                      className="font-['Inter'] text-[15px] font-normal leading-6 tracking-normal text-[#6B7280]"
                    >
                      Online Courses
                    </div>
                    {/* CMS Value */}
                    <div
                      className="font-['Inter'] text-xl font-bold leading-7 tracking-normal text-[#161C2D]"
                    >
                      {onlineCourseText}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* AUTO-RENDER NEW CMS FIELDS (Dynamic Section) */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {(() => {
            // Collect all CMS fields NOT explicitly used
            const usedKeysLower = Array.from(usedKeys).map((k) => k.toLowerCase());
            const promoAliases = ["promo", "Promo", "PROMO", "promoText", "promo_text"].map((s) => String(s).toLowerCase());
            const dynamicFields = Object.entries(v).filter(([k, val]) => {
              if (usedKeysLower.includes(k.toLowerCase())) return false; // Skip used fields
              if (promoAliases.includes(k.toLowerCase())) return false; // Skip promo field (rendered in Navbar)
              if (val === undefined || val === null) return false;
              const text = typeof val === "string" ? val : JSON.stringify(val);
              return text.trim().length > 0; // Only render non-empty
            });

            if (dynamicFields.length === 0) return null; // No new fields to render

            return (
              <div className="mt-12 lg:mt-16 w-full">
                {dynamicFields.map(([fieldKey, fieldValue]) => {
                  const displayText = typeof fieldValue === "string"
                    ? fieldValue
                    : richTextToPlain(fieldValue);

                  return (
                    <div key={fieldKey}>
                      {displayText}
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

// fields that Hero explicitly consumes from CMS — used to avoid duplicate rendering
export const usedFields = [
  "Title",
  "Main heading",
  "Main Heading",
  "title",
  "main_heading",
  "Description",
  "description",
  "Subtitle",
  "Subheading",
  "Below main heading",
  "Below Main heading",
  "CTA Text",
  "CTA",
  "Call To Action",
  "CTA Link",
  "CTA Link URL",
  "CTA_Link",
  "Image",
  "image",
  "Hero Image",
  "Trusted by 2.5 Lakh+ Students",
  "Above main heading pill",
  "Above main heading",
  "Privacy pill",
  "Your Privacy Matters",
  "Online Courses",
  "online_courses",
  "Online courses",
  "online courses",
  // Common stat keys from CMS to avoid leftover rendering
  "500 universities",
  "500 Universities",
  "500 Universities +",
  "2000 programs",
  "2000+ programs",
  "2000 +Programs",
  "50K Students",
  "50K+ Students",
  "50K+ Students Enrolled",
  // Admin/editor fields that accidentally appeared on Home — suppress them
  "Services",
  "Use of it",
  "Saksham",
  "Dahiya",
  // Promo field (rendered in Navbar) - avoid showing as leftover under the hero
  "Promo",
  "promo",
  "PROMO",
  "promoText",
  "promo_text",
];
