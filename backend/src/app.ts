import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import newsRoutes from "./routes/news.routes";
import categoriesRoutes from "./routes/categories.routes";
import usersRoutes from "./routes/users.routes";
import profileRoutes from "./routes/profile.routes";
import statsRoutes from "./routes/stats.routes";
import publicRoutes from "./routes/public.routes";
import publicAuthRoutes from "./routes/public-auth.routes";
import uploadRoutes from "./routes/upload.routes";
import "dotenv/config";

const app = express();

app.use(cors({
  origin: "*",
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Routes
app.use("/api", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", usersRoutes);
app.use("/api", profileRoutes);
app.use("/api", statsRoutes);
app.use("/api", publicRoutes);
app.use("/api", publicAuthRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  console.error("Error:", err);
  res.status(500).json({ message: err.message || "Internal server error" });
});

export default app;