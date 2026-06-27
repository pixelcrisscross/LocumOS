"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LocumOSLogo } from "@/components/shared/Header";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "For Clinics", href: "#clinics" },
    { label: "For Doctors", href: "#doctors" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.3s ease",
      background: scrolled ? "rgba(10,14,26,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(59,130,246,0.1)" : "1px solid transparent",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <LocumOSLogo size={32} />
          <span style={{ fontSize: "1.125rem", fontWeight: "700", color: "white", letterSpacing: "-0.03em" }}>
            LocumOS
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {links.map(link => (
            <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
          ))}
        </nav>

        {/* CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <Link href="/dashboard" style={{
            color: "#94a3b8", fontSize: "0.875rem", fontWeight: "500",
            textDecoration: "none", padding: "0.45rem 0.875rem",
            borderRadius: "8px", border: "1px solid rgba(59,130,246,0.12)",
            transition: "all 0.2s", display: "flex", alignItems: "center", gap: "0.375rem",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#60a5fa"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.12)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
            </svg>
            Hospital
          </Link>
          <Link href="/doctor" style={{
            color: "#94a3b8", fontSize: "0.875rem", fontWeight: "500",
            textDecoration: "none", padding: "0.45rem 0.875rem",
            borderRadius: "8px", border: "1px solid rgba(167,139,250,0.15)",
            transition: "all 0.2s", display: "flex", alignItems: "center", gap: "0.375rem",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#a78bfa"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.4)"; (e.currentTarget as HTMLElement).style.background = "rgba(167,139,250,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.15)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Doctor
          </Link>
          <Link href="/dashboard" className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem", textDecoration: "none" }}>
            Get started →
          </Link>
        </div>
      </div>
    </header>
  );
}
