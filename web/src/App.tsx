import { useQuery } from '@tanstack/react-query';
import { listLessons } from './features/lessons/api';
import CreateLessonForm from './features/lessons/CreateLessonForm';
import type { Lesson } from './features/lessons/types';

export default function App() {
  const { data, isPending, error } = useQuery<Lesson[]>({
    queryKey: ['lessons'],
    queryFn: () => listLessons({}), // <- call the new API
  });

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Lessons</h1>

      <section className="rounded-xl border p-4">
        <h2 className="font-medium mb-2">Create</h2>
        <CreateLessonForm />
      </section>

      <section className="space-y-3">
        {isPending && <div>Loading…</div>}
        {error && <div className="text-red-600">Failed to load</div>}

        {(data ?? []).map((l) => (
          <div key={l.id} className="rounded-xl border p-4">
            <div className="font-medium">{l.title}</div>
            <div className="text-sm opacity-70">{l.description}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
