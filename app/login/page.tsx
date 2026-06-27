"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LocumOSLogo } from "@/components/shared/Header";

type Role = "hospital" | "doctor";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("hospital");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      router.push(role === "hospital" ? "/dashboard" : "/doctor");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(10,14,26,0.7)",
    border: "1px solid rgba(59,130,246,0.15)",
    borderRadius: "10px",
    color: "#f1f5f9",
    fontSize: "0.95rem",
    padding: "0.75rem 1rem",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0e1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1.5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div className="orb" style={{ position: "absolute", top: "-10%", left: "-5%", width: "500px", height: "500px", background: "rgba(59,130,246,0.07)", zIndex: 0 }} />
      <div className="orb" style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "400px", height: "400px", background: "rgba(167,139,250,0.05)", animationDelay: "-5s", zIndex: 0 }} />
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.3, zIndex: 0 }} />

      {/* Card */}
      <div style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        maxWidth: "440px",
        background: "rgba(15,22,41,0.92)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(59,130,246,0.15)",
        borderRadius: "22px",
        padding: "2.5rem",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.08)",
        animation: "page-enter 0.4s ease forwards",
      }}>
        {/* Top glow line */}
        <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "1px", background: "linear-gradient(90deg, transparent, #3b82f6, transparent)", borderRadius: "100px" }} />

        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none", marginBottom: "1.75rem" }}>
            <LocumOSLogo size={36} />
            <span style={{ fontSize: "1.25rem", fontWeight: "800", color: "white", letterSpacing: "-0.035em" }}>LocumOS</span>
          </Link>
          <h1 style={{ color: "white", fontWeight: "800", fontSize: "1.5rem", letterSpacing: "-0.04em", margin: "0 0 0.375rem", textAlign: "center" }}>
            Welcome back
          </h1>
          <p style={{ color: "#475569", fontSize: "0.875rem", margin: 0 }}>
            Sign in to your account
          </p>
        </div>

        {/* Role toggle */}
        <div style={{ display: "flex", background: "rgba(10,14,26,0.6)", borderRadius: "10px", padding: "4px", marginBottom: "1.75rem" }}>
          {(["hospital", "doctor"] as Role[]).map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              style={{
                flex: 1, padding: "0.55rem", borderRadius: "8px", border: "none",
                background: role === r ? "rgba(59,130,246,0.18)" : "transparent",
                color: role === r ? "#60a5fa" : "#475569",
                fontSize: "0.875rem", fontWeight: role === r ? "700" : "500",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                letterSpacing: "-0.01em",
              }}
            >
              {r === "hospital" ? "🏥 Hospital Admin" : "👨‍⚕️ Doctor"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.4rem", letterSpacing: "0.01em" }}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@hospital.com"
              required
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = "rgba(59,130,246,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(59,130,246,0.15)"; e.target.style.boxShadow = "none"; }}
            />
          </div>
          <div>
            <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.4rem", letterSpacing: "0.01em" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = "rgba(59,130,246,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(59,130,246,0.15)"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: "8px", padding: "0.75rem 1rem", color: "#f87171", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: "100%", marginTop: "0.5rem", padding: "0.875rem", fontSize: "0.95rem", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
          >
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" style={{ animation: "orbit-spin 1s linear infinite" }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Signing in…
              </>
            ) : `Sign in as ${role === "hospital" ? "Hospital Admin" : "Doctor"}`}
          </button>
        </form>

        {/* Footer links */}
        <div style={{ marginTop: "1.75rem", textAlign: "center" }}>
          <p style={{ color: "#334155", fontSize: "0.85rem", margin: "0 0 0.5rem" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: "#60a5fa", textDecoration: "none", fontWeight: "600" }}>
              Create one →
            </Link>
          </p>
          <Link href="/" style={{ color: "#1e293b", fontSize: "0.8rem", textDecoration: "none" }}>
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
