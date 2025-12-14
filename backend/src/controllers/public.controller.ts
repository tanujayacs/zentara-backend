import * as newsService from "../services/news.service";

export const getPublikasiBerita = async (_req: any, res: any) => {
  const { data, error } = await newsService.getAllNews();

  if (error) {
    return res.status(500).json({
      message: "Gagal mengambil data berita",
    });
  }

  // ⬇️ FORMAT DISAMAKAN DENGAN API WINNICODE
  res.json({
    data,
  });
};
