import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import FilterBar from "../components/FilterBar";
import LessonCard from "../components/LessonCard";

import { listLessons } from "../api";
import type { Lesson, LessonLevel } from "../types";

export default function LessonsPage() {
  const { t } = useTranslation();
  const [sp] = useSearchParams();
  const q = sp.get("q") ?? undefined;
  const { level: levelParam } = useParams<{ level?: string }>();

  // Only accept our known levels from the URL
  const level = useMemo<LessonLevel | undefined>(() => {
    const allowedFromPath: Record<string, LessonLevel> = {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    };

    if (levelParam) {
      return allowedFromPath[levelParam.toLowerCase()];
    }

    const raw = sp.get("level");
    const allowedFromQuery = ["Beginner", "Intermediate", "Advanced"] as const;

    return (allowedFromQuery as readonly string[]).includes(raw ?? "")
      ? (raw as LessonLevel)
      : undefined;
  }, [levelParam, sp]);

  // Fetch

  const lessonsQueryKey = ["lessons", { q, level }] as const;

  const {
    data: lessons = [],
    isPending,
    error,
  } = useQuery<Lesson[], Error>({
    queryKey: lessonsQueryKey,
    queryFn: () => listLessons({ q, level }),
  });

  const pageTitle = level
    ? t("lessonsForLevel", { level: t(level.toLowerCase()) })
    : t("allLessons");

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
        <p className="mt-2 text-slate-600">{t("chooseLesson")}</p>
      </header>
      <FilterBar />

      {isPending && (
        <div className="animate-pulse text-gray-500">{t("loading")}</div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
          {(error as Error).message || t("failedToLoad")}
        </div>
      )}

      {!isPending && lessons.length === 0 && (
        <div className="text-gray-600">{t("noLessonsFound")}</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
