import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const levels = [
    {
        titleKey: "home.levels.beginner.title",
        descriptionKey: "home.levels.beginner.description",
        path: "/levels/beginner",
    },
    {
        titleKey: "home.levels.intermediate.title",
        descriptionKey: "home.levels.intermediate.description",
        path: "/levels/intermediate",
    },
    {
        titleKey: "home.levels.advanced.title",
        descriptionKey: "home.levels.advanced.description",
        path: "/levels/advanced",
    },
];
export default function HomePage() {
    const { t } = useTranslation();
    return (_jsxs("div", { className: "space-y-10", children: [_jsxs("section", { className: "rounded-3xl border border-brand-blue/20 bg-white p-8 shadow-sm", children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-wide text-brand-blue", children: t("home.eyebrow") }), _jsx("h1", { className: "mt-3 max-w-3xl font-heading text-4xl font-bold tracking-tight text-brand-dark", children: t("home.title") }), _jsx("p", { className: "mt-4 max-w-2xl font-body text-lg leading-8 text-brand-dark/75", children: t("home.subtitle") }), _jsx("div", { className: "mt-6", children: _jsx(Link, { to: "/levels/beginner", className: "inline-flex rounded-xl bg-brand-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-yellow hover:text-brand-dark", children: t("home.startButton") }) })] }), _jsxs("section", { children: [_jsx("h2", { className: "font-heading text-2xl font-bold tracking-tight text-brand-blue", children: t("home.chooseLevel") }), _jsx("div", { className: "mt-4 grid gap-4 md:grid-cols-3", children: levels.map((level) => (_jsxs(Link, { to: level.path, className: "rounded-2xl border border-brand-blue/15 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-orange/40 hover:shadow-md", children: [_jsx("h3", { className: "font-heading text-xl font-semibold text-brand-dark", children: t(level.titleKey) }), _jsx("p", { className: "mt-2 font-body text-sm leading-6 text-brand-dark/70", children: t(level.descriptionKey) })] }, level.path))) })] })] }));
}
