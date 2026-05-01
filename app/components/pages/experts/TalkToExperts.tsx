'use client';

import { Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";
import TalkToExpertsForm from "../../shared/TalkToExpertsForm";

export default function TalkToExperts() {
  // ─── static data ─────────────────────────────────────────────────────────────
  const contactMethods = [
    { icon: <Phone size={20} color="#7C3AED" />, title: "Schedule a Call", subtitle: "Get personalized guidance over phone" },
    { icon: <Mail size={20} color="#7C3AED" />, title: "Email Us", subtitle: "We'll respond within 24 hours" },
    { icon: <MessageCircle size={20} color="#7C3AED" />, title: "Live Chat", subtitle: "Instant answers to your questions" },
  ];
  const benefits = ["Free career counseling", "Course recommendations", "University guidance", "Scholarship information", "EMI & payment options"];
  const experts = [
    { name: "Dr. Priya Sharma", role: "Education Counsellor", exp: "24 yrs", spec: "Technology & Management", img: "/Image (Dr. Priya Sharma).png" },
    { name: "Rajesh Kumar", role: "Admission Advisor", exp: "20 yrs", spec: "Technology & Engineering", img: "/Image (Rahul Mehta).png" },
    { name: "Anjali Verma", role: "Admission Expert", exp: "31 yrs", spec: "Healthcare & Science", img: "/Image (Anita Desai).png" },
  ];
  const programs = ["MBA & Management Programs", "Tech & Data Science", "International Programs"];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          MOBILE LAYOUT  (hidden on md and above)
      ══════════════════════════════════════════════════════════ */}
      <div className="md:hidden" style={{ backgroundColor: "#F3F4F6", minHeight: "100vh", fontFamily: "Inter, sans-serif", paddingTop: 80, overflowX: "hidden" }}>

        {/* 1. CONTACT METHOD CARDS */}
        <div style={{ backgroundColor: "#FFFFFF", padding: "20px 16px 10px" }}>
          {contactMethods.map((m, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 16px", marginBottom: 10,
              backgroundColor: "#FFFFFF", borderRadius: 12,
              border: "1px solid #F3F4F6",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", backgroundColor: "#EDE9FE",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>{m.icon}</div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#101828", margin: 0 }}>{m.title}</p>
                <p style={{ fontSize: 13, color: "#6B7280", margin: "2px 0 0" }}>{m.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. GET IN TOUCH FORM */}
        <div style={{ padding: "10px 16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "20px 16px", marginBottom: 10 }}>
             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#101828", margin: 0 }}>Get In Touch</h2>
              <span style={{ backgroundColor: "#DCFCE7", color: "#16A34A", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#16A34A", display: "inline-block" }} />
                In touch
              </span>
            </div>
            <TalkToExpertsForm source="talk_to_experts" programs={programs} hideHeader={true} />
          </div>
        </div>

        {/* 3. WHAT YOU'LL GET */}
        <div style={{ backgroundColor: "#FFFFFF", margin: "10px 0", padding: "20px 16px 24px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#101828", margin: "0 0 16px" }}>What You'll Get</h2>
          {benefits.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CheckCircle size={13} color="#16A34A" />
              </div>
              <span style={{ fontSize: 14, color: "#374151" }}>{b}</span>
            </div>
          ))}
        </div>

        {/* 4. OUR EXPERT TEAM */}
        <div style={{ backgroundColor: "#FFFFFF", margin: "10px 0", padding: "20px 16px 24px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#101828", margin: "0 0 18px" }}>Our Expert Team</h2>
          {experts.map((ex, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: i < experts.length - 1 ? 18 : 0 }}>
              <img src={ex.img} alt={ex.name} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid #EDE9FE" }} />
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#101828", margin: 0 }}>{ex.name}</p>
                <p style={{ fontSize: 13, color: "#6B7280", margin: "2px 0 3px" }}>{ex.role}</p>
                <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>• {ex.exp} &nbsp;• {ex.spec}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 5. NEED IMMEDIATE HELP CTA */}
        <div style={{ margin: "10px 16px 40px", borderRadius: 16, background: "linear-gradient(135deg, #7C3AED 0%, #9810FA 100%)", padding: "28px 20px 24px", textAlign: "center", color: "#FFFFFF" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <Phone size={24} color="#FFFFFF" />
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>Need Immediate Help?</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", margin: "0 0 18px" }}>Call us directly</p>
          <a href="tel:+1234567890" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#FFFFFF", color: "#7C3AED", padding: "13px 28px", borderRadius: 30, textDecoration: "none", fontWeight: 700, fontSize: 16, boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
            <Phone size={16} color="#7C3AED" />
            +123 456 7890
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          DESKTOP LAYOUT  (hidden below md)
      ══════════════════════════════════════════════════════════ */}
      <section className="hidden md:block" style={{ width: "100%", backgroundColor: "#FFFFFF", paddingTop: "64px", paddingBottom: "64px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: "64px", alignItems: "flex-start" }}>

            {/* ── LEFT ── */}
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h2 style={{ fontFamily: "Inter", fontSize: "48px", fontWeight: 700, lineHeight: "60px", color: "#101828", marginBottom: "16px" }}>
                Talk to our expert counselors
              </h2>
              <p style={{ fontFamily: "Inter", fontSize: "18px", fontWeight: 400, lineHeight: "28px", color: "#4A5565", maxWidth: "546px", marginBottom: "20px" }}>
                Have questions about programs, admissions, or career paths? Fill out the form and our expert counselors will be in touch directly.
              </p>
              <p style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: 700, color: "#101828", marginBottom: "12px" }}>Our office</p>
              <div style={{ marginBottom: "16px", borderRadius: "8px", overflow: "hidden" }}>
                <img src="/Section 5.png" alt="Our office" style={{ width: "100%", height: "auto", borderRadius: "8px", display: "block" }} />
              </div>
              <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 600, color: "#101828", marginBottom: "8px" }}>India</p>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "8px" }}>
                    <img src="/Icon.png" alt="" style={{ width: "16px", height: "16px", marginTop: "2px", flexShrink: 0 }} />
                    <p style={{ fontFamily: "Inter", fontSize: "14px", lineHeight: "20px", color: "#4A5565", whiteSpace: "pre-line", margin: 0 }}>{"123 Education Hub, Sector 5\nBengaluru, Karnataka\n560001"}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <img src="/Icon (2).png" alt="" style={{ width: "16px", height: "16px", flexShrink: 0 }} />
                    <p style={{ fontFamily: "Inter", fontSize: "14px", lineHeight: "20px", color: "#4A5565", margin: 0 }}>+91 80 1234 5678</p>
                  </div>
                </div>
                <div>
                  <p style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 600, color: "#101828", marginBottom: "8px" }}>United States</p>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "8px" }}>
                    <img src="/Icon.png" alt="" style={{ width: "16px", height: "16px", marginTop: "2px", flexShrink: 0 }} />
                    <p style={{ fontFamily: "Inter", fontSize: "14px", lineHeight: "20px", color: "#4A5565", whiteSpace: "pre-line", margin: 0 }}>{"456 Tech Campus Drive\nSan Francisco, CA\n94105"}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <img src="/Icon (2).png" alt="" style={{ width: "16px", height: "16px", flexShrink: 0 }} />
                    <p style={{ fontFamily: "Inter", fontSize: "14px", lineHeight: "20px", color: "#4A5565", margin: 0 }}>+1 415 123 4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: FORM CARD ── */}
            <TalkToExpertsForm source="talk_to_experts" programs={programs} />

          </div>
        </div>
      </section>
    </>
  );
}
