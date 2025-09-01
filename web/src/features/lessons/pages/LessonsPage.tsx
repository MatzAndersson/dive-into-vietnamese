import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import FilterBar from "../components/FilterBar";
import LessonCard from "../components/LessonCard";
import CreateLessonForm from "../CreateLessonForm";

import { listLessons, deleteLesson } from "../api";
import type { Lesson, LessonLevel } from "../types";

export default function LessonsPage() {
  const [sp] = useSearchParams();
  const q = sp.get("q") ?? undefined;

  // Only accept our known levels from the URL
  const level = useMemo<LessonLevel | undefined>(() => {
    const raw = sp.get("level");
    const allowed = ["Beginner", "Intermediate", "Advanced"] as const;
    return (allowed as readonly string[]).includes(raw ?? "")
      ? (raw as LessonLevel)
      : undefined;
  }, [sp]);

  // Fetch
  const qc = useQueryClient();
  const { data, isPending, error } = useQuery<Lesson[]>({
    queryKey: ["lessons", { q, level }],
    queryFn: () => listLessons({ q, level }),
  });

  // Optimistic delete
  const del = useMutation({
    mutationFn: (id: number) => deleteLesson(id),
    onMutate: async (id: number) => {
      const key = ["lessons", { q, level }];
      await qc.cancelQueries({ queryKey: key });
      const previous = qc.getQueryData<Lesson[]>(key);
      if (previous) qc.setQueryData<Lesson[]>(key, previous.filter(l => l.id !== id));
      return { previous, key };
    },
    onError: (err, _id, ctx) => {
      if (ctx?.previous) qc.setQueryData(ctx.key!, ctx.previous);
      alert((err as Error).message || "Delete failed");
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["lessons"] }),
  });

  return (
    <div className="space-y-4">
      {/* Optional: keep create on the same page */}
      <section className="rounded-xl border p-4">
        <h2 className="font-medium mb-2">Create</h2>
        <CreateLessonForm />
      </section>

      <FilterBar />

      {isPending && <div className="animate-pulse text-gray-500">Loading…</div>}

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
          {(error as Error).message || "Failed to load"}
        </div>
      )}

      {!isPending && (data?.length ?? 0) === 0 && (
        <div className="text-gray-600">No lessons found.</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map(l => (
          <LessonCard key={l.id} lesson={l} onDelete={id => del.mutateAsync(id)} />
        ))}
      </div>
    </div>
  );
}
