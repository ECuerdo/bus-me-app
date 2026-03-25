import { useState, useMemo } from "react";
import { CreditCard, Clock, XCircle } from "lucide-react";
import { Booking, CargoItem, BookingStat } from "../types";

export const useBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const bookings: Booking[] = [
    { id: "BK-9001", passenger: "Maria Santos", tripId: "T-801", seat: "A12", amount: "₱750.00", date: "2024-03-20", status: "Paid", method: "GCash" },
    { id: "BK-9002", passenger: "Pedro Penduko", tripId: "T-801", seat: "A13", amount: "₱750.00", date: "2024-03-20", status: "Paid", method: "Credit Card" },
    { id: "BK-9003", passenger: "Liza Soberano", tripId: "T-802", seat: "B05", amount: "₱920.00", date: "2024-03-20", status: "Pending", method: "Over-the-Counter" },
    { id: "BK-9004", passenger: "Enrique Gil", tripId: "T-802", seat: "B06", amount: "₱920.00", date: "2024-03-21", status: "Paid", method: "Maya" },
    { id: "BK-9005", passenger: "Kathryn Bernardo", tripId: "T-803", seat: "C10", amount: "₱1,150.00", date: "2024-03-21", status: "Cancelled", method: "GCash" },
  ];

  const cargo: CargoItem[] = [
    { id: "WB-4001", sender: "Juan Luna", receiver: "Jose Rizal", type: "Perishable", wt: "15kg", fee: "₱450.00", status: "In Transit" },
    { id: "WB-4002", sender: "Antonio Luna", receiver: "Melchora Aquino", type: "Document", wt: "0.5kg", fee: "₱120.00", status: "Ready" },
  ];

  const stats: BookingStat[] = [
    { label: "Daily Yield", val: "₱42,100", icon: CreditCard, col: "text-emerald-500" },
    { label: "Pending Auth", val: "₱8,400", icon: Clock, col: "text-amber-500" },
    { label: "Refund Volume", val: "₱1,200", icon: XCircle, col: "text-rose-500" },
  ];

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => 
      b.passenger.toLowerCase().includes(searchTerm.toLowerCase()) || 
      b.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, bookings]);

  return {
    searchTerm,
    setSearchTerm,
    filteredBookings,
    cargo,
    stats
  };
};
