import { getPageContent } from "@/app/lib/api";
import { PageResponse } from "@/app/lib/types";
import ArticlesPage, { ArticleData } from "@/app/components/pages/articles/Articles";

export const revalidate = 300;

export const metadata = {
  title: "Articles | CollegeProgram",
  description: "Latest blogs, guides and resources on education and career growth.",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function getVal(values: Record<string, any>, ...aliases: string[]): string {
  for (const alias of aliases) {
    const key = Object.keys(values).find(
      (k) => k.toLowerCase() === alias.toLowerCase()
    );
    if (key !== undefined && values[key] !== undefined && values[key] !== null && values[key] !== "") {
      return String(values[key]);
    }
  }
  return "";
}

function extractArticles(data: PageResponse): ArticleData[] {
  const sections = data.page?.sections || [];
  const content = data.content || [];

  // Find the section that contains article items — prefer one whose
  // apiIdentifier includes "article" or "blog", then fall back to any
  // section that has both title and description-like fields.
  const articleSection =
    sections.find((s) => s.apiIdentifier?.toLowerCase().includes("article")) ||
    sections.find((s) => s.apiIdentifier?.toLowerCase().includes("blog")) ||
    sections.find((s) => {
      const names = s.fields.map((f) => f.name.toLowerCase());
      return (
        names.some((n) => n.includes("title")) &&
        names.some((n) => n.includes("desc") || n.includes("excerpt") || n.includes("summary"))
      );
    });

  if (!articleSection) return [];

  return content
    .filter((c) => c.sectionApiId === articleSection.apiIdentifier)
    .sort((a, b) => (a.itemIndex || 0) - (b.itemIndex || 0))
    .map((item) => {
      const v = item.values || {};
      return {
        slug:
          getVal(v, "slug", "article_slug", "url_slug") ||
          `article-${item.itemIndex}`,
        category: getVal(v, "category", "categories", "tag", "type"),
        date: getVal(v, "date", "publish_date", "published_date"),
        readTime: getVal(v, "readTime", "read_time", "reading_time"),
        title: getVal(v, "title", "article_title", "heading", "name"),
        description: getVal(v, "description", "excerpt", "summary"),
        author: getVal(v, "author", "author_name", "by"),
        image:
          getVal(v, "image", "thumbnail", "cover", "featured_image") ||
          "/Blogs.webp",
      };
    })
    .filter((a) => Boolean(a.title));
}

function extractHeader(
  data: PageResponse
): { title?: string; subtitle?: string } {
  const sections = data.page?.sections || [];
  const content = data.content || [];

  // Prefer a section whose apiIdentifier contains "header", otherwise any
  // small section (≤ 3 fields) that has a title field.
  const headerSection =
    sections.find((s) =>
      s.apiIdentifier?.toLowerCase().includes("header")
    ) ||
    sections.find(
      (s) =>
        s.fields.length <= 3 &&
        s.fields.some((f) => f.name.toLowerCase().includes("title"))
    );

  if (!headerSection) return {};

  const item = content.find((c) => c.sectionApiId === headerSection.apiIdentifier);
  if (!item) return {};

  const v = item.values || {};
  return {
    title: getVal(v, "title", "heading", "page_title") || undefined,
    subtitle:
      getVal(v, "subtitle", "subheading", "description", "tagline") ||
      undefined,
  };
}

// ── Route ─────────────────────────────────────────────────────────────────────

export default async function ArticlesRoute() {
  let cmsArticles: ArticleData[] | undefined;
  let pageTitle: string | undefined;
  let pageSubtitle: string | undefined;

  try {
    const data: PageResponse = await getPageContent("articles");
    if (data?.content?.length) {
      const articles = extractArticles(data);
      if (articles.length > 0) cmsArticles = articles;

      const header = extractHeader(data);
      if (header.title) pageTitle = header.title;
      if (header.subtitle) pageSubtitle = header.subtitle;
    }
  } catch {
    // Backend unavailable — Articles.tsx falls back to its static data
  }

  return (
    <ArticlesPage
      cmsArticles={cmsArticles}
      pageTitle={pageTitle}
      pageSubtitle={pageSubtitle}
    />
  );
}
