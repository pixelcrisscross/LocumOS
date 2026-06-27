"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BidStatus = "pending" | "accepted" | "rejected";
type ShiftStatus = "Open" | "Filled" | "Expired" | "Urgent";

interface Bid {
  id: string;
  doctorName: string;
  specialty: string;
  rating: number;
  yearsExp: number;
  bidPrice: number;
  distance: string;
  status: BidStatus;
  shiftStatus: ShiftStatus;
  avatar: string;
  hospital: string;
  responseTime: string;
}

const initialBids: Bid[] = [
  {
    id: "b1",
    doctorName: "Dr. Priya Nair",
    specialty: "Emergency Medicine",
    rating: 4.9,
    yearsExp: 12,
    bidPrice: 4200,
    distance: "1.2 km",
    status: "pending",
    shiftStatus: "Urgent",
    avatar: "PN",
    hospital: "Manipal Hosp. (prev.)",
    responseTime: "2 min ago",
  },
  {
    id: "b2",
    doctorName: "Dr. Arjun Mehta",
    specialty: "Emergency Medicine",
    rating: 4.7,
    yearsExp: 8,
    bidPrice: 3800,
    distance: "3.4 km",
    status: "pending",
    shiftStatus: "Open",
    avatar: "AM",
    hospital: "Fortis (prev.)",
    responseTime: "5 min ago",
  },
  {
    id: "b3",
    doctorName: "Dr. Kavya Sharma",
    specialty: "Emergency Medicine",
    rating: 5.0,
    yearsExp: 15,
    bidPrice: 5000,
    distance: "4.1 km",
    status: "accepted",
    shiftStatus: "Filled",
    avatar: "KS",
    hospital: "AIIMS Delhi (prev.)",
    responseTime: "8 min ago",
  },
  {
    id: "b4",
    doctorName: "Dr. Rahul Verma",
    specialty: "General Surgery",
    rating: 4.5,
    yearsExp: 6,
    bidPrice: 3500,
    distance: "6.7 km",
    status: "rejected",
    shiftStatus: "Expired",
    avatar: "RV",
    hospital: "Max Health (prev.)",
    responseTime: "22 min ago",
  },
  {
    id: "b5",
    doctorName: "Dr. Ananya Iyer",
    specialty: "Anaesthesiology",
    rating: 4.8,
    yearsExp: 10,
    bidPrice: 4600,
    distance: "2.0 km",
    status: "pending",
    shiftStatus: "Open",
    avatar: "AI",
    hospital: "Apollo (prev.)",
    responseTime: "Just now",
  },
  {
    id: "b6",
    doctorName: "Dr. Vikram Singh",
    specialty: "Cardiology",
    rating: 4.6,
    yearsExp: 14,
    bidPrice: 5500,
    distance: "8.2 km",
    status: "pending",
    shiftStatus: "Open",
    avatar: "VS",
    hospital: "Narayana (prev.)",
    responseTime: "11 min ago",
  },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i <= full ? "#fbbf24" : i === full + 1 && half ? "url(#half)" : "none"}
          stroke={i <= full || (i === full + 1 && half) ? "#fbbf24" : "#1e293b"}
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span style={{ color: "#94a3b8", fontSize: "0.775rem", marginLeft: "3px", fontWeight: "500" }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function ShiftBadge({ status }: { status: ShiftStatus }) {
  const classMap: Record<ShiftStatus, string> = {
    Open: "status-open",
    Filled: "status-filled",
    Expired: "status-expired",
    Urgent: "status-urgent",
  };
  const dotColors: Record<ShiftStatus, string> = {
    Open: "#3b82f6",
    Filled: "#4ade80",
    Expired: "#64748b",
    Urgent: "#ef4444",
  };
  return (
    <span className={classMap[status]}>
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: dotColors[status], display: "inline-block" }} />
      {status}
    </span>
  );
}

