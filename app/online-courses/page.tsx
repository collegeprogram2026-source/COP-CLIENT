import { getDegreeTypes, getCourses } from "@/app/lib/api";
import OnlineCoursesPage from "@/app/components/pages/onlineCoursesPage";

export const revalidate = 300;

export const metadata = {
  title: "All Online Courses | COP-CMS",
  description: "Browse all available online degree programs across different categories like PG, UG, and more.",
};

export default async function OnlineCoursesRoute() {
  let degreeTypes = [];
  let courses = [];

  try {
    [degreeTypes, courses] = await Promise.all([
      getDegreeTypes(),
      getCourses(),
    ]);
  } catch (err) {
    console.error("Failed to load clinical/academic course data:", err);
  }

  return (
    <OnlineCoursesPage 
      degreeTypes={degreeTypes} 
      courses={courses} 
    />
  );
}

