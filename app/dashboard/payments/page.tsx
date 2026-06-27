"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/shared/Header";

const txns = [
  { id: "t1", doctor: "Dr. Kavya Sharma", shift: "Emergency Medicine · 24 Jun", amount: 43200, status: "Paid", method: "IMPS", date: "24 Jun 2026", initials: "KS", color: "#4ade80" },
  { id: "t2", doctor: "Dr. Priya Nair", shift: "Emergency Medicine · 22 Jun", amount: 37800, status: "Paid", method: "NEFT", date: "22 Jun 2026", initials: "PN", color: "#60a5fa" },
  { id: "t3", doctor: "Dr. Arjun Mehta", shift: "General Surgery · 20 Jun", amount: 28000, status: "Processing", method: "UPI", date: "20 Jun 2026", initials: "AM", color: "#fbbf24" },
  { id: "t4", doctor: "Dr. Ananya Iyer", shift: "Anaesthesiology · 18 Jun", amount: 52000, status: "Paid", method: "IMPS", date: "18 Jun 2026", initials: "AI", color: "#60a5fa" },
  { id: "t5", doctor: "Dr. Vikram Singh", shift: "Cardiology · 15 Jun", amount: 64000, status: "Paid", method: "NEFT", date: "15 Jun 2026", initials: "VS", color: "#a78bfa" },
  { id: "t6", doctor: "Dr. Rahul Verma", shift: "General Medicine · 10 Jun", amount: 19600, status: "Failed", method: "UPI", date: "10 Jun 2026", initials: "RV", color: "#f87171" },
];

const txnStatusStyle: Record<string, { bg: string; color: string; border: string }> = {
  Paid: { bg: "rgba(74,222,128,0.1)", color: "#4ade80", border: "rgba(74,222,128,0.25)" },
  Processing: { bg: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "rgba(251,191,36,0.25)" },
  Failed: { bg: "rgba(239,68,68,0.1)", color: "#f87171", border: "rgba(239,68,68,0.2)" },
};

export default function PaymentsPage() {
  const totalPaid = txns.filter(t => t.status === "Paid").reduce((s, t) => s + t.amount, 0);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0e1a" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "240px", display: "flex", flexDirection: "column" }}>
        <Header
          title="Payments"
          subtitle="Track payouts to doctors in real time"
          actions={
            <button className="btn-primary" style={{ fontSize: "0.85rem", padding: "0.5rem 1.25rem" }}>
              Export CSV
            </button>
          }
        />
        <main style={{ padding: "2rem 2.5rem", flex: 1 }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { label: "Total Paid (Jun)", value: `₹${(totalPaid / 100000).toFixed(1)}L`, color: "#4ade80" },
              { label: "Transactions", value: `${txns.filter(t => t.status === "Paid").length}`, color: "#3b82f6" },
              { label: "Processing", value: `${txns.filter(t => t.status === "Processing").length}`, color: "#fbbf24" },
              { label: "Failed", value: `${txns.filter(t => t.status === "Failed").length}`, color: "#f87171" },
            ].map(s => (
              <div key={s.label} className="dash-card" style={{ padding: "1.125rem 1.375rem" }}>
                <p style={{ color: "#475569", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 0.35rem", fontWeight: "600" }}>{s.label}</p>
                <p style={{ color: s.color, fontSize: "1.625rem", fontWeight: "800", letterSpacing: "-0.04em", margin: 0, lineHeight: 1 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Transactions table */}
          <div className="dash-card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "1.125rem 1.5rem", borderBottom: "1px solid rgba(59,130,246,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ color: "white", fontWeight: "700", fontSize: "0.9375rem", margin: 0 }}>Recent Transactions</h3>
              <span style={{ color: "#334155", fontSize: "0.8rem" }}>June 2026</span>
            </div>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto auto auto", gap: "1rem", padding: "0.75rem 1.5rem", background: "rgba(10,14,26,0.4)", borderBottom: "1px solid rgba(59,130,246,0.06)" }}>
              {["Doctor", "Shift", "Amount", "Method", "Status"].map(h => (
                <span key={h} style={{ color: "#334155", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</span>
              ))}
            </div>
            {txns.map((txn, i) => {
              const ss = txnStatusStyle[txn.status];
              return (
                <div key={txn.id} style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr auto auto auto",
                  gap: "1rem", padding: "0.9rem 1.5rem", alignItems: "center",
                  borderBottom: i < txns.length - 1 ? "1px solid rgba(59,130,246,0.05)" : "none",
                  transition: "background 0.15s", cursor: "pointer",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.03)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: `${txn.color}18`, border: `1px solid ${txn.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: "800", color: txn.color, flexShrink: 0 }}>
                      {txn.initials}
                    </div>
                    <span style={{ color: "white", fontSize: "0.875rem", fontWeight: "600", letterSpacing: "-0.01em" }}>{txn.doctor}</span>
                  </div>
                  <span style={{ color: "#64748b", fontSize: "0.825rem" }}>{txn.shift}</span>
                  <span style={{ color: "white", fontSize: "0.9rem", fontWeight: "700", letterSpacing: "-0.02em" }}>₹{txn.amount.toLocaleString()}</span>
                  <span style={{ color: "#64748b", fontSize: "0.8rem", background: "rgba(255,255,255,0.04)", padding: "0.2rem 0.5rem", borderRadius: "5px" }}>{txn.method}</span>
                  <span style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}`, fontSize: "0.68rem", fontWeight: "700", padding: "0.18rem 0.55rem", borderRadius: "100px", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    {txn.status}
                  </span>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
