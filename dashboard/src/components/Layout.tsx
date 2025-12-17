import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { getProfile } from "../api/profile.api";

export default function Layout() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    // Redirect based on role
    if (user && location.pathname === "/dashboard") {
      // Default redirect dari /dashboard ke page yang sesuai
      if (user.role === "admin") {
        // Admin tetap di /dashboard (AdminDashboard)
      } else {
        // Penulis redirect ke /dashboard (tapi render PenulisDashboard)
      }
    }
  }, [user, location, navigate]);

  const loadUser = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (error) {
      console.error("Failed to load user:", error);
      localStorage.removeItem("token");
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role={user.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} />
        <div className="flex-1 overflow-y-auto">
          <Outlet context={{ user }} />
        </div>
      </div>
    </div>
  );
}