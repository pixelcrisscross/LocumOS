"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

/* ─── Logo SVG ─────────────────────────────────────────────── */
function LocumOSLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="60%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Hexagonal background */}
      <path
        d="M20 2 L35 10.5 L35 29.5 L20 38 L5 29.5 L5 10.5 Z"
        fill="url(#logoGrad)"
        opacity="0.15"
      />
      <path
        d="M20 2 L35 10.5 L35 29.5 L20 38 L5 29.5 L5 10.5 Z"
        stroke="url(#logoGrad)"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Medical Cross arms */}
      <rect x="16" y="9" width="8" height="22" rx="2" fill="url(#logoGrad)" opacity="0.6" />
      <rect x="9" y="16" width="22" height="8" rx="2" fill="url(#logoGrad)" opacity="0.6" />

      {/* Lightning bolt overlay */}
      <path
        d="M22 11 L16 21 L20.5 21 L18 29 L25 18 L20 18 Z"
        fill="white"
        filter="url(#logoGlow)"
      />
    </svg>
  );
}

/* ─── Notification Bell ─────────────────────────────────────── */
interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "bid" | "shift" | "system";
}

const NOTIFS: Notification[] = [
  { id: "n1", title: "New bid received", body: "Dr. Kavya Sharma placed a bid on ICU Night Shift", time: "2 min ago", read: false, type: "bid" },
  { id: "n2", title: "Shift expiring soon", body: "Emergency Medicine – 27 Jun expires in 3 hours", time: "18 min ago", read: false, type: "shift" },
  { id: "n3", title: "Bid accepted", body: "Apollo Hospitals accepted your bid for ₹4,200/hr", time: "1 hr ago", read: false, type: "bid" },
  { id: "n4", title: "System update", body: "Compliance checks for June completed successfully", time: "3 hr ago", read: true, type: "system" },
  { id: "n5", title: "Payout processed", body: "₹43,200 transferred to your linked account", time: "Yesterday", read: true, type: "system" },
];

