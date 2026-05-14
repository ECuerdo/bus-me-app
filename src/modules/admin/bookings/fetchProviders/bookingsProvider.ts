import { Booking } from "../types";

interface RawTicket {
  id: string;
  passenger_name: string;
  seat_number: string;
  total_price: number;
  payment_status: string;
  payment_method: string;
  created_at: string;
  schedules: {
    departure_time: string;
    routes: {
      name: string;
    };
  };
}

export const bookingsProvider = {
  getBookings: async (): Promise<Booking[]> => {
    const res = await fetch("/api/admin/tickets");
    if (!res.ok) throw new Error("Failed to fetch bookings");
    const data: RawTicket[] = await res.json();

    return data.map((t) => ({
      id: "BK-" + t.id.substring(0, 5).toUpperCase(),
      passenger: t.passenger_name || "Unknown",
      tripId: t.schedules?.routes?.name || "T-000",
      seat: t.seat_number,
      amount: "₱" + t.total_price.toLocaleString(),
      date: new Date(t.created_at).toISOString().split("T")[0],
      status: t.payment_status === "paid" ? "Paid" : "Pending",
      method: t.payment_method || "Other",
    }));
  },
};
