import { getPageContent, getCoursesHomeSummary } from "@/app/lib/api";
import { PageResponse, SectionContent } from "@/app/lib/types";
// import SectionRenderer from "@/app/components/SectionRenderer";
import Homepage from "@/app/components/pages/homepage";

function mergeWithPlaceholders(data: PageResponse) {
  const sections = data.page?.sections || [];
  const content = data.content || [];

  return sections
    .map((section, idx) => {
      // find matching saved item for this section
      const item = content.find((it) => {
        if (it.sectionApiId && section.apiIdentifier) return it.sectionApiId === section.apiIdentifier;
        return typeof it.sectionIndex === "number" && it.sectionIndex === idx;
      });

      // Only keep values that are declared on this page's section schema.
      const merged: Record<string, unknown> = {};
      for (const field of section.fields) {
        const name = field.name;

        if (
          item &&
          item.values &&
          Object.prototype.hasOwnProperty.call(item.values, name) &&
          item.values[name] !== undefined &&
          item.values[name] !== null &&
          item.values[name] !== ""
        ) {
          // Use saved value when present
          merged[name] = item.values[name];
        } else {
          // No saved value: fall back to the model placeholder so editors/public preview see something
          merged[name] = field.placeholder || "";
        }
      }

      return {
        _id: item?._id || `__placeholder_${section.apiIdentifier || idx}`,
        pageSlug: data.page.slug,
        sectionApiId: section.apiIdentifier,
        sectionIndex: idx,
        itemIndex: item?.itemIndex ?? 0,
        values: merged,
      };
    })
    .filter(Boolean) as SectionContent[];
}

export default async function Home() {
  // Kick off course data fetch in parallel with page content so both hit the
  // backend simultaneously. When Section3 later calls getCoursesHomeSummary()
  // the result comes from Next.js's per-request fetch memoization cache.
  void getCoursesHomeSummary().catch(() => {});

  let data: PageResponse | null = null;

  try {
    data = await getPageContent("home-page");
  } catch (err) {
    console.error("Failed to load homepage:", err);
  }

  if (!data?.content?.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        No content available
      </div>
    );
  }

  const sections = mergeWithPlaceholders(data);

  // Ensure Expert Counselors section is present. If the CMS/page schema
  // doesn't include it, insert a placeholder immediately after Section 3
  // (the "find your perfect program" block) when possible.
  const section3ApiIds = [
    "find_your_perfect_program",
    "perfect_program",
    "find-your-perfect-program",
    "FindYourPerfectProgram",
    "findYourPerfectProgram",
  ];

  const expertApiId = "expert_counselors";
  const expertAliases = ["expert_counselors", "expert-counselors", "expertCounselors", "ExpertCounselors"];

  const hasExpert = sections.some((s) => expertAliases.includes(String(s.sectionApiId)));
  if (!hasExpert) {
    // Find index of the page section schema that corresponds to Section 3
    const pageSections = data.page?.sections || [];
    const findIdx = pageSections.findIndex((ps) => section3ApiIds.includes(String(ps.apiIdentifier)));

    // Place the expert counselors section before Section 3 to shift it upwards.
    // If Section 3 is not present, insert at the top.
    const insertAt = findIdx >= 0 ? findIdx : 0;

    const placeholder: SectionContent = {
      _id: `__placeholder_${expertApiId}`,
      pageSlug: data.page.slug,
      sectionApiId: expertApiId,
      sectionIndex: insertAt,
      itemIndex: 0,
      values: {},
    };

    sections.splice(insertAt, 0, placeholder);

    // Re-number sectionIndex to match the array order so SectionRenderer sorts predictably
    sections.forEach((s, idx) => {
      s.sectionIndex = idx;
    });
  }

  // Ensure Best ROI section appears before Choose Us section
  const bestRoiAliases = ["best_roi", "best-roi", "best_roi_programs", "bestRoiPrograms", "section_6", "section6"];
  const chooseUsAliases = ["choose_us", "choose-us", "chooseUs", "why_choose_us", "section_7", "section7"];

  const bestRoiIdx = sections.findIndex((s) => {
    const id = String(s.sectionApiId || "").toLowerCase();
    return bestRoiAliases.some(alias => id === alias.toLowerCase());
  });
  const chooseUsIdx = sections.findIndex((s) => {
    const id = String(s.sectionApiId || "").toLowerCase();
    return chooseUsAliases.some(alias => id === alias.toLowerCase());
  });

  // If both exist and Choose Us comes before Best ROI, reorder them
  if (bestRoiIdx > -1 && chooseUsIdx > -1 && chooseUsIdx < bestRoiIdx) {
    // Extract the Choose Us section
    const chooseUsSection = sections.splice(chooseUsIdx, 1)[0];

    // After removing choose_us, best_roi index shifts down by 1
    const newBestRoiIdx = bestRoiIdx - 1;

    // Insert Choose Us after Best ROI
    sections.splice(newBestRoiIdx + 1, 0, chooseUsSection);

    // Re-number sectionIndex to match the new array order
    sections.forEach((s, idx) => {
      s.sectionIndex = idx;
    });
  }

  return <Homepage sections={sections} />;
}
