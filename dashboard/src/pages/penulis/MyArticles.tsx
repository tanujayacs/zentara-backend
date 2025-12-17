import { useEffect, useState } from "react";
import { getMyNews, deleteNews, createNews, updateNews } from "../../api/news.api";
import { getCategories } from "../../api/categories.api";
import api from "../../api/axios";

export default function MyArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<any>(null);

  // Form state
  const [judul, setJudul] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [penulis, setPenulis] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [newsData, categoriesData] = await Promise.all([
        getMyNews(), // ← Fetch berita milik penulis saja
        getCategories(),
      ]);
      setArticles(newsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to load data:", error);
      alert("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (article?: any) => {
    if (article) {
      setEditMode(true);
      setCurrentArticle(article);
      setJudul(article.judul);
      setCategoryId(article.category_id);
      setPenulis(article.penulis);
      setDeskripsi(article.deskripsi);
    } else {
      setEditMode(false);
      setCurrentArticle(null);
      resetForm();
    }
    setShowModal(true);
  };

  const resetForm = () => {
    setJudul("");
    setCategoryId("");
    setPenulis("");
    setDeskripsi("");
    setImage(null);
  };

  const handleSubmit = async () => {
    if (!judul || !categoryId || !penulis || !deskripsi) {
      return alert("Semua field harus diisi");
    }

    if (!editMode && !image) {
      return alert("Gambar harus diupload");
    }

    setSubmitting(true);

    try {
      let imagePath = currentArticle?.gambar;

      // Upload image jika ada
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const uploadRes = await api.post("/upload", formData);
        imagePath = uploadRes.data.path;
      }

      const payload = {
        judul,
        category_id: categoryId,
        penulis,
        deskripsi,
        gambar: imagePath,
      };

      if (editMode) {
        await updateNews(currentArticle.id, payload);
        alert("Berita berhasil diupdate");
      } else {
        await createNews(payload);
        alert("Berita berhasil ditambahkan");
      }

      setShowModal(false);
      resetForm();
      loadData();
    } catch (error: any) {
      console.error("Failed to submit:", error);
      alert(error.response?.data?.message || "Gagal menyimpan berita");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus berita ini?")) return;

    try {
      await deleteNews(id);
      alert("Berita berhasil dihapus");
      loadData();
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Gagal menghapus berita");
    }
  };

  // Helper untuk get image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    if (imagePath.startsWith("http")) return imagePath;
    return `https://osxigymismtotyyefrsw.supabase.co/storage/v1/object/public/news-images/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Articles</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
        >
          + Add Article
        </button>
      </div>

      {/* Grid View dengan Gambar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* Gambar */}
            <img
              src={getImageUrl(article.gambar)}
              alt={article.judul}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                {article.judul}
              </h3>

              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                  {article.categories?.name || "Uncategorized"}
                </span>
                <span className="text-gray-500 text-xs">
                  {new Date(article.created_at).toLocaleDateString()}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {article.deskripsi}
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{article.penulis}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(article)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Belum ada artikel. Tambahkan artikel pertama!
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editMode ? "Edit Article" : "Add New Article"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul
                </label>
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Masukkan judul berita"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Penulis
                </label>
                <input
                  type="text"
                  value={penulis}
                  onChange={(e) => setPenulis(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Nama penulis"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 h-32"
                  placeholder="Tulis deskripsi berita"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar {editMode && "(Kosongkan jika tidak ingin mengubah)"}
                </label>
                {editMode && currentArticle?.gambar && (
                  <img
                    src={getImageUrl(currentArticle.gambar)}
                    alt="Current"
                    className="w-32 h-32 object-cover rounded mb-2"
                  />
                )}
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="w-full"
                  accept="image/*"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}