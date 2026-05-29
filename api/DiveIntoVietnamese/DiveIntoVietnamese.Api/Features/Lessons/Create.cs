using FluentValidation;
using DiveIntoVietnamese.Api.Data;

namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public static class Create
    {
        public record Request(
            string Title,
            string? Description,
            LessonLevel Level,
            string? ImageUrl,
            string? Explanation,
            string? ConversationJson,
            string? AudioUrl,
            string? VocabularyJson,
            string? QuestionsJson,
            string? GrammarJson,
            string? ExercisesJson);

        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(x => x.Title)
                    .NotEmpty()
                    .WithMessage("Title is required.")
                    .MaximumLength(LessonValidationRules.TitleMaxLength)
                    .WithMessage($"Title cannot be longer than {LessonValidationRules.TitleMaxLength} characters.");

                RuleFor(x => x.Description)
                    .MaximumLength(LessonValidationRules.DescriptionMaxLength)
                    .WithMessage($"Description cannot be longer than {LessonValidationRules.DescriptionMaxLength} characters.");

                RuleFor(x => x.ImageUrl)
                    .MaximumLength(LessonValidationRules.UrlMaxLength)
                    .WithMessage($"Image URL cannot be longer than {LessonValidationRules.UrlMaxLength} characters.");

                RuleFor(x => x.Explanation)
                    .MaximumLength(LessonValidationRules.ExplanationMaxLength)
                    .WithMessage($"Explanation cannot be longer than {LessonValidationRules.ExplanationMaxLength} characters.");

                RuleFor(x => x.ConversationJson)
                    .MaximumLength(LessonValidationRules.StructuredJsonMaxLength)
                    .WithMessage($"Conversation JSON cannot be longer than {LessonValidationRules.StructuredJsonMaxLength} characters.")
                    .Must(LessonValidationRules.BeValidConversationJson)
                    .WithMessage("Conversation JSON must be a valid JSON array where each item includes speaker, vietnamese, and english.");

                RuleFor(x => x.AudioUrl)
                    .MaximumLength(LessonValidationRules.UrlMaxLength)
                    .WithMessage($"Audio URL cannot be longer than {LessonValidationRules.UrlMaxLength} characters.");

                RuleFor(x => x.VocabularyJson)
                    .MaximumLength(LessonValidationRules.StructuredJsonMaxLength)
                    .WithMessage($"Vocabulary JSON cannot be longer than {LessonValidationRules.StructuredJsonMaxLength} characters.")
                    .Must(LessonValidationRules.BeValidVocabularyJson)
                    .WithMessage("Vocabulary JSON must be a valid JSON array where each item includes vietnamese, english, vietnameseExample, and englishExample.");

                RuleFor(x => x.QuestionsJson)
                    .MaximumLength(LessonValidationRules.StructuredJsonMaxLength)
                    .WithMessage($"Questions JSON cannot be longer than {LessonValidationRules.StructuredJsonMaxLength} characters.")
                    .Must(LessonValidationRules.BeValidQuestionsJson)
                    .WithMessage("Questions JSON must be a valid JSON array where each item includes question.");

                RuleFor(x => x.GrammarJson)
                    .MaximumLength(LessonValidationRules.StructuredJsonMaxLength)
                    .WithMessage($"Grammar JSON cannot be longer than {LessonValidationRules.StructuredJsonMaxLength} characters.")
                    .Must(LessonValidationRules.BeValidGrammarJson)
                    .WithMessage("Grammar JSON must be a valid JSON array where each item includes title, explanation, vietnameseExample, and englishExample.");

                RuleFor(x => x.ExercisesJson)
                    .MaximumLength(LessonValidationRules.StructuredJsonMaxLength)
                    .WithMessage($"Exercises JSON cannot be longer than {LessonValidationRules.StructuredJsonMaxLength} characters.")
                    .Must(LessonValidationRules.BeValidExercisesJson)
                    .WithMessage("Exercises JSON must be a valid JSON array where each practice item includes type, title, description, url, and buttonText. Type must be practiceLink.");
            }
        }

        public static async Task<LessonDto> HandleAsync(
            Request request,
            AppDbContext db,
            CancellationToken ct)
        {
            var entity = new Lesson
            {
                Title = request.Title,
                Description = request.Description,
                Level = request.Level,
                ImageUrl = request.ImageUrl,
                Explanation = request.Explanation,
                ConversationJson = request.ConversationJson,
                AudioUrl = request.AudioUrl,
                VocabularyJson = request.VocabularyJson,
                QuestionsJson = request.QuestionsJson,
                GrammarJson = request.GrammarJson,
                ExercisesJson = request.ExercisesJson
            };

            db.Lessons.Add(entity);
            await db.SaveChangesAsync(ct);

            return LessonMapping.ToDto(entity);
        }
    }
}