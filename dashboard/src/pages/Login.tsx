import { useState } from "react";
import { login } from "../api/auth.api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await login(email, password);

      // Simpan token
      localStorage.setItem("token", res.token);
      
      // Force reload untuk trigger route check
      window.location.href = "/dashboard";
      
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="w-96 p-6 border rounded-lg shadow-2xl bg-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Zentara</h1>
          <p className="text-gray-500 mt-1">Dashboard Login</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <input
          className="border w-full mb-3 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          className="border w-full mb-4 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          onKeyPress={(e) => e.key === "Enter" && handleLogin()}
        />
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
          onClick={handleLogin}
          disabled={loading || !email || !password}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}