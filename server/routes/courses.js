import { Router } from "express";
import db from "../db/database.js";

const router = Router();

// ── GET /api/courses/search?q=CS&semester_id=1 ────────────
// Fuzzy search courses by course_code or course_name
router.get("/search", (req, res) => {
  const { q, semester_id } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(400).json({ error: "Query must be at least 2 characters" });
  }

  const query = `%${q.trim()}%`;

  let sql = `
    SELECT c.*, s.name AS semester_name
    FROM courses c
    JOIN semesters s ON c.semester_id = s.id
    WHERE (c.course_code LIKE ? OR c.course_name LIKE ?)
  `;
  const params = [query, query];

  if (semester_id) {
    sql += " AND c.semester_id = ?";
    params.push(semester_id);
  }

  sql += " ORDER BY c.exam_date ASC, c.exam_start_time ASC";

  try {
    const courses = db.prepare(sql).all(...params);
    res.json(courses);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── GET /api/courses/:id ──────────────────────────────────
// Get a single course by ID (used by AddExam page)
router.get("/:id", (req, res) => {
  const { id } = req.params;

  try {
    const course = db.prepare(`
      SELECT c.*, s.name AS semester_name
      FROM courses c
      JOIN semesters s ON c.semester_id = s.id
      WHERE c.id = ?
    `).get(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    console.error("Get course error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
