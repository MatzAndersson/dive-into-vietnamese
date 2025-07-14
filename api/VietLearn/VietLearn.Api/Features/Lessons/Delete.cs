using MediatR;
using VietLearn.Api.Data;

public static class Delete
{
    public record DeleteLessonCommand(int Id) : IRequest<Unit>;

    public class Handler : IRequestHandler<DeleteLessonCommand, Unit>
    {
        private readonly AppDbContext _db;
        public Handler(AppDbContext db) => _db = db;

        public async Task<Unit> Handle(DeleteLessonCommand request, CancellationToken ct)
        {
            var entity = await _db.Lessons.FindAsync(new object?[] { request.Id }, ct)
                         ?? throw new KeyNotFoundException($"Lesson {request.Id} not found");

            _db.Lessons.Remove(entity);
            await _db.SaveChangesAsync(ct);
            return Unit.Value;
        }
    }
}
