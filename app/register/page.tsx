"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LocumOSLogo } from "@/components/shared/Header";

type Role = "hospital" | "doctor";
type Step = 1 | 2;

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("hospital");
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hospital fields
  const [orgName, setOrgName] = useState("");
  const [city, setCity] = useState("");

  // Doctor fields
  const [specialty, setSpecialty] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [mciNumber, setMciNumber] = useState("");

  // Shared
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role, name, email, password,
          orgName, city, specialty, yearsExp, mciNumber,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Registration failed. Please try again.");
      } else {
        router.push("/login?registered=1");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
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

  const focusInput = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(59,130,246,0.5)";
    e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
  };

  const blurInput = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(59,130,246,0.15)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0e1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 1.5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="orb" style={{ position: "absolute", top: "-10%", right: "-5%", width: "500px", height: "500px", background: "rgba(59,130,246,0.07)", zIndex: 0 }} />
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.3, zIndex: 0 }} />

      <div style={{
        position: "relative", zIndex: 10,
        width: "100%", maxWidth: "480px",
        background: "rgba(15,22,41,0.92)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(59,130,246,0.15)",
        borderRadius: "22px",
        padding: "2.5rem",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.08)",
        animation: "page-enter 0.4s ease forwards",
      }}>
        <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "1px", background: "linear-gradient(90deg, transparent, #a78bfa, transparent)", borderRadius: "100px" }} />

        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.75rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none", marginBottom: "1.5rem" }}>
            <LocumOSLogo size={34} />
            <span style={{ fontSize: "1.2rem", fontWeight: "800", color: "white", letterSpacing: "-0.035em" }}>LocumOS</span>
          </Link>
          <h1 style={{ color: "white", fontWeight: "800", fontSize: "1.4rem", letterSpacing: "-0.04em", margin: "0 0 0.3rem", textAlign: "center" }}>
            Create your account
          </h1>
          <p style={{ color: "#475569", fontSize: "0.85rem", margin: 0 }}>Join 12,847 verified doctors and 850+ hospitals</p>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1.75rem", justifyContent: "center" }}>
          {[1, 2].map(s => (
            <div key={s} style={{
              height: "3px", flex: 1, borderRadius: "100px",
              background: s <= step ? "linear-gradient(90deg, #3b82f6, #a78bfa)" : "rgba(59,130,246,0.12)",
              transition: "background 0.4s ease",
            }} />
          ))}
        </div>

        {/* Role toggle (step 1 only) */}
        {step === 1 && (
          <div style={{ display: "flex", background: "rgba(10,14,26,0.6)", borderRadius: "10px", padding: "4px", marginBottom: "1.5rem" }}>
            {(["hospital", "doctor"] as Role[]).map(r => (
              <button key={r} type="button" onClick={() => setRole(r)} style={{
                flex: 1, padding: "0.55rem", borderRadius: "8px", border: "none",
                background: role === r ? "rgba(59,130,246,0.18)" : "transparent",
                color: role === r ? "#60a5fa" : "#475569",
                fontSize: "0.875rem", fontWeight: role === r ? "700" : "500",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              }}>
                {r === "hospital" ? "🏥 Hospital" : "👨‍⚕️ Doctor"}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {step === 1 && (
            <>
              {role === "hospital" ? (
                <>
                  <div>
                    <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.35rem" }}>Organisation Name</label>
                    <input value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="Apollo Hospitals Ltd." required style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                  </div>
                  <div>
                    <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.35rem" }}>City / Region</label>
                    <input value={city} onChange={e => setCity(e.target.value)} placeholder="Bengaluru, KA" required style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.35rem" }}>Specialty</label>
                    <select value={specialty} onChange={e => setSpecialty(e.target.value)} required style={{ ...inputStyle, appearance: "none" }} onFocus={focusInput} onBlur={blurInput}>
                      <option value="">Select specialty</option>
                      {["Emergency Medicine", "Cardiology", "Anaesthesiology", "General Surgery", "Neurology", "Paediatrics", "Radiology", "Orthopaedics", "General Medicine"].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.35rem" }}>Years Experience</label>
                      <input type="number" value={yearsExp} onChange={e => setYearsExp(e.target.value)} placeholder="8" min="0" max="60" required style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                    </div>
                    <div>
                      <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.35rem" }}>MCI / SMC Number</label>
                      <input value={mciNumber} onChange={e => setMciNumber(e.target.value)} placeholder="MCI-12345" required style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.35rem" }}>Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder={role === "doctor" ? "Dr. Priya Nair" : "Admin Name"} required style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
              </div>
              <div>
                <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.35rem" }}>Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@hospital.com" required style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
              </div>
              <div>
                <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "0.35rem" }}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" minLength={8} required style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                <p style={{ color: "#334155", fontSize: "0.725rem", margin: "0.35rem 0 0" }}>Minimum 8 characters</p>
              </div>
            </>
          )}

          {error && (
            <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: "8px", padding: "0.75rem 1rem", color: "#f87171", fontSize: "0.85rem" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            {step === 2 && (
              <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: "0.875rem", borderRadius: "10px", border: "1px solid rgba(59,130,246,0.2)", background: "transparent", color: "#60a5fa", fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit", fontWeight: "500" }}>
                ← Back
              </button>
            )}
            <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 2, padding: "0.875rem", fontSize: "0.95rem", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              {loading ? "Creating account…" : step === 1 ? "Continue →" : "Create Account"}
            </button>
          </div>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ color: "#334155", fontSize: "0.85rem", margin: 0 }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#60a5fa", textDecoration: "none", fontWeight: "600" }}>Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
