import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/stats.api";

export default function PenulisDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded max-w-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Penulis</h1>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 max-w-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Berita Saya</p>
            <p className="text-4xl font-bold text-gray-800">
              {stats?.totalMyNews || 0}
            </p>
          </div>
          <svg
            className="w-16 h-16 text-blue-600 opacity-20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}