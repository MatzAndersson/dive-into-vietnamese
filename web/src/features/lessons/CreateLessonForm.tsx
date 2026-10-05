import { useEffect, useActionState, useState, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { createLesson, uploadMedia } from "./api";
import type { LessonLevel } from "./types";
import {
  validateVocabularyJson,
  validateConversationJson,
  validateQuestionsJson,
  validateGrammarJson,
  validateExercisesJson,
} from "./lessonJsonValidation";

type CreateResult = { ok: true } | { error: string };

const emptyToUndefined = (value: FormDataEntryValue | null) => {
  const text = String(value ?? "").trim();
  return text.length > 0 ? text : undefined;
};

const getSelectedFile = (value: FormDataEntryValue | null) => {
  return value instanceof File && value.size > 0 ? value : undefined;
};

async function createAction(
  _prev: CreateResult | null,
  fd: FormData,
): Promise<CreateResult> {
  try {
    const imageFile = getSelectedFile(fd.get("imageFile"));
    const audioFile = getSelectedFile(fd.get("audioFile"));

    const imageUrl = imageFile
      ? (await uploadMedia(imageFile, "lesson-image")).url
      : emptyToUndefined(fd.get("imageUrl"));

    const audioUrl = audioFile
      ? (await uploadMedia(audioFile, "conversation-audio")).url
      : emptyToUndefined(fd.get("audioUrl"));

    await createLesson({
      title: String(fd.get("title") ?? "").trim(),
      description: emptyToUndefined(fd.get("description")),
      level: String(fd.get("level") ?? "Beginner") as LessonLevel,
      imageUrl,
      explanation: emptyToUndefined(fd.get("explanation")),

      conversationJson: validateConversationJson(
        emptyToUndefined(fd.get("conversationJson")),
      ),

      audioUrl,

      vocabularyJson: validateVocabularyJson(
        emptyToUndefined(fd.get("vocabularyJson")),
      ),

      questionsJson: validateQuestionsJson(
        emptyToUndefined(fd.get("questionsJson")),
      ),

      grammarJson: validateGrammarJson(emptyToUndefined(fd.get("grammarJson"))),

      exercisesJson: validateExercisesJson(
        emptyToUndefined(fd.get("exercisesJson")),
      ),
    });

    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed" };
  }
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-1 block font-heading text-sm font-semibold text-brand-blue">
      {children}
    </span>
  );
}

function SubmitBtn() {
  const { t } = useTranslation();
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="cursor-pointer rounded bg-brand-orange px-3 py-2 font-heading font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
    >
      {pending ? t("saving") : t("save")}
    </button>
  );
}

