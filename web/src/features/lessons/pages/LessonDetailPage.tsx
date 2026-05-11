import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLessonById } from "../api";

type VocabularyItem = {
  vietnamese: string;
  english: string;
  pronunciation?: string;
};

function parseVocabulary(vocabularyJson?: string | null): VocabularyItem[] {
  if (!vocabularyJson) {
    return [];
  }

  try {
    const parsed = JSON.parse(vocabularyJson);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is VocabularyItem =>
        typeof item.vietnamese === "string" && typeof item.english === "string",
    );
  } catch {
    return [];
  }
}

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

  const vocabularyItems = parseVocabulary(lesson?.vocabularyJson);

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
          <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="relative min-h-[320px]">
              {lesson.imageUrl ? (
                <img
                  src={lesson.imageUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-slate-900" />
              )}

              <div className="absolute inset-0 bg-black/50" />

              <div className="relative flex min-h-[320px] flex-col justify-end p-6 text-white sm:p-8">
                <div className="max-w-2xl space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-sm">
                      {lesson.level}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {lesson.title}
                  </h1>

                  {lesson.description && (
                    <p className="max-w-xl text-base leading-7 text-white/85">
                      {lesson.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

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
            <h2 className="mb-3 text-xl font-semibold text-gray-900">Audio</h2>

            {lesson.audioUrl ? (
              <audio controls src={lesson.audioUrl} className="w-full">
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p className="leading-7 text-gray-500 italic">
                No audio has been added for this lesson yet.
              </p>
            )}
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Vocabulary
            </h2>

            {vocabularyItems.length > 0 ? (
              <ul className="space-y-3">
                {vocabularyItems.map((item) => (
                  <li key={item.vietnamese} className="rounded-xl border p-3">
                    <p className="font-medium text-gray-900">
                      {item.vietnamese}
                    </p>
                    <p className="text-sm text-gray-600">{item.english}</p>

                    {item.pronunciation && (
                      <p className="mt-1 text-sm text-gray-500">
                        Pronunciation: {item.pronunciation}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="leading-7 text-gray-500 italic">
                No vocabulary has been added for this lesson yet.
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
