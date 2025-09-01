import { z } from "zod";
export const LessonSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  imageUrl: z.string().url().optional(),
  createdAt: z.string(),
});
export const LessonsSchema = z.array(LessonSchema);
