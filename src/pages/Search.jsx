import Navbar from "../components/Navbar";
import {Link} from "react-router-dom"

export default function Search() {
    return (
        <>
            <Navbar />

            <div id="container">
                    <main id ="dashboard-main">

                        <h1 className="welcome-title">Search By Course</h1>

                        <p className="welcome-text">
                            Certain courses follow unique exam schedules that may differ from the standard timetable.
                            If you think your class might be one of them, start your search here.
                        </p>
                        <p className="welcome-text">
                            Use the dropdowns below to look up your course.
                            Once it appears, just simply hit <strong>'Add to Calendar'</strong> to save it!
                        </p>
                        <p className="welcome-text">
                            Not seeing your course? No problem - click <Link to="/search" class="course-not-listed">Course not listed</Link> to search by class time instead.
                        </p>

                        <div id="search-section">

                            <form action="#" method="get" id="course-search-form" class="search-form">

                                <div className="search-bar">
                                    <input type="text" 
                                        id="search-input"
                                        name="query"    
                                        placeholder="Enter course (e.g., Math110)" />                                    
                                </div>
                                
                                <div className="align-middle">
                                        <Link to="/addexam" id="view-course-btn" class="nav-btn">
                                            View Course
                                        </Link>
                                </div>

                            </form>

                        </div>

                    </main>
                </div>

        </>
    )
}