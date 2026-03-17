import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ── Health check ───────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Start server ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🟢  UR Exam Planner API running → http://localhost:${PORT}`);
  console.log(`    Health check → http://localhost:${PORT}/api/health`);
});
