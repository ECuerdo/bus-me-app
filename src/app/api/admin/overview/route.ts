import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    stats: [
      { label: "Gross Revenue", value: "₱124,500.25", change: "+12.5%" },
      { label: "Total Bookings", value: "1,204", change: "+8.2%" },
    ]
  });
}
