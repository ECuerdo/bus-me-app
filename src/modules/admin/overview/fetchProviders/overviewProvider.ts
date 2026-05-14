export const overviewProvider = {
  getOverview: async () => {
    const res = await fetch("/api/admin/overview");
    if (!res.ok) throw new Error("Failed to fetch overview");
    return await res.json();
  },
};
