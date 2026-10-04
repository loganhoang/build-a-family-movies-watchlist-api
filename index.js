import express from "express";
import helmet from "helmet";

import watchlistRoutes from "./routes/watchlist.js";
import authRoutes from "./routes/auth.js"; // 1. Bổ sung import tuyến đường auth

const PORT = process.env.PORT || 3000; // 2. Thêm giá trị mặc định để tránh lỗi server không chạy được
const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Family Movie Watchlist API");
});

// 3. Kích hoạt tuyến đường auth phục vụ các test case login
app.use("/api/auth", authRoutes); 
app.use("/api/watchlist", watchlistRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
