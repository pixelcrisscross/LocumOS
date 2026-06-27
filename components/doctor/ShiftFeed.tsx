"use client";

import { useState } from "react";
import ShiftCard, { ShiftCardData } from "@/components/shared/ShiftCard";

const shifts: ShiftCardData[] = [
  {
    id: "s1",
    hospital: "Apollo Hospitals",
    hospitalInitials: "AH",
    hospitalType: "Multi-speciality",
    specialty: "Emergency Medicine",
    payRate: 4500,
    date: "Today",
    time: "8:00 PM – 8:00 AM",
    duration: "12 hr",
    location: "Bannerghatta Road, Bengaluru",
    distance: "1.2 km",
    urgency: "urgent",
    seatsLeft: 1,
    bidsCount: 4,
    skills: ["ICU", "Trauma"],
    postedAgo: "8 min ago",
  },
  {
    id: "s2",
    hospital: "Manipal Hospital",
    hospitalInitials: "MH",
    hospitalType: "Tertiary Care",
    specialty: "Emergency Medicine",
    payRate: 3800,
    date: "Tomorrow",
    time: "7:00 AM – 7:00 PM",
    duration: "12 hr",
    location: "Old Airport Rd, Bengaluru",
    distance: "3.4 km",
    urgency: "high",
    seatsLeft: 2,
    bidsCount: 7,
    skills: ["ACLS", "Paeds EM"],
    postedAgo: "32 min ago",
  },
  {
    id: "s3",
    hospital: "Fortis Hospital",
    hospitalInitials: "FH",
    hospitalType: "Super-speciality",
    specialty: "Anaesthesiology",
    payRate: 5200,
    date: "27 Jun",
    time: "6:00 AM – 2:00 PM",
    duration: "8 hr",
    location: "Cunningham Rd, Bengaluru",
    distance: "4.8 km",
    urgency: "normal",
    seatsLeft: 1,
    bidsCount: 2,
    skills: ["General Anaesthesia", "Spinal"],
    postedAgo: "1 hr ago",
  },
  {
    id: "s4",
    hospital: "Narayana Health",
    hospitalInitials: "NH",
    hospitalType: "Cardiac Centre",
    specialty: "Cardiology",
    payRate: 6000,
    date: "28 Jun",
    time: "9:00 AM – 5:00 PM",
    duration: "8 hr",
    location: "Hosur Rd, Bengaluru",
    distance: "6.1 km",
    urgency: "normal",
    seatsLeft: 3,
    bidsCount: 1,
    skills: ["Echocardiography", "STEMI"],
    postedAgo: "2 hr ago",
  },
  {
    id: "s5",
    hospital: "Columbia Asia",
    hospitalInitials: "CA",
    hospitalType: "Multi-speciality",
    specialty: "General Medicine",
    payRate: 2800,
    date: "29 Jun",
    time: "2:00 PM – 10:00 PM",
    duration: "8 hr",
    location: "Yeshwanthpur, Bengaluru",
    distance: "8.9 km",
    urgency: "normal",
    seatsLeft: 2,
    bidsCount: 9,
    skills: ["OPD", "Ward rounds"],
    postedAgo: "3 hr ago",
  },
  {
    id: "s6",
    hospital: "Sakra World Hospital",
    hospitalInitials: "SW",
    hospitalType: "Super-speciality",
    specialty: "Neurology",
    payRate: 5500,
    date: "30 Jun",
    time: "8:00 AM – 4:00 PM",
    duration: "8 hr",
    location: "Bellandur, Bengaluru",
    distance: "11.2 km",
    urgency: "high",
    seatsLeft: 1,
    bidsCount: 3,
    skills: ["Stroke", "Epilepsy"],
    postedAgo: "4 hr ago",
  },
];

type SortKey = "distance" | "pay" | "date";
type FilterKey = "all" | string;

export default function ShiftFeed() {
  const [sort, setSort] = useState<SortKey>("distance");
  const [filter, setFilter] = useState<FilterKey>("all");

  const specialties = ["all", ...Array.from(new Set(shifts.map(s => s.specialty)))];

  const sorted = [...shifts]
    .filter(s => filter === "all" || s.specialty === filter)
    .sort((a, b) => {
      if (sort === "distance") return parseFloat(a.distance ?? "99") - parseFloat(b.distance ?? "99");
      if (sort === "pay") return b.payRate - a.payRate;
      return 0;
    });

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {/* Specialty filter */}
        <div style={{ display: "flex", gap: "0.25rem", background: "rgba(15,22,41,0.7)", padding: "0.25rem", borderRadius: "10px", border: "1px solid rgba(59,130,246,0.1)", flexWrap: "wrap" }}>
          {specialties.slice(0, 4).map(sp => (
            <button key={sp} onClick={() => setFilter(sp)} style={{
              padding: "0.35rem 0.875rem", borderRadius: "8px", border: "none",
              background: filter === sp ? "rgba(59,130,246,0.18)" : "transparent",
              color: filter === sp ? "#60a5fa" : "#475569",
              fontSize: "0.8rem", fontWeight: filter === sp ? "600" : "500",
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s",
            }}>
              {sp === "all" ? `All (${shifts.length})` : sp}
            </button>
          ))}
        </div>

        {/* Sort controls */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.375rem" }}>
          <span style={{ color: "#334155", fontSize: "0.775rem", fontWeight: "500" }}>Sort:</span>
          {(["distance", "pay", "date"] as SortKey[]).map(s => (
            <button key={s} onClick={() => setSort(s)} style={{
              padding: "0.3rem 0.75rem", borderRadius: "7px",
              border: sort === s ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(59,130,246,0.08)",
              background: sort === s ? "rgba(59,130,246,0.1)" : "transparent",
              color: sort === s ? "#60a5fa" : "#334155",
              fontSize: "0.775rem", fontWeight: sort === s ? "600" : "500",
              cursor: "pointer", transition: "all 0.18s", fontFamily: "inherit",
            }}>
              {s === "pay" ? "Pay Rate" : s === "distance" ? "Distance" : "Date"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1rem" }}>
        {sorted.map(shift => (
          <ShiftCard key={shift.id} shift={shift} mode="doctor" />
        ))}
      </div>
    </div>
  );
}
