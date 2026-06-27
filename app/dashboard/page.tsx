"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/shared/Header";
import ShiftForm from "@/components/dashboard/ShiftForm";
import BidsTable from "@/components/dashboard/BidsTable";
import StatsBar from "@/components/dashboard/StatsBar";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0e1a", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "240px", display: "flex", flexDirection: "column" }}>
        <Header
          title="Shift Control Center"
          subtitle="Apollo Hospitals, Bengaluru"
          mode="hospital"
          userName="Admin — Apollo"
          userRole="Hospital Administrator"
          userInitials="AH"
          actions={
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <Link href="/doctor" style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                color: "#475569", fontSize: "0.8rem", fontWeight: "500",
                textDecoration: "none", padding: "0.4rem 0.875rem",
                borderRadius: "8px", border: "1px solid rgba(59,130,246,0.12)",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#60a5fa"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#475569"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.12)"; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Doctor View
              </Link>
            </div>
          }
        />
        <main style={{ padding: "1.75rem 2.5rem", flex: 1 }}>
          {/* Stats bar */}
          <StatsBar />

          {/* Two-column content */}
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "1.5rem", marginTop: "1.75rem", alignItems: "start" }}>
            <ShiftForm />
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Expiry alert banner */}
              <div style={{
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.18)",
                borderRadius: "14px",
                padding: "1.125rem 1.375rem",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.75" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: "#f87171", fontWeight: "700", fontSize: "0.875rem", margin: "0 0 0.1rem" }}>3 shifts expiring soon</p>
                    <p style={{ color: "#475569", fontSize: "0.775rem", margin: 0 }}>Review and extend before they lapse</p>
                  </div>
                </div>
                <Link href="/dashboard/shifts" className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", whiteSpace: "nowrap", textDecoration: "none", display: "inline-block" }}>
                  Review →
                </Link>
              </div>

              {/* Quick links grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[
                  { href: "/dashboard/doctors", icon: "👥", label: "Browse Doctors", sub: "12,847 verified" },
                  { href: "/dashboard/analytics", icon: "📊", label: "Analytics", sub: "96.4% fill rate" },
                  { href: "/dashboard/payments", icon: "💳", label: "Payments", sub: "₹18.4L this month" },
                  { href: "/dashboard/compliance", icon: "✅", label: "Compliance", sub: "97.3% compliant" },
                ].map(item => (
                  <Link key={item.href} href={item.href} style={{
                    display: "flex", alignItems: "center", gap: "0.625rem",
                    padding: "0.875rem 1rem", borderRadius: "12px",
                    background: "rgba(15,22,41,0.7)", border: "1px solid rgba(59,130,246,0.1)",
                    textDecoration: "none", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(15,22,41,0.9)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.1)"; (e.currentTarget as HTMLElement).style.background = "rgba(15,22,41,0.7)"; }}
                  >
                    <span style={{ fontSize: "1.375rem" }}>{item.icon}</span>
                    <div>
                      <p style={{ color: "white", fontWeight: "600", fontSize: "0.825rem", margin: "0 0 0.1rem" }}>{item.label}</p>
                      <p style={{ color: "#334155", fontSize: "0.725rem", margin: 0 }}>{item.sub}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Live bids — full width */}
          <div style={{ marginTop: "1.75rem" }}>
            <BidsTable />
          </div>
        </main>
      </div>
    </div>
  );
}
