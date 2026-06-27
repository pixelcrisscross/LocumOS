"use client";

import DoctorSidebar from "@/components/doctor/DoctorSidebar";
import Header from "@/components/shared/Header";
import ShiftFeed from "@/components/doctor/ShiftFeed";
import MyBids from "@/components/doctor/MyBids";

export default function DoctorDashboardPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0e1a", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <DoctorSidebar />
      <div style={{ flex: 1, marginLeft: "300px", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header
          title="Available Shifts"
          subtitle="Bengaluru, KA — 12 shifts near you"
          mode="doctor"
          userName="Dr. Priya Nair"
          userRole="Emergency Medicine"
          userInitials="PN"
          actions={
            <div style={{ position: "relative" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                placeholder="Search specialty…"
                style={{
                  background: "rgba(15,22,41,0.8)",
                  border: "1px solid rgba(59,130,246,0.14)",
                  borderRadius: "10px",
                  color: "#f1f5f9",
                  fontSize: "0.875rem",
                  padding: "0.5rem 0.875rem 0.5rem 2.25rem",
                  outline: "none",
                  width: "200px",
                  fontFamily: "inherit",
                }}
              />
            </div>
          }
        />
        <main style={{ padding: "1.75rem 2.5rem", flex: 1 }}>
          <ShiftFeed />
          <div style={{ marginTop: "2.5rem" }}>
            <MyBids />
          </div>
        </main>
      </div>
    </div>
  );
}
