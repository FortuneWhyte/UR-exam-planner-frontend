import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getCalendar } from "../services/api";

export default function Calendar() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCalendar() {
      try {
        const data = await getCalendar();
        setExams(data);
      } catch (err) {
        setError(err.message || "Failed to load calendar");
      } finally {
        setLoading(false);
      }
    }
    fetchCalendar();
  }, []);

  return (
    <>
      <Navbar />

      <div id="container">
        <main id="calendar-main">
          <h1 className="welcome-title">Calendar</h1>

          {/* ── Loading ── */}
          {loading && (
            <section className="result-card">
              <p>Loading your exams...</p>
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
          {!loading && exams.length > 0 && !error && (
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