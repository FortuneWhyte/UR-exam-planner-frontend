import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Calendar from "./pages/Calendar";
import AddExam from "./pages/AddExam";


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/addexam" element={<AddExam />} />
        
      </Routes>
      <Analytics />
    </>
  );
}
