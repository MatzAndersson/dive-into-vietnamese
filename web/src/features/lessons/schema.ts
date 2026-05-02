import { z } from "zod";
export const LessonSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable().optional(),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  imageUrl: z.string().nullable().optional(),
  audioUrl: z.string().nullable().optional(),
  createdAt: z.string(),
  explanation: z.string().nullable().optional(),
});
export const LessonsSchema = z.array(LessonSchema);
