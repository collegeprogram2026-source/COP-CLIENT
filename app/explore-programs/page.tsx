import { getPageContent, getDegreeTypes, getCourses, getSpecializations } from "@/app/lib/api";
import { PageResponse } from "@/app/lib/types";
import ExploreProgramsPage from "@/app/components/pages/exploreProgramsPage";

function mergeWithPlaceholders(data: PageResponse) {
  const sections = data.page?.sections || [];
  const content = data.content || [];

  return sections
    .map((section, idx) => {
      const item = content.find((it) => {
        if (it.sectionApiId && section.apiIdentifier) return it.sectionApiId === section.apiIdentifier;
        return typeof it.sectionIndex === "number" && it.sectionIndex === idx;
      });

      const merged: Record<string, any> = {};
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
          merged[name] = item.values[name];
        } else {
          merged[name] = field.placeholder || "";
        }
      }

      return {
        _id: item?._id || `__placeholder_${section.apiIdentifier || idx}`,
        pageSlug: data.page?.slug,
        sectionApiId: section.apiIdentifier,
        sectionIndex: idx,
        itemIndex: item?.itemIndex ?? 0,
        values: merged,
      };
    })
    .filter(Boolean) as any[];
}

export default async function ExploreProgramsRoute({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const initialType = typeof params.type === "string" ? params.type : undefined;
  const initialCourse = typeof params.course === "string" ? params.course : undefined;
  const initialSpecialization = typeof params.spec === "string" ? params.spec : undefined;

  let pageData: PageResponse | null = null;
  let degreeTypes = [];
  let courses = [];
  let specializations = [];

  try {
    // Attempt to load CMS content for this page if it exists
    pageData = await getPageContent("explore-programs-page");
  } catch (err) {
    console.error("No CMS content for explore-programs-page, using defaults.");
  }

  try {
    // Fetch the actual data and wait 1.5s to show skeleton
    const [fetchedDegreeTypes, fetchedCourses, fetchedSpecializations] = await Promise.all([
      getDegreeTypes(),
      getCourses(),
      getSpecializations(),
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);
    degreeTypes = fetchedDegreeTypes;
    courses = fetchedCourses;
    specializations = fetchedSpecializations;
  } catch (err) {
    console.error("Failed to load exploration data:", err);
  }

  const sections = pageData ? mergeWithPlaceholders(pageData) : [];

  return (
    <ExploreProgramsPage
      sections={sections}
      degreeTypes={degreeTypes}
      courses={courses}
      specializations={specializations}
       initialType={initialType}
      initialCourse={initialCourse}
      initialSpecialization={initialSpecialization}
    />
  );
}
