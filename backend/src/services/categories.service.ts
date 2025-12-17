import { supabase } from "../config/supabase";

export const getAllCategories = async () => {
  return supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });
};

export const createCategory = async (data: any) => {
  return supabase.from("categories").insert({
    name: data.name,
    slug: data.slug,
  });
};

export const updateCategory = async (id: string, data: any) => {
  return supabase
    .from("categories")
    .update(data)
    .eq("id", id);
};

export const deleteCategory = async (id: string) => {
  return supabase
    .from("categories")
    .delete()
    .eq("id", id);
};
