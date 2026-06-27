"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/shared/Header";
import EmptyState from "@/components/shared/EmptyState";
import ShiftCard, { ShiftCardData } from "@/components/shared/ShiftCard";
import { useState } from "react";

const allShifts: ShiftCardData[] = [
  { id: "sh1", hospital: "Apollo Hospitals", hospitalInitials: "AH", hospitalType: "Multi-speciality", specialty: "Emergency Medicine", payRate: 4500, date: "Today", time: "8:00 PM – 8:00 AM", duration: "12 hr", location: "Bannerghatta Rd", distance: "1.2 km", urgency: "urgent", seatsLeft: 1, bidsCount: 4, skills: ["ICU", "Trauma"], postedAgo: "8 min ago", status: "Open" },
  { id: "sh2", hospital: "Manipal Hospital", hospitalInitials: "MH", hospitalType: "Tertiary Care", specialty: "Emergency Medicine", payRate: 3800, date: "Tomorrow", time: "7:00 AM – 7:00 PM", duration: "12 hr", location: "Old Airport Rd", urgency: "high", seatsLeft: 2, bidsCount: 7, skills: ["ACLS"], postedAgo: "32 min ago", status: "Open" },
  { id: "sh3", hospital: "Fortis Hospital", hospitalInitials: "FH", hospitalType: "Super-speciality", specialty: "Anaesthesiology", payRate: 5200, date: "27 Jun", time: "6:00 AM – 2:00 PM", duration: "8 hr", location: "Cunningham Rd", urgency: "normal", seatsLeft: 1, bidsCount: 2, skills: ["General Anaesthesia"], postedAgo: "1 hr ago", status: "Filled" },
  { id: "sh4", hospital: "Narayana Health", hospitalInitials: "NH", hospitalType: "Cardiac Centre", specialty: "Cardiology", payRate: 6000, date: "28 Jun", time: "9:00 AM – 5:00 PM", duration: "8 hr", location: "Hosur Rd", urgency: "normal", seatsLeft: 3, bidsCount: 1, skills: ["Echocardiography"], postedAgo: "2 hr ago", status: "Open" },
  { id: "sh5", hospital: "Columbia Asia", hospitalInitials: "CA", hospitalType: "Multi-speciality", specialty: "General Medicine", payRate: 2800, date: "20 Jun", time: "2:00 PM – 10:00 PM", duration: "8 hr", location: "Yeshwanthpur", urgency: "normal", seatsLeft: 0, bidsCount: 9, skills: ["OPD"], postedAgo: "6 days ago", status: "Expired" },
  { id: "sh6", hospital: "Sakra World", hospitalInitials: "SW", hospitalType: "Super-speciality", specialty: "Neurology", payRate: 5500, date: "30 Jun", time: "8:00 AM – 4:00 PM", duration: "8 hr", location: "Bellandur", urgency: "high", seatsLeft: 1, bidsCount: 3, skills: ["Stroke", "Epilepsy"], postedAgo: "4 hr ago", status: "Open" },
];

const statusColors: Record<string, string> = {
  Open: "status-open", Filled: "status-filled", Expired: "status-expired",
};

type FilterStatus = "All" | "Open" | "Filled" | "Expired";

export default function ShiftsPage() {
  const [filter, setFilter] = useState<FilterStatus>("All");
  const filtered = filter === "All" ? allShifts : allShifts.filter(s => s.status === filter);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0e1a" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "240px", display: "flex", flexDirection: "column" }}>
        <Header
          title="My Shifts"
          subtitle="Manage all posted shifts and their statuses"
          actions={
            <button className="btn-primary" style={{ fontSize: "0.85rem", padding: "0.5rem 1.25rem" }}>
              + Post New Shift
            </button>
          }
        />
        <main style={{ padding: "2rem 2.5rem", flex: 1 }}>
          {/* Status filter */}
          <div style={{ display: "flex", gap: "0.375rem", background: "rgba(15,22,41,0.6)", padding: "0.25rem", borderRadius: "10px", width: "fit-content", marginBottom: "1.5rem" }}>
            {(["All", "Open", "Filled", "Expired"] as FilterStatus[]).map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "0.35rem 1rem", borderRadius: "8px", border: "none",
                background: filter === f ? "rgba(59,130,246,0.18)" : "transparent",
                color: filter === f ? "#60a5fa" : "#475569",
                fontSize: "0.825rem", fontWeight: "500", cursor: "pointer", fontFamily: "inherit",
              }}>
                {f} <span style={{ opacity: 0.6, fontSize: "0.725rem" }}>({f === "All" ? allShifts.length : allShifts.filter(s => s.status === f).length})</span>
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon="shifts"
              title="No shifts in this category"
              description="Try a different filter or post a new shift to get started."
              action={{ label: "Post a Shift", onClick: () => {} }}
            />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "1rem" }}>
              {filtered.map(s => (
                <ShiftCard key={s.id} shift={s} mode="hospital" onAccept={id => alert(`Accepted ${id}`)} onReject={id => alert(`Rejected ${id}`)} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
