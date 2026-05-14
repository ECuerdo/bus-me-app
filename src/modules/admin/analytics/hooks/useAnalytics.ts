import { useState, useEffect } from "react";
import { PerformanceMetric, RevenuePoint, NetworkShare } from "../types";
import { analyticsProvider } from "../fetchProviders/analyticsProvider";

export const useAnalytics = () => {
  const [data, setData] = useState<{
    performanceData: PerformanceMetric[];
    revenueTimeline: RevenuePoint[];
    networkDistribution: NetworkShare[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const result = await analyticsProvider.getAnalytics();
        setData(result);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
      setIsLoading(false);
    };
    fetchAnalytics();
  }, []);

  return {
    performanceData: data?.performanceData || [],
    revenueTimeline: data?.revenueTimeline || [],
    networkDistribution: data?.networkDistribution || [],
    isLoading
  };
};
