import { useTranslation } from "react-i18next";
import type { Lesson } from "../types";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

export default function LessonCard({
  lesson,
  actions,
}: {
  lesson: Lesson;
  actions?: ReactNode;
}) {
  const { t } = useTranslation();

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

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="relative">
        {lesson.imageUrl ? (
          <img
            src={lesson.imageUrl}
            alt=""
            className="h-40 w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-40 w-full items-center justify-center bg-slate-100 text-slate-400">
            <span className="text-sm font-medium uppercase tracking-widest">
              {t("vietnameseLesson")}
            </span>
          </div>
        )}

        <span className="absolute right-2 top-2 rounded-full border bg-white/90 px-2 py-1 text-xs shadow-sm">
          {getLevelLabel(lesson.level)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/lessons/${lesson.id}`} className="hover:underline">
          <h3 className="line-clamp-1 text-lg font-semibold">
            {lesson.title}
          </h3>
        </Link>

        {lesson.description && (
          <p className="mt-2 line-clamp-3 text-sm text-gray-600">
            {lesson.description}
          </p>
        )}

        {actions && <div className="mt-auto pt-4">{actions}</div>}
      </div>
    </div>
  );
}