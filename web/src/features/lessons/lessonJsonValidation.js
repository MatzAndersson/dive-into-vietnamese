export function validateVocabularyJson(value) {
    if (!value) {
        return undefined;
    }
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) {
            throw new Error("Vocabulary JSON must be an array.");
        }
        const hasInvalidItem = parsed.some((item) => {
            if (typeof item !== "object" || item === null) {
                return true;
            }
            const vocabularyItem = item;
            return (typeof vocabularyItem.vietnamese !== "string" ||
                typeof vocabularyItem.english !== "string" ||
                typeof vocabularyItem.vietnameseExample !== "string" ||
                typeof vocabularyItem.englishExample !== "string" ||
                !vocabularyItem.vietnamese.trim() ||
                !vocabularyItem.english.trim() ||
                !vocabularyItem.vietnameseExample.trim() ||
                !vocabularyItem.englishExample.trim());
        });
        if (hasInvalidItem) {
            throw new Error("Each vocabulary item must include vietnamese, english, vietnameseExample, and englishExample fields.");
        }
        return value;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Invalid vocabulary JSON.");
    }
}
export function validateConversationJson(value) {
    if (!value) {
        return undefined;
    }
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) {
            throw new Error("Conversation JSON must be an array.");
        }
        const hasInvalidLine = parsed.some((item) => {
            if (typeof item !== "object" || item === null) {
                return true;
            }
            const conversationLine = item;
            return (typeof conversationLine.speaker !== "string" ||
                typeof conversationLine.vietnamese !== "string" ||
                typeof conversationLine.english !== "string" ||
                !conversationLine.speaker.trim() ||
                !conversationLine.vietnamese.trim() ||
                !conversationLine.english.trim());
        });
        if (hasInvalidLine) {
            throw new Error("Each conversation line must include speaker, vietnamese, and english fields.");
        }
        return value;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Invalid conversation JSON.");
    }
}
export function validateQuestionsJson(value) {
    if (!value) {
        return undefined;
    }
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) {
            throw new Error("Questions JSON must be an array.");
        }
        const hasInvalidItem = parsed.some((item) => {
            if (typeof item !== "object" || item === null || Array.isArray(item)) {
                return true;
            }
            const questionItem = item;
            return (typeof questionItem.question !== "string" ||
                !questionItem.question.trim());
        });
        if (hasInvalidItem) {
            throw new Error("Each question item must include a question field.");
        }
        return value;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Invalid questions JSON.");
    }
}
export function validateGrammarJson(value) {
    if (!value) {
        return undefined;
    }
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) {
            throw new Error("Grammar JSON must be an array.");
        }
        const hasInvalidItem = parsed.some((item) => {
            if (typeof item !== "object" || item === null || Array.isArray(item)) {
                return true;
            }
            const grammarItem = item;
            return (typeof grammarItem.title !== "string" ||
                typeof grammarItem.explanation !== "string" ||
                typeof grammarItem.vietnameseExample !== "string" ||
                typeof grammarItem.englishExample !== "string" ||
                !grammarItem.title.trim() ||
                !grammarItem.explanation.trim() ||
                !grammarItem.vietnameseExample.trim() ||
                !grammarItem.englishExample.trim());
        });
        if (hasInvalidItem) {
            throw new Error("Each grammar item must include title, explanation, vietnameseExample, and englishExample fields.");
        }
        return value;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Invalid grammar JSON.");
    }
}
export function validateExercisesJson(value) {
    if (!value) {
        return undefined;
    }
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) {
            throw new Error("Exercises JSON must be an array.");
        }
        const hasInvalidItem = parsed.some((item) => {
            if (typeof item !== "object" || item === null || Array.isArray(item)) {
                return true;
            }
            const exerciseItem = item;
            if (exerciseItem.type !== "practiceLink" ||
                typeof exerciseItem.title !== "string" ||
                typeof exerciseItem.description !== "string" ||
                typeof exerciseItem.url !== "string" ||
                typeof exerciseItem.buttonText !== "string" ||
                !exerciseItem.title.trim() ||
                !exerciseItem.description.trim() ||
                !exerciseItem.url.trim() ||
                !exerciseItem.buttonText.trim()) {
                return true;
            }
            if (exerciseItem.note !== undefined &&
                typeof exerciseItem.note !== "string") {
                return true;
            }
            try {
                new URL(exerciseItem.url);
            }
            catch {
                return true;
            }
            return false;
        });
        if (hasInvalidItem) {
            throw new Error("Each practice item must include type, title, description, url, and buttonText. Type must be practiceLink.");
        }
        return value;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Invalid exercises JSON.");
    }
}
