"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BidStatus = "Pending" | "Accepted" | "Rejected";

interface MyBid {
  id: string;
  hospital: string;
  specialty: string;
  shiftDate: string;
  shiftTime: string;
  listedRate: number;
  myBidRate: number;
  status: BidStatus;
  submittedAgo: string;
  responseNote?: string;
  earnings?: number;
  duration: string;
}

const myBids: MyBid[] = [
  {
    id: "mb1",
    hospital: "Apollo Hospitals",
    specialty: "Emergency Medicine",
    shiftDate: "Today",
    shiftTime: "8:00 PM – 8:00 AM",
    listedRate: 4500,
    myBidRate: 4200,
    status: "Pending",
    submittedAgo: "12 min ago",
    duration: "12 hr",
  },
  {
    id: "mb2",
    hospital: "Manipal Hospital",
    specialty: "Emergency Medicine",
    shiftDate: "24 Jun",
    shiftTime: "7:00 AM – 7:00 PM",
    listedRate: 3800,
    myBidRate: 3600,
    status: "Accepted",
    submittedAgo: "2 days ago",
    responseNote: "Great profile! Please arrive 15 min early for handover.",
    earnings: 43200,
    duration: "12 hr",
  },
  {
    id: "mb3",
    hospital: "Fortis Hospital",
    specialty: "Anaesthesiology",
    shiftDate: "20 Jun",
    shiftTime: "6:00 AM – 2:00 PM",
    listedRate: 5200,
    myBidRate: 5500,
    status: "Rejected",
    submittedAgo: "6 days ago",
    responseNote: "We selected a candidate with specific OT experience for this shift.",
    duration: "8 hr",
  },
  {
    id: "mb4",
    hospital: "Narayana Health",
    specialty: "Cardiology",
    shiftDate: "28 Jun",
    shiftTime: "9:00 AM – 5:00 PM",
    listedRate: 6000,
    myBidRate: 5800,
    status: "Pending",
    submittedAgo: "1 hr ago",
    duration: "8 hr",
  },
];

