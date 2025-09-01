import { Routes, Route, Navigate } from "react-router-dom";
import LessonsPage from "./features/lessons/pages/LessonsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/lessons" replace />} />
      <Route path="/lessons" element={<LessonsPage />} />
    </Routes>
  );
}
