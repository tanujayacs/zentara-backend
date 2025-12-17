import * as usersService from "../services/users.service";

export const getAll = async (_: any, res: any) => {
  try {
    const { data } = await usersService.getAllUsers();
    res.json({ data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: any, res: any) => {
  try {
    await usersService.updateUser(req.params.id, req.body);
    res.json({ message: "User diupdate" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: any, res: any) => {
  try {
    await usersService.deleteUser(req.params.id);
    res.json({ message: "User dihapus" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
