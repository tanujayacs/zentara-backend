import jwt from "jsonwebtoken";

export const loginPublic = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    // Kredensial khusus untuk frontend
    const FRONTEND_EMAIL = process.env.FRONTEND_EMAIL || "frontend@zentara.com";
    const FRONTEND_PASSWORD = process.env.FRONTEND_PASSWORD || "zentara-frontend-2025";

    if (email !== FRONTEND_EMAIL || password !== FRONTEND_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token (expired 30 hari)
    const token = jwt.sign(
      { 
        type: "frontend_access",
        purpose: "publikasi_berita" 
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    );

    res.json({ 
      api_key: token,
      message: "Login berhasil"
    });
  } catch (error: any) {
    console.error("Login public error:", error);
    res.status(500).json({ message: error.message });
  }
};