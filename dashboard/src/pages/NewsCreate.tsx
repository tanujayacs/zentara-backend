import { useState } from "react";
import api from "../api/axios";

export default function NewsCreate() {
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!image) return alert("Pilih gambar dulu");

    const formData = new FormData();
    formData.append("image", image);

    // upload gambar
    const uploadRes = await api.post("/upload", formData);
    const imagePath = uploadRes.data.path;

    // create berita
    await api.post("/news", {
      judul,
      penulis: "Admin Zentara",
      kategori,
      deskripsi,
      gambar: imagePath,
    });

    alert("Berita berhasil ditambahkan");
    setJudul("");
    setKategori("");
    setDeskripsi("");
    setImage(null);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl mb-2">Tambah Berita</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Judul"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Kategori"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Deskripsi"
        value={deskripsi}
        onChange={(e) => setDeskripsi(e.target.value)}
      />
      <input
        type="file"
        className="mb-2"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2"
      >
        Simpan
      </button>
    </div>
  );
}
