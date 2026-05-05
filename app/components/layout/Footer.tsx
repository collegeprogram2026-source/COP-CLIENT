"use client";

import React from "react";
import Link from "next/link";
import { IconMapPin, IconMail, IconPhone } from '@tabler/icons-react';
export default function Footer() {
  const usefulLinks = [
    { label: "Courses", href: "/explore-programs" },
    { label: "Online Courses", href: "online-courses" },
    { label: "Top Universities", href: "universities" },
    { label: "Blogs", href: "articles" },
    { label: "Compare Universities", href: "compareUniversities" },
  ];

  const toolLinks = [
    { label: "Compare Universities", href: "compareUniversities" },
    { label: "Talk to Expert", href: "#talk-to-expert" },
  ];

  const pgPrograms = [
    { label: "Online MBA", href: "#" },
    { label: "Online MCA", href: "#" },
    { label: "Dual MBA", href: "#" },
    { label: "Online BBA + MBA", href: "#" },
    { label: "1-Year Online MBA", href: "#" },
  ];

  const ugPrograms = [
    { label: "Online BBA", href: "#" },
    { label: "Online BCA", href: "#" },
    { label: "Online BBA", href: "#" },
    { label: "Online BA", href: "#" },
    { label: "Distance BJourn", href: "#" },
  ];

  const doctoratePrograms = [
    { label: "Online DBA", href: "#" },
    { label: "Global DBA", href: "#" },
    { label: "DNP", href: "#" },
    { label: "EdD", href: "#" },
    { label: "MSA + DBA", href: "#" },
  ];

  const executivePrograms = [
    { label: "Executive MBA", href: "#" },
    { label: "Executive DBA", href: "#" },
    { label: "Executive PGDM", href: "#" },
    { label: "Executive PGDM", href: "#" },
    { label: "Executive PGCM", href: "#" },
  ];

  const trendingUniversities = [
    { label: "Amity Online University", href: "#" },
    { label: "Manipal Online", href: "#" },
    { label: "Online Manipal", href: "#" },
    { label: "Jain University Online", href: "#" },
    { label: "Sharda Online University", href: "#" },
    { label: "Chandigarh University", href: "#" },
    { label: "LPU Online", href: "#" },
    { label: "DY Patil Vidyapeeth Online", href: "#" },
    { label: "GP Jindal University", href: "#" },
  ];

  const mbaSpecializations = [
    { label: "HR Management", href: "#" },
    { label: "Marketing Management", href: "#" },
    { label: "Finance Management", href: "#" },
    { label: "Fintech Management", href: "#" },
    { label: "International Business", href: "#" },
    { label: "Project Management", href: "#" },
    { label: "Logistic and Supply Chain", href: "#" },
    { label: "Healthcare Management", href: "#" },
  ];

  const mcaSpecializations = [
    { label: "Artificial Intelligence", href: "#" },
    { label: "Cyber Security", href: "#" },
    { label: "Cloud Computing", href: "#" },
    { label: "Data Science and Analytics", href: "#" },
    { label: "Computer Science and IT", href: "#" },
    { label: "Full Stack Development", href: "#" },
    { label: "Block Chain", href: "#" },
  ];

  const certificationPrograms = [
    { label: "PGCM", href: "#" },
    { label: "Certificate In UX & UX", href: "#" },
    { label: "Certificate In Data Science", href: "#" },
    { label: "Certificate in Project Management", href: "#" },
    { label: "Certificate in Tech Mining & NLP", href: "#" },
    { label: "Certificate in Big Data Analytics", href: "#" },
    { label: "Certificate in Financial Analytics", href: "#" },
    { label: "Certificate in Financial Analytics", href: "#" },
  ];

  const ChevronIcon = () => (
    <svg className="w-2.5 h-2.5 text-[#6366F1] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );

  return (
    <footer className="relative w-full text-white bg-[#0D1B2E] overflow-hidden">


      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pt-16 pb-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="flex flex-col">
            <div className="mb-6">
              <img src="/logo.png" alt="CollegeProgram logo" className="h-16 w-auto object-contain -ml-2" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Discover a world of knowledge and opportunities
              with our online education platform pursue a new
              career.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <IconMapPin stroke={2} color="#7C3AED" />
                <span className="text-gray-400 text-sm">Hanuman Path, 94, New Sanganer Rd, opp. Metro pillar no,<br />Shyam Nagar, Jaipur, Rajasthan 302019</span>
              </div>
              <div className="flex items-center gap-3">
                <IconPhone stroke={2} color="#7C3AED" />
                <span className="text-gray-400 text-sm">+91 9024357040</span>
              </div>
              <div className="flex items-center gap-3">
                <IconMail stroke={2} color="#7C3AED" />
                <span className="text-gray-400 text-sm">onlinecollegeprogram@gmail.com</span>

              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-8">Useful Links</h3>
            <ul className="space-y-4">
              {usefulLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="flex items-center gap-3 text-gray-400 hover:text-white transition text-sm">
                    <ChevronIcon />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-8 leading-tight">Tools for making informed Choices</h3>
            <ul className="space-y-4">
              {toolLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="flex items-center gap-3 text-gray-400 hover:text-white transition text-sm">
                    <ChevronIcon />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-8">Social Media Links</h3>
            <div className="flex items-center gap-4">
              {[
                { src: "/linkedin.png", alt: "LinkedIn" },
                { src: "/facebook.png", alt: "Facebook" },
                { src: "/instagram.png", alt: "Instagram" },
                { src: "/gmail.png", alt: "Gmail" }
              ].map((icon, i) => (
                <Link key={i} href="#" className="opacity-60 hover:opacity-100 transition-opacity">
                  <img src={icon.src} alt={icon.alt} className="w-8 h-8" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center"
          style={{ backgroundImage: "url('/footerBg.png')" }}
        />
        <div className="border-t border-gray-800 mb-16" />

        {/* Middle Program Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <FooterList title="Popular PG Programs" items={pgPrograms} />
          <FooterList title="Trending UG Programs" items={ugPrograms} />
          <FooterList title="Doctorate Programs" items={doctoratePrograms} />
          <FooterList title="Executive Programs" items={executivePrograms} />
        </div>

        {/* Lower Specialization Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <FooterList title="Trending Online Universities" items={trendingUniversities} />
          <FooterList title="In Demand MBA Specializations" items={mbaSpecializations} />
          <FooterList title="In Demand MCA Specializations" items={mcaSpecializations} />
          <FooterList title="Top Certification Programs" items={certificationPrograms} />
        </div>

      </div>

      {/* Bottom Disclaimer & Copyright Section */}
      <div className="relative z-10 w-full border-t border-gray-800/50 pt-10 pb-10">
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto px-6">
          <p className="text-gray-300 text-xs font-bold mb-6">
            Disclaimer: Terms and Conditions / Our Policy
          </p>
          <p className="text-gray-500 text-[11px] leading-relaxed mb-10 px-4 md:px-10">
            CollegeSathi aims to provide unbiased and precise information to aspirants, along with comparative guidance on universities and their programs. The content on the website, including rankings, is for general informational and educational purposes only and should not be considered a substitute for official information provided by academic partners. While we make every effort to keep the information accurate and up to date, CollegeSathi does not guarantee the completeness or reliability of the content and is not responsible for any errors, omissions, or results stemming from its use.
          </p>

          <div className="flex flex-col items-center gap-1 text-[11px] text-gray-500">
            <p>© 2026 CollegeProgram.2026. All Rights Reserved</p>
            <p className="flex items-center gap-2">
              Design & Developed by 
              <Link href="https://www.supercx.co/" target="_blank" rel="noopener noreferrer">
                <img src="/supercxLogo.png" alt="SuperCX" className="h-6 w-auto hover:opacity-80 transition-opacity" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-bold text-sm text-white mb-6 uppercase tracking-wider">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i}>
            <Link href={item.href} className="text-gray-400 hover:text-white transition-colors text-[13px]">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
