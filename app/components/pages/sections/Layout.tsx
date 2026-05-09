"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "../../layout/Navbar";
import MobileDock from "../../layout/MobileDock";
import { usePathname } from "next/navigation";

// Footer is below the fold — split into its own chunk so it doesn't
// inflate the initial JS bundle and delay LCP.
const Footer = dynamic(() => import("../../layout/Footer"), { ssr: true });

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className={`flex-1 ${!isAuthPage ? "md:pt-24 pb-24 md:pb-0" : ""}`}>{children}</main>
      {!isAuthPage && <Footer />}
      {!isAuthPage && <MobileDock />}
    </>
  );
}

