import { TransitRoute } from "../types";

interface RawRoute {
  code: string;
  name: string;
  origin: string;
  destination: string;
  distance_km: number;
  status: string;
}

export const routesProvider = {
  getRoutes: async (): Promise<TransitRoute[]> => {
    const res = await fetch("/api/admin/routes");
    if (!res.ok) throw new Error("Failed to fetch routes");
    const data: RawRoute[] = await res.json();

    return data.map((r) => ({
      id: r.code,
      name: r.name,
      origin: r.origin,
      destination: r.destination,
      distance: r.distance_km + "km",
      stops: 4,
      status:
        r.status === "active"
          ? "Active"
          : r.status === "draft"
          ? "Under Review"
          : "Inactive",
    }));
  },
};
