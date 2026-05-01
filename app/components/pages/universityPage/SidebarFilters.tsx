import { IconChevronLeft, IconSearch, IconAdjustmentsHorizontal, IconChevronDown, IconChartBar, IconFlame } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SidebarFiltersProps {
  selectedToCompare?: string[];
  onSearchChange: (term: string) => void;
  onFilterChange: (providerIds: string[] | null) => void;
  selectedSort?: string | null;
  onSelectSort?: (sort: string | null) => void;
}

interface ProviderCourse {
  _id: string;
  providerId: any;
  degreeTypeId: any;
  courseId: any;
  specializationId: any;
  title: string;
}

export default function SidebarFilters({
  selectedToCompare = [],
  onSearchChange,
  onFilterChange,
  selectedSort = null,
  onSelectSort
}: SidebarFiltersProps) {
  const router = useRouter();
  const [courses, setCourses] = useState<ProviderCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [courseSearch, setCourseSearch] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const [response] = await Promise.all([
          fetch(`${apiUrl}/api/public/provider-courses`),
          new Promise((resolve) => setTimeout(resolve, 1500)),
        ]);
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Get unique categories (Degree Types)
  const categories = Array.from(new Set(courses.map(c => c.degreeTypeId?.name))).filter(Boolean);

  // Get courses for selected category
  const filteredCourses = courses.filter(c =>
    (!selectedCategory || c.degreeTypeId?.name === selectedCategory) &&
    (c.title.toLowerCase().includes(courseSearch.toLowerCase()))
  );

  // Group by title to show unique courses in the sidebar
  const uniqueCourses = Array.from(new Map(filteredCourses.map(c => [c.title, c])).values());

  const handleCourseClick = (courseTitle: string) => {
    if (selectedCourseId === courseTitle) {
      setSelectedCourseId(null);
      onFilterChange(null);
    } else {
      setSelectedCourseId(courseTitle);
      const providerIds = courses
        .filter(c => c.title === courseTitle)
        .map(c => c.providerId?._id)
        .filter(Boolean);
      onFilterChange(providerIds);
    }
  };

  const displayedCourses = showAll ? uniqueCourses : uniqueCourses.slice(0, 6);

  if (loading) {
    return (
      <aside className="w-full lg:w-[340px] shrink-0">
        <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F3F4F6] animate-pulse">
          <div className="h-8 w-24 bg-gray-100 rounded mb-4"></div>
          <div className="h-4 w-40 bg-gray-50 rounded mb-8"></div>
          <div className="h-12 w-full bg-gray-100 rounded-xl mb-6"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-14 w-full bg-gray-50 rounded-xl"></div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full lg:w-[340px] shrink-0 space-y-6 self-start h-fit">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden w-full flex items-center justify-center gap-2 h-[56px] rounded-[14px] border-2 border-[#7C3AED] text-[#7C3AED] font-bold text-[16px] bg-white transition-all active:scale-95 shadow-sm"
      >
        <IconAdjustmentsHorizontal className="w-6 h-6" stroke={2.5} />
        <span>Filters</span>
        <IconChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMobileOpen ? 'rotate-180' : ''}`} stroke={3} />
      </button>

      <div className={`${isMobileOpen ? 'block' : 'hidden'} lg:block space-y-6 animate-in fade-in slide-in-from-top-4 duration-300`}>
        <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F3F4F6]">
          <h2 className="text-[20px] lg:text-[20px] font-bold mb-2 text-[#0F172A] text-center lg:text-left">Explore Elite Universities</h2>
          <p className="text-[14px] lg:text-[16px] text-[#94A3B8] mb-6 text-center lg:text-left">Course & Specializations</p>

          {/* University Search */}
          <div className="relative mb-4 lg:mb-6">
            <input
              type="text"
              placeholder="Search university here..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-[52px] lg:h-[56px] pl-12 pr-4 rounded-[14px] border border-[#E2E8F0] outline-none focus:border-[#7C3AED] transition-all text-[15px] placeholder:text-[#94A3B8]"
            />
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" stroke={2} />
          </div>

          {!selectedCategory ? (
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="w-full flex items-center justify-between p-4 px-5 rounded-[14px] border border-[#F1F5F9] bg-white hover:border-[#7C3AED] hover:bg-[#F5F3FF] transition-all group"
                >
                  <span className="text-[16px] font-semibold text-[#475569] group-hover:text-[#7C3AED]">{cat}</span>
                  <IconChevronLeft className="w-5 h-5 text-[#94A3B8] rotate-180" stroke={2.5} />
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedCourseId(null);
                  onFilterChange(null);
                }}
                className="flex items-center gap-2 text-[18px] font-bold text-[#0F172A] hover:text-[#7C3AED] transition-colors mb-4"
              >
                <IconChevronLeft className="w-6 h-6" stroke={3} />
                {selectedCategory}
              </button>

              {/* Course Search */}
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Search university here..."
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  className="w-full h-[52px] lg:h-[56px] pl-12 pr-4 rounded-[14px] border border-[#E2E8F0] outline-none focus:border-[#7C3AED] transition-all text-[15px] placeholder:text-[#94A3B8]"
                />
                <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" stroke={2} />
              </div>

              <div className="space-y-3">
                {displayedCourses.map((course) => (
                  <button
                    key={course._id}
                    onClick={() => handleCourseClick(course.title)}
                    className={`w-full text-left p-4 px-5 rounded-[14px] border transition-all text-[15px] font-semibold ${selectedCourseId === course.title
                      ? "bg-[#F5F3FF] border-[#E9D5FF] text-[#9333EA]"
                      : "bg-white border-[#F1F5F9] text-[#475569] hover:border-[#E9D5FF] hover:bg-[#F5F3FF]"
                      }`}
                  >
                    {course.title}
                  </button>
                ))}
              </div>

              {uniqueCourses.length > 6 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-[15px] font-bold text-[#475569] hover:text-[#0F172A] transition-colors mt-2"
                >
                  {showAll ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}

          {selectedToCompare.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#F1F5F9]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#0F172A]">Compare Universities</h3>
                <span className="text-sm font-medium text-[#64748B]">
                  {selectedToCompare.length} selected
                </span>
              </div>
              <button
                onClick={() => router.push(`/compareUniversities?ids=${selectedToCompare.join(',')}`)}
                disabled={selectedToCompare.length < 2}
                className={`w-full font-bold py-4 rounded-[14px] transition-all flex justify-center items-center gap-2 ${selectedToCompare.length >= 2
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white hover:scale-[1.02] shadow-lg shadow-purple-200'
                  : 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed border border-[#E2E8F0]'
                  }`}
              >
                {selectedToCompare.length < 2 ? 'Select 2 to Compare' : 'Compare Now'}
              </button>
            </div>
          )}
        </div>

        {/* Sort Section */}
        <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F3F4F6]">
          <h3 className="text-xl font-bold mb-6 text-gray-900">Sort</h3>
          <div className="space-y-3">
            <button
              onClick={() => onSelectSort?.(null)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${selectedSort === null
                ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200"
                : "bg-white text-gray-700 border-gray-100 hover:bg-purple-50 hover:border-purple-200"
                }`}
            >
              <span className={selectedSort === null ? "text-white" : "text-purple-600"}>
                <IconAdjustmentsHorizontal className="w-5 h-5" />
              </span>
              <span className="font-semibold">Default</span>
            </button>

            <button
              onClick={() => onSelectSort?.("roi")}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${selectedSort === "roi"
                ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200"
                : "bg-white text-gray-700 border-gray-100 hover:bg-purple-50 hover:border-purple-200"
                }`}
            >
              <span className={selectedSort === "roi" ? "text-white" : "text-purple-600"}>
                <IconChartBar className="w-5 h-5" />
              </span>
              <span className="font-semibold">Best ROI</span>
            </button>

            <button
              onClick={() => onSelectSort?.("trending")}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${selectedSort === "trending"
                ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200"
                : "bg-white text-gray-700 border-gray-100 hover:bg-purple-50 hover:border-purple-200"
                }`}
            >
              <span className={selectedSort === "trending" ? "text-white" : "text-purple-600"}>
                <IconFlame className="w-5 h-5" />
              </span>
              <span className="font-semibold">Trending</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
