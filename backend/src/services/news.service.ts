import { supabase } from "../config/supabase";

export const createNews = async (data: any, user: any) => {
  return supabase.from("news").insert({
    user_id: user.id,
    category_id: data.category_id,
    judul: data.judul,
    slug: data.slug,
    penulis: data.penulis,
    deskripsi: data.deskripsi,
    gambar: data.gambar,
    status: "Public",
  });
};

export const getAllNews = async () => {
  return supabase
    .from("news")
    .select(`
      *,
      categories(name, slug)
    `)
    .order("created_at", { ascending: false });
};

export const getMyNews = async (userId: string) => {
  return supabase
    .from("news")
    .select(`
      *,
      categories(name, slug)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
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

// Admin bisa edit/hapus semua berita
export const adminUpdateNews = async (id: string, data: any) => {
  return supabase
    .from("news")
    .update(data)
    .eq("id", id);
};

export const adminDeleteNews = async (id: string) => {
  return supabase
    .from("news")
    .delete()
    .eq("id", id);
};