"use client";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
  Developers: ["API Docs", "Webhooks", "SDKs", "Status Page"],
};

const socials = [
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(59,130,246,0.1)",
        background: "rgba(10,14,26,0.98)",
        padding: "4rem 1.5rem 2.5rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "220px repeat(4, 1fr)",
            gap: "3rem",
            marginBottom: "3.5rem",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "7px",
                  background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L3 7v10l9 5 9-5V7L12 2z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2v20M3 7l9 5 9-5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: "1rem",
                  letterSpacing: "-0.03em",
                }}
              >
                LocumOS
              </span>
            </a>
            <p
              style={{
                color: "#475569",
                fontSize: "0.85rem",
                lineHeight: "1.65",
                margin: 0,
              }}
            >
              The intelligent OS for medical staffing. Connecting hospitals with
              the right doctors at the right time.
            </p>
            {/* Socials */}
            <div style={{ display: "flex", gap: "0.625rem", marginTop: "0.25rem" }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#475569",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(59,130,246,0.12)";
                    el.style.borderColor = "rgba(59,130,246,0.3)";
                    el.style.color = "#60a5fa";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(255,255,255,0.04)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.color = "#475569";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <h4
                style={{
                  color: "#f1f5f9",
                  fontSize: "0.8125rem",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  margin: 0,
                }}
              >
                {category}
              </h4>
              {links.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    color: "#475569",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    lineHeight: 1,
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#94a3b8")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#475569")
                  }
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="hr-glow" style={{ marginBottom: "1.75rem" }} />

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "#334155", fontSize: "0.825rem", margin: 0 }}>
            © {new Date().getFullYear()} LocumOS Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 6px rgba(34,197,94,0.5)",
              }}
            />
            <span style={{ color: "#334155", fontSize: "0.8rem" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
