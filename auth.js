import { Router } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const router = Router();
const usersPath = path.resolve("data", "users.json");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 1. Kiểm tra thiếu trường body
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
  const user = users.find((u) => u.username === username);

  // 2. Không tìm thấy username
  if (!user) {
    return res.status(401).json({ error: "Invalid username" });
  }

  // 3. Kiểm tra password (sử dụng u._password từ file json)
  if (user._password !== password) {
    return res.status(401).json({ error: "Invalid password" });
  }

  // 4. Đăng nhập thành công -> Cấp JWT token
  const SECRET_KEY = process.env.JWT_SECRET || "secret";
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  return res.status(200).json({ token });
});

export default router;
