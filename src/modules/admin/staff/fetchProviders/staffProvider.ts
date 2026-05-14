import { StaffMember } from "../types";

interface RawDriver {
  id: string;
  first_name: string;
  last_name: string;
  status: string;
  license_number: string;
  contact_number: string;
  created_at: string;
}

export const staffProvider = {
  getStaff: async (): Promise<StaffMember[]> => {
    const res = await fetch("/api/admin/drivers");
    if (!res.ok) throw new Error("Failed to fetch drivers");
    const data: RawDriver[] = await res.json();

    return data.map((d) => ({
      id: "DRV-" + d.id.substring(0, 5).toUpperCase(),
      name: `${d.first_name} ${d.last_name}`,
      role: "Driver",
      status: (d.status === "on_leave"
        ? "On-Leave"
        : d.status.charAt(0).toUpperCase() + d.status.slice(1)) as StaffMember["status"],
      email: d.license_number,
      phone: d.contact_number,
      joined: new Date(d.created_at).toISOString().split("T")[0],
    }));
  },
};
