"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

type UrgencyLevel = "urgent" | "high" | "normal";

export interface ShiftCardData {
  id: string;
  hospital: string;
  hospitalInitials: string;
  hospitalType: string;
  specialty: string;
  payRate: number;
  date: string;
  time: string;
  duration: string;
  location: string;
  distance?: string;
  urgency: UrgencyLevel;
  seatsLeft: number;
  bidsCount: number;
  skills: string[];
  postedAgo: string;
  status?: "Open" | "Filled" | "Expired";
}

interface ShiftCardProps {
  shift: ShiftCardData;
  mode?: "doctor" | "hospital";
  onBid?: (id: string, rate: number) => void;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

const urgencyConfig: Record<UrgencyLevel, { label: string; dotColor: string; borderColor: string; glowColor: string }> = {
  urgent: { label: "Urgent", dotColor: "#ef4444", borderColor: "rgba(239,68,68,0.25)", glowColor: "rgba(239,68,68,0.12)" },
  high:   { label: "High Priority", dotColor: "#fb923c", borderColor: "rgba(251,146,60,0.2)", glowColor: "rgba(251,146,60,0.08)" },
  normal: { label: "Open", dotColor: "#3b82f6", borderColor: "rgba(59,130,246,0.18)", glowColor: "rgba(59,130,246,0.06)" },
};

export default function ShiftCard({ shift, mode = "doctor", onBid, onAccept, onReject }: ShiftCardProps) {
  const [hovered, setHovered] = useState(false);
  const [bidOpen, setBidOpen] = useState(false);
  const [bidRate, setBidRate] = useState(String(shift.payRate));
  const [bidLoading, setBidLoading] = useState(false);
  const [bidDone, setBidDone] = useState(false);

  const urg = urgencyConfig[shift.urgency];

  const handleBid = () => {
    setBidLoading(true);
    setTimeout(() => {
      setBidLoading(false);
      setBidDone(true);
      onBid?.(shift.id, Number(bidRate));
      setTimeout(() => { setBidDone(false); setBidOpen(false); }, 2500);
    }, 900);
  };

  const borderColor = hovered
    ? shift.urgency === "urgent" ? "rgba(239,68,68,0.5)" : "rgba(59,130,246,0.5)"
    : urg.borderColor;

  const glowShadow = hovered
    ? shift.urgency === "urgent"
      ? "0 0 0 1px rgba(239,68,68,0.1), 0 12px 40px rgba(0,0,0,0.35), 0 0 30px rgba(239,68,68,0.1)"
      : "0 0 0 1px rgba(59,130,246,0.1), 0 12px 40px rgba(0,0,0,0.35), 0 0 30px rgba(59,130,246,0.12)"
    : "none";

  return (
    <div
      id={`shift-card-${shift.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(15,22,41,0.9)",
        border: `1px solid ${borderColor}`,
        borderRadius: "16px",
        overflow: "hidden",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: glowShadow,
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Animated urgency stripe */}
      {shift.urgency === "urgent" && (
        <div style={{
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, #ef4444 30%, #f97316 70%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "stripe-slide 3s linear infinite",
        }} />
      )}

      {/* Hover glow overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: hovered
          ? shift.urgency === "urgent"
            ? "radial-gradient(ellipse at top left, rgba(239,68,68,0.04) 0%, transparent 60%)"
            : "radial-gradient(ellipse at top left, rgba(59,130,246,0.05) 0%, transparent 60%)"
          : "transparent",
        transition: "background 0.4s ease",
        borderRadius: "16px",
      }} />

      <div style={{ padding: "1.25rem 1.375rem", position: "relative" }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.875rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Hospital avatar */}
            <div style={{
              width: "44px", height: "44px", borderRadius: "12px",
              background: shift.urgency === "urgent"
                ? "rgba(239,68,68,0.1)" : "rgba(59,130,246,0.1)",
              border: `1px solid ${shift.urgency === "urgent" ? "rgba(239,68,68,0.2)" : "rgba(59,130,246,0.15)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.8rem", fontWeight: "800",
              color: shift.urgency === "urgent" ? "#f87171" : "#60a5fa",
              flexShrink: 0,
              transition: "all 0.3s ease",
              boxShadow: hovered
                ? shift.urgency === "urgent" ? "0 0 14px rgba(239,68,68,0.2)" : "0 0 14px rgba(59,130,246,0.2)"
                : "none",
            }}>
              {shift.hospitalInitials}
            </div>
            <div>
              <p style={{ color: hovered ? "#f1f5f9" : "white", fontSize: "0.9375rem", fontWeight: "700", margin: "0 0 0.1rem", letterSpacing: "-0.02em", transition: "color 0.2s" }}>
                {shift.hospital}
              </p>
              <p style={{ color: "#475569", fontSize: "0.775rem", margin: 0 }}>{shift.hospitalType}</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.375rem" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              background: shift.urgency === "urgent" ? "rgba(239,68,68,0.12)" : shift.urgency === "high" ? "rgba(251,146,60,0.1)" : "rgba(59,130,246,0.12)",
              color: shift.urgency === "urgent" ? "#f87171" : shift.urgency === "high" ? "#fb923c" : "#60a5fa",
              border: `1px solid ${urg.borderColor}`,
              fontSize: "0.7rem", fontWeight: "700",
              padding: "0.2rem 0.625rem", borderRadius: "100px",
              letterSpacing: "0.05em", textTransform: "uppercase",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: urg.dotColor, display: "inline-block" }} />
              {urg.label}
            </span>
            <span style={{ color: "#334155", fontSize: "0.7rem" }}>{shift.postedAgo}</span>
          </div>
        </div>

