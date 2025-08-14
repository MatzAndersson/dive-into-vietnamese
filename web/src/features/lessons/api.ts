import { LessonsSchema, LessonSchema } from './schema';

export async function getLessons() {
  const r = await fetch('/api/lessons');
  if (!r.ok) throw new Error(`${r.status}`);
  return LessonsSchema.parse(await r.json());
}

export async function createLesson(input: { title: string; description?: string }) {
  const r = await fetch('/api/lessons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'X-API-KEY': import.meta.env.VITE_API_KEY ?? '' // uncomment if your POST is protected
    },
    body: JSON.stringify(input),
  });
  if (!r.ok) throw new Error(`${r.status}`);
  return LessonSchema.parse(await r.json());
}
