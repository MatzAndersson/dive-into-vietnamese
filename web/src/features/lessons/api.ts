import { api } from "@/lib/api";
import { LessonsSchema, LessonSchema } from "./schema";
import type { LessonLevel } from "./types";

type CreateLessonInput = {
  title: string;
  description?: string;
  level?: LessonLevel;
  imageUrl?: string;
  explanation?: string;
  conversationJson?: string;
  audioUrl?: string;
  vocabularyJson?: string;
};

type UpdateLessonInput = {
  title: string;
  description?: string;
  level: LessonLevel;
  imageUrl?: string;
  explanation?: string;
  conversationJson?: string;
  audioUrl?: string;
  vocabularyJson?: string;
};

export async function listLessons(params: { level?: LessonLevel; q?: string }) {
  const qs = new URLSearchParams();

  if (params.level) qs.set("level", params.level);
  if (params.q?.trim()) qs.set("q", params.q.trim());

  const suffix = qs.toString() ? `?${qs}` : "";
  const data = await api.get<unknown>(`/api/lessons${suffix}`);

  return LessonsSchema.parse(data);
}

export async function getLessonById(id: number) {
  const data = await api.get<unknown>(`/api/lessons/${id}`);

  return LessonSchema.parse(data);
}

export async function createLesson(input: CreateLessonInput) {
  const data = await api.post<unknown>("/api/lessons", input);

  return LessonSchema.parse(data);
}

export async function updateLesson(id: number, input: UpdateLessonInput) {
  const data = await api.put<unknown>(`/api/lessons/${id}`, input);

  return LessonSchema.parse(data);
}

export async function deleteLesson(id: number) {
  await api.del(`/api/lessons/${id}`);
}