import { Suspense } from "react";
import SearchPage from "@/app/components/pages/search/Search";

export const metadata = {
  title: "Search Programs | CollegeProgram",
  description: "Search for online courses, universities & specializations.",
};

export default function SearchRoute() {
  return (
    <Suspense fallback={null}>
      <SearchPage />
    </Suspense>
  );
}
