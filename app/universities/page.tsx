import { getPageContent, getProviders } from "@/app/lib/api";
import { PageResponse } from "@/app/lib/types";
import UniversityPage from "@/app/components/pages/universityPage";

export const revalidate = 300;

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

export default async function UniversitiesRoute() {
  let pageData: PageResponse | null = null;
  let providers: any[] = [];

  try {
    // Attempt to load CMS content for this page if it exists
    pageData = await getPageContent("university-page");
  } catch (err) {
    console.error("No CMS content for university-page, using defaults.");
  }

  try {
    // Fetch the actual university data
    const [fetchedProviders] = await Promise.all([
      getProviders(),
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);
    providers = fetchedProviders;
  } catch (err) {
    console.error("Failed to load providers:", err);
  }

  const sections = pageData ? mergeWithPlaceholders(pageData) : [];

  return <UniversityPage sections={sections} providers={providers} />;
}
