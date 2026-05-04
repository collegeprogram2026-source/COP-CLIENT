"use client";

import React from "react";
import {
  IconBrain,
  IconBook,
  IconNotebook,
  IconFileCertificate,
  IconBookmarks,
  IconArrowRight,
  IconBuildingBank,
  IconSchool,
} from "@tabler/icons-react";

interface ProgramCardProps {
  variant?: "default" | "specialization";
  title: string;
  subtitle?: string;
  count?: number;
  onClick?: () => void;
  degreeType?: string;
}

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
    {children}
  </div>
);

const getCourseIcon = (degreeType?: string) => {
  const type = degreeType?.toLowerCase() || "";

  if (type.includes("pg") || type.includes("post graduate") || type.includes("master")) {
    return <IconBrain stroke={2} className="w-5 h-5" />;
  }
  if (type.includes("ug") || type.includes("under graduate") || type.includes("bachelor")) {
    return <IconBook stroke={2} className="w-5 h-5" />;
  }
  if (type.includes("short term")) {
    return <IconNotebook stroke={2} className="w-5 h-5" />;
  }
  if (type.includes("mega degree")) {
    return <IconFileCertificate stroke={2} className="w-5 h-5" />;
  }
  return <IconSchool stroke={2} className="w-5 h-5" />;
};

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
        className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col gap-4"
      >
        <IconWrapper>
          <IconBookmarks stroke={2} className="w-5 h-5" />
        </IconWrapper>

        <h4 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors leading-snug text-balance line-clamp-2">
          {title}
        </h4>

        <div className="flex items-center text-sm text-gray-500 font-medium">
          <IconBuildingBank className="w-4 h-4 mr-2 shrink-0" stroke={2} />
          <span>{count || 0}+ Universities</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <span className="text-sm font-bold text-purple-600">View Universities</span>
          <IconArrowRight
            className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform"
            stroke={2.5}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col gap-4"
    >
      <IconWrapper>{getCourseIcon(degreeType || subtitle)}</IconWrapper>

      <div className="space-y-1">
        <h4 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-purple-600 transition-colors tracking-tight leading-tight">
          {title}
        </h4>
        {subtitle && (
          <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center w-fit px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg text-xs font-bold group-hover:bg-purple-600 group-hover:text-white transition-all">
        {count || 0}+ Specializations
      </div>
    </div>
  );
}
