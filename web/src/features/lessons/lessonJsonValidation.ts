type VocabularyItem = {
  vietnamese: string;
  english: string;
  vietnameseExample: string;
  englishExample: string;
};

type ConversationLine = {
  speaker: string;
  vietnamese: string;
  english: string;
};

type QuestionItem = {
  question: string;
};

type GrammarItem = {
  title: string;
  explanation: string;
  vietnameseExample: string;
  englishExample: string;
};

type ExerciseItem = {
  type: string;
  instruction: string;
  prompt: string;
  answer: string;
};

export function validateVocabularyJson(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      throw new Error("Vocabulary JSON must be an array.");
    }

    const hasInvalidItem = parsed.some((item) => {
      if (typeof item !== "object" || item === null) {
        return true;
      }

      const vocabularyItem = item as Partial<VocabularyItem>;

      return (
        typeof vocabularyItem.vietnamese !== "string" ||
        typeof vocabularyItem.english !== "string" ||
        typeof vocabularyItem.vietnameseExample !== "string" ||
        typeof vocabularyItem.englishExample !== "string" ||
        !vocabularyItem.vietnamese.trim() ||
        !vocabularyItem.english.trim() ||
        !vocabularyItem.vietnameseExample.trim() ||
        !vocabularyItem.englishExample.trim()
      );
    });

    if (hasInvalidItem) {
      throw new Error(
        "Each vocabulary item must include vietnamese, english, vietnameseExample, and englishExample fields.",
      );
    }

    return value;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Invalid vocabulary JSON.");
  }
}

export function validateConversationJson(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      throw new Error("Conversation JSON must be an array.");
    }

    const hasInvalidLine = parsed.some((item) => {
      if (typeof item !== "object" || item === null) {
        return true;
      }

      const conversationLine = item as Partial<ConversationLine>;

      return (
        typeof conversationLine.speaker !== "string" ||
        typeof conversationLine.vietnamese !== "string" ||
        typeof conversationLine.english !== "string" ||
        !conversationLine.speaker.trim() ||
        !conversationLine.vietnamese.trim() ||
        !conversationLine.english.trim()
      );
    });

    if (hasInvalidLine) {
      throw new Error(
        "Each conversation line must include speaker, vietnamese, and english fields.",
      );
    }

    return value;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Invalid conversation JSON.");
  }
}
export function validateQuestionsJson(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      throw new Error("Questions JSON must be an array.");
    }

    const hasInvalidItem = parsed.some((item) => {
      if (typeof item !== "object" || item === null || Array.isArray(item)) {
        return true;
      }

      const questionItem = item as Partial<QuestionItem>;

      return (
        typeof questionItem.question !== "string" ||
        !questionItem.question.trim()
      );
    });

    if (hasInvalidItem) {
      throw new Error("Each question item must include a question field.");
    }

    return value;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Invalid questions JSON.");
  }
}
export function validateGrammarJson(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      throw new Error("Grammar JSON must be an array.");
    }

    const hasInvalidItem = parsed.some((item) => {
      if (typeof item !== "object" || item === null || Array.isArray(item)) {
        return true;
      }

      const grammarItem = item as Partial<GrammarItem>;

      return (
        typeof grammarItem.title !== "string" ||
        typeof grammarItem.explanation !== "string" ||
        typeof grammarItem.vietnameseExample !== "string" ||
        typeof grammarItem.englishExample !== "string" ||
        !grammarItem.title.trim() ||
        !grammarItem.explanation.trim() ||
        !grammarItem.vietnameseExample.trim() ||
        !grammarItem.englishExample.trim()
      );
    });

    if (hasInvalidItem) {
      throw new Error(
        "Each grammar item must include title, explanation, vietnameseExample, and englishExample fields.",
      );
    }

    return value;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Invalid grammar JSON.");
  }
}

export function validateExercisesJson(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      throw new Error("Exercises JSON must be an array.");
    }

    const hasInvalidItem = parsed.some((item) => {
      if (typeof item !== "object" || item === null || Array.isArray(item)) {
        return true;
      }

      const exerciseItem = item as Partial<ExerciseItem>;

      return (
        typeof exerciseItem.type !== "string" ||
        typeof exerciseItem.instruction !== "string" ||
        typeof exerciseItem.prompt !== "string" ||
        typeof exerciseItem.answer !== "string" ||
        !exerciseItem.type.trim() ||
        !exerciseItem.instruction.trim() ||
        !exerciseItem.prompt.trim() ||
        !exerciseItem.answer.trim()
      );
    });

    if (hasInvalidItem) {
      throw new Error(
        "Each exercise item must include type, instruction, prompt, and answer fields.",
      );
    }

    return value;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Invalid exercises JSON.");
  }
}
