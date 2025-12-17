import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/profile.api";
import Avatar from "../../components/Avatar";

export default function Settings() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
      setName(data.name);
      setEmail(data.email);
    } catch (error) {
      console.error("Failed to load profile:", error);
      alert("Gagal memuat profil");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      return alert("Nama dan email harus diisi");
    }

    setSubmitting(true);

    try {
      const payload: any = { name, email };
      if (password) payload.password = password;

      await updateProfile(payload);
      alert("Profile berhasil diupdate");
      setPassword("");
      loadProfile();
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      alert(error.response?.data?.message || "Gagal update profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded max-w-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <Avatar name={user.name} />
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
              className="w-full border rounded-lg px-4 py-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Kosongkan jika tidak ingin mengubah password
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}