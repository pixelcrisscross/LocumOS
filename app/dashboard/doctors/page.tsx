"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/shared/Header";
import EmptyState from "@/components/shared/EmptyState";

const doctors = [
  { id: "d1", name: "Dr. Priya Nair", specialty: "Emergency Medicine", exp: 12, rating: 4.9, shifts: 87, status: "Available", initials: "PN", color: "#a78bfa" },
  { id: "d2", name: "Dr. Arjun Mehta", specialty: "Emergency Medicine", exp: 8, rating: 4.7, shifts: 43, status: "On Shift", initials: "AM", color: "#3b82f6" },
  { id: "d3", name: "Dr. Kavya Sharma", specialty: "Emergency Medicine", exp: 15, rating: 5.0, shifts: 124, status: "Available", initials: "KS", color: "#4ade80" },
  { id: "d4", name: "Dr. Rahul Verma", specialty: "General Surgery", exp: 6, rating: 4.5, shifts: 22, status: "Unavailable", initials: "RV", color: "#64748b" },
  { id: "d5", name: "Dr. Ananya Iyer", specialty: "Anaesthesiology", exp: 10, rating: 4.8, shifts: 61, status: "Available", initials: "AI", color: "#fb923c" },
  { id: "d6", name: "Dr. Vikram Singh", specialty: "Cardiology", exp: 14, rating: 4.6, shifts: 98, status: "On Shift", initials: "VS", color: "#f472b6" },
];

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  Available: { bg: "rgba(74,222,128,0.1)", color: "#4ade80", border: "rgba(74,222,128,0.25)" },
  "On Shift": { bg: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "rgba(59,130,246,0.3)" },
  Unavailable: { bg: "rgba(100,116,139,0.1)", color: "#64748b", border: "rgba(100,116,139,0.2)" },
};

export default function DoctorsPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0e1a" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "240px", display: "flex", flexDirection: "column" }}>
        <Header
          title="Doctor Directory"
          subtitle="Browse and manage verified doctors in your network"
          actions={
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <div style={{ position: "relative" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input placeholder="Search doctors…" style={{ background: "rgba(15,22,41,0.8)", border: "1px solid rgba(59,130,246,0.14)", borderRadius: "9px", color: "#f1f5f9", fontSize: "0.85rem", padding: "0.5rem 0.875rem 0.5rem 2.25rem", outline: "none", width: "200px", fontFamily: "inherit" }} />
              </div>
            </div>
          }
        />
        <main style={{ padding: "2rem 2.5rem", flex: 1 }}>
          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.75rem" }}>
            {[
              { label: "Total Doctors", value: "12,847", delta: "+234 this month", color: "#3b82f6" },
              { label: "Available Now", value: "4,201", delta: "Across 40+ cities", color: "#4ade80" },
              { label: "Avg Rating", value: "4.82 ★", delta: "Based on 89K reviews", color: "#fbbf24" },
            ].map(s => (
              <div key={s.label} className="dash-card" style={{ padding: "1.25rem 1.5rem" }}>
                <p style={{ color: "#475569", fontSize: "0.725rem", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 0.35rem", fontWeight: "600" }}>{s.label}</p>
                <p style={{ color: s.color, fontSize: "1.625rem", fontWeight: "800", letterSpacing: "-0.04em", margin: "0 0 0.2rem" }}>{s.value}</p>
                <p style={{ color: "#334155", fontSize: "0.775rem", margin: 0 }}>{s.delta}</p>
              </div>
            ))}
          </div>

          {/* Doctor grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {doctors.map(doc => {
              const ss = statusStyle[doc.status];
              return (
                <div key={doc.id} className="dash-card" style={{ padding: "1.375rem", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.12)"}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.875rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${doc.color}18`, border: `1px solid ${doc.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "0.875rem", color: doc.color }}>
                        {doc.initials}
                      </div>
                      <div>
                        <p style={{ color: "white", fontWeight: "700", fontSize: "0.9rem", margin: "0 0 0.1rem", letterSpacing: "-0.02em" }}>{doc.name}</p>
                        <p style={{ color: "#475569", fontSize: "0.775rem", margin: 0 }}>{doc.specialty}</p>
                      </div>
                    </div>
                    <span style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}`, fontSize: "0.65rem", fontWeight: "700", padding: "0.18rem 0.55rem", borderRadius: "100px", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      {doc.status}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                    {[
                      { label: "Rating", value: `★ ${doc.rating}` },
                      { label: "Exp", value: `${doc.exp} yrs` },
                      { label: "Shifts", value: String(doc.shifts) },
                    ].map(m => (
                      <div key={m.label} style={{ textAlign: "center", padding: "0.5rem 0.25rem", borderRadius: "8px", background: "rgba(10,14,26,0.5)", border: "1px solid rgba(59,130,246,0.06)" }}>
                        <p style={{ color: "white", fontWeight: "700", fontSize: "0.875rem", margin: "0 0 0.1rem" }}>{m.value}</p>
                        <p style={{ color: "#334155", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.07em", margin: 0 }}>{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.875rem" }}>
                    <button style={{ flex: 1, height: "32px", borderRadius: "8px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#60a5fa", fontSize: "0.775rem", fontWeight: "500", cursor: "pointer", fontFamily: "inherit" }}>
                      View Profile
                    </button>
                    <button style={{ height: "32px", padding: "0 0.75rem", borderRadius: "8px", border: "1px solid rgba(59,130,246,0.1)", background: "transparent", color: "#475569", fontSize: "0.775rem", cursor: "pointer", fontFamily: "inherit" }}>
                      Invite to Shift
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
