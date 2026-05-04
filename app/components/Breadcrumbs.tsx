import React from "react";
import Link from "next/link";

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
  className?: string;
}

export const Breadcrumbs = ({ items, className = "" }: BreadcrumbsProps) => {
  return (
    <nav className={`text-md font-semibold text-gray-500 ${className}`}>
      {items.map((crumb, index) => (
        <React.Fragment key={index}>
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-purple-600 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-purple-600">{crumb.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="mx-2 text-purple-600 opacity-50">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
