import React from "react";
import { Provider } from "@/app/lib/types";
import Link from "next/link";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { IconCircleCheck } from '@tabler/icons-react';

interface UniversityCardProps {
  university: Provider;
  isCompare?: boolean;
  onToggleCompare?: () => void;
  isShortlisted?: boolean;
  onToggleShortlist?: () => void;
}

export default function UniversityCard({
  university,
  isCompare,
  onToggleCompare,
  isShortlisted,
  onToggleShortlist
}: UniversityCardProps) {

  const handleShortlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem('studentToken');
    if (!token) {
      toast.error("Please login to shortlist universities");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      if (isShortlisted) {
        const response = await fetch(`${apiUrl}/api/public/student/shortlist/${university._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          toast.success("Removed from shortlist");
          onToggleShortlist?.();
        }
      } else {
        const response = await fetch(`${apiUrl}/api/public/student/shortlist`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            providerId: university._id,
            name: university.name,
            logo: university.logo,
            rating: university.averageRating || 4.2,
            approvals: university.approvals || [],
            startingFee: university.comparison?.feesStartingFrom || 0,
            minimumDuration: university.comparison?.duration || "",
            courses: [],
            states: []
          })
        });

        if (response.ok) {
          toast.success("Added to shortlist");
          onToggleShortlist?.();
        }
      }
    } catch (error) {
      console.error("Shortlist error:", error);
    }
  };
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-purple-900/5 border border-purple-50 group transition-all hover:shadow-2xl hover:shadow-purple-900/10">
      {/* Banner & Badges */}
      <Link href={`/universities/${university.slug}`} className="block relative h-48 sm:h-40 overflow-hidden">
        <img
          src={university.galleryImages?.[0] || "/default-university.jpg"}
          alt={university.name || "University"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Admission Badge */}
        <div className="absolute top-4 right-0 bg-purple-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-l-full shadow-lg transform translate-x-1 group-hover:translate-x-0 transition-transform">
          ADMISSIONS CLOSING SOON
        </div>

        {/* Shortlist Button */}
        <button
          onClick={handleShortlist}
          className="absolute top-4 left-4 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group/heart z-10"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${isShortlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/heart:text-red-500'}`}
          />
        </button>

        {/* Location Badge */}
        <div className="absolute bottom-4 right-4 bg-emerald-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
          {university.location || "Mumbai"}
        </div>

        {/* Logo Overlay */}
        <div className="absolute bottom-4 left-4 w-14 h-14 bg-white rounded-2xl p-2 shadow-xl border border-gray-100">
          <img src={university.logo || "/default-logo.png"} alt="logo" className="w-full h-full object-contain" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start gap-4 mb-3">
          <Link href={`/universities/${university.slug}`}>
            <h3 className="text-xl font-extrabold text-gray-900 leading-[1.2] group-hover:text-purple-700 transition-colors">
              {university.name}
            </h3>
          </Link>
        </div>


        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
            <div className="flex items-center text-amber-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {university.averageRating || 4.2}
              <span className="text-gray-500 font-medium ml-1">
                (620 Reviews)
              </span>
            </span>
          </div>
        </div>

        {/* Highlights - Exactly 2 points as per design */}
        <div className="space-y-2.5 mb-6">
          <div className="flex items-center gap-1 text-[14px] font-medium text-slate-600">
            <div className="shrink-0 w-5 h-5 rounded-full  flex items-center justify-center">
              <IconCircleCheck className="w-6 h-6 text-white" color="#10B981" />
            </div>
            <span className="line-clamp-1">
              {university.facts?.[0]?.text || university.shortExcerpt || "Top Rated Faculty & Curriculum"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[14px] font-medium text-slate-600">
            <div className="shrink-0 w-5 h-5 rounded-full  flex items-center justify-center">
              <IconCircleCheck className="w-6 h-6 text-white" color="#10B981" />
            </div>
            <span className="line-clamp-1">
              {university.approvals && university.approvals.length > 0
                ? university.approvals.map(a => a.name).join(" | ")
                : "NAAC | NIRF | UGC | AICTE Approved"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href={`/universities/${university.slug}`} className="block w-full">
            <button className="w-full bg-gradient-to-r from-[#4F39F6] to-[#9810FA] hover:opacity-90 text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-600/20 active:scale-[0.98] transition-all cursor-pointer text-[15px]">
              View Courses & Fees
            </button>
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onToggleCompare}
              className={`w-full font-bold py-2.5 rounded-xl border active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm ${isCompare
                ? 'bg-purple-50 text-purple-600 border-purple-200'
                : 'bg-white hover:bg-purple-50 text-purple-600 border-purple-200'
                }`}
            >
              {isCompare ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Added
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  Compare
                </>
              )}
            </button>

            <button
              onClick={handleShortlist}
              className={`w-full font-bold py-2.5 rounded-xl border active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm ${isShortlisted
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-white hover:bg-purple-50 text-purple-600 border-purple-600/20'
                }`}
            >
              {isShortlisted ? (
                <>
                  <Heart className="w-4 h-4 fill-current" />
                  Saved
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Shortlist
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
