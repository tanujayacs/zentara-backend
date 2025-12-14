import * as newsService from "../services/news.service";
import { slugify } from "../utils/slug";

export const create = async (req: any, res: any) => {
  const slug = slugify(req.body.judul);

  await newsService.createNews(
    { ...req.body, slug },
    req.user
  );

  res.json({ message: "Berita berhasil dibuat" });
};

export const getAll = async (_: any, res: any) => {
  const { data } = await newsService.getAllNews();
  res.json({ data });
};

export const getMine = async (req: any, res: any) => {
  const { data } = await newsService.getMyNews(req.user.id);
  res.json({ data });
};

export const update = async (req: any, res: any) => {
  await newsService.updateNews(
    req.params.id,
    req.body,
    req.user.id
  );

  res.json({ message: "Berita diupdate" });
};

export const remove = async (req: any, res: any) => {
  await newsService.deleteNews(
    req.params.id,
    req.user.id
  );

  res.json({ message: "Berita dihapus" });
};
