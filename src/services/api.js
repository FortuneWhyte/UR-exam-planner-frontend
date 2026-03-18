// ── API Service Layer ──────────────────────────────────────
// Central place for all backend API calls

const BASE_URL = "http://localhost:3001/api";

// ── Courses ────────────────────────────────────────────────

/**
 * Search courses by query string (matches course_code and course_name).
 * @param {string} query - Search term (e.g. "CS 215", "Calculus")
 * @param {number|null} semesterId - Optional semester filter
 * @returns {Promise<Array>} matching courses
 */
export async function searchCourses(query, semesterId = null) {
  const params = new URLSearchParams({ q: query });
  if (semesterId) params.append("semester_id", semesterId);

  const res = await fetch(`${BASE_URL}/courses/search?${params}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to search courses");
  }
  return res.json();
}

/**
 * Get a single course by ID.
 * @param {number} id - Course ID
 * @returns {Promise<Object>} course details
 */
export async function getCourse(id) {
  const res = await fetch(`${BASE_URL}/courses/${id}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Course not found");
  }
  return res.json();
}

// ── Calendar ───────────────────────────────────────────────

/**
 * Get all exams in the user's calendar.
 * @returns {Promise<Array>} saved exams
 */
export async function getCalendar() {
  const res = await fetch(`${BASE_URL}/calendar`);
  if (!res.ok) throw new Error("Failed to load calendar");
  return res.json();
}

/**
 * Add a course to the user's exam calendar.
 * @param {number} courseId - ID of the course to add
 * @returns {Promise<Object>} result
 */
export async function addToCalendar(courseId) {
  const res = await fetch(`${BASE_URL}/calendar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courseId }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to add to calendar");
  }
  return res.json();
}

/**
 * Remove an exam from the user's calendar.
 * @param {number} id - Calendar entry ID
 * @returns {Promise<Object>} result
 */
export async function removeFromCalendar(id) {
  const res = await fetch(`${BASE_URL}/calendar/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to remove from calendar");
  return res.json();
}

// ── Semesters ──────────────────────────────────────────────

/**
 * Get all available semesters.
 * @returns {Promise<Array>} semesters
 */
export async function getSemesters() {
  const res = await fetch(`${BASE_URL}/semesters`);
  if (!res.ok) throw new Error("Failed to load semesters");
  return res.json();
}
