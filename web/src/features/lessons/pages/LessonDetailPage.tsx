import { Link, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLessonById } from "../api";

type ConversationLine = {
  speaker: string;
  vietnamese: string;
  english: string;
};

type VocabularyItem = {
  vietnamese: string;
  english: string;
  vietnameseExample?: string;
  englishExample?: string;
};

type GrammarItem = {
  title: string;
  explanation: string;
  vietnameseExample: string;
  englishExample: string;
};

type ExerciseItem = {
  type: string;
  instruction: string;
  prompt: string;
  answer: string;
};

type LessonQuestion = {
  question: string;
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

function parseQuestions(json?: string | null): LessonQuestion[] {
  if (!json?.trim()) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(json);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is LessonQuestion =>
        typeof item === "object" &&
        item !== null &&
        !Array.isArray(item) &&
        typeof (item as Partial<LessonQuestion>).question === "string" &&
        Boolean((item as Partial<LessonQuestion>).question?.trim()),
    );
  } catch {
    return [];
  }
}

function parseGrammar(json?: string | null): GrammarItem[] {
  if (!json?.trim()) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(json);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is GrammarItem =>
        typeof item === "object" &&
        item !== null &&
        !Array.isArray(item) &&
        typeof (item as Partial<GrammarItem>).title === "string" &&
        typeof (item as Partial<GrammarItem>).explanation === "string" &&
        typeof (item as Partial<GrammarItem>).vietnameseExample === "string" &&
        typeof (item as Partial<GrammarItem>).englishExample === "string",
    );
  } catch {
    return [];
  }
}

function parseExercises(json?: string | null): ExerciseItem[] {
  if (!json?.trim()) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(json);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is ExerciseItem =>
        typeof item === "object" &&
        item !== null &&
        !Array.isArray(item) &&
        typeof (item as Partial<ExerciseItem>).type === "string" &&
        typeof (item as Partial<ExerciseItem>).instruction === "string" &&
        typeof (item as Partial<ExerciseItem>).prompt === "string" &&
        typeof (item as Partial<ExerciseItem>).answer === "string",
    );
  } catch {
    return [];
  }
}

export default function LessonDetailPage() {
  const { id } = useParams();
  const lessonId = Number(id);
  const [showEnglish, setShowEnglish] = useState(true);

  const {
    data: lesson,
    isPending,
    error,
  } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => getLessonById(lessonId),
    enabled: Number.isFinite(lessonId),
  });

  const conversationLines = useMemo<ConversationLine[]>(() => {
    if (!lesson?.conversationJson) {
      return [];
    }

    try {
      const parsed = JSON.parse(lesson.conversationJson);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.filter(
        (item): item is ConversationLine =>
          typeof item === "object" &&
          item !== null &&
          typeof item.speaker === "string" &&
          typeof item.vietnamese === "string" &&
          typeof item.english === "string",
      );
    } catch {
      return [];
    }
  }, [lesson?.conversationJson]);

  const vocabularyItems = parseVocabulary(lesson?.vocabularyJson);
  const questions = parseQuestions(lesson?.questionsJson);
  const grammarItems = parseGrammar(lesson?.grammarJson);
  const exerciseItems = parseExercises(lesson?.exercisesJson);

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
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-gray-900">
                Conversation
              </h2>

              <button
                type="button"
                onClick={() => setShowEnglish((current) => !current)}
                className="cursor-pointer rounded border px-3 py-2 text-sm hover:bg-slate-50"
              >
                {showEnglish ? "English On" : "English Off"}
              </button>
            </div>

            {lesson.audioUrl && (
              <audio controls src={lesson.audioUrl} className="mb-4 w-full">
                Your browser does not support the audio element.
              </audio>
            )}

            {conversationLines.length > 0 ? (
              <div className="overflow-hidden rounded-xl border">
                {conversationLines.map((line, index) => (
                  <div
                    key={`${line.speaker}-${index}`}
                    className="grid grid-cols-[120px_1fr] border-b last:border-b-0"
                  >
                    <div className="border-r bg-slate-50 p-3 font-semibold text-gray-900">
                      {line.speaker}
                    </div>

                    <div className="p-3">
                      <p className="text-lg leading-8 text-gray-900">
                        {line.vietnamese}
                      </p>

                      {showEnglish && (
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {line.english}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="leading-7 text-gray-500 italic">
                No conversation has been added for this lesson yet.
              </p>
            )}
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Vocabulary
            </h2>

            {vocabularyItems.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b bg-slate-50 text-slate-700">
                      <th className="p-3 font-semibold">Vietnamese</th>
                      <th className="p-3 font-semibold">English</th>
                      <th className="p-3 font-semibold">Example sentence</th>
                      <th className="p-3 font-semibold">Translation</th>
                    </tr>
                  </thead>

                  <tbody>
                    {vocabularyItems.map((item, index) => (
                      <tr
                        key={`${item.vietnamese}-${index}`}
                        className="border-b last:border-b-0"
                      >
                        <td className="p-3 font-medium text-gray-900">
                          {item.vietnamese}
                        </td>
                        <td className="p-3 text-gray-700">{item.english}</td>
                        <td className="p-3 text-gray-700">
                          {item.vietnameseExample || "—"}
                        </td>
                        <td className="p-3 text-gray-700">
                          {item.englishExample || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="leading-7 text-gray-500 italic">
                No vocabulary has been added for this lesson yet.
              </p>
            )}
          </section>
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Questions
            </h2>

            {questions.length > 0 ? (
              <ol className="list-decimal space-y-2 pl-5">
                {questions.map((item, index) => (
                  <li
                    key={`${item.question}-${index}`}
                    className="text-slate-700"
                  >
                    {item.question}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="italic text-slate-500">
                No questions have been added for this lesson yet.
              </p>
            )}
          </section>
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Grammar
            </h2>

            {grammarItems.length > 0 ? (
              <div className="space-y-4">
                {grammarItems.map((item, index) => (
                  <article
                    key={`${item.title}-${index}`}
                    className="rounded-xl border bg-slate-50 p-4"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 leading-7 text-gray-700">
                      {item.explanation}
                    </p>

                    <div className="mt-3 rounded-lg bg-white p-3">
                      <p className="text-lg text-gray-900">
                        {item.vietnameseExample}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        {item.englishExample}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="italic text-slate-500">
                No grammar notes have been added for this lesson yet.
              </p>
            )}
          </section>
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Exercises
            </h2>

            {exerciseItems.length > 0 ? (
              <div className="space-y-4">
                {exerciseItems.map((item, index) => (
                  <article
                    key={`${item.type}-${item.prompt}-${index}`}
                    className="rounded-xl border p-4"
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {item.type}
                    </p>

                    <p className="font-medium text-gray-900">
                      {item.instruction}
                    </p>

                    <p className="mt-3 rounded-lg bg-slate-50 p-3 text-gray-800">
                      {item.prompt}
                    </p>

                    <div className="mt-3 rounded-lg border bg-white p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Suggested answer
                      </p>
                      <p className="mt-1 text-gray-700">{item.answer}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="italic text-slate-500">
                No exercises have been added for this lesson yet.
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
