import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { createLesson } from "./api";
import type { LessonLevel } from "./types";

type CreateResult = { ok: true } | { error: string };

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

async function createAction(
  _prev: CreateResult | null,
  fd: FormData,
): Promise<CreateResult> {
  try {
    await createLesson({
      title: String(fd.get("title") ?? "").trim(),
      description: emptyToUndefined(fd.get("description")),
      level: String(fd.get("level") ?? "Beginner") as LessonLevel,
      imageUrl: emptyToUndefined(fd.get("imageUrl")),
      explanation: emptyToUndefined(fd.get("explanation")),
      conversationJson: emptyToUndefined(fd.get("conversationJson")),
      audioUrl: emptyToUndefined(fd.get("audioUrl")),
      vocabularyJson: validateVocabularyJson(
        emptyToUndefined(fd.get("vocabularyJson")),
      ),
    });

    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}

function SubmitBtn() {
  const { t } = useTranslation();
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="cursor-pointer rounded bg-black px-3 py-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
    >
      {pending ? t("saving") : t("save")}
    </button>
  );
}

export default function CreateLessonForm() {
  const { t } = useTranslation();
  const qc = useQueryClient();

  const [state, action] = useActionState<CreateResult | null, FormData>(
    createAction,
    null,
  );

  useEffect(() => {
    if (state && "ok" in state) {
      void qc.invalidateQueries({ queryKey: ["lessons"] });
    }
  }, [state, qc]);

  return (
    <form action={action} className="space-y-3">
      <input
        name="title"
        placeholder={t("title")}
        className="w-full rounded border p-2"
        required
      />

      <textarea
        name="description"
        placeholder={t("description")}
        className="w-full rounded border p-2"
      />

      <select
        name="level"
        defaultValue="Beginner"
        className="w-full rounded border p-2"
      >
        <option value="Beginner">{t("beginner")}</option>
        <option value="Intermediate">{t("intermediate")}</option>
        <option value="Advanced">{t("advanced")}</option>
      </select>

      <input
        name="imageUrl"
        placeholder="Image URL"
        className="w-full rounded border p-2"
      />

      <p className="text-xs text-slate-500">
        Use a direct image URL ending in .jpg, .png, or .webp.
      </p>

      <textarea
        name="explanation"
        placeholder="Explanation"
        className="min-h-28 w-full rounded border p-2"
      />

      <textarea
        name="conversationJson"
        placeholder='[{"speaker":"Mai","vietnamese":"Xin chào anh.","english":"Hello."}]'
        className="min-h-32 w-full rounded border p-2 font-mono text-sm"
      />

      <p className="text-xs text-slate-500">
        {`Expected format: [{"speaker":"Mai","vietnamese":"Xin chào anh.","english":"Hello."}]`}
      </p>

      <input
        name="audioUrl"
        placeholder="Conversation audio URL"
        className="w-full rounded border p-2"
      />
      <p className="text-xs text-slate-500">
        Use a direct audio URL ending in .mp3, .wav, or .ogg.
      </p>

      <textarea
        name="vocabularyJson"
        placeholder='[{"vietnamese":"xin chào","english":"hello","vietnameseExample":"Xin chào, anh khỏe không?","englishExample":"Hello, how are you?"}]'
        className="min-h-32 w-full rounded border p-2 font-mono text-sm"
      />

      <p className="text-xs text-slate-500">
        {`Expected format: [{"vietnamese":"xin chào","english":"hello","vietnameseExample":"Xin chào, anh khỏe không?","englishExample":"Hello, how are you?"}]`}
      </p>

      <SubmitBtn />

      {state && "error" in state && (
        <p className="text-red-600">{state.error}</p>
      )}

      {state && "ok" in state && (
        <p className="text-green-700">Lesson created.</p>
      )}
    </form>
  );
}
