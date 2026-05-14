import { useState, useMemo, useEffect } from "react";
import { CreditCard, Clock, XCircle } from "lucide-react";
import { Booking, CargoItem, BookingStat } from "../types";
import { bookingsProvider } from "../fetchProviders/bookingsProvider";

export const useBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const data = await bookingsProvider.getBookings();
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
    setIsLoading(false);
  };

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
    stats,
    isLoading,
    refreshBookings: fetchBookings
  };
};
