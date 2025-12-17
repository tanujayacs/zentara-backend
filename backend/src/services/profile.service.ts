import { supabase } from "../config/supabase";
import bcrypt from "bcrypt";

export const getProfile = async (userId: string) => {
  return supabase
    .from("users")
    .select("id, name, email, role, created_at")
    .eq("id", userId)
    .single();
};

export const updateProfile = async (userId: string, data: any) => {
  const updateData: any = {};

  if (data.name) updateData.name = data.name;
  if (data.email) updateData.email = data.email;
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  const { error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", userId);

  if (error) throw new Error(error.message);
};