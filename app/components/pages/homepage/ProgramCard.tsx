"use client";

import { Star, CheckCircle2, Clock, IndianRupee, ClipboardList } from "lucide-react";
import { IconCurrencyRupee } from '@tabler/icons-react';
import TrendingBadge from "@/app/components/ui/TrendingBadge";

export interface Program {
  _id: string;
  title: string;
  slug?: string;
  thumbnail?: string;
  fees: number;
  discountedFees?: number;
  duration?: string;
  trending?: boolean;
  certifications?: string[];
  features?: string[];
  rating?: number;
  reviews?: number;
  providerName?: string;
  providerSlug?: string;
  providerLogo?: string;
}

interface ProgramCardProps {
  program: Program;
  variant?: "mobile" | "desktop";
  showTrending?: boolean;
}

export default function ProgramCard({ program: p, variant = "desktop", showTrending = false }: ProgramCardProps) {
  const formatCurrency = (amt: number) => {
    if (!amt && amt !== 0) return "—";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt);
  };

  const emi = (amt = 0) => Math.round((amt || 0) / 12);

  if (variant === "mobile") {
    return (
      <div style={{ 
        width: '100%', 
        borderRadius: 24, 
        border: '1px solid #F1F5F9', 
        backgroundColor: '#fff', 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column', 
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      }}>
        {/* Image area */}
        <div style={{ height: 130, position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg,#F3E8FF 0%,#EEF2FF 100%)', flexShrink: 0 }}>
          {p.thumbnail && <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 100%)' }} />
          
          {p.trending && (
            <div style={{ position: 'absolute', right: 8, top: 8 }}>
              <TrendingBadge className="scale-75 origin-top-right" />
            </div>
          )}

          {p.rating ? (
            <div style={{ position: 'absolute', left: 10, bottom: 10, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', padding: '4px 8px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 4, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <Star size={12} className="text-yellow-500" fill="#EAB308" />
              <strong style={{ fontSize: 11, color: '#1E293B' }}>{p.rating}</strong>
            </div>
          ) : null}
        </div>

        {/* Content */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          {p.providerName && (
            <div style={{ fontSize: 10, fontWeight: 700, color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {p.providerName}
            </div>
          )}
          
          <h3 style={{ 
            fontFamily: 'Inter, system-ui, sans-serif', 
            fontWeight: 700, 
            fontSize: 15, 
            lineHeight: '20px', 
            margin: 0, 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden', 
            color: '#1E293B' 
          }}>
            {p.title}
          </h3>

          {/* Info Grid (Duration & Fee) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, backgroundColor: '#EEF2FF', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={16} color="#6366F1" />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 9, color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Duration</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.duration || '—'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, backgroundColor: '#ECFDF5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <IconCurrencyRupee size={16} color="#10B981" stroke={2} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 9, color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Total Fee</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.fees ? formatCurrency(p.fees) : '—'}</div>
              </div>
            </div>
          </div>

          {/* EMI Badge */}
          {p.fees > 0 && (
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12, padding: '8px 12px', color: '#166534', fontWeight: 600, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={14} color="#16A34A" />
              <span>EMI Starting: {formatCurrency(emi(p.discountedFees || p.fees))}/mo</span>
            </div>
          )}

          {/* Badges and Features (Compressed for Mobile) */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(p.certifications && p.certifications.length > 0 ? p.certifications : ['UGC', 'NAAC A+']).slice(0, 2).map((badge, i) => (
              <span key={i} style={{ background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0', padding: '2px 8px', borderRadius: 8, fontSize: 10, fontWeight: 600 }}>
                {badge}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <div style={{ marginTop: 'auto', paddingTop: 8 }}>
            <a
              href={p.providerSlug ? `/universities/${p.providerSlug}?courseId=${p._id}#fees-breakdown` : '#'}
              className="hover:opacity-90 active:scale-95 transition-all duration-200"
              style={{
                display: 'block',
                padding: '12px 0',
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                color: '#fff',
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 700,
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
                cursor: 'pointer'
              }}
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Desktop variant
  return (
    <div style={{ background: '#fff', width: '100%', borderRadius: 24, border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 6px 18px rgba(16,24,40,0.06)' }}>
      {/* Card image area */}
      <div style={{ height: 170, position: 'relative', borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden', background: 'linear-gradient(180deg, #F3E8FF 0%, #EEF2FF 100%)' }}>
        {p.thumbnail ? (
          <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : null}
        {/* Dark gradient overlay for readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.65) 100%)' }} />

        {/* Trending badge — top right, only on trending tab */}
        {showTrending && p.trending && <TrendingBadge className="absolute right-3 top-3 scale-90" />}

        {/* Bottom overlay: provider + title + rating */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {p.providerName && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 500 }}>From</span>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, lineHeight: '16px', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{p.providerName}</span>
            </>
          )}
          <h3 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, lineHeight: '20px', color: '#fff', margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.5)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.title}</h3>
          {p.rating ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
              <span style={{ fontSize: 13 }}>⭐</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
                {p.rating}{p.reviews ? ` (${p.reviews} reviews)` : ''}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>

        {/* Duration and Fee Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ backgroundColor: '#EEF2FF', padding: 8, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} color="#6366F1" />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>Duration</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>{p.duration || '—'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ backgroundColor: '#ECFDF5', padding: 8, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconCurrencyRupee size={18} color="#10B981" stroke={2} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>Total Fee</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>{p.fees ? formatCurrency(p.fees) : '—'}</div>
            </div>
          </div>
        </div>

        {/* EMI Section */}
        {p.fees > 0 && (
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '8px 12px', color: '#166534', fontWeight: 600, fontSize: 13 }}>
            EMI Starting: {formatCurrency(emi(p.discountedFees || p.fees))}/mo
          </div>
        )}

        {/* Certifications/Badges */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(p.certifications && p.certifications.length > 0 ? p.certifications : ['UGC', 'NAAC A+']).map((badge, i) => (
            <span key={i} style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600 }}>
              {badge}
            </span>
          ))}
        </div>

        {/* Features Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
          {(p.features && p.features.length > 0 ? p.features.slice(0, 3) : ['Job Assistance', 'Flexible Learning', 'Industry Projects']).map((feature, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={12} color="#16A34A" />
              </div>
              <div style={{ fontSize: 14, color: '#334155', fontWeight: 500 }}>{feature}</div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 10 }}>
          <a
            href={p.providerSlug ? `/universities/${p.providerSlug}?courseId=${p._id}#fees-breakdown` : '#'}
            className="hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
            style={{
              flex: 1.5,
              padding: '12px',
              background: '#4F46E5',
              color: '#fff',
              borderRadius: 12,
              fontWeight: 600,
              textAlign: 'center',
              textDecoration: 'none',
              fontSize: 14,
              boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)',
              cursor: 'pointer'
            }}
          >
            View Details
          </a>
          <button
            className="hover:bg-indigo-50 transition-all duration-200"
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 12,
              border: '2px solid #4F46E5',
              background: 'transparent',
              color: '#4F46E5',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              fontSize: 14,
              cursor: 'pointer'
            }}
          >
            <ClipboardList size={16} />
            Compare
          </button>
        </div>
      </div>
    </div>
  );
}
