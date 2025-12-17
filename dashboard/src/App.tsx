import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import AdminDashboard from "./pages/admin/Dashboard";
import PenulisDashboard from "./pages/penulis/Dashboard";
import AllArticles from "./pages/admin/AllArticles";
import UsersManagement from "./pages/admin/UsersManagement";
import CategoriesManagement from "./pages/admin/CategoriesManagement";
import MyArticles from "./pages/penulis/MyArticles";
import CategoriesView from "./pages/penulis/CategoriesView";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import { isLoggedIn, getUserFromToken } from "./utils/auth";

export default function App() {
  const user = getUserFromToken();
  const isAdmin = user?.role === "admin";

  return (
    <BrowserRouter>
      <Routes>
        {/* ROOT REDIRECT */}
        <Route
          path="/"
          element={
            isLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* DEFAULT DASHBOARD BASED ON ROLE */}
          <Route
            index
            element={
              isAdmin ? <AdminDashboard /> : <PenulisDashboard />
            }
          />

          {/* ADMIN ONLY ROUTES */}
          {isAdmin && (
            <>
              <Route path="articles" element={<AllArticles />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="categories" element={<CategoriesManagement />} />
            </>
          )}

          {/* PENULIS ONLY ROUTES */}
          {!isAdmin && (
            <>
              <Route path="articles" element={<MyArticles />} />
              <Route path="categories" element={<CategoriesView />} />
            </>
          )}

          {/* SHARED ROUTES */}
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}