import api from "./axios";

export const getNews = async () => {
  const res = await api.get("/news");
  return res.data.data;
};

export const getMyNews = async () => {
  const res = await api.get("/news/me");
  return res.data.data;
};

export const createNews = async (data: any) => {
  const res = await api.post("/news", data);
  return res.data;
};

export const updateNews = async (id: string, data: any) => {
  const res = await api.put(`/news/${id}`, data);
  return res.data;
};

export const deleteNews = async (id: string) => {
  const res = await api.delete(`/news/${id}`);
  return res.data;
};