import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Policy | CollegeProgram",
  description:
    "Learn how CollegeProgram collects, uses, and protects your personal information. Read our comprehensive privacy and data policy.",
};

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
