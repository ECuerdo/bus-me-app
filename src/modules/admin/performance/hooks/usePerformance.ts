import { useState, useMemo } from "react";
import { DriverPerformance, UserFeedback } from "../types";

const drivers: DriverPerformance[] = [
  { id: "D-101", name: "Roberto Cruz", score: 4.9, trips: 142, punctuality: "98%", status: "Elite", feedback: "Excellent driving, very polite." },
  { id: "D-102", name: "Antonio Luna", score: 4.7, trips: 128, punctuality: "95%", status: "Certified", feedback: "Smooth ride, arrived on time." },
  { id: "D-103", name: "Juan Dela Cruz", score: 4.2, trips: 95, punctuality: "88%", status: "Standard", feedback: "A bit fast on curves." },
];

const feedbacks: UserFeedback[] = [
  { id: "FB-001", user: "Maria S.", driver: "Roberto Cruz", rating: 5, comment: "The driver was very professional and the bus was clean.", date: "2h ago" },
  { id: "FB-002", user: "Pedro P.", driver: "Antonio Luna", rating: 4, comment: "Good trip, but the AC was a bit too cold.", date: "5h ago" },
  { id: "FB-003", user: "Liza G.", driver: "Juan Dela Cruz", rating: 3, comment: "Departure was delayed by 15 minutes.", date: "1d ago" },
];

export const usePerformance = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDrivers = useMemo(() => {
    return drivers.filter(d => 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      d.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredDrivers,
    feedbacks
  };
};
