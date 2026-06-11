import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { createLesson } from "./api";
import { validateVocabularyJson, validateConversationJson, validateQuestionsJson, validateGrammarJson, validateExercisesJson, } from "./lessonJsonValidation";
const emptyToUndefined = (value) => {
    const text = String(value ?? "").trim();
    return text.length > 0 ? text : undefined;
};
async function createAction(_prev, fd) {
    try {
        await createLesson({
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
        return { ok: true };
    }
    catch (e) {
        return { error: e instanceof Error ? e.message : "Failed" };
    }
}
function FieldLabel({ children }) {
    return (_jsx("span", { className: "mb-1 block font-heading text-sm font-semibold text-brand-blue", children: children }));
}
function SubmitBtn() {
    const { t } = useTranslation();
    const { pending } = useFormStatus();
    return (_jsx("button", { type: "submit", className: "cursor-pointer rounded bg-brand-orange px-3 py-2 font-heading font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50", disabled: pending, children: pending ? t("saving") : t("save") }));
}
export default function CreateLessonForm() {
    const { t } = useTranslation();
    const qc = useQueryClient();
    const [state, action] = useActionState(createAction, null);
    useEffect(() => {
        if (state && "ok" in state) {
            void qc.invalidateQueries({ queryKey: ["lessons"] });
        }
    }, [state, qc]);
    return (_jsxs("form", { action: action, className: "space-y-3", children: [_jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Lesson title" }), _jsx("input", { name: "title", placeholder: t("title"), className: "w-full rounded border p-2 font-body text-brand-dark", required: true })] }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Description" }), _jsx("textarea", { name: "description", placeholder: t("description"), className: "w-full rounded border p-2 font-body text-brand-dark" })] }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Level" }), _jsxs("select", { name: "level", defaultValue: "Beginner", className: "w-full rounded border p-2 font-body text-brand-dark", children: [_jsx("option", { value: "Beginner", children: t("beginner") }), _jsx("option", { value: "Intermediate", children: t("intermediate") }), _jsx("option", { value: "Advanced", children: t("advanced") })] })] }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Image URL" }), _jsx("input", { name: "imageUrl", placeholder: "Image URL", className: "w-full rounded border p-2 font-body text-brand-dark" })] }), _jsx("p", { className: "text-xs text-slate-500", children: "Use a direct image URL ending in .jpg, .png, or .webp." }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Explanation" }), _jsx("textarea", { name: "explanation", placeholder: "Explanation", className: "min-h-28 w-full rounded border p-2 font-body text-brand-dark" })] }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Conversation JSON" }), _jsx("textarea", { name: "conversationJson", placeholder: '[{"speaker":"Mai","vietnamese":"Xin ch\u00E0o anh.","english":"Hello."}]', className: "min-h-32 w-full rounded border p-2 font-mono text-sm text-brand-dark" })] }), _jsx("p", { className: "text-xs text-slate-500", children: `Expected format: [{"speaker":"Mai","vietnamese":"Xin chào anh.","english":"Hello."}]` }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Conversation audio URL" }), _jsx("input", { name: "audioUrl", placeholder: "Conversation audio URL", className: "w-full rounded border p-2 font-body text-brand-dark" })] }), _jsx("p", { className: "text-xs text-slate-500", children: "Use a direct audio URL ending in .mp3, .wav, or .ogg." }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Vocabulary JSON" }), _jsx("textarea", { name: "vocabularyJson", placeholder: '[{"vietnamese":"xin ch\u00E0o","english":"hello","vietnameseExample":"Xin ch\u00E0o, anh kh\u1ECFe kh\u00F4ng?","englishExample":"Hello, how are you?"}]', className: "min-h-32 w-full rounded border p-2 font-mono text-sm text-brand-dark" })] }), _jsx("p", { className: "text-xs text-slate-500", children: `Expected format: [{"vietnamese":"xin chào","english":"hello","vietnameseExample":"Xin chào, anh khỏe không?","englishExample":"Hello, how are you?"}]` }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Questions JSON" }), _jsx("textarea", { name: "questionsJson", placeholder: '[{"question":"What is this conversation about?"}]', className: "min-h-24 w-full rounded border p-2 font-mono text-sm text-brand-dark" })] }), _jsx("p", { className: "text-xs text-slate-500", children: `Expected format: [{"question":"What is this conversation about?"}]` }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Grammar JSON" }), _jsx("textarea", { name: "grammarJson", placeholder: '[{"title":"Using c\u00F3...kh\u00F4ng?","explanation":"This structure is used to form yes/no questions.","vietnameseExample":"Anh c\u00F3 kh\u1ECFe kh\u00F4ng?","englishExample":"Are you well?"}]', className: "min-h-32 w-full rounded border p-2 font-mono text-sm text-brand-dark" })] }), _jsx("p", { className: "text-xs text-slate-500", children: `Expected format: [{"title":"Using có...không?","explanation":"This structure is used to form yes/no questions.","vietnameseExample":"Anh có khỏe không?","englishExample":"Are you well?"}]` }), _jsxs("label", { className: "block", children: [_jsx(FieldLabel, { children: "Practice links JSON" }), _jsx("textarea", { name: "exercisesJson", placeholder: '[{"type":"practiceLink","title":"Numbers practice","description":"Practise Vietnamese numbers with interactive activities and games.","url":"https://wordwall.net/...","buttonText":"Open practice activities","note":"You may need to create a free Wordwall account to access the activities."}]', className: "min-h-32 w-full rounded border p-2 font-mono text-sm text-brand-dark" })] }), _jsx("p", { className: "text-xs text-slate-500", children: "Add external practice activities here, for example Wordwall links. The note field can explain if the student needs a free account." }), _jsx(SubmitBtn, {}), state && "error" in state && (_jsx("p", { className: "text-red-600", children: state.error })), state && "ok" in state && (_jsx("p", { className: "text-green-700", children: "Lesson created." }))] }));
}
