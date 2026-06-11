import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import FilterBar from "../components/FilterBar";
import LessonCard from "../components/LessonCard";
import { listLessons } from "../api";
export default function LessonsPage() {
    const { t } = useTranslation();
    const [sp] = useSearchParams();
    const q = sp.get("q") ?? undefined;
    const { level: levelParam } = useParams();
    // Only accept our known levels from the URL
    const level = useMemo(() => {
        const allowedFromPath = {
            beginner: "Beginner",
            intermediate: "Intermediate",
            advanced: "Advanced",
        };
        if (levelParam) {
            return allowedFromPath[levelParam.toLowerCase()];
        }
        const raw = sp.get("level");
        const allowedFromQuery = ["Beginner", "Intermediate", "Advanced"];
        return allowedFromQuery.includes(raw ?? "")
            ? raw
            : undefined;
    }, [levelParam, sp]);
    // Fetch
    const lessonsQueryKey = ["lessons", { q, level }];
    const { data: lessons = [], isPending, error, } = useQuery({
        queryKey: lessonsQueryKey,
        queryFn: () => listLessons({ q, level }),
    });
    const pageTitle = level
        ? t("lessonsForLevel", { level: t(level.toLowerCase()) })
        : t("allLessons");
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("header", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: pageTitle }), _jsx("p", { className: "mt-2 text-slate-600", children: t("chooseLesson") })] }), _jsx(FilterBar, {}), isPending && (_jsx("div", { className: "animate-pulse text-gray-500", children: t("loading") })), error && (_jsx("div", { className: "p-3 rounded-xl bg-red-50 border border-red-200 text-red-700", children: error.message || t("failedToLoad") })), !isPending && lessons.length === 0 && (_jsx("div", { className: "text-gray-600", children: t("noLessonsFound") })), _jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: lessons.map((lesson) => (_jsx(LessonCard, { lesson: lesson }, lesson.id))) })] }));
}
