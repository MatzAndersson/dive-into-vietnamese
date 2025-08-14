import { z } from 'zod';
export const LessonSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional().default(''),
  createdAt: z.string(),
});
export const LessonsSchema = z.array(LessonSchema);
export type Lesson = z.infer<typeof LessonSchema>;
