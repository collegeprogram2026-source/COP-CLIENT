"use client";

import React from "react";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className={`flex-1 ${!isAuthPage ? "md:pt-24" : ""}`}>{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
}

