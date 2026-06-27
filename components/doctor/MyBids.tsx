"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BidStatus = "Pending" | "Accepted" | "Rejected";

interface MyBid {
  shiftId: string;
  bidRate: number;
  status: BidStatus;
  submittedAt: string;
  responseNote?: string;
  specialty?: string;
  // Joined shift details (from API enrichment)
  shiftDate?: string;
  shiftTime?: string;
  hospitalName?: string;
  listedRate?: number;
}

const statusConfig: Record<BidStatus, { bg: string; color: string; border: string; dot: string }> = {
  Pending: { bg: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "rgba(251,191,36,0.25)", dot: "#fbbf24" },
  Accepted: { bg: "rgba(74,222,128,0.1)", color: "#4ade80", border: "rgba(74,222,128,0.25)", dot: "#4ade80" },
  Rejected: { bg: "rgba(100,116,139,0.1)", color: "#64748b", border: "rgba(100,116,139,0.2)", dot: "#64748b" },
};

function timeAgo(iso: string) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function BidCard({ bid, onWithdraw }: { bid: MyBid; onWithdraw: (b: MyBid) => void }) {
  const cfg = statusConfig[bid.status];
  const rateVsListed = bid.listedRate ? bid.bidRate - bid.listedRate : 0;

  return (
    <div style={{
      background: "rgba(15,22,41,0.85)",
      border: `1px solid ${bid.status === "Accepted" ? "rgba(74,222,128,0.15)" : bid.status === "Rejected" ? "rgba(100,116,139,0.1)" : "rgba(59,130,246,0.12)"}`,
      borderRadius: "14px", overflow: "hidden", transition: "all 0.22s ease",
      opacity: bid.status === "Rejected" ? 0.7 : 1,
    }}>
      <div style={{ height: "2px", background: bid.status === "Accepted" ? "linear-gradient(90deg, transparent, #4ade80, transparent)" : bid.status === "Rejected" ? "transparent" : "linear-gradient(90deg, transparent, #fbbf24, transparent)" }} />
      <div style={{ padding: "1.125rem 1.375rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          <div>
            <p style={{ color: "white", fontWeight: "700", fontSize: "0.9375rem", margin: "0 0 0.15rem", letterSpacing: "-0.02em" }}>
              {bid.hospitalName ?? "Hospital"}
            </p>
            <p style={{ color: "#475569", fontSize: "0.8rem", margin: 0 }}>
              {bid.specialty} {bid.shiftDate ? `· ${bid.shiftDate}` : ""} {bid.shiftTime ? `· ${bid.shiftTime}` : ""}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.375rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, fontSize: "0.7rem", fontWeight: "700", padding: "0.2rem 0.625rem", borderRadius: "100px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />
              {bid.status}
            </span>
            <span style={{ color: "#334155", fontSize: "0.7rem" }}>{timeAgo(bid.submittedAt)}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <div>
            <span style={{ color: "#334155", fontSize: "0.725rem", display: "block", marginBottom: "0.1rem" }}>My bid</span>
            <span style={{ color: "white", fontWeight: "750", fontSize: "1rem", letterSpacing: "-0.03em" }}>
              ₹{bid.bidRate?.toLocaleString()}<span style={{ color: "#334155", fontWeight: "400", fontSize: "0.75rem" }}>/hr</span>
            </span>
          </div>
          {bid.listedRate && (
            <>
              <div style={{ width: "1px", height: "30px", background: "rgba(59,130,246,0.1)" }} />
              <div>
                <span style={{ color: "#334155", fontSize: "0.725rem", display: "block", marginBottom: "0.1rem" }}>Listed rate</span>
                <span style={{ color: "#64748b", fontWeight: "600", fontSize: "0.9rem" }}>₹{bid.listedRate.toLocaleString()}/hr</span>
              </div>
              <div style={{ width: "1px", height: "30px", background: "rgba(59,130,246,0.1)" }} />
              <div>
                <span style={{ color: "#334155", fontSize: "0.725rem", display: "block", marginBottom: "0.1rem" }}>vs Listed</span>
                <span style={{ color: rateVsListed < 0 ? "#4ade80" : rateVsListed > 0 ? "#f87171" : "#64748b", fontWeight: "600", fontSize: "0.875rem" }}>
                  {rateVsListed > 0 ? "+" : rateVsListed < 0 ? "−" : ""}₹{Math.abs(rateVsListed).toLocaleString()}
                </span>
              </div>
            </>
          )}
        </div>

        {bid.responseNote && (
          <div style={{ padding: "0.75rem 0.875rem", borderRadius: "10px", background: bid.status === "Accepted" ? "rgba(74,222,128,0.05)" : "rgba(71,85,105,0.1)", border: `1px solid ${bid.status === "Accepted" ? "rgba(74,222,128,0.15)" : "rgba(71,85,105,0.15)"}`, marginBottom: "0.75rem" }}>
            <p style={{ color: "#334155", fontSize: "0.725rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 0.3rem" }}>Hospital Response</p>
            <p style={{ color: bid.status === "Accepted" ? "#94a3b8" : "#475569", fontSize: "0.825rem", margin: 0, lineHeight: 1.55 }}>"{bid.responseNote}"</p>
          </div>
        )}

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {bid.status === "Pending" && (
            <button onClick={() => onWithdraw(bid)} style={{ height: "34px", padding: "0 0.875rem", borderRadius: "8px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#f87171", fontSize: "0.8rem", fontWeight: "500", cursor: "pointer", fontFamily: "inherit" }}>
              Withdraw Bid
            </button>
          )}
          <button style={{ height: "34px", padding: "0 0.875rem", borderRadius: "8px", border: "1px solid rgba(59,130,246,0.1)", background: "transparent", color: "#475569", fontSize: "0.8rem", fontWeight: "500", cursor: "pointer", fontFamily: "inherit" }}>
            View Shift
          </button>
        </div>
      </div>
    </div>
  );
}

type BidFilter = "all" | "Pending" | "Accepted" | "Rejected";

export default function MyBids() {
  const { data: session } = useSession();
  const [bids, setBids] = useState<MyBid[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<BidFilter>("all");

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

  useEffect(() => { fetchBids(); }, [fetchBids]);

  const handleWithdraw = async (bid: MyBid) => {
    if (!confirm("Withdraw this bid?")) return;
    try {
      await fetch("/api/bids/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shiftId: bid.shiftId, doctorId: (session?.user as any)?.userId, action: "reject" }),
      });
      setBids(prev => prev.map(b => b.shiftId === bid.shiftId ? { ...b, status: "Rejected" } : b));
    } catch {
      alert("Failed to withdraw bid.");
    }
  };

  const filtered = filter === "all" ? bids : bids.filter(b => b.status === filter);
  const counts = {
    all: bids.length,
    Pending: bids.filter(b => b.status === "Pending").length,
    Accepted: bids.filter(b => b.status === "Accepted").length,
    Rejected: bids.filter(b => b.status === "Rejected").length,
  };
  const totalEarned = bids.filter(b => b.status === "Accepted").reduce((s, b) => s + (b.bidRate * 8), 0);

  const filterColors: Record<BidFilter, string> = { all: "#60a5fa", Pending: "#fbbf24", Accepted: "#4ade80", Rejected: "#64748b" };

  return (
    <Card id="my-bids-section" style={{ background: "rgba(15,22,41,0.85)", border: "1px solid rgba(59,130,246,0.12)", borderRadius: "16px", overflow: "hidden" }}>
      <CardHeader style={{ padding: "1.375rem 1.75rem 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.75" strokeLinecap="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
            </div>
            <div>
              <CardTitle style={{ color: "white", fontSize: "1rem", fontWeight: "700", letterSpacing: "-0.02em" }}>My Bids</CardTitle>
              <p style={{ color: "#475569", fontSize: "0.775rem", margin: 0 }}>Your submitted bids from DynamoDB</p>
            </div>
          </div>
          {totalEarned > 0 && (
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "#334155", fontSize: "0.7rem", margin: "0 0 0.1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Est. Earnings</p>
              <p style={{ color: "#4ade80", fontWeight: "750", fontSize: "1.125rem", letterSpacing: "-0.03em", margin: 0 }}>₹{totalEarned.toLocaleString()}</p>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: "0.25rem", background: "rgba(10,14,26,0.5)", padding: "0.25rem", borderRadius: "10px", width: "fit-content" }}>
          {(["all", "Pending", "Accepted", "Rejected"] as BidFilter[]).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "0.35rem 0.875rem", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: "500", transition: "all 0.18s", background: filter === f ? `${filterColors[f]}18` : "transparent", color: filter === f ? filterColors[f] : "#475569", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "0.375rem" }}>
              {f === "all" ? "All" : f}
              <span style={{ background: filter === f ? `${filterColors[f]}25` : "rgba(255,255,255,0.05)", color: filter === f ? filterColors[f] : "#334155", fontSize: "0.675rem", fontWeight: "700", padding: "0.05rem 0.4rem", borderRadius: "100px" }}>{counts[f]}</span>
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent style={{ padding: "1.25rem 1.75rem 1.75rem" }}>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", padding: "2.5rem", color: "#334155" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" style={{ animation: "orbit-spin 0.8s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            Loading your bids…
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2.5rem", color: "#334155", fontSize: "0.875rem" }}>
                {bids.length === 0 ? "You haven't placed any bids yet. Browse shifts to get started." : "No bids in this category."}
              </div>
            ) : (
              filtered.map(bid => <BidCard key={`${bid.shiftId}_${bid.submittedAt}`} bid={bid} onWithdraw={handleWithdraw} />)
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
