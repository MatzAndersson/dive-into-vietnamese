import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import FilterBar from "../components/FilterBar";
import LessonCard from "../components/LessonCard";
import CreateLessonForm from "../CreateLessonForm";
import { listLessons, deleteLesson, updateLesson } from "../api";
import { validateConversationJson, validateVocabularyJson, validateQuestionsJson, validateGrammarJson, validateExercisesJson, } from "../lessonJsonValidation";
const emptyToUndefined = (value) => {
    const text = String(value ?? "").trim();
    return text.length > 0 ? text : undefined;
};
function FieldLabel({ children }) {
    return (_jsx("span", { className: "mb-1 block font-heading text-sm font-semibold text-brand-blue", children: children }));
}
export default function AdminLessonsPage() {
    const { t } = useTranslation();
    const [editingLesson, setEditingLesson] = useState(null);
    const [sp] = useSearchParams();
    const q = sp.get("q") ?? undefined;
    const { level: levelParam } = useParams();
    // Only accept our known levels from the URL
    const level = useMemo(() => {
        const allowedFromPath = {
            beginner: "Beginner",
            intermediate: "Intermediate",
            advanced: "Advanced",
        };
        if (levelParam) {
            return allowedFromPath[levelParam.toLowerCase()];
        }
        const raw = sp.get("level");
        const allowedFromQuery = ["Beginner", "Intermediate", "Advanced"];
        return allowedFromQuery.includes(raw ?? "")
            ? raw
            : undefined;
    }, [levelParam, sp]);
    // Fetch
    const qc = useQueryClient();
    const lessonsQueryKey = ["lessons", { q, level }];
    const { data: lessons = [], isPending, error, } = useQuery({
        queryKey: lessonsQueryKey,
        queryFn: () => listLessons({ q, level }),
    });
    const update = useMutation({
        mutationFn: async (fd) => {
            if (!editingLesson) {
                throw new Error("No lesson selected for editing.");
            }
            return updateLesson(editingLesson.id, {
                title: String(fd.get("title") ?? "").trim(),
                description: emptyToUndefined(fd.get("description")),
                level: String(fd.get("level") ?? "Beginner"),
                imageUrl: emptyToUndefined(fd.get("imageUrl")),
                explanation: emptyToUndefined(fd.get("explanation")),
                conversationJson: validateConversationJson(emptyToUndefined(fd.get("conversationJson"))),
                audioUrl: emptyToUndefined(fd.get("audioUrl")),
                vocabularyJson: validateVocabularyJson(emptyToUndefined(fd.get("vocabularyJson"))),
                questionsJson: validateQuestionsJson(emptyToUndefined(fd.get("questionsJson"))),
                grammarJson: validateGrammarJson(emptyToUndefined(fd.get("grammarJson"))),
                exercisesJson: validateExercisesJson(emptyToUndefined(fd.get("exercisesJson"))),
            });
        },
        onSuccess: () => {
            setEditingLesson(null);
            void qc.invalidateQueries({ queryKey: ["lessons"] });
        },
        onError: (err) => {
            alert(err.message || "Failed to update lesson");
        },
    });
    // Optimistic delete
    const del = useMutation({
        mutationFn: (id) => deleteLesson(id),
        onMutate: async (id) => {
            const key = lessonsQueryKey;
            await qc.cancelQueries({ queryKey: key });
            const previous = qc.getQueryData(key);
            if (previous)
                qc.setQueryData(key, previous.filter((l) => l.id !== id));
            return { previous, key };
        },
        onError: (err, _id, ctx) => {
            if (ctx?.previous)
                qc.setQueryData(ctx.key, ctx.previous);
            alert(err.message || t("deleteFailed"));
        },
        onSettled: () => qc.invalidateQueries({ queryKey: ["lessons"] }),
    });
    const pageTitle = level
        ? t("lessonsForLevel", { level: t(level.toLowerCase()) })
        : t("allLessons");
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("section", { className: "rounded-xl border p-4", children: [_jsx("h2", { className: "mb-2 font-heading text-xl font-bold text-brand-blue", children: t("create") }), _jsx(CreateLessonForm, {})] }), editingLesson && (_jsx("div", { className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4", children: _jsxs("section", { className: "mt-10 w-full max-w-3xl rounded-xl bg-white p-4 shadow-xl", children: [_jsx("div", { className: "mb-3", children: _jsx("h2", { className: "font-heading text-xl font-bold text-brand-blue", children: t("editLesson") }) }), _jsxs("form", { className: "space-y-3", onSubmit: (e) => {
                                e.preventDefault();
                                update.mutate(new FormData(e.currentTarget));
                            }, children: [_jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Lesson title" }), _jsx("input", { name: "title", defaultValue: editingLesson.title, className: "w-full rounded border p-2 font-body text-brand-dark", required: true })] }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Description" }), _jsx("textarea", { name: "description", defaultValue: editingLesson.description ?? "", className: "w-full rounded border p-2 font-body text-brand-dark" })] }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Level" }), _jsxs("select", { name: "level", defaultValue: editingLesson.level, className: "w-full rounded border p-2 font-body text-brand-dark", children: [_jsx("option", { value: "Beginner", children: t("beginner") }), _jsx("option", { value: "Intermediate", children: t("intermediate") }), _jsx("option", { value: "Advanced", children: t("advanced") })] })] }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Image URL" }), _jsx("input", { name: "imageUrl", defaultValue: editingLesson.imageUrl ?? "", placeholder: "Image URL", className: "w-full rounded border p-2 font-body text-brand-dark" })] }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Explanation" }), _jsx("textarea", { name: "explanation", defaultValue: editingLesson.explanation ?? "", placeholder: "Explanation", className: "min-h-28 w-full rounded border p-2 font-body text-brand-dark" })] }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Conversation JSON" }), _jsx("textarea", { name: "conversationJson", defaultValue: editingLesson.conversationJson ?? "", placeholder: '[{"speaker":"Mai","vietnamese":"Xin ch\u00E0o anh.","english":"Hello."}]', className: "min-h-32 w-full rounded border p-2 font-mono text-sm text-brand-dark" })] }), _jsx("p", { className: "text-xs text-slate-500", children: `Expected format: [{"speaker":"Mai","vietnamese":"Xin chào anh.","english":"Hello."}]` }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Conversation audio URL" }), _jsx("input", { name: "audioUrl", defaultValue: editingLesson.audioUrl ?? "", placeholder: "Conversation audio URL", className: "w-full rounded border p-2 font-body text-brand-dark" })] }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Vocabulary JSON" }), _jsx("textarea", { name: "vocabularyJson", defaultValue: editingLesson.vocabularyJson ?? "", placeholder: '[{"vietnamese":"xin ch\u00E0o","english":"hello","vietnameseExample":"Xin ch\u00E0o, anh kh\u1ECFe kh\u00F4ng?","englishExample":"Hello, how are you?"}]', className: "min-h-32 w-full rounded border p-2 font-mono text-sm text-brand-dark" })] }), _jsx("p", { className: "text-xs text-slate-500", children: `Expected format: [{"vietnamese":"xin chào","english":"hello","vietnameseExample":"Xin chào, anh khỏe không?","englishExample":"Hello, how are you?"}]` }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Questions JSON" }), _jsx("textarea", { name: "questionsJson", defaultValue: editingLesson.questionsJson ?? "", placeholder: '[{"question":"What is this conversation about?"}]', className: "min-h-24 w-full rounded border p-2 font-mono text-sm text-brand-dark" })] }), _jsx("p", { className: "text-xs text-slate-500", children: `Expected format: [{"question":"What is this conversation about?"}]` }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Grammar JSON" }), _jsx("textarea", { name: "grammarJson", defaultValue: editingLesson.grammarJson ?? "", placeholder: '[{"title":"Using c\u00F3...kh\u00F4ng?","explanation":"This structure is used to form yes/no questions.","vietnameseExample":"Anh c\u00F3 kh\u1ECFe kh\u00F4ng?","englishExample":"Are you well?"}]', className: "min-h-32 w-full rounded border p-2 font-mono text-sm text-brand-dark" })] }), _jsx("p", { className: "text-xs text-slate-500", children: `Expected format: [{"title":"Using có...không?","explanation":"This structure is used to form yes/no questions.","vietnameseExample":"Anh có khỏe không?","englishExample":"Are you well?"}]` }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Practice links JSON" }), _jsx("textarea", { name: "exercisesJson", defaultValue: editingLesson.exercisesJson ?? "", placeholder: '[{"type":"practiceLink","title":"Numbers practice","description":"Practise Vietnamese numbers with interactive activities and games.","url":"https://wordwall.net/...","buttonText":"Open practice activities","note":"You may need to create a free Wordwall account to access the activities."}]', className: "min-h-32 w-full rounded border p-2 font-mono text-sm text-brand-dark" })] }), _jsx("p", { className: "text-xs text-slate-500", children: "Add external practice activities here, for example Wordwall links. The note field can explain if the student needs a free account." }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { type: "submit", disabled: update.isPending, className: "cursor-pointer rounded bg-brand-orange px-3 py-2 font-heading font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50", children: update.isPending ? t("saving") : t("saveChanges") }), _jsx("button", { type: "button", disabled: update.isPending, className: "cursor-pointer rounded border px-3 py-2 text-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50", onClick: () => setEditingLesson(null), children: t("cancel") })] })] }, editingLesson.id)] }) })), _jsxs("header", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: pageTitle }), _jsx("p", { className: "mt-2 text-slate-600", children: t("chooseLesson") })] }), _jsx(FilterBar, {}), isPending && (_jsx("div", { className: "animate-pulse text-gray-500", children: t("loading") })), error && (_jsx("div", { className: "p-3 rounded-xl bg-red-50 border border-red-200 text-red-700", children: error.message || t("failedToLoad") })), !isPending && lessons.length === 0 && (_jsx("div", { className: "text-gray-600", children: t("noLessonsFound") })), _jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: lessons.map((l) => (_jsx(LessonCard, { lesson: l, actions: _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { type: "button", className: "flex-1 cursor-pointer rounded border px-3 py-2 text-sm hover:bg-slate-50", onClick: () => setEditingLesson(l), children: t("edit") }), _jsx("button", { type: "button", disabled: del.isPending, className: "flex-1 cursor-pointer rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50", onClick: () => {
                                    if (!confirm(t("deleteLessonConfirm", { title: l.title }))) {
                                        return;
                                    }
                                    void del.mutateAsync(l.id);
                                }, children: del.isPending ? "..." : t("delete") })] }) }, l.id))) })] }));
}
