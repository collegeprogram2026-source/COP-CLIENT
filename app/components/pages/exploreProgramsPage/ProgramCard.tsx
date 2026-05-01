"use client";

import React from "react";
import { IconBrain, IconBook, IconNotebook, IconFileCertificate } from '@tabler/icons-react';

interface ProgramCardProps {
  variant?: "default" | "specialization";
  title: string;
  subtitle?: string;
  count?: number;
  onClick?: () => void;
  degreeType?: string;
}

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600  group-hover:bg-purple-600 group-hover:text-white transition-all">
    {children}
  </div>
);

const getCourseIcon = (degreeType?: string) => {
  const type = degreeType?.toLowerCase() || "";

  if (type.includes("pg") || type.includes("post graduate") || type.includes("master")) {
    return <IconBrain stroke={2} />;
  }
  if (type.includes("ug") || type.includes("under graduate") || type.includes("bachelor")) {
    return <IconBook stroke={2} />;
  }
  if (type.includes("short term")) {
    return <IconNotebook stroke={2} />;
  }
  if (type.includes("mega degree")) {
    return <IconFileCertificate stroke={2} />;
  }

  // Default course icon
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
};

const specIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default function ProgramCard({
  variant = "default",
  title,
  subtitle,
  count,
  onClick,
  degreeType,
}: ProgramCardProps) {
  if (variant === "specialization") {
    return (
      <div
        onClick={onClick}
        className="group bg-[#FFFFFF] rounded-2xl px-4 py-4 border border-[#E5E7EB] shadow-xl hover:border-purple-200 hover:shadow-purple-900/10 transition-all cursor-pointer flex flex-col gap-4"
      >
        <IconWrapper>{specIcon}</IconWrapper>
        <h4 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors text-balance">{title}</h4>

        <div className="space-y-2 ">
          <div className="flex items-center text-sm text-gray-500 font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            2-4 Years
          </div>
          <div className="flex items-center text-sm text-gray-500 font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {count || 0}+ Universities
          </div>
        </div>

        <button className="text-sm font-bold text-purple-600 flex items-center group/btn">
          View Universities
          <svg className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group bg-[#FFFFFF] rounded-2xl px-4 py-4 border border-[#E5E7EB] shadow-xl hover:border-purple-200 hover:shadow-purple-900/10 transition-all cursor-pointer flex flex-col gap-4"
    >
      <IconWrapper>{getCourseIcon(degreeType || subtitle)}</IconWrapper>
      <div>
        <h4 className="text-2xl font-black text-gray-900  group-hover:text-purple-600 transition-colors uppercase tracking-tight">{title}</h4>
        <p className="text-gray-500 font-medium">{subtitle}</p>
      </div>

      <div className="flex items-center w-fit px-4 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm font-bold group-hover:bg-purple-600 group-hover:text-white transition-all">
        {count || 0}+ Specializations
      </div>
    </div>
  );
}

