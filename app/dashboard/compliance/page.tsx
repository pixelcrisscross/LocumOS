"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/shared/Header";

const complianceItems = [
  { id: "c1", category: "Licences", item: "MCI/SMC Verification", status: "Passed", doctors: 12847, icon: "🏥", color: "#4ade80" },
  { id: "c2", category: "Licences", item: "Speciality Certificates", status: "Passed", doctors: 11234, icon: "📜", color: "#4ade80" },
  { id: "c3", category: "Insurance", item: "Malpractice Insurance", status: "Passed", doctors: 12503, icon: "🛡️", color: "#4ade80" },
  { id: "c4", category: "Insurance", item: "Professional Indemnity", status: "Warning", doctors: 10987, icon: "⚠️", color: "#fbbf24" },
  { id: "c5", category: "Background", item: "Police Verification", status: "Passed", doctors: 12100, icon: "🔍", color: "#4ade80" },
  { id: "c6", category: "Background", item: "Reference Checks", status: "Passed", doctors: 11756, icon: "✅", color: "#4ade80" },
  { id: "c7", category: "Financials", item: "Bank Account KYC", status: "Passed", doctors: 12801, icon: "🏦", color: "#4ade80" },
  { id: "c8", category: "Financials", item: "GST Registration", status: "Not Required", doctors: 8234, icon: "📋", color: "#60a5fa" },
];

const statusColors: Record<string, { bg: string; color: string; border: string }> = {
  Passed: { bg: "rgba(74,222,128,0.1)", color: "#4ade80", border: "rgba(74,222,128,0.25)" },
  Warning: { bg: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "rgba(251,191,36,0.25)" },
  "Not Required": { bg: "rgba(59,130,246,0.1)", color: "#60a5fa", border: "rgba(59,130,246,0.2)" },
};

export default function CompliancePage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0e1a" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "240px", display: "flex", flexDirection: "column" }}>
        <Header title="Compliance" subtitle="Regulatory and verification status across your doctor pool" />
        <main style={{ padding: "2rem 2.5rem", flex: 1 }}>
          {/* Overview */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { label: "Fully Compliant Doctors", value: "12,503", pct: "97.3%", color: "#4ade80" },
              { label: "Requires Attention", value: "287", pct: "2.2%", color: "#fbbf24" },
              { label: "Checks Run This Month", value: "45,821", pct: "Automated", color: "#3b82f6" },
            ].map(s => (
              <div key={s.label} className="dash-card" style={{ padding: "1.375rem 1.5rem" }}>
                <p style={{ color: "#475569", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 0.35rem", fontWeight: "600" }}>{s.label}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.625rem" }}>
                  <p style={{ color: s.color, fontSize: "1.75rem", fontWeight: "800", letterSpacing: "-0.04em", margin: 0, lineHeight: 1 }}>{s.value}</p>
                  <span style={{ color: "#334155", fontSize: "0.825rem", fontWeight: "500" }}>{s.pct}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance checklist */}
          <div className="dash-card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
              <h3 style={{ color: "white", fontWeight: "700", fontSize: "0.9375rem", margin: 0, letterSpacing: "-0.02em" }}>Compliance Checks</h3>
            </div>
            <div>
              {complianceItems.map((item, i) => {
                const ss = statusColors[item.status];
                return (
                  <div key={item.id} style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: "1rem 1.5rem",
                    borderBottom: i < complianceItems.length - 1 ? "1px solid rgba(59,130,246,0.06)" : "none",
                    transition: "background 0.15s",
                    cursor: "pointer",
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.03)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  >
                    <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{item.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: "white", fontWeight: "600", fontSize: "0.875rem", margin: "0 0 0.1rem" }}>{item.item}</p>
                      <p style={{ color: "#334155", fontSize: "0.75rem", margin: 0 }}>{item.category}</p>
                    </div>
                    <p style={{ color: "#64748b", fontSize: "0.825rem", margin: 0, whiteSpace: "nowrap" }}>
                      {item.doctors.toLocaleString()} doctors
                    </p>
                    <span style={{
                      background: ss.bg, color: ss.color, border: `1px solid ${ss.border}`,
                      fontSize: "0.7rem", fontWeight: "700", padding: "0.2rem 0.625rem",
                      borderRadius: "100px", letterSpacing: "0.04em", textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}>
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
