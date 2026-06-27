"use client";

const stats = [
  {
    id: "active-shifts",
    label: "Active Shifts",
    value: "7",
    delta: "+2 today",
    positive: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    color: "#3b82f6",
  },
  {
    id: "live-bids",
    label: "Live Bids",
    value: "23",
    delta: "+5 new",
    positive: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10"/>
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    ),
    color: "#a78bfa",
  },
  {
    id: "fill-rate",
    label: "Fill Rate (30d)",
    value: "96.4%",
    delta: "+1.2%",
    positive: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    color: "#34d399",
  },
  {
    id: "avg-match",
    label: "Avg Match Time",
    value: "3.8 min",
    delta: "-0.4 min",
    positive: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    color: "#fb923c",
  },
];

export default function StatsBar() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
      }}
    >
      {stats.map((stat) => (
        <div
          key={stat.id}
          id={stat.id}
          className="dash-card"
          style={{
            padding: "1.25rem 1.375rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: `${stat.color}12`,
              border: `1px solid ${stat.color}25`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {stat.icon}
          </div>

          {/* Text */}
          <div style={{ minWidth: 0 }}>
            <p style={{ color: "#475569", fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 0.25rem" }}>
              {stat.label}
            </p>
            <p style={{ color: "white", fontSize: "1.5rem", fontWeight: "750", letterSpacing: "-0.04em", margin: "0 0 0.2rem", lineHeight: 1 }}>
              {stat.value}
            </p>
            <p style={{ color: stat.positive ? "#4ade80" : "#f87171", fontSize: "0.75rem", fontWeight: "500", margin: 0 }}>
              {stat.delta}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
