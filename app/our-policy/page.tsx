"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: [
      {
        text: 'Welcome to CollegeProgram, a platform operated by Curioquest Academy (UDYAM Registration No. UDYAM-RJ-17-0451532), as well as its affiliates and subsidiaries (collectively referred to as "we," "our," or "us"). Our objective is to provide secure and reliable services to students, academicians, educational institutions, partners, and other stakeholders through lawful, fair, and transparent processing of personal data.',
      },
      {
        text: "At Curioquest Academy we are committed to protecting and safeguarding the privacy and personal data of all the users of the CollegeProgram platform.",
      },
      {
        text: 'This Privacy Policy ("Policy") describes the manner in which we collect, receive, access, use, process, store, disclose, transfer, and safeguard personal information obtained through our services. This Policy is designed to ensure transparency in our data handling practices and to affirm our commitment to protecting personal information in accordance with applicable data protection, privacy, and information security laws.',
      },
      {
        text: "By accessing or using our services, you acknowledge that you have read, understood, and agreed to the practices described in this Policy.",
      },
    ],
  },
  {
    id: "how-policy-applies",
    title: "2. How This Policy Applies",
    content: [
      {
        subtitle: "(a) Applicability:",
      },
      {
        text: 'This Policy applies to individuals who access or use the Services or otherwise avail the Professional Services. For the avoidance of doubt, references to "you" across this Policy are to an end user that uses the Platform.',
      },
      {
        text: "By using the Platform, you consent to the collection, storage, usage, and disclosure of your personal data, as described in and collected by us in accordance with this Policy.",
      },
      {
        subtitle: "(b) Review and Updates:",
      },
      {
        text: "We regularly review and update our Privacy Policy, and we request you to regularly review this Policy. It is important that the personal data we hold about you is accurate and current. Please let us know if your personal data changes during your relationship with us.",
      },
    ],
  },
  {
    id: "purpose",
    title: "3. Purpose of This Policy",
    content: [
      {
        text: 'The purpose of this Privacy Policy ("Policy") is to provide users with clear and transparent information regarding the categories of Personal Information collected by Curioquest Academy through its CollegeProgram platform, the manner in which such information is collected, processed, and used, the security measures implemented to protect Personal Information, the circumstances under which such information may be disclosed or shared, and the rights available to individuals whose Personal Information is processed.',
      },
      {
        text: 'This Policy applies to all Personal Information collected through our website, as well as any related applications, services, features, content, or digital platforms (collectively referred to as the "Platform").',
      },
    ],
  },
  {
    id: "scope",
    title: "4. Scope and Applicability",
    content: [
      {
        text: "This Policy applies to all users and visitors interacting with the Platform, including but not limited to students and prospective applicants, educational institutions, affiliates and business partners, loan, placement, and marketing partners, and any individual accessing or using our services.",
      },
      {
        text: "This Policy governs the collection, use, storage, processing, and disclosure of personal data by Curioquest Academy in connection with the CollegeProgram platform.",
      },
    ],
  },
  {
    id: "data-collection",
    title: "5. Data We Collect",
    content: [
      {
        text: "We use different methods to collect only such personal information as is necessary, relevant, and proportionate for providing our services and improving user experience. Information may be collected through the following means:",
      },
      {
        subtitle: "A. Information Provided Directly by You",
      },
      {
        list: [
          "Account Registration Information: When registering on the Platform, we may collect full name, email address, gender, location (city, state, country), date of birth, phone number, educational qualifications and academic history, professional or work experience, salary or employment-related information (where applicable).",
          "Communication Information: When you contact us via email, telephone, chat, or online forms, we may retain records of correspondence and associated contact details.",
          "Event Participation Information: Information submitted during registration for seminars, webinars, counselling sessions, or outreach programs may be collected and stored.",
          "Marketing and Affiliate Information: Where users participate in promotional campaigns, testimonials, or affiliate programs, we may collect additional information including PAN details, Aadhaar details (where legally permissible), bank account information, GST registration details, website or business information. Such data shall be collected strictly for contractual, compliance, or payment purposes.",
        ],
      },
      {
        subtitle: "B. Automatically Collected Information",
      },
      {
        list: [
          "Device and Log Information: Each time you visit the Platform, we may automatically collect technical data such as IP address, browsing actions and version, operating system, device identifiers, access timestamps, referring and exit URLs.",
          "Usage Information: We collect information relating to interaction with the Platform, including pages visited, features accessed, navigation patterns and session duration.",
          "Cookies and Tracking Technologies: Cookies and similar technologies are used to enhance functionality, analyse usage patterns, and personalize user experience. Users may manage cookie preferences through browser settings.",
        ],
      },
      {
        subtitle: "C. Information from Third Parties",
      },
      {
        text: "We may receive limited personal information such as name, email address, or phone number from referral programs, marketing partners, service providers or authorized vendors, subject to applicable legal and contractual safeguards.",
      },
    ],
  },
  {
    id: "data-usage",
    title: "6. Processing and Use of Your Personal Data",
    content: [
      {
        text: "We process personal data for lawful and legitimate business purposes, including but not limited to:",
      },
      {
        list: [
          "Providing, operating, and maintaining our services and Platform functionality",
          "Communicating with users regarding services, updates, support, promotions, and relevant offerings",
          "Improving and enhancing our services based on user feedback, behaviour analytics, and usage trends",
          "Engaging and collaborating with trusted service providers, partners, and affiliates for operational purposes",
          "Conducting research, analytics, and development of new products, services, and features",
          "Complying with applicable legal, regulatory, and contractual obligations",
          "Detecting, preventing, and investigating fraud, security incidents, or unauthorized activities",
          "Combining or verifying information obtained from reliable third-party sources for legitimate business and operational purposes",
        ],
      },
      {
        text: "All processing activities shall be undertaken in accordance with applicable laws and based on lawful grounds including consent, contractual necessity, compliance with legal obligations, or legitimate business interests.",
      },
    ],
  },
  {
    id: "communications",
    title: "7. Communication and Notifications",
    content: [
      {
        text: "We may communicate with users through email, SMS, WhatsApp, telephone calls, or other electronic means for purposes including service-related updates and account notifications, customer support and operational communications, newsletters, promotional content, and marketing communications.",
      },
      {
        text: "Users may opt out of promotional or marketing communications at any time by following the unsubscribe instructions provided in such communications or by contacting us at onlinecollegeprogram@gmail.com.",
      },
      {
        text: "Notwithstanding the above, essential service communications, including account alerts, policy updates, or service-related notices, may continue to be sent unless the user deletes or closes their account.",
      },
    ],
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    content: [
      {
        text: "Our Platform is not intended for individuals below the age of eighteen (18) years. We do not knowingly collect or solicit personal data from minors.",
      },
      {
        text: "If we become aware that personal information of a person under 18 years has been collected without lawful authorization, such information shall be promptly deleted from our records.",
      },
    ],
  },
  {
    id: "cookies",
    title: "9. Use of Cookies and Tracking Technologies",
    content: [
      {
        text: "We use cookies and similar tracking technologies to:",
      },
      {
        list: [
          "Analyse Platform usage and performance",
          "Remember user preferences and settings, enhance user experience",
          "Deliver relevant content, recommendations, and advertisements",
        ],
      },
      {
        text: "Users may control or disable cookies through their browser settings. However, disabling cookies may affect certain functionalities of the Platform.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "10. Data Retention",
    content: [
      {
        text: "Personal data shall be retained only for as long as necessary to fulfil the purposes outlined in this Policy or as required under the applicable laws. Illustratively:",
      },
      {
        list: [
          "Account-related information shall be retained until account deactivation or deletion",
          "Communication records may be retained for legal, audit, dispute resolution, or compliance purposes",
          "Upon expiry of the applicable retention period, personal data shall be securely deleted, anonymized, or irreversibly destroyed in accordance with reasonable security practices",
        ],
      },
      {
        text: "If somebody is having an issue with our data collection policies then they can contact our customer care executive through our registered email onlinecollegeprogram@gmail.com and a reasoned reply will be given within a suitable time period. If the consumer is not satisfied with our reply, they can raise a further issue and an option will be provided for permanent deletion of their data from our system.",
      },
    ],
  },
  {
    id: "user-rights",
    title: "11. Your Rights",
    content: [
      {
        text: "In accordance with the Digital Personal Data Protection Act, 2023, users (Data Principals) are entitled to the following rights:",
      },
      {
        list: [
          "Right to Access: To obtain confirmation and access to personal data being processed",
          "Right to Correction and Updating: To request correction of inaccurate or incomplete personal data",
          "Right to Erasure: To request deletion of personal data subject to legal and contractual limitations",
          "Right to Withdraw Consent: To withdraw previously granted consent at any time",
          "Right to Grievance Redressal: To raise complaints regarding processing or misuse of personal data",
          "Right to Nominate: To nominate another individual to exercise rights on their behalf in accordance with law",
        ],
      },
      {
        text: "Requests for exercising these rights may be submitted at: onlinecollegeprogram@gmail.com",
      },
    ],
  },
  {
    id: "user-duties",
    title: "12. User Duties",
    content: [
      {
        text: "As a Data Principal under applicable law, users agree to:",
      },
      {
        list: [
          "Provide accurate, complete, and truthful information",
          "Refrain from impersonating any individual or entity",
          "Avoid submission of false, misleading, or frivolous grievances",
          "Use the Platform in compliance with applicable laws and regulations",
        ],
      },
    ],
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: [
      {
        text: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
      },
      {
        list: [
          "Email: onlinecollegeprogram@gmail.com",
          "Phone: +91 9024357040",
          "Address: Hanuman Path, 94, New Sanganer Rd, opp. Metro pillar no, Shyam Nagar, Jaipur, Rajasthan 302019",
        ],
      },
      {
        text: "We will respond to your inquiry within 30 business days.",
      },
    ],
  },
];

export default function OurPolicyPage() {
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
            <span className="text-[#9810FA] font-semibold cursor-pointer">Our Policy</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Our Policy
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl">
            This Privacy Policy includes important information about your personal data and we encourage you to read it carefully.
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
                      if ("subtitle" in block && block.subtitle) {
                        return (
                          <h3 key={bIdx} className="text-base font-bold text-gray-800 mt-6 mb-2">
                            {block.subtitle}
                          </h3>
                        );
                      }
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
