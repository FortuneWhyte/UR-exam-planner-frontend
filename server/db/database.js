import Database from "better-sqlite3";
import { existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// ── Resolve paths ──────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, "..", "data");
const DB_PATH = join(DATA_DIR, "exams.db");

// Ensure data directory exists
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

// ── Initialize database ────────────────────────────────────
const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// ── Create tables ──────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS semesters (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL UNIQUE,   -- e.g. "Winter 2026"
    year       INTEGER NOT NULL,
    term       TEXT    NOT NULL           -- "Winter", "Spring/Summer", "Fall"
  );

  CREATE TABLE IF NOT EXISTS courses (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    semester_id     INTEGER NOT NULL,
    course_code     TEXT    NOT NULL,      -- e.g. "CS 110"
    course_name     TEXT    NOT NULL,      -- e.g. "Programming and Problem Solving"
    section         TEXT    DEFAULT '001',
    instructor      TEXT    DEFAULT 'TBD',
    exam_date       TEXT    NOT NULL,      -- e.g. "2026-04-17"
    exam_start_time TEXT    NOT NULL,      -- e.g. "09:00"
    exam_end_time   TEXT    NOT NULL,      -- e.g. "12:00"
    location        TEXT    DEFAULT 'TBD',
    FOREIGN KEY (semester_id) REFERENCES semesters(id)
  );

  CREATE TABLE IF NOT EXISTS user_calendar (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id  INTEGER NOT NULL,
    added_at   TEXT    DEFAULT (datetime('now')),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE(course_id)   -- prevent duplicates
  );
`);

console.log("✅  Database initialized at", DB_PATH);

export default db;
