import * as newsService from "../services/news.service";

export const getPublikasiBerita = async (_req: any, res: any) => {
  const { data, error } = await newsService.getAllNews();

  if (error) {
    return res.status(500).json({
      message: "Gagal mengambil data berita",
    });
  }

  // Format data: flatten kategori
  const formattedData = data?.map((item: any) => ({
    id: item.id,
    judul: item.judul,
    slug: item.slug,
    penulis: item.penulis,
    kategori: item.categories?.name || "Uncategorized", // ← JOIN dari table categories
    deskripsi: item.deskripsi,
    gambar: item.gambar,
    status: item.status,
    visitor_count: item.visitor_count,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  res.json({
    data: formattedData,
  });
};