type FilterType = "all" | "pending" | "accepted" | "rejected";

export default function BidsTable() {
  const [bids, setBids] = useState<Bid[]>(initialBids);
  const [filter, setFilter] = useState<FilterType>("all");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const handleAccept = (id: string) => {
    setBids((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "accepted", shiftStatus: "Filled" } : b
      )
    );
  };

  const handleReject = (id: string) => {
    setBids((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "rejected" } : b))
    );
  };

  const filtered = filter === "all" ? bids : bids.filter((b) => b.status === filter);

  const filterTabs: { id: FilterType; label: string }[] = [
    { id: "all", label: `All (${bids.length})` },
    { id: "pending", label: `Pending (${bids.filter(b => b.status === "pending").length})` },
    { id: "accepted", label: `Accepted (${bids.filter(b => b.status === "accepted").length})` },
    { id: "rejected", label: `Rejected (${bids.filter(b => b.status === "rejected").length})` },
  ];

  return (
    <Card
      id="live-bids-table"
      style={{
        background: "rgba(15,22,41,0.85)",
        border: "1px solid rgba(59,130,246,0.14)",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <CardHeader style={{ padding: "1.375rem 1.75rem 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10"/>
                <line x1="18" y1="20" x2="18" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="16"/>
              </svg>
            </div>
            <div>
              <CardTitle style={{ color: "white", fontSize: "1rem", fontWeight: "700", letterSpacing: "-0.02em" }}>
                Live Bids
              </CardTitle>
              <p style={{ color: "#475569", fontSize: "0.775rem", margin: 0 }}>
                Real-time doctor bids on your posted shifts
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.5)" }} />
            <span style={{ color: "#4ade80", fontSize: "0.775rem", fontWeight: "500" }}>Live</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "0.25rem", background: "rgba(10,14,26,0.5)", padding: "0.25rem", borderRadius: "10px", width: "fit-content" }}>
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              style={{
                padding: "0.35rem 0.875rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: "500",
                transition: "all 0.18s",
                background: filter === tab.id ? "rgba(59,130,246,0.18)" : "transparent",
                color: filter === tab.id ? "#60a5fa" : "#475569",
                letterSpacing: "-0.01em",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent style={{ padding: "1rem 0 0" }}>
        <Table>
          <TableHeader>
            <TableRow style={{ borderBottom: "1px solid rgba(59,130,246,0.1)", background: "rgba(10,14,26,0.4)" }}>
              {["Doctor", "Rating", "Experience", "Specialty", "Bid Price", "Shift Status", "Action"].map((h) => (
                <TableHead
                  key={h}
                  style={{
                    color: "#334155",
                    fontSize: "0.7rem",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "0.75rem 1.25rem",
                  }}
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: "center", padding: "3rem", color: "#334155" }}>
                  No bids match this filter.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((bid) => (
                <TableRow
                  key={bid.id}
                  className="bid-row"
                  onMouseEnter={() => setHoveredRow(bid.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    background: hoveredRow === bid.id ? "rgba(59,130,246,0.04)" : "transparent",
                    opacity: bid.status === "rejected" ? 0.55 : 1,
                    transition: "all 0.15s ease",
                  }}
                >
                  {/* Doctor */}
                  <TableCell style={{ padding: "1rem 1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "36px", height: "36px", borderRadius: "10px",
                        background: "linear-gradient(135deg, #3b82f620, #6366f120)",
                        border: "1px solid rgba(59,130,246,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.7rem", fontWeight: "700", color: "#60a5fa",
                        flexShrink: 0,
                      }}>
                        {bid.avatar}
                      </div>
                      <div>
                        <p style={{ color: "white", fontSize: "0.875rem", fontWeight: "600", margin: 0, letterSpacing: "-0.01em" }}>
                          {bid.doctorName}
                        </p>
                        <p style={{ color: "#334155", fontSize: "0.725rem", margin: 0 }}>
                          {bid.hospital} · {bid.distance} · {bid.responseTime}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Rating */}
                  <TableCell style={{ padding: "1rem 1.25rem" }}>
                    <StarRating rating={bid.rating} />
                  </TableCell>

                  {/* Experience */}
                  <TableCell style={{ padding: "1rem 1.25rem" }}>
                    <span style={{ color: "#94a3b8", fontSize: "0.875rem", fontWeight: "500" }}>
                      {bid.yearsExp} yrs
                    </span>
                  </TableCell>

                  {/* Specialty */}
                  <TableCell style={{ padding: "1rem 1.25rem" }}>
                    <Badge
                      style={{
                        background: "rgba(59,130,246,0.1)",
                        color: "#93c5fd",
                        border: "1px solid rgba(59,130,246,0.2)",
                        fontSize: "0.725rem",
                        fontWeight: "500",
                        borderRadius: "6px",
                        padding: "0.15rem 0.625rem",
                      }}
                    >
                      {bid.specialty}
                    </Badge>
                  </TableCell>

                  {/* Bid Price */}
                  <TableCell style={{ padding: "1rem 1.25rem" }}>
                    <span style={{ color: "white", fontSize: "0.925rem", fontWeight: "700", letterSpacing: "-0.02em" }}>
                      ₹{bid.bidPrice.toLocaleString()}
                      <span style={{ color: "#475569", fontWeight: "400", fontSize: "0.75rem" }}>/hr</span>
                    </span>
                  </TableCell>

                  {/* Shift Status */}
                  <TableCell style={{ padding: "1rem 1.25rem" }}>
                    <ShiftBadge status={bid.shiftStatus} />
                  </TableCell>

                  {/* Actions */}
                  <TableCell style={{ padding: "1rem 1.25rem" }}>
                    {bid.status === "accepted" ? (
                      <span className="status-filled">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <polyline points="2 6 5 9 10 3" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Accepted
                      </span>
                    ) : bid.status === "rejected" ? (
                      <span className="status-expired">Rejected</span>
                    ) : (
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <Button
                          size="sm"
                          id={`accept-bid-${bid.id}`}
                          onClick={() => handleAccept(bid.id)}
                          style={{
                            background: "rgba(34,197,94,0.12)",
                            color: "#4ade80",
                            border: "1px solid rgba(34,197,94,0.25)",
                            borderRadius: "7px",
                            fontSize: "0.775rem",
                            fontWeight: "600",
                            padding: "0.3rem 0.75rem",
                            height: "auto",
                            cursor: "pointer",
                            transition: "all 0.18s",
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.22)";
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.45)";
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.12)";
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.25)";
                          }}
                        >
                          ✓ Accept
                        </Button>
                        <Button
                          size="sm"
                          id={`reject-bid-${bid.id}`}
                          onClick={() => handleReject(bid.id)}
                          style={{
                            background: "rgba(239,68,68,0.08)",
                            color: "#f87171",
                            border: "1px solid rgba(239,68,68,0.2)",
                            borderRadius: "7px",
                            fontSize: "0.775rem",
                            fontWeight: "600",
                            padding: "0.3rem 0.75rem",
                            height: "auto",
                            cursor: "pointer",
                            transition: "all 0.18s",
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.18)";
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(239,68,68,0.4)";
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)";
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(239,68,68,0.2)";
                          }}
                        >
                          ✕ Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Footer */}
        <div style={{
          padding: "0.875rem 1.75rem",
          borderTop: "1px solid rgba(59,130,246,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <p style={{ color: "#334155", fontSize: "0.8rem", margin: 0 }}>
            Showing {filtered.length} of {bids.length} bids
          </p>
          <button style={{
            background: "transparent", border: "none", color: "#3b82f6",
            fontSize: "0.8rem", fontWeight: "500", cursor: "pointer",
            letterSpacing: "-0.01em",
          }}>
            View all bids →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
