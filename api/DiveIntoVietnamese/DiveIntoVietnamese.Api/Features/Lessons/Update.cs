using AutoMapper;
using FluentValidation;
using MediatR;
using DiveIntoVietnamese.Api.Data;
using DiveIntoVietnamese.Api.Features.Behaviors;
using DiveIntoVietnamese.Api.Features.Lessons;

public static class Update
{
    public record UpdateLessonCommand(
        int Id, 
        string Title, 
        string? Description, 
        LessonLevel Level, 
        string? ImageUrl, 
        string? Explanation, 
        string? AudioUrl,
        string? VocabularyJson
        ) : IRequest<LessonDto>, IRequireApiKey;

    public class Validator : AbstractValidator<UpdateLessonCommand>
    {
        public Validator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().MaximumLength(100);

            RuleFor(x => x.Description)
                .MaximumLength(500);

            RuleFor(x => x.ImageUrl)
                .MaximumLength(500);

            RuleFor(x => x.AudioUrl)
                .MaximumLength(500);

            RuleFor(x => x.Explanation)
                .MaximumLength(4000);

            RuleFor(x => x.VocabularyJson)
                .MaximumLength(8000);
        }
    }

    public class Handler : IRequestHandler<UpdateLessonCommand, LessonDto>
    {
        private readonly AppDbContext _db;
        private readonly IMapper _mapper;
        public Handler(AppDbContext db, IMapper mapper)
            => (_db, _mapper) = (db, mapper);

        public async Task<LessonDto> Handle(UpdateLessonCommand request, CancellationToken ct)
        {
            var entity = await _db.Lessons.FindAsync(new object?[] { request.Id }, ct)
                         ?? throw new KeyNotFoundException($"Lesson {request.Id} not found");

            entity.Title = request.Title;
            entity.Description = request.Description;
            entity.Level = request.Level;
            entity.ImageUrl = request.ImageUrl;
            entity.Explanation = request.Explanation;
            entity.AudioUrl = request.AudioUrl;
            entity.VocabularyJson = request.VocabularyJson;

            await _db.SaveChangesAsync(ct);
            return _mapper.Map<LessonDto>(entity);
        }
    }
}

