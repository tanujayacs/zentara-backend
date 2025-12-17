import { supabase } from "../config/supabase";

export const getAllUsers = async () => {
  return supabase
    .from("users")
    .select("id, name, email, role, created_at")
    .order("created_at", { ascending: false });
};

export const updateUser = async (id: string, data: any) => {
  const updateData: any = {};
  
  if (data.name) updateData.name = data.name;
  if (data.email) updateData.email = data.email;
  if (data.role) updateData.role = data.role;

  return supabase
    .from("users")
    .update(updateData)
    .eq("id", id);
};

export const deleteUser = async (id: string) => {
  return supabase
    .from("users")
    .delete()
    .eq("id", id);
};