import { Bus } from "../types";

interface RawBus {
  id: string;
  plate_number: string;
  capacity: number;
  status: string;
  last_maintenance_date?: string;
  model: string;
}

export const fleetProvider = {
  getBuses: async (): Promise<Bus[]> => {
    const res = await fetch("/api/admin/buses");
    if (!res.ok) throw new Error("Failed to fetch buses");
    const data: RawBus[] = await res.json();

    return data.map((b) => ({
      id: b.id.substring(0, 8),
      plate: b.plate_number,
      type: b.capacity > 40 ? "Executive" : "Regular",
      status:
        b.status === "in_transit"
          ? "In Transit"
          : b.status === "out_of_service"
          ? "Out of Service"
          : b.status.charAt(0).toUpperCase() + b.status.slice(1),
      route: "Unassigned",
      condition: b.last_maintenance_date ? "Fair" : "Excellent",
      model: b.model,
      capacity: b.capacity,
    }));
  },

  registerBus: async (busData: Omit<RawBus, "id">): Promise<void> => {
    const res = await fetch("/api/admin/buses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(busData),
    });
    if (!res.ok) throw new Error("Failed to register bus");
  },
};
