using System.Text.Json;

namespace DiveIntoVietnamese.Api.Features.Lessons
{
    internal static class LessonValidationRules
    {
        public const int TitleMaxLength = 120;
        public const int DescriptionMaxLength = 300;
        public const int UrlMaxLength = 1000;
        public const int ExplanationMaxLength = 5000;
        public const int StructuredJsonMaxLength = 20000;

        public static bool BeValidConversationJson(string? json)
        {
            if (string.IsNullOrWhiteSpace(json))
            {
                return true;
            }

            try
            {
                using var document = JsonDocument.Parse(json);

                if (document.RootElement.ValueKind != JsonValueKind.Array)
                {
                    return false;
                }

                foreach (var item in document.RootElement.EnumerateArray())
                {
                    if (item.ValueKind != JsonValueKind.Object)
                    {
                        return false;
                    }

                    if (!HasNonEmptyStringProperty(item, "speaker"))
                    {
                        return false;
                    }

                    if (!HasNonEmptyStringProperty(item, "vietnamese"))
                    {
                        return false;
                    }

                    if (!HasNonEmptyStringProperty(item, "english"))
                    {
                        return false;
                    }
                }

                return true;
            }
            catch (JsonException)
            {
                return false;
            }
        }

        public static bool BeValidVocabularyJson(string? json)
        {
            if (string.IsNullOrWhiteSpace(json))
            {
                return true;
            }

            try
            {
                using var document = JsonDocument.Parse(json);

                if (document.RootElement.ValueKind != JsonValueKind.Array)
                {
                    return false;
                }

                foreach (var item in document.RootElement.EnumerateArray())
                {
                    if (item.ValueKind != JsonValueKind.Object)
                    {
                        return false;
                    }

                    if (!HasNonEmptyStringProperty(item, "vietnamese"))
                    {
                        return false;
                    }

                    if (!HasNonEmptyStringProperty(item, "english"))
                    {
                        return false;
                    }

                    if (!HasNonEmptyStringProperty(item, "vietnameseExample"))
                    {
                        return false;
                    }

                    if (!HasNonEmptyStringProperty(item, "englishExample"))
                    {
                        return false;
                    }
                }

                return true;
            }
            catch (JsonException)
            {
                return false;
            }
        }

        public static bool BeValidQuestionsJson(string? json)
        {
            if (string.IsNullOrWhiteSpace(json))
            {
                return true;
            }

            try
            {
                using var document = JsonDocument.Parse(json);

                if (document.RootElement.ValueKind != JsonValueKind.Array)
                {
                    return false;
                }

                foreach (var item in document.RootElement.EnumerateArray())
                {
                    if (item.ValueKind != JsonValueKind.Object)
                    {
                        return false;
                    }

                    if (!HasNonEmptyStringProperty(item, "question"))
                    {
                        return false;
                    }
                }

                return true;
            }
            catch (JsonException)
            {
                return false;
            }
        }

        private static bool HasNonEmptyStringProperty(JsonElement item, string propertyName)
        {
            return item.TryGetProperty(propertyName, out var property)
                   && property.ValueKind == JsonValueKind.String
                   && !string.IsNullOrWhiteSpace(property.GetString());
        }
    }
}