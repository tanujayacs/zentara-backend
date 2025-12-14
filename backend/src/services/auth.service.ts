import { supabase } from "../config/supabase";
import bcrypt from "bcrypt";

export const registerUser = async (data: any) => {
  const hashed = await bcrypt.hash(data.password, 10);

  const { error } = await supabase.from("users").insert({
    name: data.name,
    email: data.email,
    password: hashed,
    role: "penulis",
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email: string, password: string) => {
  console.log("Searching user with email:", email); // Debug

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  console.log("User query result:", { data, error }); // Debug

  if (error || !data) {
    throw new Error("Email tidak ditemukan");
  }

  const match = await bcrypt.compare(password, data.password);
  
  console.log("Password match:", match); // Debug
  
  if (!match) {
    throw new Error("Password salah");
  }

  return data;
};