import api from "./axios";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data.data;
};

export const updateUser = async (id: string, data: any) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};