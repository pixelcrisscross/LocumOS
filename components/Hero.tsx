"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ── Animated Counter ───────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ── Live activity feed ─────────────────────────────────────── */
const FEED_ITEMS = [
  { hospital: "Apollo Hospitals", specialty: "Emergency Medicine", rate: 4500, time: "2s ago", urgent: true },
  { hospital: "Fortis Healthcare", specialty: "Cardiology", rate: 6000, time: "18s ago", urgent: false },
  { hospital: "Manipal Group", specialty: "Anaesthesiology", rate: 5200, time: "45s ago", urgent: false },
  { hospital: "Narayana Health", specialty: "Neurology", rate: 5500, time: "1m ago", urgent: true },
  { hospital: "Max Health", specialty: "General Surgery", rate: 3800, time: "2m ago", urgent: false },
];

function LiveFeed() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActive(i => (i + 1) % FEED_ITEMS.length);
        setVisible(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const item = FEED_ITEMS[active];

  return (
    <div style={{
      background: "rgba(10,14,26,0.9)",
      backdropFilter: "blur(24px)",
      border: "1px solid rgba(59,130,246,0.18)",
      borderRadius: "16px",
      padding: "1.125rem 1.375rem",
      width: "340px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-8px)",
      transition: "opacity 0.3s ease, transform 0.3s ease",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top shimmer line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #3b82f6, transparent)" }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.6)", animation: "live-pulse 2s ease-in-out infinite" }} />
          <span style={{ color: "#4ade80", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em" }}>Live Shift Posted</span>
        </div>
        {item.urgent && (
          <span style={{ background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)", fontSize: "0.65rem", fontWeight: "700", padding: "0.15rem 0.5rem", borderRadius: "100px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            🚨 Urgent
          </span>
        )}
      </div>

      {/* Shift info */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: "800", color: "#60a5fa", flexShrink: 0 }}>
          {item.hospital.split(" ").map(w => w[0]).join("").slice(0, 2)}
        </div>
        <div>
          <p style={{ color: "white", fontWeight: "700", fontSize: "0.9rem", margin: "0 0 0.1rem", letterSpacing: "-0.02em" }}>{item.hospital}</p>
          <p style={{ color: "#60a5fa", fontSize: "0.775rem", margin: 0, fontWeight: "500" }}>{item.specialty}</p>
        </div>
      </div>

      {/* Rate + bids */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: "#4ade80", fontSize: "1.1rem", fontWeight: "800", letterSpacing: "-0.03em" }}>
          ₹{item.rate.toLocaleString()}<span style={{ color: "#334155", fontWeight: "400", fontSize: "0.75rem" }}>/hr</span>
        </span>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ color: "#334155", fontSize: "0.725rem" }}>{item.time}</span>
          <button style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "white", border: "none", padding: "0.3rem 0.875rem", borderRadius: "7px", fontSize: "0.75rem", fontWeight: "600", cursor: "pointer", boxShadow: "0 3px 10px rgba(59,130,246,0.35)" }}>
            Bid Now
          </button>
        </div>
      </div>

      {/* Bid progress bar */}
      <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ flex: 1, height: "3px", borderRadius: "100px", background: "rgba(59,130,246,0.12)", overflow: "hidden" }}>
          <div style={{ width: `${30 + active * 15}%`, height: "100%", background: "linear-gradient(90deg, #3b82f6, #a78bfa)", borderRadius: "100px", transition: "width 0.5s ease" }} />
        </div>
        <span style={{ color: "#475569", fontSize: "0.7rem", whiteSpace: "nowrap" }}>{active + 2} doctors bidding</span>
      </div>
    </div>
  );
}

