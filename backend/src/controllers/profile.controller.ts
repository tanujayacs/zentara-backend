import * as profileService from "../services/profile.service";

export const updateProfile = async (req: any, res: any) => {
  try {
    await profileService.updateProfile(req.user.id, req.body);
    res.json({ message: "Profile berhasil diupdate" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getProfile = async (req: any, res: any) => {
  try {
    const { data } = await profileService.getProfile(req.user.id);
    res.json({ data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};