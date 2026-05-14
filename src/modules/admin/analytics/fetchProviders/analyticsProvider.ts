export const analyticsProvider = {
  getAnalytics: async () => {
    const res = await fetch("/api/admin/analytics");
    if (!res.ok) throw new Error("Failed to fetch analytics");
    return await res.json();
  },
};
