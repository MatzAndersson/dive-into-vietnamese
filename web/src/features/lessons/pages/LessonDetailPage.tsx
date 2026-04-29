import { Link, useParams } from "react-router-dom";

export default function LessonDetailPage() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <Link to="/lessons" className="text-sm underline">
        Back to lessons
      </Link>

      <div className="rounded-xl border p-4">
        <h1 className="text-2xl font-bold">Lesson {id}</h1>
        <p className="text-gray-600">Lesson detail page shell</p>
      </div>
    </div>
  );
}