import Navbar from "../components/Navbar";
import {Link} from "react-router-dom"

export default function Home() {
  return (
    <>
      <Navbar />

      <div id="container">
        <main id="dashboard-main">
          <h1 className="welcome-title">Welcome to UR Exam Planner</h1>

          <p className="welcome-text">
            Add exams to your calendar with ease...<br />
            Just search it up, click add and it will be exported!
          </p>

          <div className="align-middle">
            <Link to="/search" id="start-button" className="nav-btn">
              GET STARTED
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
