import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import Layout from "./components/pages/sections/Layout";
import { Toaster } from "react-hot-toast";
import SmoothScroll from "./components/providers/SmoothScroll";
import { JsonLd, organizationSchema, websiteSchema } from "./lib/jsonld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cop-client-nine.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CollegeProgram — Online Degree Programs from Top Universities",
    template: "%s | CollegeProgram",
  },
  description:
    "Discover online degree programs from top universities. Compare courses, fees, and rankings, and talk to expert counselors to find your perfect program.",
  keywords: [
    "online courses",
    "online degree",
    "online universities",
    "college programs",
    "distance learning",
    "MBA online",
    "online education",
    "compare universities",
  ],
  applicationName: "CollegeProgram",
  authors: [{ name: "CollegeProgram" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "CollegeProgram",
    title: "CollegeProgram — Online Degree Programs from Top Universities",
    description:
      "Discover online degree programs from top universities. Compare courses, fees, and rankings, and talk to expert counselors to find your perfect program.",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "CollegeProgram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CollegeProgram — Online Degree Programs from Top Universities",
    description:
      "Discover online degree programs from top universities. Compare courses, fees, and rankings, and talk to expert counselors.",
    images: ["/logo.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.webp",
  },
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
  preload: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${nunito.variable}`}
    >
      <head>
        {/* LCP hero image — preloaded so the browser fetches it before the React
            tree mounts. Responsive imagesrcset matches the Hero <Image sizes>. */}
        <link
          rel="preload"
          as="image"
          href="/Margin.webp"
          imageSrcSet="/Margin.webp"
          imageSizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, 548px"
          fetchPriority="high"
        />
        {/* Backend fetches run server-side (Vercel→Render); browsers never connect directly.
            Preconnecting to onrender.com wastes browser connection budget. */}
        <link rel="dns-prefetch" href="https://encrypted-tbn0.gstatic.com" />
        <link rel="preconnect" href="https://upload.wikimedia.org" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.pinimg.com" />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Layout>
            {children}
          </Layout>
        </SmoothScroll>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

