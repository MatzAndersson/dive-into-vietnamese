using AutoMapper;
using FluentValidation;
using MediatR;
using DiveIntoVietnamese.Api.Data;
using DiveIntoVietnamese.Api.Features.Behaviors;


namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public static class Create
    {
        // ❶ request (shape matches POST body)
        public record CreateLessonCommand(string Title, 
            string? Description,
            LessonLevel Level, 
            string? ImageUrl, 
            string? Explanation,
            string? ConversationJson,
            string? AudioUrl, 
            string? VocabularyJson,
            string? QuestionsJson,
            string? GrammarJson,
            string? ExercisesJson)
            : IRequest<LessonDto>, IRequireApiKey;

        // ❷ validation rules
        public class Validator : AbstractValidator<CreateLessonCommand>
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
                    .WithMessage("Exercises JSON must be a valid JSON array where each item includes type, instruction, prompt, and answer.");
            }
        }

        // ❸ handler
        public class Handler : IRequestHandler<CreateLessonCommand, LessonDto>
        {
            private readonly AppDbContext _db;
            private readonly IMapper _map;

            public Handler(AppDbContext db, IMapper map)
            {
                _db = db;
                _map = map;
            }

            public async Task<LessonDto> Handle(CreateLessonCommand cmd, CancellationToken ct)
            {
                var entity = _map.Map<Lesson>(cmd);   // Map title/desc → entity
                _db.Lessons.Add(entity);
                await _db.SaveChangesAsync(ct);

                return _map.Map<LessonDto>(entity);
            }
        }
    }
}
