"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/shared/Header";
import Link from "next/link";

const faqs = [
  { q: "How do I post a shift?", a: "Navigate to the Dashboard and use the 'Post New Shift' form. Fill in specialty, date, time, location, and pay rate. Click 'Post Shift' to publish it instantly to all matching doctors." },
  { q: "How long does it take to find a doctor?", a: "On average, 3.8 minutes. Urgent shifts are pushed immediately to all available doctors within your selected radius." },
  { q: "What happens if a bid is accepted?", a: "The doctor is notified instantly. Payment is processed automatically after the shift is completed and confirmed by both parties." },
  { q: "Can I reject a bid after accepting?", a: "Yes, but you must do so at least 4 hours before the shift start time. Late cancellations may incur a fee per your plan terms." },
  { q: "How are doctors verified?", a: "Every doctor undergoes MCI registration verification, background checks, malpractice insurance confirmation, and reference checks before appearing on the platform." },
  { q: "How do payouts work?", a: "Payments are processed via IMPS/NEFT/UPI within 24 hours of shift completion. No manual invoicing required." },
];

const channels = [
  { icon: "💬", title: "Live Chat", sub: "Avg response: < 2 minutes", action: "Start chat", color: "#3b82f6" },
  { icon: "📧", title: "Email Support", sub: "support@locumos.com", action: "Send email", color: "#a78bfa" },
  { icon: "📖", title: "Documentation", sub: "Guides, API docs, tutorials", action: "Browse docs", color: "#4ade80" },
  { icon: "🎯", title: "Onboarding Call", sub: "Book a 30-min walkthrough", action: "Schedule call", color: "#fb923c" },
];

export default function HelpPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0e1a" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "240px", display: "flex", flexDirection: "column" }}>
        <Header title="Help & Support" subtitle="Find answers or reach our team" />
        <main style={{ padding: "2rem 2.5rem", flex: 1 }}>
          {/* Hero banner */}
          <div style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(167,139,250,0.08))",
            border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: "18px",
            padding: "2.5rem",
            textAlign: "center",
            marginBottom: "2rem",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #3b82f6, #a78bfa, transparent)" }} />
            <p style={{ color: "#60a5fa", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.75rem" }}>Support Centre</p>
            <h2 style={{ color: "white", fontSize: "1.75rem", fontWeight: "800", letterSpacing: "-0.04em", margin: "0 0 0.75rem" }}>
              How can we help you?
            </h2>
            <p style={{ color: "#475569", fontSize: "0.9rem", margin: "0 0 1.5rem" }}>
              Search our knowledge base or contact our support team
            </p>
            <div style={{ position: "relative", maxWidth: "460px", margin: "0 auto" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input placeholder="Search for answers…" style={{ width: "100%", background: "rgba(10,14,26,0.7)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "10px", color: "#f1f5f9", fontSize: "0.9rem", padding: "0.75rem 1rem 0.75rem 2.75rem", outline: "none", fontFamily: "inherit" }} />
            </div>
          </div>

          {/* Support channels */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
            {channels.map(c => (
              <div key={c.title} className="dash-card pressable" style={{ padding: "1.375rem", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{c.icon}</div>
                <p style={{ color: "white", fontWeight: "700", fontSize: "0.9rem", margin: "0 0 0.25rem", letterSpacing: "-0.02em" }}>{c.title}</p>
                <p style={{ color: "#475569", fontSize: "0.775rem", margin: "0 0 1rem" }}>{c.sub}</p>
                <button style={{ background: `${c.color}14`, color: c.color, border: `1px solid ${c.color}25`, padding: "0.4rem 1rem", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", width: "100%" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${c.color}22`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${c.color}14`; }}
                >
                  {c.action}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="dash-card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
              <h3 style={{ color: "white", fontWeight: "700", fontSize: "0.9375rem", margin: 0 }}>Frequently Asked Questions</h3>
            </div>
            <div>
              {faqs.map((faq, i) => (
                <div key={i} style={{ padding: "1.125rem 1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid rgba(59,130,246,0.06)" : "none" }}>
                  <p style={{ color: "white", fontWeight: "600", fontSize: "0.875rem", margin: "0 0 0.4rem", letterSpacing: "-0.01em" }}>{faq.q}</p>
                  <p style={{ color: "#475569", fontSize: "0.825rem", margin: 0, lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <p style={{ color: "#334155", fontSize: "0.8rem", textAlign: "center", marginTop: "2rem" }}>
            Still need help?{" "}
            <Link href="mailto:support@locumos.com" style={{ color: "#3b82f6", textDecoration: "none" }}>
              Email us directly
            </Link>{" "}
            — we respond within 2 hours.
          </p>
        </main>
      </div>
    </div>
  );
}
