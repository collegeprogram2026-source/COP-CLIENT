"use client";
import { IconMessage } from '@tabler/icons-react';
import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import { useState, useEffect } from "react";
import Image from "next/image";
import FocusCenterSlider from "./FocusCenterSlider";
import { getReviews, submitReview, getProviders } from "@/app/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

interface Section8Props {
  section: SectionContent;
}

interface ReviewData {
  _id: string;
  name: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  providerId?: {
    name: string;
    logo?: string;
  };
}

export default function Section8({ section }: Section8Props) {
  const v = section.values || {};
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dynamicReviews, setDynamicReviews] = useState<ReviewData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        if (data && data.length > 0) {
          setDynamicReviews(data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const getFieldValue = (aliases: string[], fallback = "") => {
    for (const a of aliases) {
      const key = Object.keys(v).find((k) => k.toLowerCase() === a.toLowerCase());
      if (key) {
        const text = richTextToPlain(v[key]).trim();
        if (text) return text;
      }
    }
    return fallback;
  };

  const pill = getFieldValue(["Pill", "Badge", "pill", "badge"], "STUDENT TESTIMONIALS");
  const mainHeading = getFieldValue(["Main Heading", "Title", "Main Title", "heading"], "Trusted Because We Don't Sell Your Number");
  const belowHeading = getFieldValue(
    ["Below Main Heading", "below main heading", "Subtitle", "Subheading", "Description"],
    "Because we respect your privacy, not exploit it."
  );

  const staticCards = [
    {
      quote: getFieldValue(
        ["First Card", "first card", "Card 1", "card1"],
        "Finally, a platform that doesn't spam! I compared 5 MBAs without a single call. When I was ready, I invited them — and they called exactly when scheduled."
      ),
      name: "Rahul Sharma",
      degree: "MBA Student",
      university: "IIMS",
      avatar: "/Girl.png",
    },
    {
      quote: getFieldValue(
        ["Second Card", "second card", "Card 2", "card2"],
        "The honest downsides section saved me from making a costly mistake. They showed me Manipal's proctored exams wouldn't work with my 12-hour shifts."
      ),
      name: "Priya Nair",
      degree: "MCA Student",
      university: "ALTIUS",
      avatar: "/image 15.png",
    },
    {
      quote: getFieldValue(
        ["Third Card", "third card", "Card 3", "card3"],
        "I was skeptical at first. But no calls, no pressure. Just clean data. When I asked for validation, their expert called in 2 hours — very professional."
      ),
      name: "Aditya Patel",
      degree: "BBA Student",
      university: "LPU",
      avatar: "/Container (40).png",
    },
    {
      quote: getFieldValue(
        ["Fourth Card", "fourth card", "Card 4", "card4"],
        "The comparison tool helped me choose between 3 universities in under an hour. The counselor's follow-up was timely and extremely helpful. Highly recommended!"
      ),
      name: "Sneha Gupta",
      degree: "MBA Student",
      university: "Amity Online",
      avatar: "/Girl.png",
    },
  ];

  const cards = dynamicReviews.length > 0
    ? dynamicReviews.map(r => ({
      quote: r.comment,
      name: r.name,
      degree: r.title,
      university: r.providerId?.name || "Verified Student",
      avatar: r.providerId?.logo || "/Girl.png"
    }))
    : staticCards;

  const totalDots = Math.ceil(cards.length / 4);

  useEffect(() => {
    if (isPaused || totalDots <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalDots);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalDots, isPaused]);

  const prev = () => setActiveSlide((p) => (p - 1 + totalDots) % totalDots);
  const next = () => setActiveSlide((p) => (p + 1) % totalDots);

  return (
    <section style={{ width: "100%", backgroundColor: "#FFFFFF", paddingTop: "clamp(32px,6vw,64px)", paddingBottom: "clamp(32px,6vw,64px)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {/* Pill */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <span
            style={{
              background: "#EEF2FF",
              color: "#4F39F6",
              fontFamily: "Inter",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: "20px",
              letterSpacing: "0.7px",
              textTransform: "uppercase",
              padding: "12px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
            }}
          >
            {pill}
          </span>
        </div>

        {/* Main Heading */}
        <h2
          style={{
            fontFamily: "Inter",
            fontSize: "clamp(22px,5vw,36px)",
            fontWeight: 800,
            lineHeight: "1.2",
            letterSpacing: "0px",
            color: "#101828",
            textAlign: "center",
            margin: "0 0 12px 0",
            padding: "0 16px",
          }}
        >
          {mainHeading}
        </h2>

        {/* Below Heading */}
        <p
          style={{
            fontFamily: "Inter",
            fontSize: 16,
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: "24px",
            color: "#6A7282",
            textAlign: "center",
            margin: "0 0 48px 0",
          }}
        >
          {belowHeading}
        </p>

        {/* Carousel: Cards with overlaid arrows */}
        <div style={{ position: "relative" }}>
          {/* Mobile: focus-center slider */}
          <FocusCenterSlider className="mb-8" interval={5000}>
            {cards.map((card, idx) => (
              <div
                key={`m8-${idx}`}
                style={{ width: '100%', minHeight: 280, borderRadius: 16, border: '1px solid #E5E7EB', backgroundColor: '#fff', padding: '20px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: 48, lineHeight: 1, color: '#E5E7EB', marginBottom: 6, userSelect: 'none' }}>&ldquo;</div>
                  <p style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#374151', margin: 0 }}>{card.quote}</p>
                </div>
                <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', background: '#E5E7EB', flexShrink: 0, position: 'relative' }}>
                    <Image src={card.avatar} alt={card.name} fill sizes="40px" style={{ objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#101828', lineHeight: '20px' }}>{card.name}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: 12, color: '#6B7280', lineHeight: '17px' }}>{card.degree} · {card.university}</div>
                  </div>
                </div>
              </div>
            ))}
          </FocusCenterSlider>

          {/* Desktop: Left Arrow */}
          {totalDots > 1 && (
            <button
              onClick={prev}
              aria-label="Previous"
              className="hidden md:flex hover:bg-gray-50 hover:shadow-md transition-all duration-200"
              style={{
                position: "absolute",
                left: -20,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid #E5E7EB",
                background: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Desktop: Cards Carousel */}
          <div
            className="hidden md:block overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              style={{
                display: "flex",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: `translateX(-${(activeSlide / totalDots) * 100}%)`,
                width: `${totalDots * 100}%`
              }}
            >
              {Array.from({ length: totalDots }).map((_, pageIdx) => (
                <div
                  key={pageIdx}
                  style={{
                    flex: `0 0 ${100 / totalDots}%`,
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "clamp(12px, 1.8vw, 24px)",
                    padding: "10px"
                  }}
                >
                  {cards.slice(pageIdx * 4, pageIdx * 4 + 4).map((card, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderRadius: "16px",
                        padding: "clamp(16px, 2vw, 24px)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                        height: "100%"
                      }}
                    >
                      {/* Quote mark + text */}
                      <div>
                        <div
                          style={{
                            fontFamily: "Georgia, serif",
                            fontSize: 48,
                            lineHeight: "1",
                            color: "#E5E7EB",
                            marginBottom: "8px",
                            userSelect: "none",
                          }}
                        >
                          &ldquo;
                        </div>
                        <p
                          style={{
                            fontFamily: "Inter",
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: "22px",
                            color: "#374151",
                            margin: 0,
                          }}
                        >
                          {card.quote}
                        </p>
                      </div>

                      {/* Author row */}
                      <div style={{ marginTop: "20px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {/* Avatar */}
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                overflow: "hidden",
                                background: "#E5E7EB",
                                flexShrink: 0,
                                position: "relative",
                              }}
                            >
                              <Image
                                src={card.avatar}
                                alt={card.name}
                                fill
                                sizes="40px"
                                style={{ objectFit: "cover" }}
                                onError={(e) => {
                                  const img = e?.target as HTMLImageElement | null;
                                  if (img) img.src = "/Girl.png";
                                }}
                              />
                            </div>
                            {/* Name + Degree */}
                            <div>
                              <div
                                style={{
                                  fontFamily: "Inter",
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: "#101828",
                                  lineHeight: "20px",
                                }}
                              >
                                {card.name}
                              </div>
                              <div
                                style={{
                                  fontFamily: "Inter",
                                  fontSize: 12,
                                  fontWeight: 400,
                                  color: "#6B7280",
                                  lineHeight: "16px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  minWidth: 0,
                                }}
                              >
                                {card.degree}
                              </div>
                            </div>
                          </div>

                          {/* LinkedIn icon */}
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              background: "#0077B5",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect x="2" y="9" width="4" height="12" />
                              <circle cx="4" cy="4" r="2" />
                            </svg>
                          </div>
                        </div>

                        {/* University */}
                        <div
                          style={{
                            textAlign: "right",
                            fontFamily: "Inter",
                            fontSize: 12,
                            fontWeight: 500,
                            color: "#9CA3AF",
                            marginTop: "8px",
                            maxWidth: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                          }}
                        >
                          {card.university}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow — desktop only */}
          {totalDots > 1 && (
            <button
              onClick={next}
              aria-label="Next"
              className="hidden md:flex hover:bg-gray-50 hover:shadow-md transition-all duration-200"
              style={{
                position: "absolute",
                right: -20,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid #E5E7EB",
                background: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* Pagination Dots — desktop only (mobile uses FocusCenterSlider dots) */}
        {totalDots > 1 && (
          <div className="hidden md:flex" style={{ justifyContent: "center", alignItems: "center", gap: "6px", marginTop: "24px" }}>
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className="hover:opacity-70 transition-opacity duration-200"
                style={{
                  width: i === activeSlide ? 24 : 8,
                  height: 8,
                  borderRadius: 9999,
                  background: i === activeSlide ? "#4F39F6" : "#D1D5DB",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.2s ease, background 0.2s ease",
                }}
              />
            ))}
          </div>
        )}

        {/* Submit Review Button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:scale-105 transition-transform duration-200 cursor-pointer flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg,#4F39F6 0%,#9810FA 100%)',
              color: "#FFFFFF",
              fontFamily: "Inter",
              fontSize: 16,
              fontWeight: 600,
              padding: "16px 32px",
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 14px rgba(152, 16, 250, 0.3)",
            }}
          >
            Submit a Review
            <IconMessage stroke={2} />
          </button>
        </div>

      </div>

      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

function ReviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    providerId: "",
    name: "",
    email: "",
    rating: 5,
    title: "",
    comment: ""
  });

  useEffect(() => {
    if (isOpen) {
      getProviders().then(setProviders).catch(console.error);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.providerId || !formData.name || !formData.email || !formData.title || !formData.comment) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await submitReview(formData);
      if (res.success) {
        toast.success("Review submitted! It will be visible after approval.");
        onClose();
        setFormData({ providerId: "", name: "", email: "", rating: 5, title: "", comment: "" });
      } else {
        toast.error(res.error || "Failed to submit review");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "absolute", inset: 0, background: "rgba(16, 24, 40, 0.5)", backdropFilter: "blur(12px)" }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="custom-scrollbar-hide"
            style={{
              position: "relative",
              background: "#FFFFFF",
              borderRadius: "28px",
              padding: "40px",
              width: "100%",
              maxWidth: "520px",
              boxShadow: "0 32px 64px -12px rgba(16, 24, 40, 0.2)",
              maxHeight: "90vh",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                background: "#F9FAFB",
                border: "none",
                cursor: "pointer",
                color: "#6B7280",
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s"
              }}
              className="hover:bg-gray-100"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <h3 style={{ fontFamily: "Inter", fontSize: 28, fontWeight: 800, color: "#101828", marginBottom: 8, letterSpacing: "-0.02em" }}>Write a Review</h3>
            <p style={{ fontFamily: "Inter", fontSize: 15, color: "#667085", marginBottom: 36, lineHeight: "1.5" }}>We value your feedback. Tell us about your learning journey.</p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Provider Selection */}
              {/* Custom Provider Selection */}
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#344054", marginBottom: 8 }}>University</label>
                <CustomDropdown
                  options={providers.map(p => ({ label: p.name, value: p._id }))}
                  value={formData.providerId}
                  onChange={(val) => setFormData({ ...formData, providerId: val })}
                  placeholder="Select University"
                />
              </div>


              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#344054", marginBottom: 8 }}>Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #D0D5DD",
                      fontSize: 16,
                      outline: "none",
                      boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#344054", marginBottom: 8 }}>Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid #D0D5DD",
                      fontSize: 16,
                      outline: "none",
                      boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#344054", marginBottom: 12 }}>Rating</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, transition: "transform 0.1s" }}
                      className="hover:scale-110"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill={star <= formData.rating ? "#FDB022" : "none"}
                        stroke={star <= formData.rating ? "#FDB022" : "#D0D5DD"}
                        strokeWidth="2"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#344054", marginBottom: 8 }}>Review Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Summarize your experience"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid #D0D5DD",
                    fontSize: 16,
                    outline: "none",
                    boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#344054", marginBottom: 8 }}>Detailed Review</label>
                <textarea
                  required
                  rows={5}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="What was your experience like? (Curriculum, support, career outcomes...)"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid #D0D5DD",
                    fontSize: 16,
                    outline: "none",
                    resize: "none",
                    boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)",
                    lineHeight: "1.6"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  background: "#9810FA",
                  color: "#FFFFFF",
                  fontFamily: "Inter",
                  fontSize: 16,
                  fontWeight: 700,
                  padding: "16px",
                  borderRadius: "14px",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  marginTop: "8px",
                  boxShadow: "0 4px 14px rgba(152, 16, 250, 0.3)",
                  transition: "all 0.2s"
                }}
                className="hover:shadow-lg active:scale-[0.98]"
              >
                {loading ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <div style={{ width: 20, height: 20, border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}></div>
                    <span>Submitting...</span>
                  </div>
                ) : "Publish Review"}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </AnimatePresence>
  );
}



function CustomDropdown({ options, value, onChange, placeholder }: { options: { label: string; value: string }[]; value: string; onChange: (val: string) => void; placeholder: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useState<HTMLDivElement | null>(null);

  const selectedOption = options.find(o => o.value === value);
  const filteredOptions = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Simple logic since I can't easily use refs with state in this one-off way without more boilerplate
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.custom-dropdown-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="custom-dropdown-container" style={{ position: "relative" }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: "12px",
          border: `1px solid ${isOpen ? "#9810FA" : "#D0D5DD"}`,
          fontSize: 16,
          background: "#FFFFFF",
          boxShadow: isOpen ? "0 0 0 4px rgba(152, 16, 250, 0.1)" : "0 1px 2px rgba(16, 24, 40, 0.05)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.2s"
        }}
      >
        <span style={{ color: selectedOption ? "#101828" : "#667085" }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", color: "#667085" }}
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 4 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#FFFFFF",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
              boxShadow: "0 12px 24px -6px rgba(16, 24, 40, 0.1)",
              zIndex: 100,
              overflow: "hidden"
            }}
          >
            <div style={{ padding: "8px", borderBottom: "1px solid #F3F4F6" }}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  autoFocus
                  placeholder="Search universities..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px 10px 36px",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    fontSize: 14,
                    outline: "none",
                    background: "#F9FAFB"
                  }}
                />
                <svg
                  style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
            </div>

            <div style={{ maxHeight: "200px", overflowY: "auto", padding: "4px" }} className="custom-scrollbar-hide">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "6px",
                      fontSize: 14,
                      color: "#374151",
                      cursor: "pointer",
                      background: value === opt.value ? "#F5F3FF" : "transparent",
                      transition: "background 0.1s"
                    }}
                    className="hover:bg-gray-50"
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: value === opt.value ? 600 : 400, color: value === opt.value ? "#9810FA" : "#374151" }}>
                        {opt.label}
                      </span>
                      {value === opt.value && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9810FA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: "20px", textAlign: "center", color: "#6B7280", fontSize: 14 }}>
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const usedFields = [

  "Pill",
  "Badge",
  "pill",
  "badge",
  "Main Heading",
  "Title",
  "Main Title",
  "heading",
  "Below Main Heading",
  "below main heading",
  "Subtitle",
  "Subheading",
  "Description",
  "First Card",
  "first card",
  "Card 1",
  "card1",
  "Second Card",
  "second card",
  "Card 2",
  "card2",
  "Third Card",
  "third card",
  "Card 3",
  "card3",
  "Fourth Card",
  "fourth card",
  "Card 4",
  "card4",
  "Fifth Card",
  "fifth card",
  "Card 5",
  "card5",
  "Sixth Card",
  "sixth card",
  "Card 6",
  "card6",
  "Seventh Card",
  "seventh card",
  "Card 7",
  "card7",
  "Eighth Card",
  "eighth card",
  "Card 8",
  "card8",
];

