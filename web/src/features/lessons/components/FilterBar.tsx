import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { LessonLevel } from "../types";

const LEVELS: (LessonLevel | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];

export default function FilterBar() {
  const { t } = useTranslation();
  const [sp, setSp] = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [level, setLevel] = useState<LessonLevel | "All">(
    (sp.get("level") as LessonLevel) ?? "All"
  );

  useEffect(() => {
    const tmr = setTimeout(() => {
      const next = new URLSearchParams(sp);
      if (q.trim()) next.set("q", q.trim());
      else next.delete("q");
      setSp(next, { replace: true });
    }, 300);

    return () => clearTimeout(tmr);
  }, [q, sp, setSp]);

  const onLevel = useCallback((v: string) => {
    const next = new URLSearchParams(sp);
    if (v === "All") next.delete("level");
    else next.set("level", v);
    setLevel(v as LessonLevel | "All");
    setSp(next, { replace: true });
  }, [sp, setSp]);

  const getLevelLabel = (value: LessonLevel | "All") => {
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

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("searchLessons")}
        className="w-full sm:max-w-md px-3 py-2 rounded-xl border"
      />

      <select
        value={level}
        onChange={(e) => onLevel(e.target.value)}
        className="px-3 py-2 rounded-xl border w-full sm:w-56"
      >
        {LEVELS.map((l) => (
          <option key={l} value={l}>
            {getLevelLabel(l)}
          </option>
        ))}
      </select>
    </div>
  );
}