"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: [
      {
        text: 'By accessing and using the CollegeProgram website ("Platform"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our Platform.',
      },
      {
        text: "These terms apply to all visitors, users, and others who access or use the Platform. By using the Platform, you represent that you are at least 18 years of age or have obtained parental or guardian consent to use the Platform.",
      },
    ],
  },
  {
    id: "services",
    title: "2. Description of Services",
    content: [
      {
        text: "CollegeProgram provides an online education platform that offers information about universities, courses, programs, and related educational services. Our services include but are not limited to:",
      },
      {
        list: [
          "University and course comparison tools",
          "Program information and fee details",
          "Expert counseling and guidance services",
          "Student reviews and ratings",
          "Application assistance and admission support",
        ],
      },
      {
        text: "We act as an information aggregator and facilitator. The actual educational programs are offered by partner universities and institutions.",
      },
    ],
  },
  {
    id: "accounts",
    title: "3. User Accounts & Registration",
    content: [
      {
        text: "To access certain features of our Platform, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.",
      },
      {
        text: "You are responsible for safeguarding the password that you use to access the Platform and for any activities or actions under your password. You agree not to disclose your password to any third party.",
      },
      {
        text: "CollegeProgram reserves the right to suspend or terminate your account if any information provided proves to be inaccurate, not current, or incomplete.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "4. Content & Intellectual Property",
    content: [
      {
        text: "All content on the Platform, including text, graphics, logos, images, audio clips, video clips, data compilations, and software, is the property of CollegeProgram or its content suppliers and is protected by intellectual property laws.",
      },
      {
        text: "You may not reproduce, distribute, modify, create derivative works of, publicly display, or in any way exploit any of the content on our Platform without prior written consent from CollegeProgram.",
      },
      {
        text: "User-generated content, such as reviews and comments, remains the property of the respective users. However, by posting content on our Platform, you grant CollegeProgram a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content in connection with our services.",
      },
    ],
  },
  {
    id: "accuracy",
    title: "5. Accuracy of Information",
    content: [
      {
        text: "While we strive to provide accurate and up-to-date information about universities, courses, fees, and other educational details, CollegeProgram does not guarantee the completeness, reliability, or accuracy of this information.",
      },
      {
        text: "All fee structures, program details, eligibility criteria, and other specifics mentioned on our Platform are sourced from partner universities and are subject to change without prior notice. Users are advised to verify details directly with the respective institutions before making any decisions.",
      },
      {
        text: "Rankings and comparisons provided on the Platform are based on our proprietary methodology and should be used as general guidance only.",
      },
    ],
  },
  {
    id: "third-party",
    title: "6. Third-Party Links & Services",
    content: [
      {
        text: "Our Platform may contain links to third-party websites or services that are not owned or controlled by CollegeProgram. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.",
      },
      {
        text: "CollegeProgram does not endorse or assume any responsibility for any such third-party sites, information, materials, products, or services. If you access any third-party website from our Platform, you do so at your own risk.",
      },
    ],
  },
  {
    id: "privacy",
    title: "7. Privacy & Data Protection",
    content: [
      {
        text: "Your use of the Platform is also governed by our Privacy Policy. By using the Platform, you consent to the collection, use, and sharing of your information as described in our Privacy Policy.",
      },
      {
        text: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage.",
      },
    ],
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    content: [
      {
        text: "To the maximum extent permitted by applicable law, CollegeProgram shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, or other intangible losses.",
      },
      {
        text: "CollegeProgram is not responsible for any decisions made based on the information provided on the Platform. Users should exercise their own judgment and conduct independent research before making educational or financial decisions.",
      },
      {
        text: "In no event shall CollegeProgram's total liability to you for all damages, losses, and causes of action exceed the amount paid by you, if any, for accessing the Platform.",
      },
    ],
  },
  {
    id: "prohibited",
    title: "9. Prohibited Activities",
    content: [
      {
        text: "Users are prohibited from:",
      },
      {
        list: [
          "Using the Platform for any unlawful purpose or in violation of any applicable laws",
          "Attempting to gain unauthorized access to the Platform, user accounts, or computer systems",
          "Interfering with or disrupting the integrity or performance of the Platform",
          "Posting false, misleading, or fraudulent content",
          "Scraping, data mining, or extracting data from the Platform without permission",
          "Using automated systems (bots) to access the Platform",
          "Impersonating any person or entity or falsely stating or misrepresenting your affiliation",
        ],
      },
    ],
  },
  {
    id: "modifications",
    title: "10. Modifications to Terms",
    content: [
      {
        text: 'CollegeProgram reserves the right to modify or replace these Terms at any time at our sole discretion. We will notify users of any material changes by posting the updated terms on this page and updating the "Last Updated" date.',
      },
      {
        text: "Your continued use of the Platform after any such changes constitutes your acceptance of the new Terms. If you do not agree to the new terms, please stop using the Platform.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "11. Governing Law & Dispute Resolution",
    content: [
      {
        text: "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan.",
      },
      {
        text: "In the event of any dispute, the parties shall first attempt to resolve it through good-faith negotiation. If the dispute cannot be resolved through negotiation, it shall be submitted to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996.",
      },
    ],
  },
  {
    id: "contact",
    title: "12. Contact Information",
    content: [
      {
        text: "If you have any questions about these Terms and Conditions, please contact us:",
      },
      {
        list: [
          "Email: onlinecollegeprogram@gmail.com",
          "Phone: +91 9024357040",
          "Address: Hanuman Path, 94, New Sanganer Rd, opp. Metro pillar no, Shyam Nagar, Jaipur, Rajasthan 302019",
        ],
      },
    ],
  },
];

export default function TermsAndConditionsPage() {
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
            <span className="text-[#9810FA] font-semibold cursor-pointer">Terms & Conditions</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl">
            This Terms & Conditions includes important information about your usage of our platform and we encourage you to read it carefully.
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
