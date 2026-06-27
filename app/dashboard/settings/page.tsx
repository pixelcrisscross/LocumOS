"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/shared/Header";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [orgName, setOrgName] = useState("Apollo Hospitals — Bannerghatta");
  const [email, setEmail] = useState("admin@apollo.med");
  const [phone, setPhone] = useState("+91 80 2630 4050");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [urgentAlerts, setUrgentAlerts] = useState(true);
  const [autoFill, setAutoFill] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const SectionTitle = ({ title, sub }: { title: string; sub?: string }) => (
    <div style={{ marginBottom: "1.25rem" }}>
      <h2 style={{ color: "white", fontWeight: "700", fontSize: "0.9375rem", margin: "0 0 0.2rem", letterSpacing: "-0.02em" }}>{title}</h2>
      {sub && <p style={{ color: "#475569", fontSize: "0.825rem", margin: 0 }}>{sub}</p>}
    </div>
  );

  const FieldLabel = ({ label, id }: { label: string; id: string }) => (
    <Label htmlFor={id} style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", letterSpacing: "-0.01em" }}>{label}</Label>
  );

  const styledInput = {
    background: "rgba(10,14,26,0.8)",
    border: "1px solid rgba(59,130,246,0.15)",
    borderRadius: "8px",
    color: "#f1f5f9",
    fontSize: "0.9rem",
    height: "40px",
  };

  const ToggleRow = ({ id, label, sub, value, onChange }: { id: string; label: string; sub: string; value: boolean; onChange: (v: boolean) => void }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1rem", borderRadius: "10px", background: value ? "rgba(59,130,246,0.04)" : "transparent", border: `1px solid ${value ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.06)"}`, transition: "all 0.2s", marginBottom: "0.625rem" }}>
      <div>
        <p style={{ color: "white", fontWeight: "600", fontSize: "0.875rem", margin: "0 0 0.1rem" }}>{label}</p>
        <p style={{ color: "#475569", fontSize: "0.775rem", margin: 0 }}>{sub}</p>
      </div>
      <Switch id={id} checked={value} onCheckedChange={onChange} />
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0e1a" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "240px", display: "flex", flexDirection: "column" }}>
        <Header title="Settings" subtitle="Manage your organisation profile and preferences" />
        <main style={{ padding: "2rem 2.5rem", flex: 1, maxWidth: "780px" }}>
          {/* Organisation */}
          <div className="dash-card" style={{ padding: "1.75rem", marginBottom: "1.25rem" }}>
            <SectionTitle title="Organisation Profile" sub="This information is shown to doctors browsing your shifts." />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <FieldLabel label="Organisation Name" id="org-name" />
                <Input id="org-name" value={orgName} onChange={e => setOrgName(e.target.value)} style={styledInput} />
              </div>
              <div>
                <FieldLabel label="Admin Email" id="admin-email" />
                <Input id="admin-email" type="email" value={email} onChange={e => setEmail(e.target.value)} style={styledInput} />
              </div>
              <div>
                <FieldLabel label="Phone Number" id="admin-phone" />
                <Input id="admin-phone" value={phone} onChange={e => setPhone(e.target.value)} style={styledInput} />
              </div>
              <div>
                <FieldLabel label="City / Region" id="city" />
                <Input id="city" defaultValue="Bengaluru, KA" style={styledInput} />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="dash-card" style={{ padding: "1.75rem", marginBottom: "1.25rem" }}>
            <SectionTitle title="Notifications" sub="Control how and when you receive updates." />
            <ToggleRow id="email-notifs" label="Email Notifications" sub="Bid updates, shift fills, and weekly reports" value={emailNotifs} onChange={setEmailNotifs} />
            <ToggleRow id="push-notifs" label="Push Notifications" sub="Real-time in-app alerts" value={pushNotifs} onChange={setPushNotifs} />
            <ToggleRow id="urgent-alerts" label="Urgent Shift Alerts" sub="Immediate alerts when urgent shifts go unfilled" value={urgentAlerts} onChange={setUrgentAlerts} />
          </div>

          {/* Preferences */}
          <div className="dash-card" style={{ padding: "1.75rem", marginBottom: "1.25rem" }}>
            <SectionTitle title="Preferences" sub="Automation and workflow settings." />
            <ToggleRow id="auto-fill" label="Auto-Fill Suggestions" sub="AI suggests best-matched doctors for your shifts" value={autoFill} onChange={setAutoFill} />
          </div>

          {/* Danger zone */}
          <div style={{ padding: "1.375rem 1.5rem", borderRadius: "14px", border: "1px solid rgba(239,68,68,0.15)", background: "rgba(239,68,68,0.03)" }}>
            <h2 style={{ color: "#f87171", fontWeight: "700", fontSize: "0.9375rem", margin: "0 0 0.4rem" }}>Danger Zone</h2>
            <p style={{ color: "#475569", fontSize: "0.825rem", margin: "0 0 0.875rem" }}>These actions are irreversible. Please proceed with caution.</p>
            <button style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", padding: "0.55rem 1.25rem", borderRadius: "9px", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer", fontFamily: "inherit" }}>
              Delete Organisation Account
            </button>
          </div>

          {/* Save */}
          <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleSave}
              style={{
                background: saved ? "rgba(74,222,128,0.15)" : "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: saved ? "#4ade80" : "white",
                border: saved ? "1px solid rgba(74,222,128,0.3)" : "none",
                padding: "0.65rem 2rem", borderRadius: "10px",
                fontWeight: "600", fontSize: "0.9rem", cursor: "pointer",
                boxShadow: saved ? "none" : "0 4px 16px rgba(59,130,246,0.3)",
                transition: "all 0.25s", fontFamily: "inherit",
              }}
            >
              {saved ? "✓ Saved!" : "Save Changes"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
