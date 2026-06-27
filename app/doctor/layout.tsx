import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor Dashboard — LocumOS",
  description: "Find and bid on urgent medical shifts near you.",
};

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
