"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BidStatus = "Pending" | "Accepted" | "Rejected";
type ShiftStatus = "Open" | "Filled" | "Expired" | "Urgent";

interface Bid {
  shiftId: string;
  doctorId: string;
  doctorName: string;
  doctorEmail: string;
  specialty: string;
  bidRate: number;
  status: BidStatus;
  submittedAt: string;
  responseNote?: string;
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= full ? "#fbbf24" : "none"} stroke={i <= full ? "#fbbf24" : "#1e293b"} strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span style={{ color: "#94a3b8", fontSize: "0.775rem", marginLeft: "3px", fontWeight: "500" }}>{rating.toFixed(1)}</span>
    </div>
  );
}

function initials(name: string) {
  return name.split(" ").filter(Boolean).map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function timeAgo(iso: string) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

type FilterType = "all" | "Pending" | "Accepted" | "Rejected";

export default function BidsTable() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [actioning, setActioning] = useState<string | null>(null);

  const fetchBids = useCallback(async () => {
    try {
      const res = await fetch("/api/bids/list");
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      setBids(data.bids ?? []);
    } catch {
      setBids([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBids();
    // Poll every 15 seconds for new bids
    const interval = setInterval(fetchBids, 15000);
    return () => clearInterval(interval);
  }, [fetchBids]);

  const handleRespond = async (bid: Bid, action: "accept" | "reject") => {
    const key = `${bid.shiftId}_${bid.doctorId}`;
    setActioning(key);
    try {
      const res = await fetch("/api/bids/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shiftId: bid.shiftId, doctorId: bid.doctorId, action }),
      });
      if (!res.ok) throw new Error("Failed");
      // Optimistically update UI
      setBids(prev => prev.map(b =>
        b.shiftId === bid.shiftId && b.doctorId === bid.doctorId
          ? { ...b, status: action === "accept" ? "Accepted" : "Rejected" }
          : b
      ));
    } catch {
      alert("Failed to update bid. Please try again.");
    } finally {
      setActioning(null);
    }
  };

  const filtered = filter === "all" ? bids : bids.filter(b => b.status === filter);
  const counts = {
    all: bids.length,
    Pending: bids.filter(b => b.status === "Pending").length,
    Accepted: bids.filter(b => b.status === "Accepted").length,
    Rejected: bids.filter(b => b.status === "Rejected").length,
  };

  return (
    <Card id="live-bids-table" style={{ background: "rgba(15,22,41,0.85)", border: "1px solid rgba(59,130,246,0.14)", borderRadius: "16px", overflow: "hidden" }}>
      <CardHeader style={{ padding: "1.375rem 1.75rem 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.75" strokeLinecap="round">
                <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
              </svg>
            </div>
            <div>
              <CardTitle style={{ color: "white", fontSize: "1rem", fontWeight: "700", letterSpacing: "-0.02em" }}>Live Bids</CardTitle>
              <p style={{ color: "#475569", fontSize: "0.775rem", margin: 0 }}>Real-time doctor bids on your posted shifts · auto-refreshes every 15s</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.5)", animation: "live-pulse 2s ease-in-out infinite" }} />
            <span style={{ color: "#4ade80", fontSize: "0.775rem", fontWeight: "500" }}>Live</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.25rem", background: "rgba(10,14,26,0.5)", padding: "0.25rem", borderRadius: "10px", width: "fit-content" }}>
          {(["all", "Pending", "Accepted", "Rejected"] as FilterType[]).map(tab => (
            <button key={tab} onClick={() => setFilter(tab)} style={{
              padding: "0.35rem 0.875rem", borderRadius: "8px", border: "none", cursor: "pointer",
              fontSize: "0.8rem", fontWeight: "500", transition: "all 0.18s",
              background: filter === tab ? "rgba(59,130,246,0.18)" : "transparent",
              color: filter === tab ? "#60a5fa" : "#475569", fontFamily: "inherit",
            }}>
              {tab === "all" ? "All" : tab} ({counts[tab]})
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent style={{ padding: "1rem 0 0" }}>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", padding: "3rem", color: "#334155" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" style={{ animation: "orbit-spin 0.8s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            Loading bids from DynamoDB…
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow style={{ borderBottom: "1px solid rgba(59,130,246,0.1)", background: "rgba(10,14,26,0.4)" }}>
                {["Doctor", "Rating", "Experience", "Specialty", "Bid Price", "Submitted", "Action"].map(h => (
                  <TableHead key={h} style={{ color: "#334155", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0.75rem 1.25rem" }}>{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: "center", padding: "3rem", color: "#334155" }}>
                    {bids.length === 0 ? "No bids yet — post a shift to start receiving them." : "No bids match this filter."}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(bid => {
                  const rowKey = `${bid.shiftId}_${bid.doctorId}`;
                  const isActioning = actioning === rowKey;
                  return (
                    <TableRow key={rowKey}
                      onMouseEnter={() => setHoveredRow(rowKey)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{ background: hoveredRow === rowKey ? "rgba(59,130,246,0.04)" : "transparent", opacity: bid.status === "Rejected" ? 0.55 : 1, transition: "all 0.15s ease" }}
                    >
                      <TableCell style={{ padding: "1rem 1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #3b82f620, #6366f120)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: "700", color: "#60a5fa", flexShrink: 0 }}>
                            {initials(bid.doctorName)}
                          </div>
                          <div>
                            <p style={{ color: "white", fontSize: "0.875rem", fontWeight: "600", margin: 0, letterSpacing: "-0.01em" }}>{bid.doctorName}</p>
                            <p style={{ color: "#334155", fontSize: "0.725rem", margin: 0 }}>{bid.doctorEmail}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell style={{ padding: "1rem 1.25rem" }}><StarRating rating={4.8} /></TableCell>
                      <TableCell style={{ padding: "1rem 1.25rem" }}>
                        <span style={{ color: "#94a3b8", fontSize: "0.875rem", fontWeight: "500" }}>—</span>
                      </TableCell>
                      <TableCell style={{ padding: "1rem 1.25rem" }}>
                        <Badge style={{ background: "rgba(59,130,246,0.1)", color: "#93c5fd", border: "1px solid rgba(59,130,246,0.2)", fontSize: "0.725rem", fontWeight: "500", borderRadius: "6px", padding: "0.15rem 0.625rem" }}>{bid.specialty}</Badge>
                      </TableCell>
                      <TableCell style={{ padding: "1rem 1.25rem" }}>
                        <span style={{ color: "white", fontSize: "0.925rem", fontWeight: "700", letterSpacing: "-0.02em" }}>
                          ₹{bid.bidRate?.toLocaleString()}<span style={{ color: "#475569", fontWeight: "400", fontSize: "0.75rem" }}>/hr</span>
                        </span>
                      </TableCell>
                      <TableCell style={{ padding: "1rem 1.25rem" }}>
                        <span style={{ color: "#475569", fontSize: "0.775rem" }}>{timeAgo(bid.submittedAt)}</span>
                      </TableCell>
                      <TableCell style={{ padding: "1rem 1.25rem" }}>
                        {bid.status === "Accepted" ? (
                          <span className="status-filled"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Accepted</span>
                        ) : bid.status === "Rejected" ? (
                          <span className="status-expired">Rejected</span>
                        ) : (
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <Button size="sm" id={`accept-bid-${bid.doctorId}`} disabled={isActioning} onClick={() => handleRespond(bid, "accept")}
                              style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "7px", fontSize: "0.775rem", fontWeight: "600", padding: "0.3rem 0.75rem", height: "auto", cursor: "pointer", opacity: isActioning ? 0.6 : 1 }}>
                              {isActioning ? "…" : "✓ Accept"}
                            </Button>
                            <Button size="sm" id={`reject-bid-${bid.doctorId}`} disabled={isActioning} onClick={() => handleRespond(bid, "reject")}
                              style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "7px", fontSize: "0.775rem", fontWeight: "600", padding: "0.3rem 0.75rem", height: "auto", cursor: "pointer", opacity: isActioning ? 0.6 : 1 }}>
                              {isActioning ? "…" : "✕ Reject"}
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
        <div style={{ padding: "0.875rem 1.75rem", borderTop: "1px solid rgba(59,130,246,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ color: "#334155", fontSize: "0.8rem", margin: 0 }}>Showing {filtered.length} of {bids.length} bids</p>
          <button onClick={fetchBids} style={{ background: "transparent", border: "none", color: "#3b82f6", fontSize: "0.8rem", fontWeight: "500", cursor: "pointer" }}>↺ Refresh</button>
        </div>
      </CardContent>
    </Card>
  );
}
