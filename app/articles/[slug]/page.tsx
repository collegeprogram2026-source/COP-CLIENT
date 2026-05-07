import type { Metadata } from "next";
import ArticleDetailPage from "@/app/components/pages/articles/ArticleDetail";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://cop-client-nine.vercel.app";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const readable = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const title = `${readable}`;
  const description = `${readable} — expert insights on online education, programs, and career growth from CollegeProgram.`;
  const canonical = `${SITE_URL}/articles/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      siteName: "CollegeProgram",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ArticleDetailRoute({ params }: Props) {
  const { slug } = await params;
  return <ArticleDetailPage slug={slug} />;
}
