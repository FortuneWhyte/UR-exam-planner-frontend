import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getCalendar, removeFromCalendar } from "../services/api";

export default function Calendar() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCalendar();
  }, []);

  async function fetchCalendar() {
    try {
      setLoading(true);
      const data = await getCalendar();
      setExams(data);
    } catch (err) {
      setError(err.message || "Failed to load calendar");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(calendarId) {
    if (!window.confirm("Are you sure you want to remove this exam?")) return;
    
    try {
      await removeFromCalendar(calendarId);
      // Remove it from the local state to avoid a full re-fetch loading spinner
      setExams(prev => prev.filter(exam => exam.calendar_id !== calendarId));
    } catch (err) {
      alert(err.message || "Failed to remove exam");
    }
  }

  return (
    <>
      <Navbar />

      <div id="container">
        <main id="calendar-main">
          <h1 className="welcome-title">My Calendar</h1>

          {/* ── Loading ── */}
          {loading && exams.length === 0 && (
            <section className="result-card">
              <div className="spinner-container">
                <div className="spinner"></div>
                <p className="spinner-text">Loading your exams...</p>
              </div>
            </section>
          )}

          {/* ── Error ── */}
          {!loading && error && (
            <section className="result-card error-card">
              <p>{error}</p>
            </section>
          )}

          {/* ── Empty State ── */}
          {!loading && exams.length === 0 && !error && (
            <section id="no-exams" className="result-card">
              <p>
                No exams in your calendar. Use the Search page to find and add some!
              </p>
            </section>
          )}

          {/* ── Populated State ── */}
          {exams.length > 0 && !error && (
            <section id="exam-list" className="result-card">
              <h2>Upcoming Exams ({exams.length})</h2>

              <table className="exam-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Name</th>
                    <th>Instructor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {exams.map((exam) => (
                    <tr key={exam.calendar_id}>
                      <td>{exam.course_code}</td>
                      <td>{exam.course_name}</td>
                      <td>{exam.instructor}</td>
                      <td>{exam.exam_date}</td>
                      <td>{exam.exam_start_time} – {exam.exam_end_time}</td>
                      <td>{exam.location}</td>
                      <td>
                        <button
                          className="view-btn"
                          style={{ background: "#ef4444", color: "white" }}
                          onClick={() => handleRemove(exam.calendar_id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </main>
      </div>
    </>
  );
}