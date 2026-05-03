import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import LessonsPage from "./features/lessons/pages/LessonsPage";
import LessonDetailPage from "./features/lessons/pages/LessonDetailPage";

export default function App() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/lessons" replace />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/levels/:level" element={<LessonsPage />} />
          <Route path="/lessons/:id" element={<LessonDetailPage />} />
        </Routes>
      </main>
    </>
  );
}