        {/* Details grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 0.875rem", marginBottom: "0.875rem" }}>
          {[
            {
              icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
              text: shift.specialty,
            },
            {
              icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
              text: `₹${shift.payRate.toLocaleString()}/hr`,
              accent: "#4ade80",
            },
            {
              icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/></svg>,
              text: `${shift.date} · ${shift.time}`,
            },
            {
              icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
              text: shift.distance ? `${shift.distance} away` : shift.location,
            },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              {item.icon}
              <span style={{ color: item.accent ?? "#94a3b8", fontSize: "0.825rem", fontWeight: item.accent ? "700" : "400", letterSpacing: item.accent ? "-0.02em" : "0" }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Skill + meta badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.875rem", flexWrap: "wrap" }}>
          <Badge style={{ background: "rgba(251,146,60,0.1)", color: "#fb923c", border: "1px solid rgba(251,146,60,0.2)", fontSize: "0.68rem", fontWeight: "600", borderRadius: "6px", padding: "0.15rem 0.5rem" }}>
            ⏱ {shift.duration}
          </Badge>
          {shift.skills.map(s => (
            <Badge key={s} style={{ background: "rgba(59,130,246,0.07)", color: "#93c5fd", border: "1px solid rgba(59,130,246,0.14)", fontSize: "0.68rem", fontWeight: "500", borderRadius: "6px", padding: "0.15rem 0.5rem" }}>
              {s}
            </Badge>
          ))}
          <span style={{ marginLeft: "auto", color: "#334155", fontSize: "0.725rem", whiteSpace: "nowrap" }}>
            {shift.bidsCount} bid{shift.bidsCount !== 1 ? "s" : ""} · {shift.seatsLeft} seat{shift.seatsLeft > 1 ? "s" : ""} left
          </span>
        </div>

        {/* ── Doctor mode: inline bid panel ── */}
        {mode === "doctor" && bidOpen && (
          <div style={{
            padding: "0.875rem 1rem",
            borderRadius: "12px",
            background: "rgba(10,14,26,0.85)",
            border: "1px solid rgba(59,130,246,0.2)",
            marginBottom: "0.875rem",
            animation: "fadeSlideDown 0.2s ease",
          }}>
            <p style={{ color: "#94a3b8", fontSize: "0.775rem", fontWeight: "600", marginBottom: "0.5rem" }}>
              Your bid rate (₹/hr) — Listed: ₹{shift.payRate.toLocaleString()}
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#3b82f6", fontWeight: "700", fontSize: "0.95rem", pointerEvents: "none" }}>₹</span>
                <input
                  id={`bid-rate-${shift.id}`}
                  type="number"
                  value={bidRate}
                  onChange={e => setBidRate(e.target.value)}
                  autoFocus
                  style={{
                    width: "100%", background: "rgba(10,14,26,0.95)",
                    border: "1px solid rgba(59,130,246,0.25)", borderRadius: "8px",
                    color: "#f1f5f9", fontSize: "0.95rem", fontWeight: "700",
                    paddingLeft: "1.875rem", padding: "0.55rem 0.875rem 0.55rem 1.875rem",
                    outline: "none", fontFamily: "inherit",
                  }}
                />
              </div>
              <button
                id={`submit-bid-${shift.id}`}
                onClick={handleBid}
                disabled={bidLoading || bidDone}
                style={{
                  background: bidDone ? "rgba(74,222,128,0.15)" : "linear-gradient(135deg, #3b82f6, #2563eb)",
                  color: bidDone ? "#4ade80" : "white",
                  border: bidDone ? "1px solid rgba(74,222,128,0.3)" : "none",
                  borderRadius: "8px", fontWeight: "600", fontSize: "0.825rem",
                  padding: "0 1rem", cursor: "pointer", whiteSpace: "nowrap",
                  boxShadow: bidDone ? "none" : "0 4px 12px rgba(59,130,246,0.3)",
                  fontFamily: "inherit", transition: "all 0.2s",
                }}
              >
                {bidLoading ? "Sending…" : bidDone ? "✓ Sent!" : "Submit Bid"}
              </button>
              <button onClick={() => setBidOpen(false)} style={{
                width: "36px", flexShrink: 0, borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.07)", background: "transparent",
                color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Action row */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {mode === "doctor" && !bidDone && (
            <button
              id={`place-bid-${shift.id}`}
              onClick={() => setBidOpen(o => !o)}
              style={{
                flex: 1, height: "38px", borderRadius: "9px",
                background: bidOpen ? "rgba(59,130,246,0.12)" : "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: bidOpen ? "#60a5fa" : "white",
                border: bidOpen ? "1px solid rgba(59,130,246,0.3)" : "none",
                fontWeight: "600", fontSize: "0.85rem", cursor: "pointer",
                boxShadow: bidOpen ? "none" : "0 4px 14px rgba(59,130,246,0.28)",
                transition: "all 0.25s", fontFamily: "inherit",
              }}
            >
              {bidOpen ? "Cancel" : "Place Bid →"}
            </button>
          )}
          {mode === "doctor" && bidDone && (
            <div style={{ flex: 1, height: "38px", borderRadius: "9px", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4ade80", fontSize: "0.85rem", fontWeight: "600" }}>
              ✓ Bid Placed!
            </div>
          )}
          {mode === "hospital" && onAccept && (
            <button
              id={`accept-shift-${shift.id}`}
              onClick={() => onAccept(shift.id)}
              style={{
                flex: 1, height: "36px", borderRadius: "8px",
                background: "rgba(74,222,128,0.1)", color: "#4ade80",
                border: "1px solid rgba(74,222,128,0.22)", fontWeight: "600",
                fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s",
              }}
            >
              ✓ Accept Bid
            </button>
          )}
          {mode === "hospital" && onReject && (
            <button
              id={`reject-shift-${shift.id}`}
              onClick={() => onReject(shift.id)}
              style={{
                height: "36px", padding: "0 0.875rem", borderRadius: "8px",
                background: "rgba(239,68,68,0.08)", color: "#f87171",
                border: "1px solid rgba(239,68,68,0.18)", fontWeight: "500",
                fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s",
              }}
            >
              ✕ Reject
            </button>
          )}
          {/* Save button */}
          <button style={{
            height: mode === "hospital" ? "36px" : "38px", padding: "0 0.75rem", borderRadius: "9px",
            border: "1px solid rgba(59,130,246,0.12)", background: "transparent",
            color: "#475569", cursor: "pointer", fontSize: "0.8rem",
            display: "flex", alignItems: "center", gap: "0.3rem",
            transition: "all 0.18s", fontFamily: "inherit",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.12)"; (e.currentTarget as HTMLElement).style.color = "#475569"; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            Save
          </button>
        </div>
      </div>

      <style>{`
        @keyframes stripe-slide {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
