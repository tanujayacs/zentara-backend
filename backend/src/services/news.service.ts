import { supabase } from "../config/supabase";

export const createNews = async (data: any, user: any) => {
  return supabase.from("news").insert({
    user_id: user.id,
    judul: data.judul,
    slug: data.slug,
    penulis: data.penulis,
    kategori: data.kategori,
    deskripsi: data.deskripsi,
    gambar: data.gambar, // ⬅️ INI PENTING
    status: "Public",
  });
};

export const getAllNews = async () => {
  return supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });
};

export const getMyNews = async (userId: string) => {
  return supabase
    .from("news")
    .select("*")
    .eq("user_id", userId);
};

export const updateNews = async (
  id: string,
  data: any,
  userId: string
) => {
  return supabase
    .from("news")
    .update(data)
    .eq("id", id)
    .eq("user_id", userId);
};

export const deleteNews = async (
  id: string,
  userId: string
) => {
  return supabase
    .from("news")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
};
