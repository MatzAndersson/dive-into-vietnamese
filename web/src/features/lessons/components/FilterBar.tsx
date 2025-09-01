import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { LessonLevel } from "../types";

const LEVELS: (LessonLevel | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];

export default function FilterBar() {
  const [sp, setSp] = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [level, setLevel] = useState<LessonLevel | "All">(
    (sp.get("level") as LessonLevel) ?? "All"
  );

  // Debounce q -> URL
  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(sp);
      if (q.trim()) next.set("q", q.trim());
      else next.delete("q");
      setSp(next, { replace: true });
    }, 300);
    return () => clearTimeout(t);
    // include only q, sp, setSp so we don't re-create timer unnecessarily
  }, [q, sp, setSp]);

  const onLevel = useCallback((v: string) => {
    const next = new URLSearchParams(sp);
    if (v === "All") next.delete("level");
    else next.set("level", v);
    setLevel(v as LessonLevel | "All");
    setSp(next, { replace: true });
  }, [sp, setSp]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search lessons..."
        className="w-full sm:max-w-md px-3 py-2 rounded-xl border"
      />
      <select
        value={level}
        onChange={(e) => onLevel(e.target.value)}
        className="px-3 py-2 rounded-xl border w-full sm:w-56"
      >
        {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
    </div>
  );
}
