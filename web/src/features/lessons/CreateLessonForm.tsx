import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useQueryClient } from '@tanstack/react-query';
import { createLesson } from './api';

type CreateResult = { ok: true } | { error: string };

async function createAction(
  _prev: CreateResult | null,
  fd: FormData
): Promise<CreateResult> {
  try {
    await createLesson({
      title: String(fd.get('title') ?? ''),
      description: String(fd.get('description') ?? ''),
    });
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Failed' };
  }
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button className="px-3 py-2 rounded bg-black text-white" disabled={pending}>
      {pending ? 'Saving…' : 'Save'}
    </button>
  );
}

export default function CreateLessonForm() {
  const qc = useQueryClient();

  // ⬇️ you were missing this destructure
  const [state, action] =
    useActionState<CreateResult | null, FormData>(createAction, null);

  // refresh list when state flips to { ok: true }
  useEffect(() => {
    if (state && 'ok' in state) {
      void qc.invalidateQueries({ queryKey: ['lessons'] });
    }
  }, [state, qc]);

  return (
    <form action={action} className="space-y-3">
      <input name="title" placeholder="Title" className="border p-2 w-full rounded" required />
      <textarea name="description" placeholder="Description" className="border p-2 w-full rounded" />
      <SubmitBtn />
      {state && 'error' in state && <p className="text-red-600">{state.error}</p>}
    </form>
  );
}