const statusConfig: Record<BidStatus, { bg: string; color: string; border: string; dot: string; icon: React.ReactNode }> = {
  Pending: {
    bg: "rgba(251,191,36,0.1)",
    color: "#fbbf24",
    border: "rgba(251,191,36,0.25)",
    dot: "#fbbf24",
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  Accepted: {
    bg: "rgba(74,222,128,0.1)",
    color: "#4ade80",
    border: "rgba(74,222,128,0.25)",
    dot: "#4ade80",
    icon: (
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <polyline points="2 6 5 9 10 3" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  Rejected: {
    bg: "rgba(100,116,139,0.1)",
    color: "#64748b",
    border: "rgba(100,116,139,0.2)",
    dot: "#64748b",
    icon: (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <line x1="2" y1="2" x2="8" y2="8" stroke="#64748b" strokeWidth="1.75" strokeLinecap="round"/>
        <line x1="8" y1="2" x2="2" y2="8" stroke="#64748b" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    ),
  },
};

function BidCard({ bid }: { bid: MyBid }) {
  const [expanded, setExpanded] = useState(bid.status === "Accepted");
  const cfg = statusConfig[bid.status];
  const rateVsListed = bid.myBidRate - bid.listedRate;

  return (
    <div
      id={`my-bid-${bid.id}`}
      style={{
        background: "rgba(15,22,41,0.85)",
        border: `1px solid ${bid.status === "Accepted" ? "rgba(74,222,128,0.15)" : bid.status === "Rejected" ? "rgba(100,116,139,0.1)" : "rgba(59,130,246,0.12)"}`,
        borderRadius: "14px",
        overflow: "hidden",
        transition: "all 0.22s ease",
        opacity: bid.status === "Rejected" ? 0.7 : 1,
      }}
    >
      {/* Status stripe */}
      <div style={{
        height: "2px",
        background: bid.status === "Accepted"
          ? "linear-gradient(90deg, transparent, #4ade80, transparent)"
          : bid.status === "Rejected"
          ? "transparent"
          : "linear-gradient(90deg, transparent, #fbbf24, transparent)",
      }} />

      <div style={{ padding: "1.125rem 1.375rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          {/* Hospital info */}
          <div>
            <p style={{ color: "white", fontWeight: "700", fontSize: "0.9375rem", margin: "0 0 0.15rem", letterSpacing: "-0.02em" }}>
              {bid.hospital}
            </p>
            <p style={{ color: "#475569", fontSize: "0.8rem", margin: 0 }}>
              {bid.specialty} · {bid.shiftDate} · {bid.shiftTime}
            </p>
          </div>

          {/* Status badge */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.375rem" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              background: cfg.bg,
              color: cfg.color,
              border: `1px solid ${cfg.border}`,
              fontSize: "0.7rem", fontWeight: "700",
              padding: "0.2rem 0.625rem", borderRadius: "100px",
              letterSpacing: "0.04em", textTransform: "uppercase",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />
              {bid.status}
            </span>
            <span style={{ color: "#334155", fontSize: "0.7rem" }}>{bid.submittedAgo}</span>
          </div>
        </div>

        {/* Bid details row */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <div>
            <span style={{ color: "#334155", fontSize: "0.725rem", display: "block", marginBottom: "0.1rem" }}>My bid</span>
            <span style={{ color: "white", fontWeight: "750", fontSize: "1rem", letterSpacing: "-0.03em" }}>
              ₹{bid.myBidRate.toLocaleString()}<span style={{ color: "#334155", fontWeight: "400", fontSize: "0.75rem" }}>/hr</span>
            </span>
          </div>
          <div style={{ width: "1px", height: "30px", background: "rgba(59,130,246,0.1)" }} />
          <div>
            <span style={{ color: "#334155", fontSize: "0.725rem", display: "block", marginBottom: "0.1rem" }}>Listed rate</span>
            <span style={{ color: "#64748b", fontWeight: "600", fontSize: "0.9rem" }}>
              ₹{bid.listedRate.toLocaleString()}/hr
            </span>
          </div>
          <div style={{ width: "1px", height: "30px", background: "rgba(59,130,246,0.1)" }} />
          <div>
            <span style={{ color: "#334155", fontSize: "0.725rem", display: "block", marginBottom: "0.1rem" }}>vs Listed</span>
            <span style={{ color: rateVsListed < 0 ? "#4ade80" : rateVsListed > 0 ? "#f87171" : "#64748b", fontWeight: "600", fontSize: "0.875rem" }}>
              {rateVsListed > 0 ? "+" : ""}{rateVsListed < 0 ? "−" : ""}₹{Math.abs(rateVsListed).toLocaleString()}
            </span>
          </div>
          {bid.status === "Accepted" && bid.earnings && (
            <>
              <div style={{ width: "1px", height: "30px", background: "rgba(59,130,246,0.1)" }} />
              <div>
                <span style={{ color: "#334155", fontSize: "0.725rem", display: "block", marginBottom: "0.1rem" }}>Total earned</span>
                <span style={{ color: "#4ade80", fontWeight: "750", fontSize: "1rem", letterSpacing: "-0.03em" }}>
                  ₹{bid.earnings.toLocaleString()}
                </span>
              </div>
            </>
          )}
          <Badge style={{
            marginLeft: "auto",
            background: "rgba(251,146,60,0.1)",
            color: "#fb923c",
            border: "1px solid rgba(251,146,60,0.2)",
            fontSize: "0.7rem", fontWeight: "500",
          }}>
            ⏱ {bid.duration}
          </Badge>
        </div>

        {/* Expanded: response note */}
        {bid.responseNote && (
          <div style={{
            padding: "0.75rem 0.875rem",
            borderRadius: "10px",
            background: bid.status === "Accepted" ? "rgba(74,222,128,0.05)" : "rgba(71,85,105,0.1)",
            border: `1px solid ${bid.status === "Accepted" ? "rgba(74,222,128,0.15)" : "rgba(71,85,105,0.15)"}`,
            marginBottom: "0.75rem",
          }}>
            <p style={{ color: "#334155", fontSize: "0.725rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 0.3rem" }}>
              Hospital Response
            </p>
            <p style={{ color: bid.status === "Accepted" ? "#94a3b8" : "#475569", fontSize: "0.825rem", margin: 0, lineHeight: 1.55 }}>
              "{bid.responseNote}"
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {bid.status === "Accepted" && (
            <button style={{
              flex: 1,
              height: "34px",
              borderRadius: "8px",
              background: "rgba(74,222,128,0.12)",
              border: "1px solid rgba(74,222,128,0.25)",
              color: "#4ade80",
              fontSize: "0.8rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem",
              fontFamily: "inherit",
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.9 12.93a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.81 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Contact Hospital
            </button>
          )}
          {bid.status === "Pending" && (
            <button style={{
              height: "34px",
              padding: "0 0.875rem",
              borderRadius: "8px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.15)",
              color: "#f87171",
              fontSize: "0.8rem",
              fontWeight: "500",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.18s",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.15)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)";
              }}
            >
              Withdraw Bid
            </button>
          )}
          {bid.status === "Rejected" && (
            <button style={{
              height: "34px",
              padding: "0 0.875rem",
              borderRadius: "8px",
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              color: "#60a5fa",
              fontSize: "0.8rem",
              fontWeight: "500",
              cursor: "pointer",
              fontFamily: "inherit",
            }}>
              Find Similar Shifts
            </button>
          )}
          <button style={{
            height: "34px",
            padding: "0 0.875rem",
            borderRadius: "8px",
            border: "1px solid rgba(59,130,246,0.1)",
            background: "transparent",
            color: "#475569",
            fontSize: "0.8rem",
            fontWeight: "500",
            cursor: "pointer",
            fontFamily: "inherit",
          }}>
            View Shift
          </button>
        </div>
      </div>
    </div>
  );
}

type BidFilter = "all" | "Pending" | "Accepted" | "Rejected";

export default function MyBids() {
  const [filter, setFilter] = useState<BidFilter>("all");

  const filtered = filter === "all" ? myBids : myBids.filter(b => b.status === filter);
  const counts = {
    all: myBids.length,
    Pending: myBids.filter(b => b.status === "Pending").length,
    Accepted: myBids.filter(b => b.status === "Accepted").length,
    Rejected: myBids.filter(b => b.status === "Rejected").length,
  };

  // Total earned across accepted bids
  const totalEarned = myBids
    .filter(b => b.status === "Accepted" && b.earnings)
    .reduce((sum, b) => sum + (b.earnings ?? 0), 0);

  return (
    <Card
      id="my-bids-section"
      style={{
        background: "rgba(15,22,41,0.85)",
        border: "1px solid rgba(59,130,246,0.12)",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <CardHeader style={{ padding: "1.375rem 1.75rem 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10"/>
                <line x1="18" y1="20" x2="18" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="16"/>
              </svg>
            </div>
            <div>
              <CardTitle style={{ color: "white", fontSize: "1rem", fontWeight: "700", letterSpacing: "-0.02em" }}>
                My Bids
              </CardTitle>
              <p style={{ color: "#475569", fontSize: "0.775rem", margin: 0 }}>
                Track your submitted bids and their status
              </p>
            </div>
          </div>
          {totalEarned > 0 && (
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "#334155", fontSize: "0.7rem", margin: "0 0 0.1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Total Earned
              </p>
              <p style={{ color: "#4ade80", fontWeight: "750", fontSize: "1.125rem", letterSpacing: "-0.03em", margin: 0 }}>
                ₹{totalEarned.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "0.25rem", background: "rgba(10,14,26,0.5)", padding: "0.25rem", borderRadius: "10px", width: "fit-content" }}>
          {(["all", "Pending", "Accepted", "Rejected"] as BidFilter[]).map(f => {
            const colors: Record<BidFilter, string> = {
              all: "#60a5fa",
              Pending: "#fbbf24",
              Accepted: "#4ade80",
              Rejected: "#64748b",
            };
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "0.35rem 0.875rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: "500",
                  transition: "all 0.18s",
                  background: filter === f ? `${colors[f]}18` : "transparent",
                  color: filter === f ? colors[f] : "#475569",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                {f === "all" ? "All" : f}
                <span style={{
                  background: filter === f ? `${colors[f]}25` : "rgba(255,255,255,0.05)",
                  color: filter === f ? colors[f] : "#334155",
                  fontSize: "0.675rem",
                  fontWeight: "700",
                  padding: "0.05rem 0.4rem",
                  borderRadius: "100px",
                }}>
                  {counts[f]}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent style={{ padding: "1.25rem 1.75rem 1.75rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2.5rem", color: "#334155", fontSize: "0.875rem" }}>
              No bids in this category yet.
            </div>
          ) : (
            filtered.map(bid => <BidCard key={bid.id} bid={bid} />)
          )}
        </div>
      </CardContent>
    </Card>
  );
}
