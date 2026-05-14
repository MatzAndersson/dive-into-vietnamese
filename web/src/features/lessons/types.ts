export type LessonLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Lesson {
  id: number;
  title: string;
  description?: string | null;
  level: LessonLevel;
  imageUrl?: string | null;
  conversationJson?: string | null;
  audioUrl?: string | null;
  createdAt: string;
  explanation?: string | null;
  vocabularyJson?: string | null;
  questionsJson?: string | null;
}