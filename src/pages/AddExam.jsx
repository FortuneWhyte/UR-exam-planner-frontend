import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";

export default function AddExam() {
    return (
        <>
            <Navbar />

            <div id="container">
                    <main id="addexam-main">

                        <h1 className="page-title">Add Exam</h1>

                        
                        <section id="course-found" class="result-card hidden">
                            <h2>Course Details</h2>
                            <p><strong>Course:</strong> <span id="found-course-code">CS 215</span></p>
                            <p><strong>Instructor:</strong> <span id="found-instructor">TBD</span></p>

                            <div class="align-middle">
                                <Link to="/calendar" id="add-to-calendar-btn" className="nav-btn">
                                    Add to Calendar
                                </Link>
                            </div>
                        </section>

                        
                        <section id="course-not-found" class="result-card">
                            <h2>Course Not Listed</h2>
                            <p>
                                We could not find a matching course from your search.
                                You can go back to <Link to="/search">Search</Link> and try again.
                            </p>

                            <div class="align-middle">
                                <Link to="/calendar" id="calendar-btn" class="nav-btn">
                                    View Calendar
                                </Link>
                            </div>
                        </section>
                    </main>
                </div>
        </>
    );
}