/* ── Floating doctor card ───────────────────────────────────── */
function DoctorCard() {
  return (
    <div style={{
      background: "rgba(10,14,26,0.9)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(167,139,250,0.2)",
      borderRadius: "14px",
      padding: "1rem 1.25rem",
      width: "240px",
      animation: "float-badge 4s ease-in-out infinite",
      position: "relative",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #a78bfa, transparent)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.625rem" }}>
        <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: "800", color: "#a78bfa" }}>KS</div>
        <div>
          <p style={{ color: "white", fontWeight: "700", fontSize: "0.8rem", margin: 0, letterSpacing: "-0.02em" }}>Dr. Kavya Sharma</p>
          <p style={{ color: "#475569", fontSize: "0.7rem", margin: 0 }}>Emergency Med · 15 yrs</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.3rem", marginBottom: "0.5rem" }}>
        {[1,2,3,4,5].map(i => (
          <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
        <span style={{ color: "#94a3b8", fontSize: "0.675rem", marginLeft: "2px" }}>5.0 · 124 shifts</span>
      </div>
      <div style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: "6px", padding: "0.3rem 0.625rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#4ade80", fontSize: "0.68rem", fontWeight: "600" }}>Accepted · ₹43,200 earned</span>
      </div>
    </div>
  );
}

/* ── Match badge ────────────────────────────────────────────── */
function MatchBadge() {
  return (
    <div style={{
      background: "rgba(10,14,26,0.95)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(59,130,246,0.25)",
      borderRadius: "100px",
      padding: "0.625rem 1.125rem",
      display: "flex", alignItems: "center", gap: "0.625rem",
      boxShadow: "0 0 30px rgba(59,130,246,0.15)",
      animation: "float-badge 3.2s ease-in-out infinite",
      animationDelay: "1.5s",
    }}>
      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div>
        <p style={{ color: "white", fontSize: "0.775rem", fontWeight: "700", margin: "0 0 0.05rem", letterSpacing: "-0.01em" }}>Match in 3.8 min</p>
        <p style={{ color: "#475569", fontSize: "0.65rem", margin: 0 }}>ICU Night Shift · Apollo</p>
      </div>
    </div>
  );
}

/* ── Particle canvas ────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    const colors = ["rgba(59,130,246,", "rgba(167,139,250,", "rgba(244,114,182,"];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59,130,246,${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
    />
  );
}

/* ── Main Hero ──────────────────────────────────────────────── */
const STATS = [
  { target: 12847, suffix: "+", label: "Verified Doctors", color: "#60a5fa" },
  { target: 850, suffix: "+", label: "Partner Hospitals", color: "#a78bfa" },
  { target: 98, suffix: ".2%", label: "Fill Rate", color: "#4ade80" },
  { target: 4, prefix: "<", suffix: " min", label: "Avg Match Time", color: "#fb923c" },
];

const WORDS = ["Staffing", "Matching", "Operations", "Efficiency"];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % WORDS.length);
        setWordVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "9rem 1.5rem 6rem",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Particle network */}
      <ParticleCanvas />

      {/* Background grid */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5, zIndex: 0 }} />

      {/* Gradient orbs */}
      <div className="orb" style={{ position: "absolute", top: "5%", left: "-8%", width: "700px", height: "700px", background: "rgba(59,130,246,0.09)", animationDelay: "0s", zIndex: 0 }} />
      <div className="orb" style={{ position: "absolute", top: "15%", right: "-12%", width: "800px", height: "800px", background: "rgba(99,102,241,0.07)", animationDelay: "-4s", zIndex: 0 }} />
      <div className="orb" style={{ position: "absolute", bottom: "0%", left: "25%", width: "500px", height: "500px", background: "rgba(244,114,182,0.05)", animationDelay: "-8s", zIndex: 0 }} />

      {/* === Content === */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1000px", width: "100%" }}>

        {/* Hackathon announcement badge */}
        <div className="animate-fade-up" style={{ display: "flex", justifyContent: "center", marginBottom: "2rem", opacity: mounted ? 1 : 0 }}>
          <a href="#" style={{ textDecoration: "none" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.625rem",
              background: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.22)",
              borderRadius: "100px",
              padding: "0.45rem 1.125rem",
              fontSize: "0.825rem", color: "#93c5fd", fontWeight: "500",
              backdropFilter: "blur(12px)",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.5)"; (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.12)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.22)"; (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.08)"; }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px rgba(74,222,128,0.6)", animation: "live-pulse 2s ease-in-out infinite", display: "inline-block" }} />
              Now live across 40+ cities in India &amp; UAE
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </span>
          </a>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up-delay-1"
          style={{
            fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
            fontWeight: "900",
            lineHeight: "1.03",
            letterSpacing: "-0.045em",
            margin: "0 0 0.5rem",
            color: "white",
          }}
        >
          The OS for Medical
        </h1>
        <h1
          style={{
            fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
            fontWeight: "900",
            lineHeight: "1.03",
            letterSpacing: "-0.045em",
            margin: "0 0 1.75rem",
            minHeight: "1.1em",
          }}
        >
          <span
            className="gradient-text"
            style={{
              opacity: wordVisible ? 1 : 0,
              transform: wordVisible ? "translateY(0)" : "translateY(-12px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
              display: "inline-block",
            }}
          >
            {WORDS[wordIdx]}
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="animate-fade-up-delay-2"
          style={{
            fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
            color: "#64748b",
            lineHeight: "1.75",
            maxWidth: "620px",
            margin: "0 auto 3rem",
            fontWeight: "400",
          }}
        >
          Hospitals post urgent shifts in{" "}
          <span style={{ color: "#94a3b8", fontWeight: "500" }}>seconds</span>.
          Freelance doctors bid to fill them.
          LocumOS matches the right talent in under{" "}
          <span style={{ color: "#60a5fa", fontWeight: "600" }}>4 minutes</span>
          {" "}— no agency, no friction.
        </p>

        {/* CTA row */}
        <div
          className="animate-fade-up-delay-3"
          style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}
        >
          <Link
            href="/dashboard"
            id="hero-cta-hospital"
            className="btn-primary btn-glow"
            style={{ fontSize: "1rem", padding: "0.9rem 2.25rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>
            </svg>
            Post a Shift
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
          <Link
            href="/doctor"
            id="hero-cta-doctor"
            className="btn-ghost"
            style={{ fontSize: "1rem", padding: "0.9rem 2.25rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
            </svg>
            Find Shifts Near You
          </Link>
          <Link
            href="/login"
            style={{
              color: "#475569", fontSize: "1rem", fontWeight: "500",
              textDecoration: "none", padding: "0.9rem 1.5rem",
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#94a3b8"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#475569"}
          >
            Sign in →
          </Link>
        </div>

        {/* Floating UI cards */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
          marginBottom: "4.5rem",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.8s ease 0.5s",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", alignItems: "flex-end" }}>
            <LiveFeed />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", alignItems: "flex-start", paddingTop: "1.5rem" }}>
            <DoctorCard />
            <MatchBadge />
          </div>
        </div>

        {/* Stats grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "rgba(59,130,246,0.08)",
          borderRadius: "18px",
          overflow: "hidden",
          border: "1px solid rgba(59,130,246,0.12)",
          maxWidth: "760px",
          margin: "0 auto 3.5rem",
          backdropFilter: "blur(12px)",
        }}>
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-item spotlight-card"
              style={{
                background: "rgba(10,14,26,0.85)",
                padding: "1.75rem 1rem",
                animationDelay: `${0.4 + i * 0.1}s`,
                borderRight: i < 3 ? "1px solid rgba(59,130,246,0.08)" : "none",
                cursor: "default",
                transition: "background 0.25s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(15,22,41,0.95)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(10,14,26,0.85)"}
            >
              <div style={{ fontSize: "2rem", fontWeight: "800", color: stat.color, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.4rem" }}>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div style={{ fontSize: "0.75rem", color: "#475569", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trusted by */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
          <p style={{ color: "#1e293b", fontSize: "0.75rem", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
            Trusted by teams at
          </p>
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            {["Apollo Hospitals", "Fortis Healthcare", "Max Health", "Manipal Group", "Narayana Health", "Aster DM"].map(name => (
              <span key={name} style={{ color: "#1e293b", fontSize: "0.875rem", fontWeight: "700", letterSpacing: "-0.015em", cursor: "default", transition: "color 0.25s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#475569"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#1e293b"}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
        opacity: 0.4, zIndex: 10,
        animation: "float-badge 3s ease-in-out infinite",
      }}>
        <span style={{ color: "#475569", fontSize: "0.7rem", fontWeight: "500", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="#475569" strokeWidth="1.5"/>
          <circle cx="8" cy="8" r="2" fill="#475569" style={{ animation: "float-badge 1.5s ease-in-out infinite" }}/>
        </svg>
      </div>
    </section>
  );
}
