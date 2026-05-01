import React from "react";
import { TrendingUp } from "lucide-react";

interface TrendingBadgeProps {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function TrendingBadge({
  className = "",
  children = "Trending",
  icon = <TrendingUp className="w-3.5 h-3.5 stroke-[3]" />,
}: TrendingBadgeProps) {
  return (
    <div
      className={`
        inline-flex items-center gap-1.5 px-4 py-1 rounded-full
        bg-purple-600/30 backdrop-blur-lg border border-white/20
        shadow-[0_8px_32px_rgba(124,58,237,0.25)]
        text-white font-semibold text-[13px]
        ${className}
      `}
    >
      {icon}
      <span className={icon ? "mb-0.5" : ""}>{children}</span>
    </div>
  );
}
