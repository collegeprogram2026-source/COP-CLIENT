import type { Metadata } from "next";
import "./globals.css";
import Layout from "./components/pages/sections/Layout";
import OAuthProvider from "./components/providers/OAuthProvider";

export const metadata: Metadata = {
  title: "CollegeProgram",
  description: "Discover a world of knowledge and opportunities with our online education platform",
};

import { Toaster } from "react-hot-toast";
import SmoothScroll from "./components/providers/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
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

