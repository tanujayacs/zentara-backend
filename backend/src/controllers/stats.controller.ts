import * as statsService from "../services/stats.service";

export const getDashboardStats = async (req: any, res: any) => {
  try {
    const stats = await statsService.getDashboardStats(req.user);
    res.json({ data: stats });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};