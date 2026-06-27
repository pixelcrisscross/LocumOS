"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    id: "shifts",
    label: "My Shifts",
    href: "/dashboard/shifts",
    badge: "12",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id: "bids",
    label: "Live Bids",
    href: "/dashboard",
    badge: "5",
    badgeColor: "#3b82f6",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10"/>
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    ),
  },
  {
    id: "doctors",
    label: "Doctors",
    href: "/dashboard/doctors",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: "compliance",
    label: "Compliance",
    href: "/dashboard/compliance",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    id: "payments",
    label: "Payments",
    href: "/dashboard/payments",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
];

const bottomItems = [
  {
    id: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
  {
    id: "help",
    label: "Help & Support",
    href: "/dashboard/help",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: collapsed ? "68px" : "240px",
        background: "rgba(10,14,26,0.97)",
        borderRight: "1px solid rgba(59,130,246,0.1)",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
        transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          padding: collapsed ? "0 1.1rem" : "0 1.25rem",
          borderBottom: "1px solid rgba(59,130,246,0.08)",
          flexShrink: 0,
          gap: "0.625rem",
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <div
            style={{
              width: "30px", height: "30px", borderRadius: "8px",
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 0 12px rgba(59,130,246,0.35)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 2v20M3 7l9 5 9-5" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          {!collapsed && (
            <span style={{ color: "white", fontWeight: "700", fontSize: "1rem", letterSpacing: "-0.03em" }}>
              LocumOS
            </span>
          )}
        </Link>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            style={{
              width: "24px", height: "24px", borderRadius: "6px",
              background: "transparent", border: "none", cursor: "pointer",
              color: "#334155", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#94a3b8"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#334155"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <polyline points="15 18 21 12 15 6"/>
            </svg>
          </button>
        )}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            style={{
              position: "absolute", right: "-1px", top: "50%", transform: "translateY(-50%)",
              width: "20px", height: "32px", background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.25)", borderLeft: "none",
              borderRadius: "0 6px 6px 0",
              cursor: "pointer", color: "#60a5fa",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        )}
      </div>

      {/* Hospital context */}
      {!collapsed && (
        <div
          style={{
            margin: "0.875rem 1rem",
            padding: "0.75rem",
            borderRadius: "10px",
            background: "rgba(59,130,246,0.06)",
            border: "1px solid rgba(59,130,246,0.12)",
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            flexShrink: 0,
          }}
        >
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ color: "#e2e8f0", fontSize: "0.8125rem", fontWeight: "600", margin: 0, letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Apollo Hospitals
            </p>
            <p style={{ color: "#475569", fontSize: "0.725rem", margin: 0 }}>Bengaluru, KA</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" style={{ marginLeft: "auto", flexShrink: 0 }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      )}

      {/* Nav section label */}
      {!collapsed && (
        <p style={{
          color: "#1e293b", fontSize: "0.675rem", fontWeight: "600",
          textTransform: "uppercase", letterSpacing: "0.1em",
          padding: "0 1.25rem", margin: "0.25rem 0 0.5rem",
        }}>
          Navigation
        </p>
      )}

      {/* Main nav */}
      <nav style={{ flex: 1, padding: "0 0.625rem", display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              title={collapsed ? item.label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: collapsed ? "0.625rem" : "0.625rem 0.875rem",
                borderRadius: "10px",
                textDecoration: "none",
                transition: "all 0.18s ease",
                position: "relative",
                justifyContent: collapsed ? "center" : "flex-start",
                background: isActive ? "rgba(59,130,246,0.14)" : "transparent",
                color: isActive ? "#60a5fa" : "#475569",
                border: isActive ? "1px solid rgba(59,130,246,0.2)" : "1px solid transparent",
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#475569";
                }
              }}
            >
              {item.icon}
              {!collapsed && (
                <span style={{ fontSize: "0.875rem", fontWeight: isActive ? "600" : "500", letterSpacing: "-0.01em", flex: 1 }}>
                  {item.label}
                </span>
              )}
              {!collapsed && item.badge && (
                <span style={{
                  background: item.badgeColor ? `${item.badgeColor}20` : "rgba(255,255,255,0.06)",
                  color: item.badgeColor ?? "#64748b",
                  border: `1px solid ${item.badgeColor ? `${item.badgeColor}35` : "rgba(255,255,255,0.08)"}`,
                  fontSize: "0.675rem", fontWeight: "700",
                  padding: "0.1rem 0.45rem", borderRadius: "100px",
                  letterSpacing: "0.02em",
                }}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom items */}
      <div style={{ padding: "0.625rem", borderTop: "1px solid rgba(59,130,246,0.08)", display: "flex", flexDirection: "column", gap: "2px" }}>
        {bottomItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            title={collapsed ? item.label : undefined}
            style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: collapsed ? "0.625rem" : "0.625rem 0.875rem",
              borderRadius: "10px", textDecoration: "none",
              color: "#334155", transition: "all 0.18s ease",
              justifyContent: collapsed ? "center" : "flex-start",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLElement).style.color = "#94a3b8";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#334155";
            }}
          >
            {item.icon}
            {!collapsed && <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>{item.label}</span>}
          </Link>
        ))}

        {/* User row */}
        {!collapsed && (
          <div style={{
            display: "flex", alignItems: "center", gap: "0.625rem",
            padding: "0.625rem 0.75rem", marginTop: "0.25rem",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "8px",
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.75rem", fontWeight: "700", color: "white", flexShrink: 0,
            }}>
              AH
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ color: "#e2e8f0", fontSize: "0.8rem", fontWeight: "600", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                Admin — Apollo
              </p>
              <p style={{ color: "#334155", fontSize: "0.7rem", margin: 0 }}>admin@apollo.in</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </div>
        )}
      </div>
    </aside>
  );
}
