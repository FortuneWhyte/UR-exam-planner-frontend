import express from "express";
import cors from "cors";
import db from "./db/database.js";
import coursesRouter from "./routes/courses.js";
import calendarRouter from "./routes/calendar.js";

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────────
const allowedOrigins = ["http://localhost:5173", "http://localhost:4173"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────
app.use("/api/courses", coursesRouter);
app.use("/api/calendar", calendarRouter);

// ── Health check ───────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Start server ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🟢  UR Exam Planner API running → http://localhost:${PORT}`);
  console.log(`    Health check → http://localhost:${PORT}/api/health`);
});
