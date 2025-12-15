// import express from "express";
// import cors from "cors";
// import authRoutes from "./routes/auth.routes";
// import newsRoutes from "./routes/news.routes";
// import publicRoutes from "./routes/public.routes";
// import uploadRoutes from "./routes/upload.routes";
// import "dotenv/config";

// const app = express();

// // CORS lebih spesifik
// // app.use(cors({
// //   origin: "http://localhost:5173", // Frontend Vite
// //   credentials: true
// // }));

// app.use(cors({
//   origin: "*",
// }));


// app.use(express.json());

// // Logging middleware untuk debug
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`, req.body);
//   next();
// });

// app.use("/api", uploadRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/news", newsRoutes);
// app.use("/api", publicRoutes);

// // Error handling
// app.use((err: any, req: any, res: any, next: any) => {
//   console.error("Error:", err);
//   res.status(500).json({ message: err.message || "Internal server error" });
// });

// export default app;

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import newsRoutes from "./routes/news.routes";
import publicRoutes from "./routes/public.routes";
import publicAuthRoutes from "./routes/public-auth.routes"; // ✅ TAMBAHKAN
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

app.use("/api", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api", publicRoutes);
app.use("/api", publicAuthRoutes); // ✅ TAMBAHKAN INI

app.use((err: any, req: any, res: any, next: any) => {
  console.error("Error:", err);
  res.status(500).json({ message: err.message || "Internal server error" });
});

export default app;