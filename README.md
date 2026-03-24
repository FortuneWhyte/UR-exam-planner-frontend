# UR Exam Planner (Full-Stack)

A modern full-stack web application designed to help University of Regina students find, track, and manage their final exam schedules. 

Originally built as a static React frontend, this project has been fully upgraded to a **full-stack application** with a custom Express/Node.js backend and a SQLite database.

## 🚀 Tech Stack

**Frontend:**
* React 18 + Vite
* React Router v6 (for SPA navigation)
* Vanilla CSS (responsive, custom design system)
* Native Fetch API for data service integration

**Backend:**
* Node.js + Express.js
* SQLite3 (via `better-sqlite3`)
* RESTful API architecture
* Cross-Origin Resource Sharing (CORS) configured for Vite

## ✨ Features

* **Instant Search:** Type any course ID (e.g., `CS 215` or `Calculus`) into the search bar to fuzzy-match the exam schedule database.
* **Dynamic Views:** Click any search result to automatically generate a unique page displaying the exact date, time, location, and professor for the course.
* **My Calendar:** Add courses to your personalized calendar with a click. The backend prevents duplicates and permanently saves your exam schedule.
* **Semester Filtering:** Dropdown filter enables sorting search results by term (e.g., "Winter 2026", "Fall 2025").
* **Exam Management:** Easily remove stored exams from your calendar directly from the frontend UI.
* **Robust Error Handling:** Loading animations and inline error states handle network delays and invalid searches gracefully.

## 🛠️ Installation & Setup

Because this is a full-stack application, you must run **both** the frontend server and backend API server simultaneously for the application to work.

### 1. Backend Setup
The backend serves the SQLite database and powers the search/calendar logic.

```bash
# Open Terminal 1
cd exam_planner_frontend/server
npm install
npm start
```
*The server will run on `http://localhost:3001`.*

### 2. Frontend Setup
The frontend serves the React UI and communicates with the backend.

```bash
# Open Terminal 2
cd exam_planner_frontend
npm install
npm run dev
```
*The application will open in your browser at `http://localhost:5173`. You can now search for courses, view details, and save them to your calendar.*

## 📂 Project Structure

```bash
exam_planner_frontend/
├── server/                 # Backend Directory
│   ├── db/
│   │   ├── database.js     # SQLite connection & initialization
│   │   ├── seed-data.json  # Mock database seed file
│   │   └── exam_planner.db # Auto-generated SQLite database
│   ├── routes/
│   │   ├── courses.js      # Search & get course endpoints
│   │   ├── calendar.js     # Add/remove/list calendar endpoints
│   │   └── semesters.js    # Semester filter endpoints
│   ├── package.json        
│   └── server.js           # Express app entry point
├── src/                    # Frontend Directory
│   ├── components/         # React components (Navbar)
│   ├── pages/              # React pages (Home, Search, Calendar, AddExam)
│   ├── services/           # API integration layer (api.js)
│   ├── css/                # Stylesheets
│   ├── App.jsx             # Main router configuration
│   └── main.jsx            # React root mount
└── package.json
```
