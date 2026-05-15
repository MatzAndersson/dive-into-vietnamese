using AutoMapper;
using FluentValidation;
using MediatR;
using DiveIntoVietnamese.Api.Data;
using DiveIntoVietnamese.Api.Features.Behaviors;

namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public static class Update
    {
        public record UpdateLessonCommand(
            int Id,
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
            string? ExercisesJson
        ) : IRequest<LessonDto>, IRequireApiKey;

            public record UpdateLessonRequest(
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
            string? ExercisesJson
        );

        public class Validator : AbstractValidator<UpdateLessonCommand>
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

        public class Handler : IRequestHandler<UpdateLessonCommand, LessonDto>
        {
            private readonly AppDbContext _db;
            private readonly IMapper _mapper;

            public Handler(AppDbContext db, IMapper mapper)
            {
                _db = db;
                _mapper = mapper;
            }

            public async Task<LessonDto> Handle(UpdateLessonCommand request, CancellationToken ct)
            {
                var entity = await _db.Lessons.FindAsync(new object?[] { request.Id }, ct)
                             ?? throw new KeyNotFoundException($"Lesson {request.Id} not found");

                entity.Title = request.Title;
                entity.Description = request.Description;
                entity.Level = request.Level;
                entity.ImageUrl = request.ImageUrl;
                entity.Explanation = request.Explanation;
                entity.ConversationJson = request.ConversationJson;
                entity.AudioUrl = request.AudioUrl;
                entity.VocabularyJson = request.VocabularyJson;
                entity.QuestionsJson = request.QuestionsJson;
                entity.GrammarJson = request.GrammarJson;
                entity.ExercisesJson = request.ExercisesJson;

                await _db.SaveChangesAsync(ct);

                return _mapper.Map<LessonDto>(entity);
            }
        }
    }
}