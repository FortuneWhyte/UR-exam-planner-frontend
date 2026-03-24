import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getCourse, addToCalendar } from "../services/api";

export default function AddExam() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function loadCourse() {
      try {
        const data = await getCourse(courseId);
        setCourse(data);
      } catch (err) {
        setError(err.message || "Course not found");
      } finally {
        setLoading(false);
      }
    }
    if (courseId) loadCourse();
  }, [courseId]);

  async function handleAdd() {
    setAdding(true);
    setError(null);
    try {
      await addToCalendar(course.id);
      navigate("/calendar");
    } catch (err) {
      setError(err.message || "Failed to add to calendar");
      setAdding(false);
    }
  }

  return (
    <>
      <Navbar />

      <div id="container">
        <main id="addexam-main">
          <h1 className="page-title">Exam Details</h1>

          {/* ── Loading State ── */}
          {loading && (
            <section className="result-card">
              <div className="spinner-container">
                <div className="spinner"></div>
                <p className="spinner-text">Loading course details...</p>
              </div>
            </section>
          )}

          {/* ── Error / Not Found State ── */}
          {!loading && error && (
            <section id="course-not-found" className="result-card error-card">
              <h2>Action Failed</h2>
              <p>{error}</p>
              <div className="align-middle">
                <Link to="/search" id="calendar-btn" className="nav-btn">
                  Back to Search
                </Link>
                <Link to="/calendar" className="nav-btn" style={{ marginLeft: "1rem" }}>
                  View Calendar
                </Link>
              </div>
            </section>
          )}

          {/* ── Course Found State ── */}
          {!loading && course && !error && (
            <section id="course-found" className="result-card">
              <h2>Course Details</h2>
              <p><strong>Course:</strong> <span>{course.course_code} - {course.course_name}</span></p>
              <p><strong>Semester:</strong> <span>{course.semester_name}</span></p>
              <p><strong>Instructor:</strong> <span>{course.instructor}</span></p>
              <p><strong>Exam Date:</strong> <span>{course.exam_date}</span></p>
              <p><strong>Time:</strong> <span>{course.exam_start_time} – {course.exam_end_time}</span></p>
              <p><strong>Location:</strong> <span>{course.location}</span></p>

              <div className="align-middle">
                <button 
                  id="add-to-calendar-btn" 
                  className="big-btn" 
                  onClick={handleAdd}
                  disabled={adding}
                  style={{ cursor: adding ? "not-allowed" : "pointer", opacity: adding ? 0.7 : 1 }}
                >
                  {adding ? "Adding..." : "Add to Calendar"}
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
