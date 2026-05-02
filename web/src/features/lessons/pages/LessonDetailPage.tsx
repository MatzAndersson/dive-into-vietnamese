import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLessonById } from "../api";

export default function LessonDetailPage() {
  const { id } = useParams();
  const lessonId = Number(id);

  const {
    data: lesson,
    isPending,
    error,
  } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => getLessonById(lessonId),
    enabled: Number.isFinite(lessonId),
  });

  if (!Number.isFinite(lessonId)) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          Invalid lesson id.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <Link
        to="/lessons"
        className="inline-flex cursor-pointer items-center text-sm text-gray-600 transition hover:text-black hover:underline"
      >
        ← Back to lessons
      </Link>

      {isPending && (
        <div className="rounded-xl border bg-white p-6 text-gray-500 shadow-sm">
          Loading lesson...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {(error as Error).message || "Failed to load lesson"}
        </div>
      )}

      {lesson && (
        <>
          <section className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                  Lesson
                </p>
                <h1 className="text-3xl font-bold text-gray-900">
                  {lesson.title}
                </h1>
              </div>

              <span className="inline-flex w-fit rounded-full border bg-gray-50 px-3 py-1 text-sm text-gray-700">
                {lesson.level}
              </span>
            </div>

            {lesson.description && (
              <p className="max-w-2xl text-base leading-7 text-gray-700">
                {lesson.description}
              </p>
            )}
          </section>

          {lesson.imageUrl && (
            <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <img
                src={lesson.imageUrl}
                alt={lesson.title}
                className="h-auto max-h-[420px] w-full object-cover"
              />
            </section>
          )}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Explanation
            </h2>

            {lesson.explanation ? (
              <p className="leading-7 text-gray-700">{lesson.explanation}</p>
            ) : (
              <p className="leading-7 text-gray-500 italic">
                No explanation has been added for this lesson yet.
              </p>
            )}
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Vocabulary
            </h2>

            <ul className="space-y-3">
              <li className="rounded-xl border p-3">
                <p className="font-medium text-gray-900">bạn</p>
                <p className="text-sm text-gray-600">you / friend</p>
              </li>

              <li className="rounded-xl border p-3">
                <p className="font-medium text-gray-900">tên</p>
                <p className="text-sm text-gray-600">name</p>
              </li>

              <li className="rounded-xl border p-3">
                <p className="font-medium text-gray-900">gì</p>
                <p className="text-sm text-gray-600">what</p>
              </li>
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
