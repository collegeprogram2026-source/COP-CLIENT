"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const sections = [
  {
    id: "general",
    title: "1. General Information Disclaimer",
    content: [
      {
        text: 'The information provided by Curioquest Academy ("we," "us," or "our") through its CollegeProgram platform (UDYAM Registration No. UDYAM-RJ-17-0451532) is for general informational and educational purposes only.',
      },
      {
        text: "All information on the Platform is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Platform.",
      },
    ],
  },
  {
    id: "accuracy",
    title: "2. Information Accuracy",
    content: [
      {
        text: "While we make every effort to keep the information accurate and up-to-date, educational details such as fee structures, program durations, eligibility criteria, and university rankings are sourced from third-party institutions and are subject to change without prior notice.",
      },
      {
        text: "Curioquest Academy does not guarantee that the information on the CollegeProgram platform is error-free or that it reflects the most current changes made by our academic partners. Users are strongly advised to verify all details directly with the respective universities or institutions before making any educational or financial commitments.",
      },
    ],
  },
  {
    id: "professional-advice",
    title: "3. Professional Advice Disclaimer",
    content: [
      {
        text: "The Platform cannot and does not contain professional educational or career advice. The educational and career information is provided for general informational and educational purposes only and is not a substitute for professional advice.",
      },
      {
        text: "Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We provide expert counseling services, but the final decision remains the responsibility of the user.",
      },
      {
        text: "The use or reliance of any information contained on the Platform is solely at your own risk.",
      },
    ],
  },
  {
    id: "external-links",
    title: "4. External Links Disclaimer",
    content: [
      {
        text: "The Platform may contain (or you may be sent through the Platform) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.",
      },
      {
        text: "We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the Platform. We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services.",
      },
    ],
  },
  {
    id: "liability",
    title: "5. Limitation of Liability",
    content: [
      {
        text: "In no event shall Curioquest Academy be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence, or other tort, arising out of or in connection with the use of the CollegeProgram platform or its contents.",
      },
      {
        text: "Curioquest Academy reserves the right to make additions, deletions, or modifications to the contents on the Platform at any time without prior notice.",
      },
    ],
  },
  {
    id: "contact",
    title: "6. Contact Us",
    content: [
      {
        text: "If you have any questions regarding this Disclaimer, please reach out to us:",
      },
      {
        list: [
          "Email: onlinecollegeprogram@gmail.com",
          "Phone: +91 9024357040",
          "Address: Hanuman Path, 94, New Sanganer Rd, Jaipur, Rajasthan 302019",
        ],
      },
    ],
  },
];

export default function DisclaimerPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileTocOpen(false);
    const el = sectionRefs.current[id];
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-[#9810FA] mb-6">
            <Link href="/" className="hover:text-[#7C3AED] transition-colors cursor-pointer">
              Home
            </Link>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-[#9810FA] font-semibold cursor-pointer">Disclaimer</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Disclaimer
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl">
            This Disclaimer page outlines our policies regarding the accuracy and reliability of the information provided on our Platform.
          </p>
          <p className="text-gray-400 text-xs mt-3 font-semibold">
            Last updated on 05 May 2026
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar — Table of Contents */}
          <aside className="w-full lg:w-[280px] shrink-0">
            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
              className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 mb-4"
            >
              <span>Table of Contents</span>
              <svg
                className={`w-4 h-4 transition-transform ${isMobileTocOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            <nav className={`lg:sticky lg:top-24 ${isMobileTocOpen ? "block" : "hidden"} lg:block`}>
              <ul className="space-y-0.5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-2.5 text-[13px] font-medium rounded-lg transition-all cursor-pointer border-l-[3px] ${
                        activeSection === section.id
                          ? "border-l-[#7C3AED] text-[#7C3AED] bg-purple-50/60 font-bold"
                          : "border-l-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="space-y-10 md:space-y-12">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  ref={(el) => { sectionRefs.current[section.id] = el; }}
                  className="scroll-mt-28"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 tracking-tight">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.content.map((block, bIdx) => {
                      if ("list" in block) {
                        return (
                          <ul key={bIdx} className="space-y-2.5 pl-1">
                            {block.list!.map((item, lIdx) => (
                              <li key={lIdx} className="flex items-start gap-3 text-gray-600 text-[15px] leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={bIdx} className="text-gray-600 text-[15px] leading-[1.8]">
                          {block.text}
                        </p>
                      );
                    })}
                  </div>
                  {/* Divider */}
                  <div className="border-b border-gray-100 mt-10 md:mt-12" />
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
