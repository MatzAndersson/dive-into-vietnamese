using AutoMapper;
using FluentValidation;
using MediatR;
using VietLearn.Api.Data;
using VietLearn.Api.Features.Lessons;

public static class Update
{
    public record UpdateLessonCommand(int Id, string Title, string? Description) : IRequest<LessonDto>;

    public class Validator : AbstractValidator<UpdateLessonCommand>
    {
        public Validator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
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

            await _db.SaveChangesAsync(ct);
            return _mapper.Map<LessonDto>(entity);
        }
    }
}

