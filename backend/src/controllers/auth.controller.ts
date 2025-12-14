import jwt from "jsonwebtoken";
import * as authService from "../services/auth.service";

export const register = async (req: any, res: any) => {
  try {
    await authService.registerUser(req.body);
    res.json({ message: "Register success" });
  } catch (error: any) {
    console.error("Register error:", error);
    res.status(400).json({ message: error.message || "Register failed" });
  }
};

export const login = async (req: any, res: any) => {
  try {
    console.log("Login attempt:", req.body); // Debug
    
    const user = await authService.loginUser(
      req.body.email,
      req.body.password
    );

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    console.log("Login success for:", user.email); // Debug

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(401).json({ message: error.message || "Login failed" });
  }
};