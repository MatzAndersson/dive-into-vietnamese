import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import FilterBar from "../components/FilterBar";
import LessonCard from "../components/LessonCard";
import CreateLessonForm from "../CreateLessonForm";

import { listLessons, deleteLesson, updateLesson } from "../api";
import type { Lesson, LessonLevel } from "../types";

const emptyToUndefined = (value: FormDataEntryValue | null) => {
  const text = String(value ?? "").trim();
  return text.length > 0 ? text : undefined;
};

const validateVocabularyJson = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      throw new Error("Vocabulary JSON must be an array.");
    }

    const hasInvalidItem = parsed.some(
      (item) =>
        typeof item !== "object" ||
        item === null ||
        typeof item.vietnamese !== "string" ||
        typeof item.english !== "string" ||
        typeof item.vietnameseExample !== "string" ||
        typeof item.englishExample !== "string",
    );

    if (hasInvalidItem) {
      throw new Error(
        "Each vocabulary item must include vietnamese, english, vietnameseExample, and englishExample fields.",
      );
    }

    return value;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Invalid vocabulary JSON.");
  }
};

export default function AdminLessonsPage() {
  const { t } = useTranslation();
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
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

  const update = useMutation({
    mutationFn: async (fd: FormData) => {
      if (!editingLesson) {
        throw new Error("No lesson selected for editing.");
      }

      return updateLesson(editingLesson.id, {
        title: String(fd.get("title") ?? "").trim(),
        description: emptyToUndefined(fd.get("description")),
        level: String(fd.get("level") ?? "Beginner") as LessonLevel,
        imageUrl: emptyToUndefined(fd.get("imageUrl")),
        explanation: emptyToUndefined(fd.get("explanation")),
        audioUrl: emptyToUndefined(fd.get("audioUrl")),
        vocabularyJson: validateVocabularyJson(
          emptyToUndefined(fd.get("vocabularyJson")),
        ),
      });
    },
    onSuccess: () => {
      setEditingLesson(null);
      void qc.invalidateQueries({ queryKey: ["lessons"] });
    },
    onError: (err) => {
      alert((err as Error).message || "Failed to update lesson");
    },
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
      <section className="rounded-xl border p-4">
        <h2 className="font-medium mb-2">{t("create")}</h2>
        <CreateLessonForm />
      </section>

      {editingLesson && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
          <section className="mt-10 w-full max-w-3xl rounded-xl bg-white p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="font-medium">{t("editLesson")}</h2>

              <button
                type="button"
                className="cursor-pointer rounded border px-3 py-1 text-sm hover:bg-slate-50"
                onClick={() => setEditingLesson(null)}
              >
                {t("cancel")}
              </button>
            </div>

            <form
              key={editingLesson.id}
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                update.mutate(new FormData(e.currentTarget));
              }}
            >
              <input
                name="title"
                defaultValue={editingLesson.title}
                className="w-full rounded border p-2"
                required
              />

              <textarea
                name="description"
                defaultValue={editingLesson.description ?? ""}
                className="w-full rounded border p-2"
              />

              <select
                name="level"
                defaultValue={editingLesson.level}
                className="w-full rounded border p-2"
              >
                <option value="Beginner">{t("beginner")}</option>
                <option value="Intermediate">{t("intermediate")}</option>
                <option value="Advanced">{t("advanced")}</option>
              </select>

              <input
                name="imageUrl"
                defaultValue={editingLesson.imageUrl ?? ""}
                placeholder="Image URL"
                className="w-full rounded border p-2"
              />

              <textarea
                name="explanation"
                defaultValue={editingLesson.explanation ?? ""}
                placeholder="Explanation"
                className="min-h-28 w-full rounded border p-2"
              />

              <input
                name="audioUrl"
                defaultValue={editingLesson.audioUrl ?? ""}
                placeholder="Conversation audio URL"
                className="w-full rounded border p-2"
              />

              <textarea
                name="vocabularyJson"
                defaultValue={editingLesson.vocabularyJson ?? ""}
                placeholder='[{"vietnamese":"xin chào","english":"hello","vietnameseExample":"Xin chào, anh khỏe không?","englishExample":"Hello, how are you?"}]'
                className="min-h-32 w-full rounded border p-2 font-mono text-sm"
              />

              <button
                type="submit"
                disabled={update.isPending}
                className="cursor-pointer rounded bg-black px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {update.isPending ? t("saving") : t("saveChanges")}
              </button>
            </form>
          </section>
        </div>
      )}

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
            actions={
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 cursor-pointer rounded border px-3 py-2 text-sm hover:bg-slate-50"
                  onClick={() => setEditingLesson(l)}
                >
                  {t("edit")}
                </button>

                <button
                  type="button"
                  disabled={del.isPending}
                  className="flex-1 cursor-pointer rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => {
                    if (
                      !confirm(t("deleteLessonConfirm", { title: l.title }))
                    ) {
                      return;
                    }

                    void del.mutateAsync(l.id);
                  }}
                >
                  {del.isPending ? "..." : t("delete")}
                </button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
