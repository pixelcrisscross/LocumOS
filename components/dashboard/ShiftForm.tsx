"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const specialties = [
  "Emergency Medicine", "Cardiology", "Anaesthesiology", "General Surgery",
  "Orthopaedics", "Paediatrics", "Neurology", "Radiology",
  "Internal Medicine", "Obstetrics & Gynaecology", "Psychiatry",
  "Dermatology", "Oncology", "Nephrology",
];

const locations = [
  "ICU — Ward 3B", "Emergency Dept.", "OPD — Block A",
  "OT — Theatre 1", "OT — Theatre 2", "Neonatal Unit",
  "Cardiac Ward", "Radiology Suite",
];

type FormState = {
  specialty: string; date: string; time: string;
  location: string; payRate: string; urgent: boolean; notes: string;
};

export default function ShiftForm() {
  const [form, setForm] = useState<FormState>({
    specialty: "", date: "", time: "", location: "",
    payRate: "", urgent: false, notes: "",
  });
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.specialty || !form.date || !form.time || !form.location || !form.payRate) {
      setErrorMsg("Please fill all required fields.");
      setState("error");
      return;
    }
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/shifts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          specialty: form.specialty,
          date: form.date,
          time: form.time,
          location: form.location,
          payRate: Number(form.payRate),
          urgency: form.urgent ? "urgent" : "normal",
          notes: form.notes,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Failed to post shift");
      }
      setState("success");
      setForm({ specialty: "", date: "", time: "", location: "", payRate: "", urgent: false, notes: "" });
      setTimeout(() => setState("idle"), 3500);
    } catch (err: any) {
      setErrorMsg(err.message);
      setState("error");
      setTimeout(() => setState("idle"), 4000);
    }
  };

  return (
    <Card style={{ background: "rgba(15,22,41,0.85)", border: "1px solid rgba(59,130,246,0.14)", borderRadius: "16px", overflow: "visible", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #3b82f6, transparent)", borderRadius: "16px 16px 0 0" }} />

      <CardHeader style={{ padding: "1.5rem 1.75rem 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(59,130,246,0.14)", border: "1px solid rgba(59,130,246,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>
              </svg>
            </div>
            <CardTitle style={{ color: "white", fontSize: "1rem", fontWeight: "700", letterSpacing: "-0.02em" }}>Post New Shift</CardTitle>
          </div>
          {form.urgent && (<span className="status-urgent"><span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ef4444" }} />Urgent</span>)}
        </div>
        <p style={{ color: "#475569", fontSize: "0.825rem", marginTop: "0.5rem" }}>Fill in the details below and instantly reach 12,000+ verified doctors.</p>
      </CardHeader>

      <CardContent style={{ padding: "1.25rem 1.75rem 1.75rem" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
          <div>
            <Label htmlFor="specialty" className="form-field-label">Specialty Required</Label>
            <Select value={form.specialty} onValueChange={v => setForm(p => ({ ...p, specialty: v as string }))}>
              <SelectTrigger id="specialty" style={{ background: "rgba(10,14,26,0.8)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: "8px", color: form.specialty ? "#f1f5f9" : "#334155", fontSize: "0.9rem", height: "40px" }}>
                <SelectValue placeholder="Select specialty…" />
              </SelectTrigger>
              <SelectContent style={{ background: "#141c35", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "10px" }}>
                {specialties.map(s => <SelectItem key={s} value={s} style={{ color: "#cbd5e1", fontSize: "0.875rem" }}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
            <div>
              <Label htmlFor="shift-date" className="form-field-label">Date</Label>
              <Input id="shift-date" type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} style={{ background: "rgba(10,14,26,0.8)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: "8px", color: "#f1f5f9", fontSize: "0.9rem", height: "40px", colorScheme: "dark" }} />
            </div>
            <div>
              <Label htmlFor="shift-time" className="form-field-label">Start Time</Label>
              <Input id="shift-time" type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} style={{ background: "rgba(10,14,26,0.8)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: "8px", color: "#f1f5f9", fontSize: "0.9rem", height: "40px", colorScheme: "dark" }} />
            </div>
          </div>

          <div>
            <Label htmlFor="location" className="form-field-label">Ward / Location</Label>
            <Select value={form.location} onValueChange={v => setForm(p => ({ ...p, location: v as string }))}>
              <SelectTrigger id="location" style={{ background: "rgba(10,14,26,0.8)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: "8px", color: form.location ? "#f1f5f9" : "#334155", fontSize: "0.9rem", height: "40px" }}>
                <SelectValue placeholder="Select location…" />
              </SelectTrigger>
              <SelectContent style={{ background: "#141c35", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "10px" }}>
                {locations.map(l => <SelectItem key={l} value={l} style={{ color: "#cbd5e1", fontSize: "0.875rem" }}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="pay-rate" className="form-field-label">Pay Rate (₹/hr)</Label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "#3b82f6", fontWeight: "600", fontSize: "1rem", pointerEvents: "none" }}>₹</span>
              <Input id="pay-rate" type="number" placeholder="e.g. 4500" value={form.payRate} onChange={e => setForm(p => ({ ...p, payRate: e.target.value }))} style={{ background: "rgba(10,14,26,0.8)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: "8px", color: "#f1f5f9", fontSize: "0.9rem", height: "40px", paddingLeft: "1.875rem" }} />
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="form-field-label">Additional Notes</Label>
            <textarea id="notes" placeholder="e.g. Must have ICU experience, night shift allowance included…" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={2} className="form-input" style={{ resize: "vertical", minHeight: "64px", padding: "0.6rem 0.875rem" }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1rem", background: form.urgent ? "rgba(239,68,68,0.07)" : "rgba(10,14,26,0.5)", border: `1px solid ${form.urgent ? "rgba(239,68,68,0.25)" : "rgba(59,130,246,0.1)"}`, borderRadius: "10px", transition: "all 0.2s" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
              <Label htmlFor="urgent-toggle" style={{ color: form.urgent ? "#f87171" : "#94a3b8", fontWeight: "600", fontSize: "0.875rem", cursor: "pointer", letterSpacing: "-0.01em" }}>🚨 Mark as Urgent</Label>
              <span style={{ color: "#475569", fontSize: "0.775rem" }}>Urgent shifts get priority placement and push alerts to nearby doctors</span>
            </div>
            <Switch id="urgent-toggle" checked={form.urgent} onCheckedChange={v => setForm(p => ({ ...p, urgent: v }))} style={{ flexShrink: 0 }} />
          </div>

          {state === "error" && (
            <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", padding: "0.65rem 0.875rem", color: "#f87171", fontSize: "0.825rem" }}>
              {errorMsg || "Something went wrong. Please try again."}
            </div>
          )}

          <Button
            type="submit"
            id="post-shift-btn"
            disabled={state === "loading"}
            style={{
              background: state === "success" ? "rgba(74,222,128,0.15)" : state === "loading" ? "rgba(59,130,246,0.5)" : "linear-gradient(135deg, #3b82f6, #2563eb)",
              color: state === "success" ? "#4ade80" : "white",
              border: state === "success" ? "1px solid rgba(74,222,128,0.3)" : "none",
              fontWeight: "600", fontSize: "0.9375rem", height: "44px", borderRadius: "10px",
              cursor: state === "loading" ? "not-allowed" : "pointer",
              transition: "all 0.25s", letterSpacing: "-0.01em",
              boxShadow: state === "loading" || state === "success" ? "none" : "0 4px 16px rgba(59,130,246,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%",
            }}
          >
            {state === "loading" ? (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" style={{ animation: "orbit-spin 0.8s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Posting shift…</>
            ) : state === "success" ? (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>Shift Posted!</>
            ) : "Post Shift →"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
