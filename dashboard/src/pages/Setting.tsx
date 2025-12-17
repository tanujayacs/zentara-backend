import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/profile.api";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setForm({
        name: data.name,
        email: data.email,
        password: "",
      });
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updateData: any = {
        name: form.name,
        email: form.email,
      };

      if (form.password) {
        updateData.password = form.password;
      }

      await updateProfile(updateData);
      alert("Profile berhasil diupdate!");
      setForm({ ...form, password: "" });
    } catch (error: any) {
      console.error("Update error:", error);
      alert(error.response?.data?.message || "Gagal update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password <span className="text-gray-500 text-xs">(kosongkan jika tidak ingin mengubah)</span>
            </label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </div>
  );
}