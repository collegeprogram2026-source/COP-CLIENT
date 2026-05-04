import { SectionContent } from "@/app/lib/types";
interface TopUniversitiesProps {
  section: SectionContent;
}

import UpperWhiteBox from "./UpperWhiteBox";
import StatsBox from "./StatsBox";
import { richTextToPlain } from "./tuUtils";

export default async function TopUniversities({ section }: TopUniversitiesProps) {
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
  // TOP UNIVERSITIES SECTION FIELDS using cascading priority
  // ──────────────────────────────────────────────────────────────────────────────────
  const titleAliases = ["Title", "Main Title", "Main Heading", "Section Title", "title"];
  const title = getFieldValue(titleAliases, "Top Universities");
  trackKey(titleAliases);

  const subtitleAliases = ["Subtitle", "Subheading", "Description", "subtitle"];
  const subtitle = getFieldValue(subtitleAliases, "");
  if (subtitle) trackKey(subtitleAliases);
  // Stat fields - read from CMS (cascade)
  const studentsAliases = ["Students", "Students Enrolled", "students", "students_enrolled"];
  const students = getFieldValue(studentsAliases, "50,000+");
  trackKey(studentsAliases);

  const counsellingAliases = ["Counselling", "Programs Available", "Counselling Count", "counselling"];
  const counselling = getFieldValue(counsellingAliases, "2,000+");
  trackKey(counsellingAliases);

  const partnersAliases = ["Partners", "Partner Universities", "partners"];
  const partners = getFieldValue(partnersAliases, "500+");
  trackKey(partnersAliases);

  const ratingAliases = ["Rating", "Average Rating", "rating"];
  const rating = getFieldValue(ratingAliases, "4.8/5");
  trackKey(ratingAliases);
  // Try to fetch providers from API and render their logos in the white box.
  let universityLogos: Array<[string, any]> = [];
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${apiBase}/api/public/providers`, { cache: "no-store" });
    if (res.ok) {
      const providers = await res.json();
      if (Array.isArray(providers) && providers.length > 0) {
        // combine featured providers first, then fill with non-featured
        const featured = providers.filter((p: any) => !!p.isFeatured);
        const nonFeatured = providers.filter((p: any) => !p.isFeatured);
        // Only keep providers with a real HTTP logo URL
        const validProviders = [...featured, ...nonFeatured].filter((p: any) => {
          const logo = String(p.logo || "").trim();
          return logo.startsWith("http");
        });
        universityLogos = validProviders.map((p: any) => [p.name || p.slug || p._id, p.logo] as [string, string]);
      }
    }
  } catch (e) {
    // ignore and fallback below
  }

  // Fallback: pull from CMS section values if API returned nothing
  if (universityLogos.length === 0) {
    const usedKeysLower = Array.from(usedKeys).map((k) => k.toLowerCase());
    universityLogos = Object.entries(v)
      .filter(([k, val]) => {
        if (usedKeysLower.includes(k.toLowerCase())) return false;
        if (val === undefined || val === null) return false;
        const text = typeof val === "string" ? val : JSON.stringify(val);
        const lower = text.toLowerCase();
        return (lower.startsWith("http") && (lower.includes("image") || lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".svg")));
      })
      .slice(0, 7);
  }

  return (
    <section className="w-full bg-white">
      <div className="w-full px-0 py-2 lg:py-3">
        {/* Container with 2 Boxes - Full Width (removed extra separator and outer shadow) */}
        <div className="grid grid-cols-1 gap-0 overflow-hidden">
          <UpperWhiteBox title={title} universityLogos={universityLogos} />
          <StatsBox stats={{ students, counselling, partners, rating }} />
        </div>
      </div>
    </section>
  );
}

// fields that TopUniversities explicitly consumes from CMS — used to avoid duplicate rendering
export const usedFields = [
  "Title",
  "Main Title",
  "Main Heading",
  "Section Title",
  "title",
  "Subtitle",
  "Subheading",
  "Description",
  "subtitle",
  // stats fields
  "Students",
  "Students Enrolled",
  "students",
  "students_enrolled",
  "Counselling",
  "Programs Available",
  "Counselling Count",
  "counselling",
  "Partners",
  "Partner Universities",
  "partners",
  "Rating",
  "Average Rating",
  "rating",
];
