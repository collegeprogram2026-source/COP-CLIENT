'use client';

import { useState, useEffect } from "react";
import { Phone, CheckCircle, Mail, Clock, ChevronDown, Shield } from "lucide-react";
import { auth } from "@/app/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import toast from "react-hot-toast";

interface TalkToExpertsFormProps {
  source: string;
  initialMessage?: string;
  programs?: string[];
  isHomePage?: boolean;
  hideHeader?: boolean;
}

export default function TalkToExpertsForm({ 
  source, 
  initialMessage = "Talk to Experts Request",
  programs = ["MBA & Management Programs", "Tech & Data Science", "International Programs"],
  isHomePage = false,
  hideHeader = false
}: TalkToExpertsFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    otp: "",
    programOfInterest: "",
    preferredTime: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        if (!token) return;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/student/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setFormData(prev => ({
            ...prev,
            fullName: data.name || (data.firstName ? `${data.firstName} ${data.lastName || ''}`.trim() : prev.fullName),
            email: data.email || prev.email,
            phoneNumber: data.phone || prev.phoneNumber,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch profile for pre-filling form", err);
      }
    };
    fetchProfile();
  }, []);

  const setupRecaptcha = () => {
    const containerId = isHomePage ? 'recaptcha-s5' : 'recaptcha-container-shared';
    if (!(window as any).recaptchaVerifierShared) {
      try {
        (window as any).recaptchaVerifierShared = new RecaptchaVerifier(auth, containerId, {
          size: 'invisible',
          callback: () => { console.log("Recaptcha verified"); },
          'expired-callback': () => { toast.error("Recaptcha expired. Please try again."); },
        });
      } catch (error) {
        console.error("Recaptcha initialization error:", error);
      }
    }
  };

  const handleSendOtp = async () => {
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setOtpLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifierShared;
      let phoneNumber = formData.phoneNumber;
      if (!phoneNumber.startsWith('+')) phoneNumber = `+91${phoneNumber}`;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      toast.error(error.message || "Failed to send OTP. Please check the number.");
      if ((window as any).recaptchaVerifierShared) {
        (window as any).recaptchaVerifierShared.render().then((widgetId: any) => {
          (window as any).recaptchaVerifierShared.reset(widgetId);
        });
      }
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp || formData.otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    if (!confirmationResult) {
      toast.error("Please request OTP first");
      return;
    }
    setOtpLoading(true);
    try {
      await confirmationResult.confirm(formData.otp);
      setOtpVerified(true);
      toast.success("Phone number verified!");
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) {
      toast.error("Please verify your phone number first");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('studentToken') || ''}`,
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber,
          courseOfInterest: formData.programOfInterest,
          source: source,
          message: formData.message || initialMessage,
          preferredTime: formData.preferredTime,
        }),
      });
      if (response.ok) {
        toast.success("Request sent successfully! Our experts will contact you soon.");
        setFormData({ fullName: "", email: "", phoneNumber: "", otp: "", programOfInterest: "", preferredTime: "", message: "" });
        setOtpSent(false);
        setOtpVerified(false);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to send request. Please try again later.");
      }
    } catch (err) {
      console.error("Lead submission error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    fontFamily: "Inter",
    fontSize: "14px",
    color: "#374151",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#FFFFFF",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 500,
    color: "#101828",
    marginBottom: "6px",
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: "500px",
      flexShrink: 0,
      borderRadius: "16px",
      border: isHomePage ? "1px solid #E5E7EB" : "1px solid #E5E7EB",
      backgroundColor: "#FFFFFF",
      padding: "33px",
      position: "relative",
      boxShadow: "0px 8px 10px -6px rgba(0,0,0,0.10), 0px 20px 25px -5px rgba(0,0,0,0.10)",
      margin: isHomePage ? "0 auto lg:margin-0" : "0",
    }}>
      {(!isHomePage && !hideHeader) && <h3 style={{ fontFamily: "Inter", fontSize: "22px", fontWeight: 700, color: "#101828", marginBottom: "20px" }}>Get In Touch</h3>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Full Name */}
        <div>
          <label style={labelStyle}>Full Name <span style={{ color: "#EF4444" }}>*</span></label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            style={inputStyle}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email Address <span style={{ color: "#EF4444" }}>*</span></label>
          <div style={{ position: "relative" }}>
            {!isHomePage && <Mail size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />}
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ ...inputStyle, paddingLeft: !isHomePage ? "34px" : "16px" }}
              required
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label style={labelStyle}>Phone Number <span style={{ color: "#EF4444" }}>*</span></label>
          <div style={{ position: "relative" }}>
            <Phone size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
            <input
              type="tel"
              placeholder="98765 43210"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              style={{ ...inputStyle, paddingLeft: "42px", paddingRight: "100px" }}
              required
              disabled={otpVerified}
            />
            {!otpVerified && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpLoading || !formData.phoneNumber}
                style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", backgroundColor: "#9810FA", color: "#FFFFFF", padding: "4px 12px", borderRadius: "6px", border: "none", fontSize: "11px", fontWeight: 600, cursor: "pointer", opacity: (otpLoading || !formData.phoneNumber) ? 0.5 : 1 }}
              >
                {otpSent ? "Resend OTP" : "Send OTP"}
              </button>
            )}
            {otpVerified && <CheckCircle size={18} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#10B981" }} />}
          </div>
          {!otpVerified && <p style={{ fontFamily: "Inter", fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>We'll send an OTP to verify your phone number</p>}
        </div>

        {/* OTP */}
        {otpSent && !otpVerified && (
          <div>
            <label style={labelStyle}>OTP <span style={{ color: "#EF4444" }}>*</span></label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                style={{ ...inputStyle, flex: 1, width: "auto" }}
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={otpLoading}
                style={{ padding: "12px 20px", borderRadius: "10px", backgroundColor: "#9810FA", color: "#FFFFFF", fontFamily: "Inter", fontSize: "14px", fontWeight: 600, border: "none", cursor: otpLoading ? "not-allowed" : "pointer", opacity: otpLoading ? 0.6 : 1, flexShrink: 0 }}
              >
                {otpLoading ? "..." : "Verify"}
              </button>
            </div>
          </div>
        )}

        {/* Program of Interest */}
        <div>
          <label style={labelStyle}>Program of Interest <span style={{ color: "#EF4444" }}>*</span></label>
          <div style={{ position: "relative" }}>
            <select
              value={formData.programOfInterest}
              onChange={(e) => setFormData({ ...formData, programOfInterest: e.target.value })}
              style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
              required
            >
              <option value="">Select Program</option>
              {programs.map((p, i) => <option key={i} value={p}>{p}</option>)}
            </select>
            <ChevronDown size={16} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B7280" }} />
          </div>
        </div>

        {/* Preferred Time to Call */}
        <div>
          <label style={labelStyle}>Preferred Time to Call</label>
          <div style={{ position: "relative" }}>
            <Clock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
            <select
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              style={{ ...inputStyle, paddingLeft: "34px", appearance: "none", cursor: "pointer" }}
            >
              <option value="">Select time slot</option>
              {["9 AM – 11 AM", "11 AM – 1 PM", "2 PM – 4 PM", "4 PM – 6 PM", "6 PM – 8 PM"].map((t, i) => <option key={i} value={t}>{t}</option>)}
            </select>
            <ChevronDown size={16} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B7280" }} />
          </div>
        </div>

        {/* Message */}
        <div>
          <label style={labelStyle}>Your Message (Optional)</label>
          <textarea
            placeholder="Tell us about your career goals..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={3}
            style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            height: "52px",
            borderRadius: "10px",
            backgroundColor: "#9810FA",
            color: "#FFFFFF",
            fontFamily: "Inter",
            fontSize: "16px",
            fontWeight: 600,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "4px",
            boxShadow: "0px 4px 6px -4px rgba(173,70,255,0.30), 0px 10px 15px -3px rgba(173,70,255,0.30)",
          }}
        >
          {loading ? "Sending…" : (
            <>
              Send
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>

        {/* No Spam Calls badge */}
        <div style={{ height: "32px", borderRadius: "8px", backgroundColor: "#10B981", border: "1px solid #059669", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          <Shield size={14} color="#FFFFFF" />
          <span style={{ fontFamily: "Inter", fontSize: "13px", fontWeight: 500, color: "#FFFFFF" }}>No Spam Calls</span>
        </div>

        {/* Terms text */}
        <p style={{ fontFamily: "Inter", fontSize: "12px", lineHeight: "19.5px", color: "#6A7282", textAlign: "center", width: "100%", maxWidth: "398px", margin: "0 auto", paddingBottom: "20px" }}>
          By submitting, you agree to our{" "}
          <a href="#" style={{ color: "#9810FA", textDecoration: "underline" }}>Terms & Conditions</a>
          {" "}and{" "}
          <a href="#" style={{ color: "#9810FA", textDecoration: "underline" }}>Privacy Policy</a>
        </p>
      </form>
      {!isHomePage && <div id="recaptcha-container-shared" />}
    </div>
  );
}
