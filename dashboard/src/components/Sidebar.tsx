import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  role: string;
}

export default function Sidebar({ role }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const adminMenu = [
    { id: "dashboard", label: "Dashboard", path: "/dashboard" },
    { id: "articles", label: "All Articles", path: "/dashboard/articles" },
    { id: "users", label: "Users Management", path: "/dashboard/users" },
    { id: "categories", label: "Categories", path: "/dashboard/categories" },
    { id: "settings", label: "Settings", path: "/dashboard/settings" },
  ];

  const penulisMenu = [
    { id: "dashboard", label: "Dashboard", path: "/dashboard" },
    { id: "articles", label: "My Articles", path: "/dashboard/articles" },
    { id: "categories", label: "Categories", path: "/dashboard/categories" },
    { id: "settings", label: "Settings", path: "/dashboard/settings" },
  ];

  const menu = role === "admin" ? adminMenu : penulisMenu;

  return (
    <div className="w-64 bg-gradient-to-b from-blue-600 to-purple-600 text-white h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Zentara</h1>
        <p className="text-sm text-blue-100 mt-1">
          {role === "admin" ? "Admin Panel" : "Writer Panel"}
        </p>
      </div>

      <nav className="flex-1 px-3">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                isActive
                  ? "bg-white text-blue-600 font-semibold"
                  : "hover:bg-blue-700 text-white"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 text-xs text-blue-100 border-t border-blue-500">
        © 2025 Zentara. All rights reserved.
      </div>
    </div>
  );
}