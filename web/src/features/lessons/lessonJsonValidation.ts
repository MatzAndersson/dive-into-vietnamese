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