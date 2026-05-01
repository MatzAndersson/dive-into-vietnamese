import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLessonById } from "../api";

export default function LessonDetailPage() {
  const { id } = useParams();
  const lessonId = Number(id);

  const { data, isPending, error } = useQuery({
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

      {data && (
        <>
          <section className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                  Lesson
                </p>
                <h1 className="text-3xl font-bold text-gray-900">
                  {data.title}
                </h1>
              </div>

              <span className="inline-flex w-fit rounded-full border bg-gray-50 px-3 py-1 text-sm text-gray-700">
                {data.level}
              </span>
            </div>

            {data.description && (
              <p className="max-w-2xl text-base leading-7 text-gray-700">
                {data.description}
              </p>
            )}
          </section>

          {data.imageUrl && (
            <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <img
                src={data.imageUrl}
                alt={data.title}
                className="h-auto max-h-[420px] w-full object-cover"
              />
            </section>
          )}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Explanation
            </h2>
            <p className="leading-7 text-gray-700">
              In this lesson, learners practice asking someone’s name in a
              simple everyday context. This is useful in first meetings and
              basic introductions.
            </p>
            <p className="mt-3 text-sm text-gray-500">
              Vietnamese focus: asking for someone’s name politely.
            </p>
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
