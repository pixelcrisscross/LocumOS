"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import ShiftCard, { ShiftCardData } from "@/components/shared/ShiftCard";
import EmptyState from "@/components/shared/EmptyState";

type SortKey = "pay" | "date" | "bids";

function mapApiShift(s: any): ShiftCardData {
  const words = (s.hospitalId ?? "H").split("-");
  const initials = words.map((w: string) => w[0]?.toUpperCase() ?? "").join("").slice(0, 2) || "HX";
  return {
    id: s.shiftId,
    hospital: s.hospitalName ?? s.hospitalId ?? "Hospital",
    hospitalInitials: initials,
    hospitalType: "Healthcare",
    specialty: s.specialty,
    payRate: Number(s.payRate),
    date: s.date,
    time: s.time,
    duration: s.duration ?? "8 hr",
    location: s.location,
    distance: "",
    urgency: s.urgency === "urgent" ? "urgent" : s.urgency === "high" ? "high" : "normal",
    seatsLeft: s.seatsLeft ?? 1,
    bidsCount: s.bidsCount ?? 0,
    skills: [],
    postedAgo: timeAgo(s.createdAt),
  };
}

function timeAgo(iso: string) {
  if (!iso) return "Recently";
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function ShiftFeed() {
  const { data: session } = useSession();
  const [shifts, setShifts] = useState<ShiftCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState<SortKey>("date");
  const [filter, setFilter] = useState<string>("all");

  const fetchShifts = useCallback(async () => {
    try {
      const res = await fetch("/api/shifts/list");
      if (!res.ok) throw new Error("Failed to fetch shifts");
      const data = await res.json();
      setShifts((data.shifts ?? []).map(mapApiShift));
      setError("");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShifts();
    // Refresh every 30 seconds
    const interval = setInterval(fetchShifts, 30000);
    return () => clearInterval(interval);
  }, [fetchShifts]);

  const specialties = ["all", ...Array.from(new Set(shifts.map(s => s.specialty)))];

  const sorted = [...shifts]
    .filter(s => filter === "all" || s.specialty === filter)
    .sort((a, b) => {
      if (sort === "pay") return b.payRate - a.payRate;
      if (sort === "bids") return (b.bidsCount ?? 0) - (a.bidsCount ?? 0);
      return 0; // date: keep DB order (newest first from API)
    });

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.875rem", padding: "5rem", color: "#334155" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" style={{ animation: "orbit-spin 0.8s linear infinite" }}>
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        <span style={{ fontSize: "0.9rem" }}>Loading shifts from DynamoDB…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "12px", padding: "1.5rem", color: "#f87171", textAlign: "center" }}>
        <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Failed to load shifts</p>
        <p style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "1rem" }}>{error}</p>
        <button onClick={fetchShifts} style={{ background: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.25)", padding: "0.5rem 1.25rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.875rem", fontFamily: "inherit" }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {/* Specialty filter */}
        <div style={{ display: "flex", gap: "0.25rem", background: "rgba(15,22,41,0.7)", padding: "0.25rem", borderRadius: "10px", border: "1px solid rgba(59,130,246,0.1)", flexWrap: "wrap" }}>
          {specialties.slice(0, 5).map(sp => (
            <button key={sp} onClick={() => setFilter(sp)} style={{
              padding: "0.35rem 0.875rem", borderRadius: "8px", border: "none",
              background: filter === sp ? "rgba(59,130,246,0.18)" : "transparent",
              color: filter === sp ? "#60a5fa" : "#475569",
              fontSize: "0.8rem", fontWeight: filter === sp ? "600" : "500",
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s",
            }}>
              {sp === "all" ? `All Shifts (${shifts.length})` : sp}
            </button>
          ))}
        </div>

        {/* Sort + refresh */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "#334155", fontSize: "0.775rem", fontWeight: "500" }}>Sort:</span>
          {(["date", "pay", "bids"] as SortKey[]).map(s => (
            <button key={s} onClick={() => setSort(s)} style={{
              padding: "0.3rem 0.75rem", borderRadius: "7px",
              border: sort === s ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(59,130,246,0.08)",
              background: sort === s ? "rgba(59,130,246,0.1)" : "transparent",
              color: sort === s ? "#60a5fa" : "#334155",
              fontSize: "0.775rem", fontWeight: sort === s ? "600" : "500",
              cursor: "pointer", transition: "all 0.18s", fontFamily: "inherit",
            }}>
              {s === "pay" ? "Pay Rate" : s === "bids" ? "Most Bids" : "Latest"}
            </button>
          ))}
          <button onClick={fetchShifts} title="Refresh" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: "7px", color: "#60a5fa", padding: "0.3rem 0.6rem", cursor: "pointer", fontSize: "0.875rem", fontFamily: "inherit" }}>
            ↺
          </button>
        </div>
      </div>

      {/* Grid */}
      {sorted.length === 0 ? (
        <EmptyState
          title="No shifts available"
          description="Check back soon — new shifts are posted every few minutes."
          icon="shifts"
        />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1rem" }}>
          {sorted.map(shift => <ShiftCard key={shift.id} shift={shift} mode="doctor" />)}
        </div>
      )}
    </div>
  );
}
