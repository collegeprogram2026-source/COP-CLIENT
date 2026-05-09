"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  GraduationCap,
  MessageSquare,
  School
} from "lucide-react";

const MobileDock = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/explore-programs", icon: GraduationCap },
    { label: "Universities", href: "/universities", icon: School },
    { label: "Search", href: "/search", icon: Search },

  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[80%] max-w-[420px]">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="backdrop-blur-[20px] border border-white/20 shadow-[0_15px_35px_rgba(80,30,160,0.4)] rounded-full px-3 py-2 flex items-center justify-between relative overflow-hidden"
        style={{
          background: "linear-gradient(90deg, rgba(124, 58, 237, 0.9) 0%, rgba(139, 92, 246, 0.9) 50%, rgba(109, 40, 217, 0.9) 100%)",
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex flex-col items-center justify-center flex-1  transition-all duration-300 outline-none"
            >
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${isActive ? "bg-white/20" : "hover:bg-white/5"
                    }`}
                >
                  {/* Sliding Active Background (Circle) */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white/20 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    className="text-white drop-shadow-sm"
                  />
                </div>

                <span className={`text-[10px] font-bold text-white leading-none transition-all duration-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-80 scale-95"}`}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MobileDock;
