import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export default function LessonCard({ lesson, actions, }) {
    const { t } = useTranslation();
    const getLevelLabel = (level) => {
        switch (level) {
            case "Beginner":
                return t("beginner");
            case "Intermediate":
                return t("intermediate");
            case "Advanced":
                return t("advanced");
            default:
                return level;
        }
    };
    return (_jsxs("div", { className: "flex h-full flex-col overflow-hidden rounded-2xl border border-brand-blue/15 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand-orange/40 hover:shadow-md", children: [_jsxs(Link, { to: `/lessons/${lesson.id}`, className: "block flex-1 cursor-pointer", children: [_jsxs("div", { className: "relative", children: [lesson.imageUrl ? (_jsx("img", { src: lesson.imageUrl, alt: "", className: "h-40 w-full object-cover", loading: "lazy" })) : (_jsx("div", { className: "flex h-40 w-full items-center justify-center bg-brand-blue/5 text-brand-blue/60", children: _jsx("span", { className: "text-sm font-semibold uppercase tracking-widest", children: t("vietnameseLesson") }) })), _jsx("span", { className: "absolute right-2 top-2 rounded-full border border-brand-blue/15 bg-white/95 px-3 py-1 text-xs font-semibold text-brand-blue shadow-sm", children: getLevelLabel(lesson.level) })] }), _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "line-clamp-1 font-heading text-lg font-semibold text-brand-orange", children: lesson.title }), lesson.description && (_jsx("p", { className: "mt-2 line-clamp-3 font-body text-sm leading-6 text-brand-dark/70", children: lesson.description }))] })] }), actions && _jsx("div", { className: "px-4 pb-4", children: actions })] }));
}
