"use client";
import { IconMessage } from '@tabler/icons-react';
import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import { useState, useEffect, useRef } from "react";
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
      avatar: "/Girl.webp",
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
      avatar: "/Container (40).webp",
    },
    {
      quote: getFieldValue(
        ["Fourth Card", "fourth card", "Card 4", "card4"],
        "The comparison tool helped me choose between 3 universities in under an hour. The counselor's follow-up was timely and extremely helpful. Highly recommended!"
      ),
      name: "Sneha Gupta",
      degree: "MBA Student",
      university: "Amity Online",
      avatar: "/Girl.webp",
    },
  ];

  const cards = dynamicReviews.length > 0
    ? dynamicReviews.map(r => ({
      quote: r.comment,
      name: r.name,
      degree: r.title,
      university: r.providerId?.name || "Verified Student",
      avatar: r.providerId?.logo || "/Girl.webp"
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
    <section className="w-full bg-white py-[clamp(32px,6vw,64px)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">

        {/* Pill */}
        <div className="flex justify-center mb-5">
          <span
            className="bg-[#EEF2FF] text-[#4F39F6] font-['Inter'] text-sm font-bold leading-5 tracking-[0.7px] uppercase py-3 px-6 flex items-center justify-center rounded-full"
          >
            {pill}
          </span>
        </div>

        {/* Main Heading */}
        <h2
          className="font-['Inter'] text-[clamp(22px,5vw,36px)] font-extrabold leading-[1.2] tracking-normal text-[#101828] text-center mb-3 px-4"
        >
          {mainHeading}
        </h2>

        {/* Below Heading */}
        <p
          className="font-['Inter'] text-base font-normal italic leading-6 text-[#6A7282] text-center mb-12"
        >
          {belowHeading}
        </p>

        {/* Carousel: Cards with overlaid arrows */}
        <div className="relative">
          {/* Mobile: focus-center slider */}
          <FocusCenterSlider className="mt-8 mb-8" interval={5000} cardWidth={260}>
            {cards.map((card, idx) => (
              <div
                key={`m8-${idx}`}
                className="w-full min-h-[280px] rounded-2xl border border-[#E5E7EB] bg-white p-5 px-[18px] flex flex-col justify-between"
              >
                <div>
                  <div className="font-serif text-[48px] leading-none text-[#E5E7EB] mb-1.5 select-none text-center">&ldquo;</div>
                  <p className="font-['Inter'] text-sm font-extrabold leading-[22px] text-[#374151] m-0 text-center">&ldquo;{card.quote}&rdquo;</p>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#E5E7EB] shrink-0 relative">
                    <Image src={card.avatar} alt={card.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 w-0 overflow-hidden">
                    <div className="font-['Inter'] text-sm font-semibold text-[#101828] leading-5 whitespace-nowrap overflow-hidden text-ellipsis">{card.name}</div>
                    <div className="font-['Inter'] text-[12px] text-[#6B7280] leading-[17px] whitespace-nowrap overflow-hidden text-ellipsis">{card.degree} · {card.university}</div>
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
              className="hidden md:flex hover:bg-gray-50 hover:shadow-md transition-all duration-200 absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-[#E5E7EB] bg-white items-center justify-center cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
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
              className="flex transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                transform: `translateX(-${(activeSlide / totalDots) * 100}%)`,
                width: `${totalDots * 100}%`
              }}
            >
              {Array.from({ length: totalDots }).map((_, pageIdx) => (
                <div
                  key={pageIdx}
                  className="grid grid-cols-4 gap-[clamp(12px,1.8vw,24px)] p-2.5"
                  style={{
                    flex: `0 0 ${100 / totalDots}%`
                  }}
                >
                  {cards.slice(pageIdx * 4, pageIdx * 4 + 4).map((card, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-[#E5E7EB] rounded-2xl p-[clamp(16px,2vw,24px)] flex flex-col justify-between shadow-[0_1px_6px_rgba(0,0,0,0.06)] h-full"
                    >
                      {/* Quote mark + text */}
                      <div>
                        <div className="font-serif text-[48px] leading-none text-[#E5E7EB] mb-2 select-none text-center">&ldquo;</div>
                        <p className="font-['Inter'] text-sm font-extrabold leading-[22px] text-[#374151] m-0 text-center">&ldquo;{card.quote}&rdquo;</p>
                      </div>

                      {/* Author row */}
                      <div className="mt-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#E5E7EB] shrink-0 relative">
                              <Image
                                src={card.avatar}
                                alt={card.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                                onError={(e) => {
                                  const img = e?.target as HTMLImageElement | null;
                                  if (img) img.src = "/Girl.webp";
                                }}
                              />
                            </div>
                            {/* Name + Degree */}
                            <div className="flex-1 min-w-0 w-0 overflow-hidden">
                              <div className="font-['Inter'] text-sm font-semibold text-[#101828] leading-5 whitespace-nowrap overflow-hidden text-ellipsis">
                                {card.name}
                              </div>
                              <div className="font-['Inter'] text-[12px] font-normal text-[#6B7280] leading-4 whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
                                {card.degree}
                              </div>
                            </div>
                          </div>


                        </div>

                        {/* University */}
                        <div className="text-right font-['Inter'] text-[12px] font-medium text-[#9CA3AF] mt-2 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
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
              className="hidden md:flex hover:bg-gray-50 hover:shadow-md transition-all duration-200 absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-[#E5E7EB] bg-white items-center justify-center cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* Pagination Dots — desktop only (mobile uses FocusCenterSlider dots) */}
        {totalDots > 1 && (
          <div className="hidden md:flex justify-center items-center gap-1.5 mt-6">
            {(() => {
              const maxDots = 4;
              const numDots = Math.min(totalDots, maxDots);
              return Array.from({ length: numDots }).map((_, dotIdx) => {
                const isActive = numDots === totalDots
                  ? dotIdx === activeSlide
                  : Math.round((activeSlide / (totalDots - 1)) * (numDots - 1)) === dotIdx;

                return (
                  <button
                    key={dotIdx}
                    onClick={() => {
                      const targetSlide = numDots === totalDots
                        ? dotIdx
                        : Math.round((dotIdx / (numDots - 1)) * (totalDots - 1));
                      setActiveSlide(targetSlide);
                    }}
                    aria-label={`Slide ${dotIdx + 1}`}
                    className="hover:opacity-70 transition-[width,background] duration-200 rounded-full border-none cursor-pointer p-0"
                    style={{
                      width: isActive ? 24 : 8,
                      height: 8,
                      background: isActive ? "#4F39F6" : "#D1D5DB",
                    }}
                  />
                );
              });
            })()}
          </div>
        )}

        {/* Submit Review Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:scale-105 transition-transform duration-200 cursor-pointer flex items-center gap-2 bg-gradient-to-br from-[#4F39F6] to-[#9810FA] text-white font-['Inter'] text-base font-semibold py-4 px-8 rounded-xl border-none shadow-[0_4px_14px_rgba(152, 16, 250, 0.3)]"
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-5 overflow-hidden">
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#101828]/50 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="custom-scrollbar-hide p-6 sm:p-10 relative bg-white rounded-[28px] w-full max-w-[520px] shadow-[0_32px_64px_-12px_rgba(16,24,40,0.2)] max-h-[90vh] overflow-y-auto overscroll-contain scrollbar-none"
            data-lenis-prevent
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close review form"
              type="button"
              className="hover:bg-gray-100 absolute top-6 right-6 bg-[#F9FAFB] border-none cursor-pointer text-[#6B7280] w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <h3 className="text-2xl sm:text-[28px] font-extrabold text-[#101828] mb-2 tracking-tight font-['Inter']">Write a Review</h3>
            <p className="font-['Inter'] text-[15px] text-[#667085] mb-9 leading-[1.5]">We value your feedback. Tell us about your learning journey.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#344054] mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full py-3.5 px-4 rounded-xl border border-[#D0D5DD] text-base outline-none shadow-[0_1px_2px_rgba(16, 24, 40, 0.05)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#344054] mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full py-3.5 px-4 rounded-xl border border-[#D0D5DD] text-base outline-none shadow-[0_1px_2px_rgba(16, 24, 40, 0.05)]"
                  />
                </div>
              </div>

              {/* Provider Selection */}
              {/* Custom Provider Selection */}
              <div>
                <label className="block text-sm font-semibold text-[#344054] mb-2">University</label>
                <CustomDropdown
                  options={providers.map(p => ({ label: p.name, value: p._id }))}
                  value={formData.providerId}
                  onChange={(val) => setFormData({ ...formData, providerId: val })}
                  placeholder="Select University"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#344054] mb-3">Rating</label>
                <div className="flex gap-2.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      aria-label={`Rate ${star} out of 5`}
                      aria-pressed={star <= formData.rating}
                      className="hover:scale-110 bg-none border-none cursor-pointer p-0 transition-transform duration-100"
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
                <label className="block text-sm font-semibold text-[#344054] mb-2">Review Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Summarize your experience"
                  className="w-full py-3.5 px-4 rounded-xl border border-[#D0D5DD] text-base outline-none shadow-[0_1px_2px_rgba(16, 24, 40, 0.05)]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#344054] mb-2">Detailed Review</label>
                <textarea
                  required
                  rows={5}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="What was your experience like? (Curriculum, support, career outcomes...)"
                  className="w-full py-3.5 px-4 rounded-xl border border-[#D0D5DD] text-base outline-none resize-none shadow-[0_1px_2px_rgba(16, 24, 40, 0.05)] leading-[1.6]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#9810FA] text-white font-['Inter'] text-base font-bold py-4 rounded-[14px] border-none mt-2 shadow-[0_4px_14px_rgba(152,16,250,0.3)] transition-all duration-200 hover:shadow-lg active:scale-[0.98] ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2.5">
                    <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-[spin_0.8s_linear_infinite]"></div>
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
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
    <div className="custom-dropdown-container relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3.5 px-4 rounded-xl text-base bg-white cursor-pointer flex items-center justify-between transition-all duration-200"
        style={{
          border: `1px solid ${isOpen ? "#9810FA" : "#D0D5DD"}`,
          boxShadow: isOpen ? "0 0 0 4px rgba(152, 16, 250, 0.1)" : "0 1px 2px rgba(16, 24, 40, 0.05)",
        }}
      >
        <span className={selectedOption ? "text-[#101828]" : "text-[#667085]"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className="transition-transform duration-200 text-[#667085]"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
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
            className="absolute top-full left-0 right-0 bg-white rounded-xl border border-[#E5E7EB] shadow-[0_12px_24px_-6px_rgba(16,24,40,0.1)] z-[100] overflow-hidden"
          >
            <div className="p-2 border-b border-[#F3F4F6]">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  aria-label="Search universities"
                  placeholder="Search universities..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-2.5 pl-9 pr-3 rounded-lg border border-[#E5E7EB] text-sm outline-none bg-[#F9FAFB]"
                />
                <svg
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
            </div>

            <div className="max-h-[200px] overflow-y-auto p-1 custom-scrollbar-hide">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className="hover:bg-gray-50 py-2.5 px-3 rounded-md text-sm text-[#374151] cursor-pointer transition-colors duration-100"
                    style={{
                      background: value === opt.value ? "#F5F3FF" : "transparent",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className={value === opt.value ? "font-semibold text-[#9810FA]" : "font-normal text-[#374151]"}>
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
                <div className="p-5 text-center text-[#6B7280] text-sm">
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

