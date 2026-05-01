import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLessonById } from "../api";

export default function LessonDetailPage() {
  const { id } = useParams();
  const lessonId = Number(id);

  const { data, isPending, error } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => getLessonById(lessonId),
    enabled: Number.isFinite(lessonId),
  });
  if (!Number.isFinite(lessonId)) {
    return <div className="p-4 text-red-700">Invalid lesson id.</div>;
  }

  return (
    <div className="space-y-4">
      <Link to="/lessons" className="text-sm underline">
        Back to lessons
      </Link>

      {isPending && <div className="text-gray-500">Loading...</div>}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {(error as Error).message || "Failed to load lesson"}
        </div>
      )}

      {data && (
        <div className="rounded-xl border p-4 space-y-3">
          <h1 className="text-2xl font-bold">{data.title}</h1>

          <div className="text-sm text-gray-500">{data.level}</div>

          {data.description && (
            <p className="text-gray-700">{data.description}</p>
          )}

          {data.imageUrl && (
            <img
              src={data.imageUrl}
              alt=""
              className="w-full max-w-2xl rounded-xl border"
            />
          )}
        </div>
      )}
    </div>
  );
}
