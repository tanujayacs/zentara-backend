import api from "./axios";

export const getNews = async () => {
  const res = await api.get("/news");
  return res.data.data;
};

export const createNews = async (data: any) => {
  const res = await api.post("/news", data);
  return res.data;
};
