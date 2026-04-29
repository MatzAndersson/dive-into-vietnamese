import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Lesson } from "../types";
import { Link } from "react-router-dom";

export default function LessonCard({
  lesson,
  onDelete,
}: {
  lesson: Lesson;
  onDelete: (id: number) => Promise<void>;
}) {
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);

  const getLevelLabel = (level: Lesson["level"]) => {
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

  const confirmDelete = async () => {
    if (!confirm(t("deleteLessonConfirm", { title: lesson.title }))) return;

    setBusy(true);
    try {
      await onDelete(lesson.id);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative rounded-2xl shadow-sm border overflow-hidden bg-white">
      {lesson.imageUrl && (
        <img
          src={lesson.imageUrl}
          alt=""
          className="h-40 w-full object-cover"
          loading="lazy"
        />
      )}

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <Link to={`/lessons/${lesson.id}`} className="hover:underline">
            <h3 className="font-semibold text-lg line-clamp-1">
              {lesson.title}
            </h3>
          </Link>
          <span className="text-xs rounded-full px-2 py-1 border bg-gray-50">
            {getLevelLabel(lesson.level)}
          </span>
        </div>

        {lesson.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {lesson.description}
          </p>
        )}
      </div>

      <button
        onClick={confirmDelete}
        disabled={busy}
        className="absolute top-2 right-2 text-xs px-2 py-1 rounded-md border border-red-200 bg-red-50 text-red-700 cursor-pointer transition hover:bg-red-100 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        title={t("deleteLesson")}
      >
        {busy ? "..." : t("delete")}
      </button>
    </div>
  );
}
