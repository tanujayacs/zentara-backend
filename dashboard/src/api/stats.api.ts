import api from "./axios";

export const getDashboardStats = async () => {
  const res = await api.get("/stats/dashboard");
  return res.data.data;
};