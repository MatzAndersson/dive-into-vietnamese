import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLessonById } from "../api";
function parseVocabulary(vocabularyJson) {
    if (!vocabularyJson) {
        return [];
    }
    try {
        const parsed = JSON.parse(vocabularyJson);
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed.filter((item) => typeof item.vietnamese === "string" && typeof item.english === "string");
    }
    catch {
        return [];
    }
}
function parseQuestions(json) {
    if (!json?.trim()) {
        return [];
    }
    try {
        const parsed = JSON.parse(json);
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed.filter((item) => typeof item === "object" &&
            item !== null &&
            !Array.isArray(item) &&
            typeof item.question === "string" &&
            Boolean(item.question?.trim()));
    }
    catch {
        return [];
    }
}
function parseGrammar(json) {
    if (!json?.trim()) {
        return [];
    }
    try {
        const parsed = JSON.parse(json);
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed.filter((item) => typeof item === "object" &&
            item !== null &&
            !Array.isArray(item) &&
            typeof item.title === "string" &&
            typeof item.explanation === "string" &&
            typeof item.vietnameseExample === "string" &&
            typeof item.englishExample === "string");
    }
    catch {
        return [];
    }
}
function parseExercises(json) {
    if (!json?.trim()) {
        return [];
    }
    try {
        const parsed = JSON.parse(json);
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed.filter((item) => typeof item === "object" &&
            item !== null &&
            !Array.isArray(item) &&
            item.type === "practiceLink" &&
            typeof item.title === "string" &&
            typeof item.description === "string" &&
            typeof item.url === "string" &&
            typeof item.buttonText === "string" &&
            Boolean(item.title?.trim()) &&
            Boolean(item.description?.trim()) &&
            Boolean(item.url?.trim()) &&
            Boolean(item.buttonText?.trim()) &&
            (item.note === undefined ||
                typeof item.note === "string"));
    }
    catch {
        return [];
    }
}
export default function LessonDetailPage() {
    const { id } = useParams();
    const lessonId = Number(id);
    const [showEnglish, setShowEnglish] = useState(true);
    const { data: lesson, isPending, error, } = useQuery({
        queryKey: ["lesson", lessonId],
        queryFn: () => getLessonById(lessonId),
        enabled: Number.isFinite(lessonId),
    });
    const conversationLines = useMemo(() => {
        if (!lesson?.conversationJson) {
            return [];
        }
        try {
            const parsed = JSON.parse(lesson.conversationJson);
            if (!Array.isArray(parsed)) {
                return [];
            }
            return parsed.filter((item) => typeof item === "object" &&
                item !== null &&
                typeof item.speaker === "string" &&
                typeof item.vietnamese === "string" &&
                typeof item.english === "string");
        }
        catch {
            return [];
        }
    }, [lesson?.conversationJson]);
    const vocabularyItems = parseVocabulary(lesson?.vocabularyJson);
    const questions = parseQuestions(lesson?.questionsJson);
    const grammarItems = parseGrammar(lesson?.grammarJson);
    const exerciseItems = parseExercises(lesson?.exercisesJson);
    if (!Number.isFinite(lessonId)) {
        return (_jsx("div", { className: "mx-auto max-w-4xl p-6", children: _jsx("div", { className: "rounded-xl border border-red-200 bg-red-50 p-4 text-red-700", children: "Invalid lesson id." }) }));
    }
    return (_jsxs("div", { className: "mx-auto max-w-4xl space-y-6 p-6", children: [_jsx(Link, { to: "/lessons", className: "inline-flex cursor-pointer items-center text-sm text-gray-600 transition hover:text-black hover:underline", children: "\u2190 Back to lessons" }), isPending && (_jsx("div", { className: "rounded-xl border bg-white p-6 text-gray-500 shadow-sm", children: "Loading lesson..." })), error && (_jsx("div", { className: "rounded-xl border border-red-200 bg-red-50 p-4 text-red-700", children: error.message || "Failed to load lesson" })), lesson && (_jsxs(_Fragment, { children: [_jsx("section", { className: "overflow-hidden rounded-2xl border bg-white shadow-sm", children: _jsxs("div", { className: "relative min-h-[320px]", children: [lesson.imageUrl ? (_jsx("img", { src: lesson.imageUrl, alt: "", className: "absolute inset-0 h-full w-full object-cover" })) : (_jsx("div", { className: "absolute inset-0 bg-slate-900" })), _jsx("div", { className: "absolute inset-0 bg-black/50" }), _jsx("div", { className: "relative flex min-h-[320px] flex-col justify-end p-6 text-white sm:p-8", children: _jsxs("div", { className: "max-w-2xl space-y-3", children: [_jsx("div", { className: "flex flex-wrap items-center gap-2", children: _jsx("span", { className: "rounded-full border border-white/30 bg-white/15 px-3 py-1 text-sm", children: lesson.level }) }), _jsx("h1", { className: "font-heading text-3xl font-bold tracking-tight text-brand-orange sm:text-4xl", children: lesson.title }), lesson.description && (_jsx("p", { className: "max-w-xl font-body text-base leading-7 text-white/90", children: lesson.description }))] }) })] }) }), _jsxs("section", { className: "rounded-2xl border bg-white p-6 shadow-sm", children: [_jsx("h2", { className: "mb-3 font-heading text-xl font-semibold text-brand-blue", children: "Explanation" }), lesson.explanation ? (_jsx("p", { className: "font-body leading-7 text-brand-dark", children: lesson.explanation })) : (_jsx("p", { className: "font-body leading-7 text-brand-dark/70 italic", children: "No explanation has been added for this lesson yet." }))] }), _jsxs("section", { className: "rounded-2xl border bg-white p-6 shadow-sm", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between gap-3", children: [_jsx("h2", { className: "mb-3 font-heading text-xl font-semibold text-brand-blue", children: "Conversation" }), _jsx("button", { type: "button", onClick: () => setShowEnglish((current) => !current), className: "cursor-pointer rounded border px-3 py-2 text-sm hover:bg-slate-50", children: showEnglish ? "English On" : "English Off" })] }), lesson.audioUrl && (_jsx("audio", { controls: true, src: lesson.audioUrl, className: "mb-4 w-full", children: "Your browser does not support the audio element." })), conversationLines.length > 0 ? (_jsx("div", { className: "overflow-hidden rounded-xl border", children: conversationLines.map((line, index) => (_jsxs("div", { className: "grid grid-cols-[120px_1fr] border-b last:border-b-0", children: [_jsx("div", { className: "border-r bg-slate-50 p-3 font-semibold text-gray-900", children: line.speaker }), _jsxs("div", { className: "p-3", children: [_jsx("p", { className: "text-lg leading-8 text-gray-900", children: line.vietnamese }), showEnglish && (_jsx("p", { className: "mt-1 text-sm leading-6 text-gray-600", children: line.english }))] })] }, `${line.speaker}-${index}`))) })) : (_jsx("p", { className: "font-body leading-7 text-brand-dark/70 italic", children: "No conversation has been added for this lesson yet." }))] }), _jsxs("section", { className: "rounded-2xl border bg-white p-6 shadow-sm", children: [_jsx("h2", { className: "mb-4 font-heading text-xl font-semibold text-brand-blue", children: "Vocabulary" }), vocabularyItems.length > 0 ? (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full min-w-[720px] border-collapse text-left text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b bg-brand-light text-brand-blue", children: [_jsx("th", { className: "p-3 font-semibold", children: "Vietnamese" }), _jsx("th", { className: "p-3 font-semibold", children: "English" }), _jsx("th", { className: "p-3 font-semibold", children: "Example sentence" }), _jsx("th", { className: "p-3 font-semibold", children: "Translation" })] }) }), _jsx("tbody", { children: vocabularyItems.map((item, index) => (_jsxs("tr", { className: "border-b last:border-b-0", children: [_jsxs("td", { className: "p-3 font-heading font-bold text-brand-orange", children: [item.vietnamese, item.audioUrl && (_jsx("audio", { controls: true, src: item.audioUrl, className: "mt-2 w-full", children: "Your browser does not support the audio element." }))] }), _jsx("td", { className: "p-3 font-body font-semibold text-brand-blue", children: item.english }), _jsx("td", { className: "p-3 font-body text-brand-dark", children: item.vietnameseExample || "—" }), _jsx("td", { className: "p-3 font-body text-brand-blue", children: item.englishExample || "—" })] }, `${item.vietnamese}-${index}`))) })] }) })) : (_jsx("p", { className: "font-body leading-7 text-brand-dark/70 italic", children: "No vocabulary has been added for this lesson yet." }))] }), _jsxs("section", { className: "rounded-2xl border bg-white p-6 shadow-sm", children: [_jsx("h2", { className: "mb-3 font-heading text-xl font-semibold text-brand-blue", children: "Questions" }), questions.length > 0 ? (_jsx("ol", { className: "list-decimal space-y-2 pl-5", children: questions.map((item, index) => (_jsx("li", { className: "text-slate-700", children: item.question }, `${item.question}-${index}`))) })) : (_jsx("p", { className: "font-body leading-7 text-brand-dark/70 italic", children: "No questions have been added for this lesson yet." }))] }), _jsxs("section", { className: "rounded-2xl border bg-white p-6 shadow-sm", children: [_jsx("h2", { className: "mb-4 font-heading text-xl font-semibold text-brand-blue", children: "Grammar" }), grammarItems.length > 0 ? (_jsx("div", { className: "space-y-4", children: grammarItems.map((item, index) => (_jsxs("article", { className: "rounded-xl border bg-slate-50 p-4", children: [_jsxs("h3", { className: "font-semibold text-gray-900", children: [index + 1, ". ", item.title] }), _jsx("p", { className: "mt-2 leading-7 text-gray-700", children: item.explanation }), _jsxs("div", { className: "mt-3 rounded-lg bg-white p-3", children: [_jsx("p", { className: "mt-3 font-body text-lg font-bold text-brand-orange", children: item.vietnameseExample }), _jsx("p", { className: "mt-1 text-sm text-gray-600", children: item.englishExample })] })] }, `${item.title}-${index}`))) })) : (_jsx("p", { className: "font-body leading-7 text-brand-dark/70 italic", children: "No grammar notes have been added for this lesson yet." }))] }), _jsxs("section", { className: "rounded-2xl border bg-white p-6 shadow-sm", children: [_jsx("h2", { className: "mb-4 font-heading text-xl font-semibold text-brand-blue", children: "Practice" }), exerciseItems.length > 0 ? (_jsx("div", { className: "space-y-4", children: exerciseItems.map((item, index) => (_jsxs("article", { className: "rounded-xl border bg-white p-4 shadow-sm", children: [_jsx("h3", { className: "font-heading text-lg font-bold text-brand-blue", children: item.title }), _jsx("p", { className: "mt-2 font-body text-brand-dark", children: item.description }), _jsx("a", { href: item.url, target: "_blank", rel: "noopener noreferrer", className: "mt-3 inline-block rounded-xl bg-brand-orange px-4 py-2 font-heading font-bold text-white transition hover:opacity-90", children: item.buttonText }), item.note && (_jsx("p", { className: "mt-2 font-body text-sm text-brand-dark/80", children: item.note }))] }, `${item.type}-${item.title}-${index}`))) })) : (_jsx("p", { className: "font-body italic leading-7 text-brand-dark/70", children: "No practice activities have been added for this lesson yet." }))] })] }))] }));
}
