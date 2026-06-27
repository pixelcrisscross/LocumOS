"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { id: "shifts", label: "Find Shifts", href: "/doctor", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
  { id: "bids", label: "My Bids", href: "/doctor#my-bids-section", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg> },
  { id: "schedule", label: "My Schedule", href: "/doctor", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { id: "earnings", label: "Earnings", href: "/doctor", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { id: "documents", label: "Documents", href: "/doctor", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
];

export default function DoctorSidebar() {
  const { data: session } = useSession();
  const [available, setAvailable] = useState(true);
  const [activeNav, setActiveNav] = useState("shifts");
  const [bidCount, setBidCount] = useState<number | null>(null);

  const user = session?.user as any;
  const name = user?.name ?? "Doctor";
  const specialty = user?.specialty ?? "General Medicine";
  const initials = name.split(" ").filter(Boolean).map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

  // Fetch real bid count
  useEffect(() => {
    fetch("/api/bids/list")
      .then(r => r.json())
      .then(d => setBidCount((d.bids ?? []).filter((b: any) => b.status === "Pending").length))
      .catch(() => {});
  }, []);

  return (
    <aside style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: "300px", background: "rgba(10,14,26,0.97)", borderRight: "1px solid rgba(59,130,246,0.1)", display: "flex", flexDirection: "column", zIndex: 50, overflowY: "auto" }}>
      {/* Logo */}
      <div style={{ height: "64px", display: "flex", alignItems: "center", padding: "0 1.375rem", borderBottom: "1px solid rgba(59,130,246,0.08)", flexShrink: 0, justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 12px rgba(59,130,246,0.35)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 2v20M3 7l9 5 9-5" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ color: "white", fontWeight: "700", fontSize: "1rem", letterSpacing: "-0.03em" }}>LocumOS</span>
        </Link>
        <Link href="/dashboard" style={{ color: "#334155", fontSize: "0.75rem", fontWeight: "500", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#64748b"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#334155"}
        >
          Hospital view
        </Link>
      </div>

      {/* Profile card — real session data */}
      <div style={{ margin: "1.125rem 1.125rem 0", padding: "1.25rem", borderRadius: "14px", background: "rgba(15,22,41,0.8)", border: "1px solid rgba(59,130,246,0.12)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #a78bfa, transparent)" }} />

        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", marginBottom: "1rem" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "linear-gradient(135deg, #a78bfa20, #3b82f620)", border: "1px solid rgba(167,139,250,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.125rem", fontWeight: "800", color: "#a78bfa" }}>
              {initials}
            </div>
            <div style={{ position: "absolute", bottom: "-2px", right: "-2px", width: "14px", height: "14px", borderRadius: "50%", background: available ? "#4ade80" : "#475569", border: "2px solid #0f1629", transition: "background 0.3s", boxShadow: available ? "0 0 8px rgba(74,222,128,0.5)" : "none" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: "white", fontWeight: "700", fontSize: "0.9375rem", margin: "0 0 0.15rem", letterSpacing: "-0.02em" }}>
              {name.startsWith("Dr.") ? name : `Dr. ${name}`}
            </p>
            <p style={{ color: "#475569", fontSize: "0.775rem", margin: "0 0 0.5rem" }}>{specialty}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= 4 ? "#fbbf24" : "none"} stroke="#fbbf24" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
              <span style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: "500" }}>4.9</span>
            </div>
          </div>
        </div>

        {/* Availability toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 0.875rem", borderRadius: "10px", background: available ? "rgba(74,222,128,0.06)" : "rgba(71,85,105,0.1)", border: `1px solid ${available ? "rgba(74,222,128,0.2)" : "rgba(71,85,105,0.2)"}`, transition: "all 0.3s ease" }}>
          <div>
            <p style={{ color: available ? "#4ade80" : "#64748b", fontSize: "0.825rem", fontWeight: "700", margin: "0 0 0.1rem", transition: "color 0.3s" }}>
              {available ? "🟢 Available" : "⚫ Not Available"}
            </p>
            <p style={{ color: "#334155", fontSize: "0.7rem", margin: 0 }}>
              {available ? "Visible to hospitals" : "Hidden from listings"}
            </p>
          </div>
          <Switch id="availability-toggle" checked={available} onCheckedChange={setAvailable} />
        </div>

        {/* Mini stats from session */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.875rem" }}>
          {[
            { label: "Bids", value: bidCount !== null ? String(bidCount) : "—" },
            { label: "Status", value: available ? "Active" : "Away" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center", padding: "0.625rem 0.25rem", borderRadius: "8px", background: "rgba(10,14,26,0.6)", border: "1px solid rgba(59,130,246,0.08)" }}>
              <p style={{ color: "white", fontSize: "0.9rem", fontWeight: "700", margin: "0 0 0.1rem", letterSpacing: "-0.03em" }}>{s.value}</p>
              <p style={{ color: "#334155", fontSize: "0.675rem", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Specialty badge */}
      <div style={{ padding: "1rem 1.125rem 0.25rem" }}>
        <p style={{ color: "#1e293b", fontSize: "0.675rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Your Specialty</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {[specialty].map(s => (
            <Badge key={s} style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.2)", fontSize: "0.7rem", fontWeight: "500", borderRadius: "6px", padding: "0.15rem 0.5rem" }}>{s}</Badge>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "1rem 0.75rem 0", display: "flex", flexDirection: "column", gap: "2px" }}>
        <p style={{ color: "#1e293b", fontSize: "0.675rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 0.5rem", marginBottom: "0.4rem" }}>Navigation</p>
        {navItems.map(item => {
          const isActive = activeNav === item.id;
          return (
            <button key={item.id} onClick={() => setActiveNav(item.id)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.875rem", borderRadius: "10px", border: isActive ? "1px solid rgba(59,130,246,0.2)" : "1px solid transparent", background: isActive ? "rgba(59,130,246,0.12)" : "transparent", color: isActive ? "#60a5fa" : "#475569", cursor: "pointer", transition: "all 0.18s ease", textAlign: "left", width: "100%", fontFamily: "inherit" }}>
              {item.icon}
              <span style={{ flex: 1, fontSize: "0.875rem", fontWeight: isActive ? "600" : "500", letterSpacing: "-0.01em" }}>{item.label}</span>
              {item.id === "bids" && bidCount !== null && bidCount > 0 && (
                <span style={{ background: "rgba(167,139,250,0.18)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.3)", fontSize: "0.675rem", fontWeight: "700", padding: "0.1rem 0.45rem", borderRadius: "100px" }}>{bidCount}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sign out */}
      <div style={{ padding: "1rem 1.125rem", borderTop: "1px solid rgba(59,130,246,0.08)" }}>
        <p style={{ color: "#94a3b8", fontSize: "0.775rem", marginBottom: "0.5rem" }}>
          Signed in as <strong style={{ color: "white" }}>{user?.email ?? "—"}</strong>
        </p>
        <button onClick={() => signOut({ callbackUrl: "/login" })} style={{ width: "100%", padding: "0.55rem", borderRadius: "8px", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)", color: "#f87171", fontSize: "0.8rem", fontWeight: "500", cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.14)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.07)"}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
