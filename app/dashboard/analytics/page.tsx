"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/shared/Header";

const chartData = [62, 78, 45, 91, 83, 96, 88, 74, 95, 89, 97, 100];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const insights = [
  { label: "Peak Demand Day", value: "Wednesday", sub: "37% more shift requests" },
  { label: "Top Specialty", value: "Emergency Medicine", sub: "41% of all shifts" },
  { label: "Avg Fill Time", value: "3.8 min", sub: "↓ 0.6 min vs last month" },
  { label: "Cost Savings", value: "₹2.4L", sub: "vs. agency fees this month" },
];

export default function AnalyticsPage() {
  const maxVal = Math.max(...chartData);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0e1a" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "240px", display: "flex", flexDirection: "column" }}>
        <Header title="Analytics" subtitle="Performance metrics and staffing insights" />
        <main style={{ padding: "2rem 2.5rem", flex: 1 }}>
          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { label: "Shifts Posted", value: "248", delta: "+18%", positive: true, color: "#3b82f6" },
              { label: "Shifts Filled", value: "239", delta: "+21%", positive: true, color: "#4ade80" },
              { label: "Fill Rate", value: "96.4%", delta: "+1.2%", positive: true, color: "#a78bfa" },
              { label: "Total Spend", value: "₹18.4L", delta: "-8% vs agency", positive: true, color: "#fb923c" },
            ].map(k => (
              <div key={k.label} className="dash-card" style={{ padding: "1.25rem 1.5rem" }}>
                <p style={{ color: "#475569", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 0.35rem", fontWeight: "600" }}>{k.label}</p>
                <p style={{ color: k.color, fontSize: "1.75rem", fontWeight: "800", letterSpacing: "-0.04em", margin: "0 0 0.2rem", lineHeight: 1 }}>{k.value}</p>
                <p style={{ color: "#4ade80", fontSize: "0.775rem", margin: 0, fontWeight: "500" }}>{k.delta}</p>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="dash-card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <div>
                <h3 style={{ color: "white", fontWeight: "700", fontSize: "0.9375rem", margin: "0 0 0.2rem", letterSpacing: "-0.02em" }}>Fill Rate by Month</h3>
                <p style={{ color: "#475569", fontSize: "0.8rem", margin: 0 }}>12-month trend · 2026</p>
              </div>
              <span style={{ color: "#4ade80", fontSize: "0.825rem", fontWeight: "600" }}>↑ 21% YoY</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "140px" }}>
              {chartData.map((val, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%" }}>
                  <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                    <div style={{
                      width: "100%",
                      height: `${(val / maxVal) * 100}%`,
                      borderRadius: "5px 5px 0 0",
                      background: val === maxVal
                        ? "linear-gradient(180deg, #3b82f6, #2563eb)"
                        : "linear-gradient(180deg, rgba(59,130,246,0.5), rgba(59,130,246,0.25))",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      position: "relative",
                    }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "linear-gradient(180deg, #60a5fa, #3b82f6)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 -4px 16px rgba(59,130,246,0.3)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = val === maxVal ? "linear-gradient(180deg, #3b82f6, #2563eb)" : "linear-gradient(180deg, rgba(59,130,246,0.5), rgba(59,130,246,0.25))";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <span style={{ color: "#334155", fontSize: "0.6rem", fontWeight: "500" }}>{months[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insights grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {insights.map(ins => (
              <div key={ins.label} className="dash-card" style={{ padding: "1.125rem 1.375rem" }}>
                <p style={{ color: "#475569", fontSize: "0.725rem", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 0.375rem", fontWeight: "600" }}>{ins.label}</p>
                <p style={{ color: "white", fontWeight: "700", fontSize: "1rem", letterSpacing: "-0.025em", margin: "0 0 0.2rem" }}>{ins.value}</p>
                <p style={{ color: "#334155", fontSize: "0.75rem", margin: 0 }}>{ins.sub}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
