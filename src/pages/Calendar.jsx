import Navbar from "../components/Navbar";


export default function Calendar() {
    return (
        <>
            <Navbar />

            <div id="container">
                    <main id="calendar-main">

                        <h1 className="welcome-title">Calendar</h1>

                        
                        <section id="no-exams" class="result-card">
                            <p>
                                No exams in your calendar.
                            </p>
                        </section>

                        
                        <section id="exam-list" className="result-card hidden">
                            <h2>Upcoming Exams</h2>

                            <table className="exam-table">
                                <thead>
                                    <tr>
                                        <th>Course</th>
                                        <th>Instructor</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <tr>
                                        <td>CS 215</td>
                                        <td>Dr. Example</td>
                                        <td>Dec 10, 2025</td>
                                        <td>9:00 AM – 12:00 PM</td>
                                        <td>ED 106</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </main>
                </div>
        </>
    );
}    