import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="top-nav">
      <img
        src="/images/UR_Logo_Primary_Full_COlour_RGB.png"
        alt="University Of Regina"
        className="logo"
      />

      <Link to="/" className="nav-btn">Home</Link>
      <Link to="/search" className="nav-btn">Search</Link>
      <Link to="/calendar" className="nav-btn">Calendar</Link>

      <a
        href="https://www.uregina.ca/registrar/academic-calendars-and-schedule/academic-schedule.html"
        className="nav-btn big-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Schedules
      </a>
    </header>
  );
}
