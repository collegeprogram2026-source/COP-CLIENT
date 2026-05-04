'use client';

import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import TalkToExpertsForm from "../../shared/TalkToExpertsForm";

interface Section5Props {
  section: SectionContent;
}

export default function Section5({ section }: Section5Props) {
  const v = section.values || {};

  const get = (aliases: string[], fallback = ""): string => {
    for (const alias of aliases) {
      if (v[alias]) return v[alias];
    }
    return fallback;
  };

  const title      = get(["title", "Title", "Main Title"], "Talk to our expert counselors");
  const desc       = get(["description", "Description", "subtitle"], "Have questions about programs, admissions, or career paths? Fill out the form and our expert counselors will be in touch directly.");
  const officeImg  = get(["officeImage", "Office Image", "image"], "/Section 5.png");
  const indiaAddr   = get(["indiaAddress", "India Address"], "123 Education Hub, Sector 5\nBengaluru, Karnataka\n560001");
  const indiaPhone  = get(["indiaPhone", "India Phone"], "+91 80 1234 5678");
  const usaAddr     = get(["usaAddress", "USA Address"], "456 Tech Campus Drive\nSan Francisco, CA\n94105");
  const usaPhone    = get(["usaPhone", "USA Phone"], "+1 415 123 4567");

  // Programs list from CMS or default
  const defaultPrograms = ["MBA & Management Programs", "Tech & Data Science", "International Programs"];
  let programs = defaultPrograms;
  const progKey = Object.keys(v).find(k => k.toLowerCase().includes("program"));
  if (progKey && Array.isArray(v[progKey])) {
    programs = v[progKey].map((p: any) => (typeof p === "string" ? p : p.name || p.title || String(p)));
  }

  // ─── description paragraph (reused twice) ────────────────────────────────────
  const DescPara = () => (
    <p style={{
      fontFamily: "Inter", fontSize: "clamp(15px, 3.5vw, 18px)", fontWeight: 400, lineHeight: 1.55,
      color: "#4A5565", maxWidth: "546px", marginBottom: "20px"
    }}>
      {richTextToPlain(desc)}
    </p>
  );

  return (
    <section id="contact-experts" style={{ width: "100%", backgroundColor: "#FFFFFF", padding: "clamp(40px, 6vw, 60px) 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 24px)" }}>

        {/* ── MOBILE VERSION (hidden on lg and up) ── */}
        <div className="lg:hidden" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "Inter", fontSize: "clamp(24px, 6vw, 32px)", fontWeight: 700, lineHeight: 1.2, color: "#101828", marginBottom: "16px" }}>{title}</h2>
          <DescPara />
          <div style={{ marginTop: "24px", textAlign: "left" }}>
            <TalkToExpertsForm source="homepage_section5" isHomePage={true} programs={programs} />
          </div>
        </div>

        {/* ── DESKTOP VERSION (hidden on md and down) ── */}
        <div className="hidden lg:flex" style={{ gap: "clamp(32px, 5vw, 64px)", alignItems: "flex-start" }}>

          {/* ── LEFT SIDE ── */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h2 style={{
              fontFamily: "Inter", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700,
              lineHeight: 1.2, color: "#101828", marginBottom: "16px"
            }}>
              {title}
            </h2>
            <DescPara />

            <p style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: 700, color: "#101828", marginBottom: "12px" }}>Our office</p>
            <div style={{ marginBottom: "16px", borderRadius: "8px", overflow: "hidden" }}>
              <img src={officeImg} alt="Our office" style={{ width: "100%", height: "auto", borderRadius: "8px", display: "block" }} />
            </div>

            <div style={{ display: "flex", gap: "clamp(24px, 4vw, 48px)", flexWrap: "wrap" }}>
              {/* India */}
              <div>
                <p style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 600, color: "#101828", marginBottom: "8px" }}>India</p>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "8px" }}>
                  <img src="/Icon.png" alt="" style={{ width: "16px", height: "16px", marginTop: "2px", flexShrink: 0 }} />
                  <p style={{ fontFamily: "Inter", fontSize: "14px", lineHeight: "20px", color: "#4A5565", whiteSpace: "pre-line", margin: 0 }}>
                    {indiaAddr}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <img src="/Icon (2).png" alt="" style={{ width: "16px", height: "16px", flexShrink: 0 }} />
                  <p style={{ fontFamily: "Inter", fontSize: "14px", lineHeight: "20px", color: "#4A5565", margin: 0 }}>{indiaPhone}</p>
                </div>
              </div>

              {/* USA */}
              <div>
                <p style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 600, color: "#101828", marginBottom: "8px" }}>United States</p>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "8px" }}>
                  <img src="/Icon.png" alt="" style={{ width: "16px", height: "16px", marginTop: "2px", flexShrink: 0 }} />
                  <p style={{ fontFamily: "Inter", fontSize: "14px", lineHeight: "20px", color: "#4A5565", whiteSpace: "pre-line", margin: 0 }}>
                    {usaAddr}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <img src="/Icon (2).png" alt="" style={{ width: "16px", height: "16px", flexShrink: 0 }} />
                  <p style={{ fontFamily: "Inter", fontSize: "14px", lineHeight: "20px", color: "#4A5565", margin: 0 }}>{usaPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE: FORM CARD ────────────────────────────────────────── */}
          <TalkToExpertsForm source="homepage_section5" isHomePage={true} programs={programs} />
        </div>
      </div>
      <div id="recaptcha-s5" />
    </section>
  );
}

export const usedFields = [
  "title", "Title",
  "description", "Description",
  "leftImage", "Left Image", "image", "Image",
  "indiaAddress", "India Address",
  "indiaPhone", "India Phone",
  "usaAddress", "USA Address",
  "usaPhone", "USA Phone",
  "sendButton", "Send",
  "verifyButton", "Verify",
  "programs", "Programs", "Program List",
];
