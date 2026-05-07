import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import Layout from "./components/pages/sections/Layout";
import OAuthProvider from "./components/providers/OAuthProvider";
import { Toaster } from "react-hot-toast";
import SmoothScroll from "./components/providers/SmoothScroll";

export const metadata: Metadata = {
  title: "CollegeProgram",
  description: "Discover a world of knowledge and opportunities with our online education platform",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
  preload: true,
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
      <body className="min-h-full flex flex-col">
        <OAuthProvider>
          <SmoothScroll>
            <Layout>
              {children}
            </Layout>
          </SmoothScroll>
          <Toaster position="top-center" />
        </OAuthProvider>
      </body>
    </html>
  );
}

