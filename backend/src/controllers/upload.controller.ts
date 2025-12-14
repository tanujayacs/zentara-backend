import { uploadImageToSupabase } from "../services/upload.service";
import { slugify } from "../utils/slug";

export const uploadImage = async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File tidak ditemukan" });
    }

    const originalName = req.file.originalname;
    const ext = originalName.split(".").pop();

    const fileName = `${slugify(
      originalName.replace(`.${ext}`, "")
    )}-${Date.now()}.${ext}`;

    const year = new Date().getFullYear();
    const filePath = `${year}/${fileName}`;

    const publicUrl = await uploadImageToSupabase(req.file, filePath);

    res.json({
      message: "Upload berhasil",
      path: filePath,
      url: publicUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload gagal", error });
  }
};
