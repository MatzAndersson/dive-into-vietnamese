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
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-blue/15 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand-orange/40 hover:shadow-md">
      <Link
        to={`/lessons/${lesson.id}`}
        className="block flex-1 cursor-pointer"
      >
        <div className="relative">
          {lesson.imageUrl ? (
            <img
              src={lesson.imageUrl}
              alt=""
              className="h-40 w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-40 w-full items-center justify-center bg-brand-blue/5 text-brand-blue/60">
              <span className="text-sm font-semibold uppercase tracking-widest">
                {t("vietnameseLesson")}
              </span>
            </div>
          )}

          <span className="absolute right-2 top-2 rounded-full border border-brand-blue/15 bg-white/95 px-3 py-1 text-xs font-semibold text-brand-blue shadow-sm">
            {getLevelLabel(lesson.level)}
          </span>
        </div>

        <div className="p-4">
          <h3 className="line-clamp-1 font-heading text-lg font-semibold text-brand-dark">
            {lesson.title}
          </h3>

          {lesson.description && (
            <p className="mt-2 line-clamp-3 font-body text-sm leading-6 text-brand-dark/70">
              {lesson.description}
            </p>
          )}
        </div>
      </Link>

      {actions && <div className="px-4 pb-4">{actions}</div>}
    </div>
  );
}