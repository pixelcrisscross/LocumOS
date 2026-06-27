"use client";

import { useEffect, useState } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: "shifts" | "bids" | "doctors" | "data" | "search";
  action?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}

const icons = {
  shifts: (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="48" height="44" rx="6" stroke="url(#esg1)" strokeWidth="2" fill="none"/>
      <line x1="8" y1="24" x2="56" y2="24" stroke="url(#esg1)" strokeWidth="2"/>
      <line x1="20" y1="8" x2="20" y2="16" stroke="url(#esg1)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="44" y1="8" x2="44" y2="16" stroke="url(#esg1)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="20" y1="34" x2="44" y2="34" stroke="url(#esg1)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4"/>
      <line x1="20" y1="44" x2="36" y2="44" stroke="url(#esg1)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4"/>
      <circle cx="50" cy="50" r="8" fill="rgba(59,130,246,0.12)" stroke="url(#esg1)" strokeWidth="1.5"/>
      <line x1="50" y1="47" x2="50" y2="53" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
      <line x1="47" y1="50" x2="53" y2="50" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
      <defs>
        <linearGradient id="esg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#a78bfa"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  bids: (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="esg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#a78bfa"/>
        </linearGradient>
      </defs>
      <rect x="8" y="20" width="14" height="36" rx="3" stroke="url(#esg2)" strokeWidth="2" fill="rgba(59,130,246,0.06)"/>
      <rect x="25" y="10" width="14" height="46" rx="3" stroke="url(#esg2)" strokeWidth="2" fill="rgba(99,102,241,0.06)"/>
      <rect x="42" y="28" width="14" height="28" rx="3" stroke="url(#esg2)" strokeWidth="2" fill="rgba(167,139,250,0.06)"/>
      <circle cx="52" cy="16" r="8" fill="rgba(74,222,128,0.12)" stroke="#4ade80" strokeWidth="1.5"/>
      <polyline points="48 16 51 19 56 13" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  doctors: (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="esg3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#a78bfa"/>
        </linearGradient>
      </defs>
      <circle cx="32" cy="20" r="12" stroke="url(#esg3)" strokeWidth="2" fill="rgba(59,130,246,0.06)"/>
      <path d="M12 56c0-11 9-20 20-20s20 9 20 20" stroke="url(#esg3)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="32" y1="12" x2="32" y2="28" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
      <line x1="24" y1="20" x2="40" y2="20" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  search: (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="esg4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#a78bfa"/>
        </linearGradient>
      </defs>
      <circle cx="28" cy="28" r="18" stroke="url(#esg4)" strokeWidth="2" fill="rgba(59,130,246,0.06)"/>
      <line x1="41" y1="41" x2="54" y2="54" stroke="url(#esg4)" strokeWidth="3" strokeLinecap="round"/>
      <line x1="22" y1="28" x2="34" y2="28" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3"/>
      <line x1="28" y1="22" x2="28" y2="34" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3"/>
    </svg>
  ),
  data: (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="esg5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#a78bfa"/>
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="16" rx="20" ry="8" stroke="url(#esg5)" strokeWidth="2" fill="rgba(59,130,246,0.07)"/>
      <path d="M12 16 C12 16 12 32 12 32 C12 36.4 21.1 40 32 40 C42.9 40 52 36.4 52 32 L52 16" stroke="url(#esg5)" strokeWidth="2" fill="none"/>
      <path d="M12 32 C12 36.4 21.1 40 32 40 C42.9 40 52 36.4 52 32" stroke="url(#esg5)" strokeWidth="2" fill="none" opacity="0.4"/>
      <path d="M12 32 C12 36.4 21.1 40 32 40 C42.9 40 52 36.4 52 40 L52 48 C52 52.4 42.9 56 32 56 C21.1 56 12 52.4 12 48 L12 32 Z" stroke="url(#esg5)" strokeWidth="2" fill="rgba(59,130,246,0.04)"/>
    </svg>
  ),
};

export default function EmptyState({
  title = "Nothing here yet",
  description = "There's nothing to show right now. Check back later or adjust your filters.",
  icon = "shifts",
  action,
  secondaryAction,
}: EmptyStateProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "4rem 2rem", textAlign: "center",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
    }}>
      {/* Glow ring behind icon */}
      <div style={{ position: "relative", marginBottom: "1.75rem" }}>
        <div style={{
          width: "120px", height: "120px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}>
          {/* Orbit ring */}
          <div style={{
            position: "absolute", inset: "8px",
            borderRadius: "50%",
            border: "1px dashed rgba(59,130,246,0.18)",
            animation: "orbit-spin 20s linear infinite",
          }} />
          <div style={{
            position: "absolute", inset: "20px",
            borderRadius: "50%",
            border: "1px dashed rgba(167,139,250,0.12)",
            animation: "orbit-spin 15s linear infinite reverse",
          }} />
          {/* Icon */}
          <div style={{
            width: "80px", height: "80px", borderRadius: "22px",
            background: "rgba(15,22,41,0.9)",
            border: "1px solid rgba(59,130,246,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 24px rgba(59,130,246,0.12), inset 0 1px 0 rgba(59,130,246,0.1)",
          }}>
            {icons[icon]}
          </div>
        </div>
      </div>

      <h3 style={{
        color: "white", fontSize: "1.125rem", fontWeight: "700",
        letterSpacing: "-0.03em", margin: "0 0 0.625rem", lineHeight: 1.3,
      }}>
        {title}
      </h3>
      <p style={{
        color: "#475569", fontSize: "0.9rem", maxWidth: "340px",
        lineHeight: 1.65, margin: "0 0 1.75rem",
      }}>
        {description}
      </p>

      {/* Actions */}
      {(action || secondaryAction) && (
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          {action && (
            <button
              onClick={action.onClick}
              style={{
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: "white", border: "none",
                padding: "0.65rem 1.5rem", borderRadius: "9px",
                fontWeight: "600", fontSize: "0.875rem", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(59,130,246,0.3)",
                transition: "all 0.2s", fontFamily: "inherit",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(59,130,246,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(59,130,246,0.3)"; }}
            >
              {action.label}
            </button>
          )}
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              style={{
                background: "transparent", color: "#60a5fa",
                border: "1px solid rgba(59,130,246,0.25)",
                padding: "0.65rem 1.5rem", borderRadius: "9px",
                fontWeight: "500", fontSize: "0.875rem", cursor: "pointer",
                transition: "all 0.2s", fontFamily: "inherit",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.5)"; (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.07)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.25)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}

      <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
