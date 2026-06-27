"use client";

import { useState } from "react";

const freePlan = {
  name: "Free",
  price: "₹0",
  period: "forever",
  tagline: "Get started with the basics",
  cta: "Start for free",
  ctaStyle: "ghost",
  features: [
    "Post up to 3 shifts/month",
    "Access to verified doctor pool",
    "Basic AI matching",
    "Email support (48-hr response)",
    "Shift analytics dashboard",
    "Doctor profile verification",
  ],
  notIncluded: [
    "Priority bid notifications",
    "Same-day payouts",
    "Advanced compliance tools",
    "Dedicated account manager",
  ],
};

const proPlan = {
  name: "Pro",
  price: "₹4,999",
  period: "per month",
  tagline: "For growing clinics and active locums",
  cta: "Start Pro trial",
  ctaStyle: "primary",
  popular: true,
  features: [
    "Unlimited shift postings",
    "Priority AI matching (< 4 min avg)",
    "Same-day doctor payouts",
    "Full compliance automation",
    "Advanced analytics & reports",
    "Priority support (< 2-hr response)",
    "Dedicated account manager",
    "Custom rate cards & contracts",
    "Team seats (up to 10 users)",
    "API access & webhooks",
  ],
};

function CheckIcon({ color = "#3b82f6" }: { color?: string }) {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: `${color}18`,
        border: `1px solid ${color}35`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: "2px",
      }}
    >
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <polyline
          points="2 6 5 9 10 3"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function XIcon() {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: "rgba(71,85,105,0.2)",
        border: "1px solid rgba(71,85,105,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: "2px",
      }}
    >
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
        <line x1="2" y1="2" x2="8" y2="8" stroke="#475569" strokeWidth="1.75" strokeLinecap="round" />
        <line x1="8" y1="2" x2="2" y2="8" stroke="#475569" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function Pricing() {
  const [hoveredCard, setHoveredCard] = useState<"free" | "pro" | null>(null);

  return (
    <section
      id="pricing"
      style={{
        padding: "6rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background radial */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span
            className="badge"
            style={{ marginBottom: "1.25rem", display: "inline-flex" }}
          >
            Simple pricing
          </span>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              fontWeight: "800",
              color: "white",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              margin: "0 0 1rem",
            }}
          >
            Start free.{" "}
            <span className="gradient-text">Scale when you're ready.</span>
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "1.05rem",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            No contracts. No hidden fees. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            maxWidth: "780px",
            margin: "0 auto",
          }}
        >
          {/* Free Plan */}
          <div
            id="plan-free"
            className="pricing-card"
            onMouseEnter={() => setHoveredCard("free")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Plan name */}
            <div style={{ marginBottom: "1.75rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {freePlan.name}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "flex-end", gap: "0.375rem", marginBottom: "0.5rem" }}>
                <span
                  style={{
                    fontSize: "2.75rem",
                    fontWeight: "800",
                    color: "white",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {freePlan.price}
                </span>
                <span style={{ color: "#475569", fontSize: "0.875rem", paddingBottom: "0.25rem" }}>
                  /{freePlan.period}
                </span>
              </div>
              <p style={{ color: "#475569", fontSize: "0.875rem", margin: 0 }}>
                {freePlan.tagline}
              </p>
            </div>

            {/* CTA */}
            <button
              className="btn-ghost"
              style={{ width: "100%", marginBottom: "1.75rem" }}
            >
              {freePlan.cta}
            </button>

            <hr className="hr-glow" style={{ marginBottom: "1.5rem" }} />

            {/* Features */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {freePlan.features.map((f) => (
                <div key={f} className="check-item">
                  <CheckIcon color="#3b82f6" />
                  <span>{f}</span>
                </div>
              ))}
              {freePlan.notIncluded.map((f) => (
                <div key={f} className="check-item" style={{ color: "#334155" }}>
                  <XIcon />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div
            id="plan-pro"
            className="pricing-card featured"
            onMouseEnter={() => setHoveredCard("pro")}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              boxShadow:
                hoveredCard === "pro"
                  ? "0 25px 50px rgba(0,0,0,0.5), 0 0 60px rgba(59,130,246,0.18)"
                  : "0 0 0 rgba(59,130,246,0.1), 0 0 30px rgba(59,130,246,0.08)",
            }}
          >
            {/* Popular badge */}
            <div
              style={{
                position: "absolute",
                top: "-1px",
                right: "1.75rem",
                background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                color: "white",
                fontSize: "0.7rem",
                fontWeight: "700",
                padding: "0.3rem 0.875rem",
                borderRadius: "0 0 8px 8px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Most Popular
            </div>

            {/* Plan name */}
            <div style={{ marginBottom: "1.75rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#60a5fa",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {proPlan.name}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "flex-end", gap: "0.375rem", marginBottom: "0.5rem" }}>
                <span
                  style={{
                    fontSize: "2.75rem",
                    fontWeight: "800",
                    color: "white",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {proPlan.price}
                </span>
                <span style={{ color: "#64748b", fontSize: "0.875rem", paddingBottom: "0.25rem" }}>
                  /{proPlan.period}
                </span>
              </div>
              <p style={{ color: "#475569", fontSize: "0.875rem", margin: 0 }}>
                {proPlan.tagline}
              </p>
            </div>

            {/* CTA */}
            <button
              className="btn-primary"
              style={{ width: "100%", marginBottom: "1.75rem" }}
            >
              {proPlan.cta} →
            </button>

            <hr className="hr-glow" style={{ marginBottom: "1.5rem" }} />

            {/* Features */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {proPlan.features.map((f) => (
                <div key={f} className="check-item">
                  <CheckIcon color="#60a5fa" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div
          style={{
            marginTop: "3rem",
            textAlign: "center",
            padding: "2rem",
            borderRadius: "16px",
            background: "rgba(15,22,41,0.5)",
            border: "1px solid rgba(59,130,246,0.1)",
            maxWidth: "780px",
            margin: "3rem auto 0",
          }}
        >
          <p style={{ color: "#64748b", fontSize: "0.95rem", margin: "0 0 0.5rem" }}>
            Running a large health system or a network of hospitals?
          </p>
          <p style={{ color: "#cbd5e1", fontSize: "1rem", margin: "0 0 1.25rem", fontWeight: "500" }}>
            We offer custom enterprise plans with volume pricing, SLA guarantees, and white-label options.
          </p>
          <a
            href="#"
            style={{
              color: "#60a5fa",
              fontWeight: "600",
              textDecoration: "none",
              fontSize: "0.95rem",
              borderBottom: "1px solid rgba(96,165,250,0.3)",
              paddingBottom: "2px",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderBottomColor = "#60a5fa")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.borderBottomColor =
                "rgba(96,165,250,0.3)")
            }
          >
            Talk to our enterprise team →
          </a>
        </div>
      </div>
    </section>
  );
}
