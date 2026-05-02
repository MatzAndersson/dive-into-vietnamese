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
        public record CreateLessonCommand(string Title, string? Description, LessonLevel Level, string? ImageUrl, string? Explanation, string? AudioUrl)
            : IRequest<LessonDto>, IRequireApiKey;

        // ❷ validation rules
        public class Validator : AbstractValidator<CreateLessonCommand>
        {
            public Validator()
            {
                RuleFor(x => x.Title)
                    .NotEmpty()
                    .MaximumLength(200);

                RuleFor(x => x.Description).MaximumLength(500);

                RuleFor(x => x.ImageUrl).MaximumLength(1000);

                RuleFor(x => x.Explanation).MaximumLength(2000);

                RuleFor(x => x.AudioUrl).MaximumLength(1000);

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
