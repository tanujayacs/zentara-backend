import { supabase } from "../config/supabase";

export const uploadImageToSupabase = async (
  file: Express.Multer.File,
  filePath: string
) => {
  const { error } = await supabase.storage
    .from("news-images")
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("news-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
};