export default function CreateLessonForm() {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>();
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string>();

  const [state, action] = useActionState<CreateResult | null, FormData>(
    createAction,
    null,
  );

  useEffect(() => {
    if (state && "ok" in state) {
      void qc.invalidateQueries({ queryKey: ["lessons"] });
    }
  }, [state, qc]);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  useEffect(() => {
    return () => {
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }
    };
  }, [audioPreviewUrl]);

  return (
    <form action={action} className="space-y-3">
      <label className="block">
        <FieldLabel>Lesson title</FieldLabel>
        <input
          name="title"
          placeholder={t("title")}
          className="w-full rounded border p-2 font-body text-brand-dark"
          required
        />
      </label>

      <label className="block">
        <FieldLabel>Description</FieldLabel>
        <textarea
          name="description"
          placeholder={t("description")}
          className="w-full rounded border p-2 font-body text-brand-dark"
        />
      </label>

      <label className="block">
        <FieldLabel>Level</FieldLabel>
        <select
          name="level"
          defaultValue="Beginner"
          className="w-full rounded border p-2 font-body text-brand-dark"
        >
          <option value="Beginner">{t("beginner")}</option>
          <option value="Intermediate">{t("intermediate")}</option>
          <option value="Advanced">{t("advanced")}</option>
        </select>
      </label>

      <label className="block">
        <FieldLabel>Lesson image</FieldLabel>
        <input
          type="file"
          name="imageFile"
          accept="image/jpeg,image/png,image/webp"
          className="w-full cursor-pointer rounded border p-2 font-body text-brand-dark"
          onChange={(e) => {
            const file = e.target.files?.[0];

            setImagePreviewUrl(file ? URL.createObjectURL(file) : undefined);
          }}
        />
      </label>

      <p className="text-xs text-slate-500">JPG, PNG or WebP. Maximum 5 MB.</p>

      {imagePreviewUrl && (
        <img
          src={imagePreviewUrl}
          alt="Lesson preview"
          className="max-h-64 rounded-lg border object-contain"
        />
      )}

      <label className="block">
        <FieldLabel>Image URL</FieldLabel>
        <input
          name="imageUrl"
          placeholder="Image URL"
          className="w-full rounded border p-2 font-body text-brand-dark"
        />
      </label>

      <p className="text-xs text-slate-500">
        Optional fallback: use a direct JPG, PNG or WebP URL.
      </p>

      <label className="block">
        <FieldLabel>Explanation</FieldLabel>
        <textarea
          name="explanation"
          placeholder="Explanation"
          className="min-h-28 w-full rounded border p-2 font-body text-brand-dark"
        />
      </label>

      <label className="block">
        <FieldLabel>Conversation JSON</FieldLabel>
        <textarea
          name="conversationJson"
          placeholder='[{"speaker":"Mai","vietnamese":"Xin chào anh.","english":"Hello."}]'
          className="min-h-32 w-full rounded border p-2 font-mono text-sm text-brand-dark"
        />
      </label>

      <p className="text-xs text-slate-500">
        {`Expected format: [{"speaker":"Mai","vietnamese":"Xin chào anh.","english":"Hello."}]`}
      </p>

      <label className="block">
        <FieldLabel>Conversation audio</FieldLabel>
        <input
          type="file"
          name="audioFile"
          accept=".mp3,.m4a,audio/mpeg,audio/mp4,audio/x-m4a"
          className="w-full cursor-pointer rounded border p-2 font-body text-brand-dark"
          onChange={(e) => {
            const file = e.target.files?.[0];

            setAudioPreviewUrl(file ? URL.createObjectURL(file) : undefined);
          }}
        />
      </label>

      <p className="text-xs text-slate-500">MP3 or M4A. Maximum 25 MB.</p>

      {audioPreviewUrl && (
        <audio controls src={audioPreviewUrl} className="w-full" />
      )}

      <label className="block">
        <FieldLabel>Conversation audio URL</FieldLabel>
        <input
          name="audioUrl"
          placeholder="Conversation audio URL"
          className="w-full rounded border p-2 font-body text-brand-dark"
        />
      </label>

      <p className="text-xs text-slate-500">
        Optional fallback: use a direct MP3 or M4A URL.
      </p>

      <label className="block">
        <FieldLabel>Vocabulary JSON</FieldLabel>
        <textarea
          name="vocabularyJson"
          placeholder='[{"vietnamese":"xin chào","english":"hello","vietnameseExample":"Xin chào, anh khỏe không?","englishExample":"Hello, how are you?"}]'
          className="min-h-32 w-full rounded border p-2 font-mono text-sm text-brand-dark"
        />
      </label>

      <p className="text-xs text-slate-500">
        {`Expected format: [{"vietnamese":"xin chào","english":"hello","vietnameseExample":"Xin chào, anh khỏe không?","englishExample":"Hello, how are you?"}]`}
      </p>

      <label className="block">
        <FieldLabel>Questions JSON</FieldLabel>
        <textarea
          name="questionsJson"
          placeholder='[{"question":"What is this conversation about?"}]'
          className="min-h-24 w-full rounded border p-2 font-mono text-sm text-brand-dark"
        />
      </label>

      <p className="text-xs text-slate-500">
        {`Expected format: [{"question":"What is this conversation about?"}]`}
      </p>

      <label className="block">
        <FieldLabel>Grammar JSON</FieldLabel>
        <textarea
          name="grammarJson"
          placeholder='[{"title":"Using có...không?","explanation":"This structure is used to form yes/no questions.","vietnameseExample":"Anh có khỏe không?","englishExample":"Are you well?"}]'
          className="min-h-32 w-full rounded border p-2 font-mono text-sm text-brand-dark"
        />
      </label>

      <p className="text-xs text-slate-500">
        {`Expected format: [{"title":"Using có...không?","explanation":"This structure is used to form yes/no questions.","vietnameseExample":"Anh có khỏe không?","englishExample":"Are you well?"}]`}
      </p>

      <label className="block">
        <FieldLabel>Practice links JSON</FieldLabel>
        <textarea
          name="exercisesJson"
          placeholder='[{"type":"practiceLink","title":"Numbers practice","description":"Practise Vietnamese numbers with interactive activities and games.","url":"https://wordwall.net/...","buttonText":"Open practice activities","note":"You may need to create a free Wordwall account to access the activities."}]'
          className="min-h-32 w-full rounded border p-2 font-mono text-sm text-brand-dark"
        />
      </label>

      <p className="text-xs text-slate-500">
        {t("practiceLinksExpectedFormat")}
      </p>

      <p className="text-xs text-slate-500">
        Add external practice activities here, for example Wordwall links. The
        note field can explain if the student needs a free account.
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
