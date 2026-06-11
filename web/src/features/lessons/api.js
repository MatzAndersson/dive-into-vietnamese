import { api } from "@/lib/api";
import { LessonsSchema, LessonSchema } from "./schema";
export async function listLessons(params) {
    const qs = new URLSearchParams();
    if (params.level)
        qs.set("level", params.level);
    if (params.q?.trim())
        qs.set("q", params.q.trim());
    const suffix = qs.toString() ? `?${qs}` : "";
    const data = await api.get(`/api/lessons${suffix}`);
    return LessonsSchema.parse(data);
}
export async function getLessonById(id) {
    const data = await api.get(`/api/lessons/${id}`);
    return LessonSchema.parse(data);
}
export async function createLesson(input) {
    const data = await api.post("/api/lessons", input);
    return LessonSchema.parse(data);
}
export async function updateLesson(id, input) {
    const data = await api.put(`/api/lessons/${id}`, input);
    return LessonSchema.parse(data);
}
export async function deleteLesson(id) {
    await api.del(`/api/lessons/${id}`);
}
