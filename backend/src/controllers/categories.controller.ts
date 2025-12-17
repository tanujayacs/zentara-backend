import * as categoriesService from "../services/categories.service";
import { slugify } from "../utils/slug";

export const getAll = async (_: any, res: any) => {
  try {
    const { data } = await categoriesService.getAllCategories();
    res.json({ data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req: any, res: any) => {
  try {
    const slug = slugify(req.body.name);
    await categoriesService.createCategory({ ...req.body, slug });
    res.json({ message: "Kategori berhasil dibuat" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req: any, res: any) => {
  try {
    const slug = req.body.name ? slugify(req.body.name) : undefined;
    await categoriesService.updateCategory(req.params.id, { ...req.body, slug });
    res.json({ message: "Kategori diupdate" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: any, res: any) => {
  try {
    await categoriesService.deleteCategory(req.params.id);
    res.json({ message: "Kategori dihapus" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};