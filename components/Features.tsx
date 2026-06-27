"use client";

const clinicFeatures = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
        <polyline points="13 2 13 9 20 9"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: "Instant Shift Posting",
    description:
      "Post an urgent shift in under 60 seconds. Set specialty, pay rate, and time window — our engine handles the rest.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: "AI-Powered Matching",
    description:
      "LocumOS scores doctors by specialty, proximity, availability, and past ratings. You see only verified, top-tier candidates.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: "Compliance Guardrails",
    description:
      "Every doctor is pre-verified: medical council registration, insurance, and license checks run automatically — before the first bid.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: "Zero Agency Fees",
    description:
      "No recruiters, no commissions. Pay doctors directly through our platform. Savings of up to 40% vs. traditional staffing agencies.",
  },
];

const doctorFeatures = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "Bid on Your Schedule",
    description:
      "Browse shifts that fit your calendar. Set your minimum rate, bid in one tap, and let hospitals compete for your expertise.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: "Build Your Reputation",
    description:
      "Every completed shift adds to your verified score. Top-rated doctors get first look at premium shifts and negotiated rates.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "Same-Day Payouts",
    description:
      "Complete a shift, get paid — same day. No invoice chasing, no 30-day terms. Instant transfer to your bank or wallet.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Peer Network Access",
    description:
      "Connect with 12,000+ verified doctors. Share insights, refer shifts to colleagues, and grow your professional network on LocumOS.",
  },
];

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
}

function FeatureCard({ icon, title, description, accentColor }: FeatureCardProps) {
  return (
    <div
      className="glass-card"
      style={{
        borderRadius: "14px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.875rem",
      }}
    >
      <div className="feature-icon" style={{ background: `${accentColor}18`, borderColor: `${accentColor}30` }}>
        {icon}
      </div>
      <h3
        style={{
          fontSize: "1rem",
          fontWeight: "600",
          color: "white",
          letterSpacing: "-0.02em",
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "0.9rem",
          color: "#64748b",
          lineHeight: "1.65",
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}

interface ColumnProps {
  side: "clinics" | "doctors";
  title: string;
  subtitle: string;
  badge: string;
  features: typeof clinicFeatures;
  accentColor: string;
  borderColor: string;
  gradientFrom: string;
  gradientTo: string;
}

function FeatureColumn({
  side,
  title,
  subtitle,
  badge,
  features,
  accentColor,
  borderColor,
  gradientFrom,
  gradientTo,
}: ColumnProps) {
  return (
    <div
      id={side}
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "2.5rem",
        borderRadius: "20px",
        background: "rgba(10, 14, 26, 0.6)",
        border: `1px solid ${borderColor}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gradient accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />
      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}30`,
            color: accentColor,
            fontSize: "0.775rem",
            fontWeight: "600",
            padding: "0.3rem 0.75rem",
            borderRadius: "100px",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            width: "fit-content",
          }}
        >
          {badge}
        </span>
        <h2
          style={{
            fontSize: "1.65rem",
            fontWeight: "750",
            color: "white",
            letterSpacing: "-0.035em",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {title}
        </h2>
        <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
          {subtitle}
        </p>
      </div>

      <hr className="hr-glow" />

      {/* Feature cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {features.map((f) => (
          <FeatureCard
            key={f.title}
            {...f}
            accentColor={accentColor}
          />
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      style={{
        padding: "6rem 1.5rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <span className="badge" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
          Built for both sides
        </span>
        <h2
          style={{
            fontSize: "clamp(1.9rem, 4vw, 3rem)",
            fontWeight: "800",
            color: "white",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            margin: "0 auto 1rem",
            maxWidth: "640px",
          }}
        >
          One platform.{" "}
          <span className="gradient-text">Two superpowers.</span>
        </h2>
        <p style={{ color: "#64748b", fontSize: "1.05rem", maxWidth: "520px", margin: "0 auto", lineHeight: 1.65 }}>
          Whether you run a 500-bed hospital or do weekend locum work, LocumOS has tools purpose-built for you.
        </p>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "1.5rem",
          alignItems: "start",
        }}
      >
        <FeatureColumn
          side="clinics"
          badge="For Clinics & Hospitals"
          title="Fill any shift in minutes, not days."
          subtitle="From ICU coverage to outpatient clinics — LocumOS gives your ops team a control panel for real-time staffing."
          features={clinicFeatures}
          accentColor="#3b82f6"
          borderColor="rgba(59,130,246,0.15)"
          gradientFrom="#3b82f6"
          gradientTo="transparent"
        />
        <FeatureColumn
          side="doctors"
          badge="For Freelance Doctors"
          title="Work on your terms, get paid fast."
          subtitle="Build a flexible practice. Bid only on shifts that match your specialty and availability. No middlemen."
          features={doctorFeatures}
          accentColor="#a78bfa"
          borderColor="rgba(167,139,250,0.15)"
          gradientFrom="#a78bfa"
          gradientTo="transparent"
        />
      </div>
    </section>
  );
}
