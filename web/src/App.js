import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import LessonsPage from "./features/lessons/pages/LessonsPage";
import LessonDetailPage from "./features/lessons/pages/LessonDetailPage";
import AdminLessonsPage from "./features/lessons/pages/AdminLessonsPage";
import HomePage from "./features/lessons/pages/HomePage";
import { LoginPage } from "./features/auth/pages/LoginPage";
export default function App() {
    return (_jsxs("div", { className: "min-h-screen bg-brand-light text-brand-dark", children: [_jsx(Navbar, {}), _jsx("main", { className: "mx-auto max-w-6xl px-4 py-8", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/lessons", element: _jsx(LessonsPage, {}) }), _jsx(Route, { path: "/levels/:level", element: _jsx(LessonsPage, {}) }), _jsx(Route, { path: "/lessons/:id", element: _jsx(LessonDetailPage, {}) }), _jsx(Route, { path: "/admin/lessons", element: _jsx(AdminLessonsPage, {}) }), _jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) })] }) })] }));
}
