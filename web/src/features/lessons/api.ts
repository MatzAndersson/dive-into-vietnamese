import { LessonsSchema, LessonSchema } from './schema';
import { API_KEY } from '../../env';

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
     'X-API-KEY': API_KEY ?? '' // Use the API key from environment variables  
     
    },
    body: JSON.stringify(input),
    
  });
  if (!r.ok) throw new Error(`${r.status}`);
  return LessonSchema.parse(await r.json());
  
}
