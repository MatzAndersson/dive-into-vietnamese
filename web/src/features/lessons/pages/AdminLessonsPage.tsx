import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import FilterBar from "../components/FilterBar";
import LessonCard from "../components/LessonCard";
import CreateLessonForm from "../CreateLessonForm";

import { listLessons, deleteLesson } from "../api";
import type { Lesson, LessonLevel } from "../types";

export default function AdminLessonsPage() {
  const { t, i18n } = useTranslation();
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
  const qc = useQueryClient();
  const lessonsQueryKey = ["lessons", { q, level }] as const;

  const {
    data: lessons = [],
    isPending,
    error,
  } = useQuery<Lesson[], Error>({
    queryKey: lessonsQueryKey,
    queryFn: () => listLessons({ q, level }),
  });

  // Optimistic delete
  const del = useMutation({
    mutationFn: (id: number) => deleteLesson(id),
    onMutate: async (id: number) => {
      const key = lessonsQueryKey;
      await qc.cancelQueries({ queryKey: key });
      const previous = qc.getQueryData<Lesson[]>(key);
      if (previous)
        qc.setQueryData<Lesson[]>(
          key,
          previous.filter((l) => l.id !== id),
        );
      return { previous, key };
    },
    onError: (err, _id, ctx) => {
      if (ctx?.previous) qc.setQueryData(ctx.key!, ctx.previous);
      alert((err as Error).message || t("deleteFailed"));
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["lessons"] }),
  });

  const pageTitle = level
    ? t("lessonsForLevel", { level: t(level.toLowerCase()) })
    : t("allLessons");

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => i18n.changeLanguage("en")}
          className={`cursor-pointer transition hover:opacity-90 disabled:cursor-not-allowed px-3 py-1 rounded border ${
            i18n.language.startsWith("en")
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          EN
        </button>

        <button
          type="button"
          onClick={() => i18n.changeLanguage("vi")}
          className={`cursor-pointer transition hover:opacity-90 disabled:cursor-not-allowed px-3 py-1 rounded border ${
            i18n.language.startsWith("vi")
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          VI
        </button>
      </div>
      <section className="rounded-xl border p-4">
        <h2 className="font-medium mb-2">{t("create")}</h2>
        <CreateLessonForm />
      </section>

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
        {lessons.map((l) => (
          <LessonCard
            key={l.id}
            lesson={l}
            onDelete={(id) => del.mutateAsync(id)}
          />
        ))}
      </div>
    </div>
  );
}
