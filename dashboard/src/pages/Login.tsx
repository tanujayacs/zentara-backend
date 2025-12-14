import { useState } from "react";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      
      console.log("Mencoba login dengan:", { email, password }); // Debug
      
      const res = await login(email, password);
      
      console.log("Response login:", res); // Debug
      
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err); // Debug
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-96 p-6 border rounded shadow-lg bg-white">
        <h1 className="text-xl mb-4 font-bold">Login Dashboard</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <input
          className="border w-full mb-2 p-2 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          className="border w-full mb-4 p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
        />
        <button
          className="bg-black text-white w-full py-2 rounded disabled:bg-gray-400"
          onClick={handleLogin}
          disabled={loading || !email || !password}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}