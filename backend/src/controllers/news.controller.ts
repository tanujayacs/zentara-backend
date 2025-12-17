import * as newsService from "../services/news.service";
import { slugify } from "../utils/slug";

export const create = async (req: any, res: any) => {
  try {
    const slug = slugify(req.body.judul);
    await newsService.createNews({ ...req.body, slug }, req.user);
    res.json({ message: "Berita berhasil dibuat" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (_: any, res: any) => {
  try {
    const { data } = await newsService.getAllNews();
    res.json({ data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMine = async (req: any, res: any) => {
  try {
    const { data } = await newsService.getMyNews(req.user.id);
    res.json({ data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: any, res: any) => {
  try {
    if (req.user.role === "admin") {
      await newsService.adminUpdateNews(req.params.id, req.body);
    } else {
      await newsService.updateNews(req.params.id, req.body, req.user.id);
    }
    res.json({ message: "Berita diupdate" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: any, res: any) => {
  try {
    if (req.user.role === "admin") {
      await newsService.adminDeleteNews(req.params.id);
    } else {
      await newsService.deleteNews(req.params.id, req.user.id);
    }
    res.json({ message: "Berita dihapus" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};