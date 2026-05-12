import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import LessonsPage from "./features/lessons/pages/LessonsPage";
import LessonDetailPage from "./features/lessons/pages/LessonDetailPage";
import AdminLessonsPage from "./features/lessons/pages/AdminLessonsPage";
import HomePage from "./features/lessons/pages/HomePage";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-light text-brand-dark">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/levels/:level" element={<LessonsPage />} />
          <Route path="/lessons/:id" element={<LessonDetailPage />} />
          <Route path="/admin/lessons" element={<AdminLessonsPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}