const notifColors = {
  bid: { bg: "rgba(167,139,250,0.12)", icon: "#a78bfa", border: "rgba(167,139,250,0.2)" },
  shift: { bg: "rgba(251,146,60,0.1)", icon: "#fb923c", border: "rgba(251,146,60,0.18)" },
  system: { bg: "rgba(59,130,246,0.1)", icon: "#60a5fa", border: "rgba(59,130,246,0.18)" },
};

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(NOTIFS);
  const ref = useRef<HTMLDivElement>(null);
  const unread = notifs.filter(n => !n.read).length;

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        id="notif-bell"
        onClick={() => setOpen(o => !o)}
        style={{
          width: "38px", height: "38px", borderRadius: "10px",
          background: open ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${open ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.08)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: open ? "#60a5fa" : "#64748b",
          position: "relative", transition: "all 0.2s",
        }}
        onMouseEnter={e => {
          if (!open) {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLElement).style.color = "#94a3b8";
          }
        }}
        onMouseLeave={e => {
          if (!open) {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLElement).style.color = "#64748b";
          }
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unread > 0 && (
          <span style={{
            position: "absolute", top: "6px", right: "6px",
            minWidth: "16px", height: "16px", borderRadius: "100px",
            background: "#3b82f6", border: "2px solid #0a0e1a",
            fontSize: "0.55rem", fontWeight: "800", color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "0 3px",
            animation: "pulse-ring 2s ease-in-out infinite",
          }}>
            {unread}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0,
          width: "360px", zIndex: 200,
          background: "rgba(10,14,26,0.98)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(59,130,246,0.15)",
          borderRadius: "16px",
          boxShadow: "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.08)",
          overflow: "hidden",
          animation: "dropdownOpen 0.18s ease",
        }}>
          {/* Header */}
          <div style={{ padding: "1rem 1.25rem 0.75rem", borderBottom: "1px solid rgba(59,130,246,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "white", fontWeight: "700", fontSize: "0.9rem" }}>Notifications</span>
              {unread > 0 && (
                <span style={{ background: "rgba(59,130,246,0.18)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)", fontSize: "0.65rem", fontWeight: "700", padding: "0.1rem 0.45rem", borderRadius: "100px" }}>
                  {unread} new
                </span>
              )}
            </div>
            {unread > 0 && (
              <button onClick={markAllRead} style={{ background: "none", border: "none", color: "#3b82f6", fontSize: "0.775rem", fontWeight: "500", cursor: "pointer", fontFamily: "inherit" }}>
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div style={{ maxHeight: "340px", overflowY: "auto" }}>
            {notifs.map(n => {
              const c = notifColors[n.type];
              return (
                <div key={n.id} style={{
                  padding: "0.875rem 1.25rem",
                  borderBottom: "1px solid rgba(59,130,246,0.06)",
                  display: "flex", gap: "0.75rem", alignItems: "flex-start",
                  background: n.read ? "transparent" : "rgba(59,130,246,0.03)",
                  transition: "background 0.15s",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.05)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = n.read ? "transparent" : "rgba(59,130,246,0.03)"}
                >
                  <div style={{
                    width: "34px", height: "34px", borderRadius: "9px",
                    background: c.bg, border: `1px solid ${c.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {n.type === "bid" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.icon} strokeWidth="2" strokeLinecap="round">
                        <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
                      </svg>
                    )}
                    {n.type === "shift" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.icon} strokeWidth="2" strokeLinecap="round">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>
                      </svg>
                    )}
                    {n.type === "system" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.icon} strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                      <p style={{ color: n.read ? "#64748b" : "white", fontWeight: n.read ? "500" : "600", fontSize: "0.825rem", margin: "0 0 0.2rem", lineHeight: 1.3 }}>
                        {n.title}
                      </p>
                      {!n.read && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6", flexShrink: 0, marginTop: "4px" }} />}
                    </div>
                    <p style={{ color: "#475569", fontSize: "0.775rem", margin: "0 0 0.2rem", lineHeight: 1.4 }}>{n.body}</p>
                    <p style={{ color: "#334155", fontSize: "0.7rem", margin: 0 }}>{n.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid rgba(59,130,246,0.08)", textAlign: "center" }}>
            <button style={{ background: "none", border: "none", color: "#3b82f6", fontSize: "0.8rem", fontWeight: "500", cursor: "pointer", fontFamily: "inherit" }}>
              View all notifications →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Avatar Dropdown ───────────────────────────────────────── */
interface AvatarDropdownProps {
  name: string;
  role: string;
  initials: string;
  mode: "hospital" | "doctor";
}

function AvatarDropdown({ name, role, initials, mode }: AvatarDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const menuItems = [
    { label: "Profile & Settings", href: mode === "hospital" ? "/dashboard/settings" : "/doctor", icon: "⚙️" },
    { label: "Switch to " + (mode === "hospital" ? "Doctor View" : "Hospital View"), href: mode === "hospital" ? "/doctor" : "/dashboard", icon: "🔄" },
    { label: "Help & Support", href: "#", icon: "💬" },
    { label: "Keyboard Shortcuts", href: "#", icon: "⌨️" },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        id="avatar-btn"
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          background: open ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${open ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "10px", padding: "0.35rem 0.625rem 0.35rem 0.35rem",
          cursor: "pointer", transition: "all 0.2s",
        }}
      >
        <div style={{
          width: "28px", height: "28px", borderRadius: "7px",
          background: mode === "hospital"
            ? "linear-gradient(135deg, #3b82f6, #6366f1)"
            : "linear-gradient(135deg, #a78bfa, #6366f1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.7rem", fontWeight: "800", color: "white",
        }}>
          {initials}
        </div>
        <div style={{ textAlign: "left" }}>
          <p style={{ color: "white", fontSize: "0.775rem", fontWeight: "600", margin: 0, lineHeight: 1.2 }}>{name}</p>
          <p style={{ color: "#475569", fontSize: "0.675rem", margin: 0, lineHeight: 1.2 }}>{role}</p>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" style={{ marginLeft: "2px", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0,
          width: "240px", zIndex: 200,
          background: "rgba(10,14,26,0.98)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(59,130,246,0.15)",
          borderRadius: "14px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          overflow: "hidden",
          animation: "dropdownOpen 0.18s ease",
        }}>
          {/* Profile header */}
          <div style={{ padding: "1rem", borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: mode === "hospital" ? "linear-gradient(135deg, #3b82f6, #6366f1)" : "linear-gradient(135deg, #a78bfa, #6366f1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.875rem", fontWeight: "800", color: "white",
              }}>
                {initials}
              </div>
              <div>
                <p style={{ color: "white", fontSize: "0.875rem", fontWeight: "700", margin: 0 }}>{name}</p>
                <p style={{ color: "#475569", fontSize: "0.75rem", margin: 0 }}>{role}</p>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div style={{ padding: "0.375rem" }}>
            {menuItems.map(item => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} style={{
                display: "flex", alignItems: "center", gap: "0.625rem",
                padding: "0.6rem 0.75rem", borderRadius: "9px",
                textDecoration: "none", color: "#94a3b8", fontSize: "0.825rem",
                transition: "all 0.15s",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "#f1f5f9";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                }}
              >
                <span style={{ fontSize: "0.875rem" }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Sign out */}
          <div style={{ padding: "0.375rem", borderTop: "1px solid rgba(59,130,246,0.08)" }}>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "0.625rem",
                padding: "0.6rem 0.75rem", borderRadius: "9px",
                background: "none", border: "none", color: "#f87171",
                fontSize: "0.825rem", cursor: "pointer", fontFamily: "inherit",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Header ────────────────────────────────────────────────── */
export interface HeaderProps {
  title?: string;
  subtitle?: string;
  mode?: "hospital" | "doctor";
  userName?: string;
  userRole?: string;
  userInitials?: string;
  actions?: React.ReactNode;
}

export default function Header({
  title,
  subtitle,
  mode,
  userName,
  userRole,
  userInitials,
  actions,
}: HeaderProps) {
  const { data: session } = useSession();
  const sessionUser = session?.user as any;
  const resolvedMode = mode ?? (sessionUser?.role === "doctor" ? "doctor" : "hospital");
  const resolvedName = userName ?? sessionUser?.name ?? (resolvedMode === "hospital" ? "Hospital Admin" : "Doctor");
  const resolvedRole = userRole ?? (resolvedMode === "hospital" ? "Hospital Administrator" : sessionUser?.specialty ?? "Doctor");
  const resolvedInitials = userInitials ?? resolvedName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <>
      <header style={{
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2.5rem",
        borderBottom: "1px solid rgba(59,130,246,0.09)",
        background: "rgba(10,14,26,0.92)",
        backdropFilter: "blur(20px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        marginLeft: 0,
      }}>
        {/* Left: page title */}
        <div>
          {title && (
            <h1 style={{ color: "white", fontSize: "1.125rem", fontWeight: "700", letterSpacing: "-0.03em", margin: 0, lineHeight: 1.2 }}>
              {title}
            </h1>
          )}
          {subtitle && (
            <p style={{ color: "#475569", fontSize: "0.8rem", margin: 0 }}>{subtitle}</p>
          )}
        </div>

        {/* Right: actions + bell + avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {actions}
          <NotificationBell />
          <AvatarDropdown
            name={resolvedName}
            role={resolvedRole}
            initials={resolvedInitials}
            mode={resolvedMode}
          />
        </div>
      </header>

      <style>{`
        @keyframes dropdownOpen {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}

/* Re-export the logo for use elsewhere */
export { LocumOSLogo };
