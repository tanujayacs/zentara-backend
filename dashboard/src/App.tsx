import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isLoggedIn, getUserFromToken } from "./utils/auth";

// Pages
import Login from "./pages/Login";
import Layout from "./components/Layout";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AllArticles from "./pages/admin/AllArticles";
import UsersManagement from "./pages/admin/UsersManagement";
import CategoriesManagement from "./pages/admin/CategoriesManagement";

// Penulis Pages
import PenulisDashboard from "./pages/penulis/Dashboard";
import MyArticles from "./pages/penulis/MyArticles";
import CategoriesView from "./pages/penulis/CategoriesView";

// Shared Pages
import Settings from "./pages/shared/Settings";

// Role-based component wrapper
function RoleBasedDashboard() {
  const user = getUserFromToken();
  
  if (!user) return <Navigate to="/login" />;
  
  return user.role === "admin" ? <AdminDashboard /> : <PenulisDashboard />;
}

function RoleBasedArticles() {
  const user = getUserFromToken();
  
  if (!user) return <Navigate to="/login" />;
  
  return user.role === "admin" ? <AllArticles /> : <MyArticles />;
}

function RoleBasedCategories() {
  const user = getUserFromToken();
  
  if (!user) return <Navigate to="/login" />;
  
  return user.role === "admin" ? <CategoriesManagement /> : <CategoriesView />;
}

// Admin-only wrapper
function AdminOnly({ children }: { children: JSX.Element }) {
  const user = getUserFromToken();
  
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/dashboard" />;
  
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isLoggedIn() ? <Layout /> : <Navigate to="/login" />}
        >
          {/* Role-based routes */}
          <Route index element={<RoleBasedDashboard />} />
          <Route path="articles" element={<RoleBasedArticles />} />
          <Route path="categories" element={<RoleBasedCategories />} />
          
          {/* Admin-only routes */}
          <Route
            path="users"
            element={
              <AdminOnly>
                <UsersManagement />
              </AdminOnly>
            }
          />

          {/* Shared Routes */}
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Root Redirect */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn() ? "/dashboard" : "/login"} />}
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}