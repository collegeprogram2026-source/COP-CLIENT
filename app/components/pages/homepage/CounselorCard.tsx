'use client';
import { Star, BookOpen, Clock, Users } from "lucide-react";
import Image from "next/image";

export interface Counselor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  rating: number;
  reviewCount: number;
  expertise: string;
  experience: string;
  studentsGuided: string;
}

interface CounselorCardProps {
  counselor: Counselor;
  isMobile?: boolean;
}

export default function CounselorCard({ counselor, isMobile = false }: CounselorCardProps) {
  return (
    <div
      style={{
        width: '100%',
        minHeight: isMobile ? 300 : 'auto',
        borderRadius: isMobile ? 16 : 24,
        border: '1px solid #E5E7EB',
        backgroundColor: '#fff',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isMobile ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* Image Container */}
      <div
        className="relative overflow-hidden bg-gray-200"
        style={{ height: isMobile ? 160 : 240, flexShrink: 0 }}
      >
        <Image
          src={counselor.image}
          alt={counselor.name}
          fill
          sizes={isMobile ? "280px" : "33vw"}
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
        <div
          className={`
            absolute top-3 left-3 z-10
            inline-flex items-center gap-1.5 px-4 py-1 rounded-full
            bg-purple-600/30 backdrop-blur-lg border border-white/20
            shadow-[0_8px_32px_rgba(124,58,237,0.25)]
            text-white font-semibold
          `}
          style={{
            fontSize: isMobile ? '11px' : '13px',
          }}
        >
          <Star size={isMobile ? 12 : 13} fill="#F0B100" color="#F0B100" className="stroke-[3]" />
          <span className="mb-0.5">{counselor.rating.toFixed(1)} / {counselor.reviewCount} reviews</span>
        </div>
      </div>

      {/* Content Container */}
      <div className={isMobile ? "p-[14px_16px] flex flex-col gap-1 flex-1" : "p-4 flex flex-col flex-1"}>
        <h3
          className="font-bold text-[#101828] font-inter"
          style={{
            fontSize: isMobile ? '15px' : '20px',
            lineHeight: isMobile ? '20px' : '28px',
            margin: 0
          }}
        >
          {counselor.name}
        </h3>
        <p
          className="text-[#4F39F6] font-semibold font-inter"
          style={{
            fontSize: isMobile ? '13px' : '16px',
            lineHeight: isMobile ? '18px' : '24px',
            margin: isMobile ? 0 : '0 0 16px 0'
          }}
        >
          {counselor.title}
        </p>

        <div
          className={isMobile ? "border-t border-[#E5E7EB] mt-[6px] pt-[6px] flex flex-col gap-[6px]" : "space-y-3"}
        >
          <div className="flex items-start gap-2 md:gap-3">
            <BookOpen size={isMobile ? 14 : 18} className="flex-shrink-0 mt-0.5" style={{ color: '#4F39F6' }} />
            <span style={{ fontSize: isMobile ? '13px' : '14px', color: '#4A5565', fontFamily: 'Inter', lineHeight: '20px' }}>
              {counselor.expertise}
            </span>
          </div>
          <div className="flex items-start gap-2 md:gap-3">
            <Clock size={isMobile ? 14 : 18} className="flex-shrink-0 mt-0.5" style={{ color: '#4F39F6' }} />
            <span style={{ fontSize: isMobile ? '13px' : '14px', color: '#4A5565', fontFamily: 'Inter', lineHeight: '20px' }}>
              {counselor.experience}
            </span>
          </div>
          <div className="flex items-start gap-2 md:gap-3">
            <Users size={isMobile ? 14 : 18} className="flex-shrink-0 mt-0.5" style={{ color: '#4F39F6' }} />
            <span style={{ fontSize: isMobile ? '13px' : '14px', color: '#4A5565', fontFamily: 'Inter', lineHeight: '20px' }}>
              {counselor.studentsGuided}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
