"use client";

import React, { useState, useMemo } from "react";
import { SectionContent, DegreeType, Course, Specialization } from "@/app/lib/types";
import { IconArrowLeft, IconZoom } from '@tabler/icons-react';
import SectionRenderer from "@/app/components/SectionRenderer";
import SidebarFilters from "./SidebarFilters";
import ProgramCard from "./ProgramCard";
import Link from "next/link";
import TalkToCounselor from "../../talkToCounselor";
import CompactUniversityCard from "./CompactUniversityCard";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getAllProviderCourses } from "@/app/lib/api";
import { ProviderCourse } from "@/app/lib/types";

interface ExploreProgramsPageProps {
  sections: SectionContent[];
  degreeTypes: DegreeType[];
  courses: Course[];
  specializations: Specialization[];
  initialType?: string;
  initialCourse?: string;
  initialSpecialization?: string;
}

export default function ExploreProgramsPage({
  sections,
  degreeTypes,
  courses,
  specializations,
  initialType,
  initialCourse,
  initialSpecialization,
}: ExploreProgramsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedDegreeTypeId, setSelectedDegreeTypeId] = React.useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = React.useState<string | null>(null);
  const [selectedSpecializationId, setSelectedSpecializationId] = React.useState<string | null>(null);
  const [providerCoursesList, setProviderCoursesList] = React.useState<ProviderCourse[]>([]);
  const [isLoadingProviders, setIsLoadingProviders] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedToCompare, setSelectedToCompare] = React.useState<string[]>([]);
  const [selectedSort, setSelectedSort] = React.useState<string | null>(null);

  // Load selection from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('selectedToCompare');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSelectedToCompare(parsed);
        }
      } catch (e) {
        console.error("Failed to parse selectedToCompare", e);
      }
    }
  }, []);

  // Save selection to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('selectedToCompare', JSON.stringify(selectedToCompare));
  }, [selectedToCompare]);

  const handleToggleCompare = (id: string) => {
    if (selectedToCompare.includes(id)) {
      setSelectedToCompare(selectedToCompare.filter((c) => c !== id));
    } else {
      if (selectedToCompare.length < 4) {
        setSelectedToCompare([...selectedToCompare, id]);
      }
    }
  };

  const updateQueryParams = React.useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) params.delete(key);
      else params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  React.useEffect(() => {
    if (initialType && degreeTypes.length > 0) {
      const match = degreeTypes.find((dt) => {
        const type = initialType.toLowerCase();
        const name = dt.name.toLowerCase();
        const slug = dt.slug?.toLowerCase() || "";

        return (
          slug === type ||
          name.includes(type) ||
          type.includes(name) ||
          (type === "pg" && (name.includes("post graduate") || name.startsWith("master"))) ||
          (type === "ug" && (name.includes("under graduate") || name.startsWith("bachelor")))
        );
      });
      if (match) {
        setSelectedDegreeTypeId(match._id);
      }
    } else if (!initialType) {
      setSelectedDegreeTypeId(null);
    }

    if (initialCourse && courses.length > 0) {
      const match = courses.find((c) => c.slug === initialCourse || c._id === initialCourse);
      if (match) {
        setSelectedCourseId(match._id);
        const dId = typeof match.degreeTypeId === "string" ? match.degreeTypeId : match.degreeTypeId?._id;
        if (dId) setSelectedDegreeTypeId(dId);
      }
    } else if (!initialCourse) {
      setSelectedCourseId(null);
    }

    if (initialSpecialization) {
      setSelectedSpecializationId(initialSpecialization);
      // Automatically load provider courses if spec is in URL
      const loadProviderCourses = async () => {
        setIsLoadingProviders(true);
        try {
          const data = await getAllProviderCourses(initialSpecialization);
          setProviderCoursesList(data);
        } catch (err) {
          console.error("Failed to load provider courses:", err);
        } finally {
          setIsLoadingProviders(false);
        }
      };
      loadProviderCourses();
    } else {
      setProviderCoursesList([]);
      setSelectedSpecializationId(null);
    }

    // Load sort from URL
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setSelectedSort(sortParam);
    } else {
      setSelectedSort(null);
    }
  }, [initialType, initialCourse, initialSpecialization, degreeTypes, courses, specializations, searchParams]);

  const filteredCourses = useMemo(() => {
    let list = courses;
    if (selectedDegreeTypeId) {
      list = list.filter((c) => {
        const dId = typeof c.degreeTypeId === "string" ? c.degreeTypeId : c.degreeTypeId?.["_id"];
        return dId === selectedDegreeTypeId;
      });
    }
    if (searchQuery) {
      list = list.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return list;
  }, [courses, selectedDegreeTypeId, searchQuery]);

  const filteredSpecializations = useMemo(() => {
    let list = [...specializations];
    if (selectedCourseId) {
      list = list.filter((s) => {
        const cId = typeof s.courseId === "string" ? s.courseId : s.courseId?.["_id"];
        return cId === selectedCourseId;
      });
    } else if (selectedDegreeTypeId) {
      // Filter by degree type indirectly
      list = list.filter((s) => {
        const course = typeof s.courseId === "string" ? courses.find(c => c._id === s.courseId) : s.courseId as Course;
        const dId = typeof course?.degreeTypeId === "string" ? course.degreeTypeId : course?.degreeTypeId?.["_id"];
        return dId === selectedDegreeTypeId;
      });
    }
    if (searchQuery) {
      list = list.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedSort === "trending") {
      list.sort((a, b) => (b.providerCount || 0) - (a.providerCount || 0));
    } else if (selectedSort === "roi") {
      // Sort by name as placeholder for ROI if no better metric
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [specializations, selectedCourseId, selectedDegreeTypeId, searchQuery, courses, selectedSort]);

  const filteredProviderCourses = useMemo(() => {
    let list = [...providerCoursesList];
    if (searchQuery) {
      list = list.filter((pc) => {
        const providerName = (pc.providerId as any)?.name || "";
        return providerName.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    if (selectedSort === "roi") {
      list.sort((a, b) => {
        const feeA = a.minFees || a.fees || Number.MAX_SAFE_INTEGER;
        const feeB = b.minFees || b.fees || Number.MAX_SAFE_INTEGER;
        return feeA - feeB;
      });
    } else if (selectedSort === "trending") {
      list.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
    }

    return list;
  }, [providerCoursesList, searchQuery, selectedSort]);

  const isSpecializationView = !!selectedCourseId && !selectedSpecializationId;
  const isUniversityView = !!selectedSpecializationId;

  const handleBack = () => {
    setSearchQuery("");
    if (selectedSpecializationId) {
      updateQueryParams({ spec: null });
    } else if (selectedCourseId) {
      updateQueryParams({ course: null });
    } else if (selectedDegreeTypeId) {
      updateQueryParams({ type: null });
    } else {
      router.back();
    }
  };

  const handleSpecializationClick = async (specId: string) => {
    updateQueryParams({ spec: specId });
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] pt-7">
      {/* Hero / Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[87vw] mx-auto  py-8">
          {(isSpecializationView || isUniversityView) ? (
            <button
              onClick={handleBack}
              className="flex items-center cursor-pointer text-xl font-bold text-purple-600 mb-4 hover:text-purple-700 transition-colors"
            >
              <IconArrowLeft stroke={2} size={25} />
              {isUniversityView ? "Back to Specializations" : "Back to Programs"}
            </button>
          ) : (
            <Link
              href="/"
              className="flex items-center cursor-pointer text-xl font-bold text-purple-600 mb-4 hover:text-purple-700 transition-colors"
            >
              <IconArrowLeft stroke={2} size={25} />
              Back to Home
            </Link>
          )}

          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
            {isUniversityView
              ? `Universities for ${specializations.find(s => s._id === selectedSpecializationId)?.name || "Specialization"}`
              : isSpecializationView
                ? "Explore By Specializations"
                : "Explore Programs"}
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            {isUniversityView
              ? "Browse through top universities offering your chosen specialization"
              : isSpecializationView
                ? "Choose a specialization to see universities offering it"
                : "Choose a program type to explore specializations and universities"}
          </p>
        </div>
      </div>

      <div className="max-w-[90vw] mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <SidebarFilters
            degreeTypes={degreeTypes}
            selectedDegreeTypeId={selectedDegreeTypeId}
            onSelectDegreeType={(id) => {
              setSelectedDegreeTypeId(id);
              setSelectedCourseId(null);
              setSelectedSpecializationId(null);
              const match = degreeTypes.find(dt => dt._id === id);
              updateQueryParams({ type: match?.slug || id, course: null, spec: null, sort: null });
              setSearchQuery("");
              setSelectedSort(null);
            }}
            selectedSort={selectedSort}
            onSelectSort={(sort) => {
              setSelectedSort(sort);
              updateQueryParams({ sort });
            }}
            showSort={isSpecializationView}
          />

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Search Bar */}
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder={
                  isUniversityView
                    ? "Search universities..."
                    : isSpecializationView
                      ? "Search specializations..."
                      : "Search programs..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-14 pr-6 rounded-2xl border border-[#D1D5DC] bg-white shadow-sm outline-none focus:border-purple-300 transition-all text-lg placeholder:font-semibold"
              />
              <IconZoom className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            </div>

            {/* Grid */}
            <div className={`grid grid-cols-1 ${isUniversityView ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 xl:grid-cols-3"} gap-6`}>
              {isUniversityView ? (
                // Universities View
                isLoadingProviders ? (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center text-center gap-4 animate-pulse w-full">
                        {/* Logo Skeleton */}
                        <div className="h-20 w-32 bg-gray-100 rounded-xl mb-1"></div>
                        
                        {/* Title Skeleton */}
                        <div className="h-10 w-3/4 bg-gray-100 rounded-lg min-h-[2.5rem]"></div>
                        
                        {/* Link Skeleton */}
                        <div className="h-5 w-28 bg-gray-100 rounded-md"></div>
                        
                        {/* Button Skeleton */}
                        <div className="w-full mt-1 h-[46px] bg-gray-100 rounded-xl"></div>
                      </div>
                    ))}
                  </>
                ) : filteredProviderCourses.length > 0 ? (
                  filteredProviderCourses.map((pc) => (
                    <CompactUniversityCard
                      key={pc._id}
                      university={pc.providerId as any} // Cast as Provider
                      courseId={pc._id}
                      isCompare={selectedToCompare.includes((pc.providerId as any)._id)}
                      onToggleCompare={() => handleToggleCompare((pc.providerId as any)._id)}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                    <p className="text-xl font-bold text-gray-400">
                      {searchQuery
                        ? `No universities matching "${searchQuery}"`
                        : "No universities found for this specialization yet."}
                    </p>
                  </div>
                )
              ) : !isSpecializationView ? (
                // Courses View
                filteredCourses.map((course) => (
                  <ProgramCard
                    key={course._id}
                    title={course.name}
                    subtitle={(typeof course.degreeTypeId === 'string' ? '' : course.degreeTypeId?.name) || 'Program'}
                    degreeType={typeof course.degreeTypeId === 'string' ? '' : course.degreeTypeId?.name}
                    count={specializations.filter(s => (typeof s.courseId === 'string' ? s.courseId : s.courseId?._id) === course._id).length}
                    onClick={() => updateQueryParams({ course: course.slug || course._id, spec: null })}
                  />
                ))
              ) : (
                // Specializations View
                filteredSpecializations.map((spec) => (
                  <ProgramCard
                    key={spec._id}
                    variant="specialization"
                    title={spec.name}
                    count={spec.providerCount}
                    onClick={() => handleSpecializationClick(spec._id)}
                  />
                ))
              )}
            </div>

            {/* Banner */}
            <TalkToCounselor isSpecializationView={isSpecializationView} />
          </div>
        </div>
      </div>

      {/* Render CMS sections if any */}
      {/* <SectionRenderer sections={sections} /> */}
    </main>
  );
}
