import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | CollegeProgram",
  description:
    "Read our terms and conditions to understand the rules and guidelines governing the use of CollegeProgram's platform and services.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
