import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/stats.api";

export default function AdminDashboard() {
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
          <div className="grid grid-cols-3 gap-6">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <p className="text-gray-500 text-sm">Total Berita</p>
          <p className="text-3xl font-bold text-gray-800">{stats?.totalNews || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
          <p className="text-gray-500 text-sm">Total Penulis</p>
          <p className="text-3xl font-bold text-gray-800">{stats?.totalPenulis || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <p className="text-gray-500 text-sm">Total Kategori</p>
          <p className="text-3xl font-bold text-gray-800">{stats?.totalCategories || 0}</p>
        </div>
      </div>

      {/* Recent News & Popular Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent News */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Berita Terbaru</h2>
          <div className="space-y-3">
            {stats?.recentNews?.slice(0, 5).map((news: any) => (
              <div key={news.id} className="border-b pb-3">
                <h3 className="font-semibold text-gray-800">{news.judul}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {news.categories?.name || "Uncategorized"}
                  </span>
                  <span>{new Date(news.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Kategori Populer</h2>
          <div className="space-y-3">
            {stats?.popularCategories?.map((cat: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="font-medium text-gray-700">{cat.name}</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {cat.count} berita
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}