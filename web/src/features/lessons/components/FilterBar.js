import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
export default function FilterBar() {
    const { t } = useTranslation();
    const [sp, setSp] = useSearchParams();
    const [q, setQ] = useState(sp.get("q") ?? "");
    const [level, setLevel] = useState(sp.get("level") ?? "All");
    useEffect(() => {
        const tmr = setTimeout(() => {
            const next = new URLSearchParams(sp);
            if (q.trim())
                next.set("q", q.trim());
            else
                next.delete("q");
            setSp(next, { replace: true });
        }, 300);
        return () => clearTimeout(tmr);
    }, [q, sp, setSp]);
    const onLevel = useCallback((v) => {
        const next = new URLSearchParams(sp);
        if (v === "All")
            next.delete("level");
        else
            next.set("level", v);
        setLevel(v);
        setSp(next, { replace: true });
    }, [sp, setSp]);
    const getLevelLabel = (value) => {
        switch (value) {
            case "All":
                return t("all");
            case "Beginner":
                return t("beginner");
            case "Intermediate":
                return t("intermediate");
            case "Advanced":
                return t("advanced");
            default:
                return value;
        }
    };
    return (_jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-2", children: [_jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: t("searchLessons"), className: "w-full sm:max-w-md px-3 py-2 rounded-xl border" }), _jsx("select", { value: level, onChange: (e) => onLevel(e.target.value), className: "px-3 py-2 rounded-xl border w-full sm:w-56", children: LEVELS.map((l) => (_jsx("option", { value: l, children: getLevelLabel(l) }, l))) })] }));
}
