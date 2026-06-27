import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — LocumOS",
  description: "Hospital administrator dashboard for managing medical shifts and doctor bids.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
