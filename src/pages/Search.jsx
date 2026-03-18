import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { searchCourses } from "../services/api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSearch(e) {
    e.preventDefault();
    const trimmed = query.trim();

    if (trimmed.length < 2) {
      setError("Please enter at least 2 characters.");
      return;
    }

    setError("");
    setLoading(true);
    setSearched(true);

    try {
      const data = await searchCourses(trimmed);
      setResults(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div id="container">
        <main id="dashboard-main">
          <h1 className="welcome-title">Search By Course</h1>

          <p className="welcome-text">
            Certain courses follow unique exam schedules that may differ from the
            standard timetable. If you think your class might be one of them,
            start your search here.
          </p>
          <p className="welcome-text">
            Use the search bar below to look up your course. Once it appears,
            just click on it to view details and{" "}
            <strong>'Add to Calendar'</strong>.
          </p>

          {/* ── Search Form ── */}
          <div id="search-section">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-bar">
                <input
                  type="text"
                  id="search-input"
                  placeholder="Enter course (e.g., CS 215, Calculus)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" id="search-btn">
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* ── Error ── */}
          {error && (
            <section className="result-card error-card">
              <p>{error}</p>
            </section>
          )}

          {/* ── Loading ── */}
          {loading && (
            <section className="result-card">
              <p>Searching…</p>
            </section>
          )}

          {/* ── Results ── */}
          {!loading && searched && results.length === 0 && !error && (
            <section className="result-card">
              <h2>No Results</h2>
              <p>
                No courses matched "<strong>{query}</strong>". Try a different
                search term.
              </p>
            </section>
          )}

          {!loading && results.length > 0 && (
            <section className="result-card">
              <h2>Results ({results.length})</h2>
              <table className="exam-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Name</th>
                    <th>Instructor</th>
                    <th>Exam Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((course) => (
                    <tr key={course.id}>
                      <td>{course.course_code}</td>
                      <td>{course.course_name}</td>
                      <td>{course.instructor}</td>
                      <td>{course.exam_date}</td>
                      <td>
                        <button
                          className="view-btn"
                          onClick={() => navigate(`/addexam/${course.id}`)}
                        >
                          View
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