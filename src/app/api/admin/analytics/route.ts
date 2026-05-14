import { NextResponse } from "next/server";

export async function GET() {
  // Placeholder data for analytics
  return NextResponse.json({
    performanceData: [
      { label: "Transit Yield", value: "₱842k", trend: "+12.4%", status: "up" },
      { label: "Cargo Volume", value: "1,204 units", trend: "+8.1%", status: "up" },
      { label: "Fuel Efficiency", value: "3.2 km/L", trend: "-2.1%", status: "down" },
      { label: "Net Compliance", value: "99.8%", trend: "Stable", status: "stable" },
    ],
    revenueTimeline: [
      { day: "Mon", value: 65 },
      { day: "Tue", value: 45 },
      { day: "Wed", value: 85 },
      { day: "Thu", value: 70 },
      { day: "Fri", value: 95 },
      { day: "Sat", value: 80 },
      { day: "Sun", value: 60 },
    ],
    networkDistribution: [
      { region: "NCR", share: 45, color: "bg-primary" },
      { region: "Central Luzon", share: 30, color: "bg-blue-500" },
      { region: "Southern Tagalog", share: 25, color: "bg-emerald-500" },
    ]
  });
}
