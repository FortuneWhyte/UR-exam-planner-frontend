import { Router } from "express";
import db from "../db/database.js";

const router = Router();

// ── GET /api/calendar ──────────────────────────────────────
// Get all saved exams for the user
router.get("/", (_req, res) => {
  try {
    const exams = db.prepare(`
      SELECT uc.id AS calendar_id, uc.added_at,
             c.*, s.name AS semester_name
      FROM user_calendar uc
      JOIN courses c ON uc.course_id = c.id
      JOIN semesters s ON c.semester_id = s.id
      ORDER BY c.exam_date ASC, c.exam_start_time ASC
    `).all();

    res.json(exams);
  } catch (err) {
    console.error("Get calendar error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── POST /api/calendar ─────────────────────────────────────
// Add an exam to the user's calendar
router.post("/", (req, res) => {
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({ error: "courseId is required" });
  }

  try {
    // Check if course exists
    const course = db.prepare("SELECT id FROM courses WHERE id = ?").get(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Insert into calendar (UNIQUE constraint prevents duplicates)
    // We use INSERT OR IGNORE so it doesn't hard-crash if duplicate,
    // then we can check if changes were made.
    const result = db.prepare(`
      INSERT OR IGNORE INTO user_calendar (course_id) VALUES (?)
    `).run(courseId);

    if (result.changes === 0) {
      return res.status(400).json({ error: "Course is already in your calendar" });
    }

    res.status(201).json({ message: "Course added to calendar", id: result.lastInsertRowid });
  } catch (err) {
    console.error("Add to calendar error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ── DELETE /api/calendar/:id ───────────────────────────────
// Remove an exam from the user's calendar
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  try {
    const result = db.prepare("DELETE FROM user_calendar WHERE id = ?").run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Calendar entry not found" });
    }

    res.json({ message: "Exam removed from calendar" });
  } catch (err) {
    console.error("Remove from calendar error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
