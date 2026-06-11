import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
export function Navbar() {
    const { t, i18n } = useTranslation();
    const getLinkClass = ({ isActive }) => isActive
        ? "font-semibold text-brand-orange"
        : "font-medium text-brand-dark transition hover:text-brand-orange";
    const getLanguageButtonClass = (language) => `cursor-pointer rounded-lg border px-3 py-1 text-sm font-semibold transition ${i18n.language.startsWith(language)
        ? "border-brand-blue bg-brand-blue text-white"
        : "border-brand-blue/20 bg-white text-brand-blue hover:border-brand-orange hover:text-brand-orange"}`;
    return (_jsx("header", { className: "border-b border-brand-blue/10 bg-white", children: _jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4", children: [_jsx(NavLink, { to: "/", className: "font-heading text-lg font-bold text-brand-blue transition hover:text-brand-orange", children: "Dive Into Vietnamese" }), _jsxs("nav", { className: "flex gap-4 text-sm", children: [_jsx(NavLink, { to: "/", className: getLinkClass, children: t("nav.home") }), _jsx(NavLink, { to: "/levels/beginner", className: getLinkClass, children: t("nav.beginner") }), _jsx(NavLink, { to: "/levels/intermediate", className: getLinkClass, children: t("nav.intermediate") }), _jsx(NavLink, { to: "/levels/advanced", className: getLinkClass, children: t("nav.advanced") })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { type: "button", onClick: () => i18n.changeLanguage("en"), className: getLanguageButtonClass("en"), children: "EN" }), _jsx("button", { type: "button", onClick: () => i18n.changeLanguage("vi"), className: getLanguageButtonClass("vi"), children: "VI" })] })] }) }));
}
