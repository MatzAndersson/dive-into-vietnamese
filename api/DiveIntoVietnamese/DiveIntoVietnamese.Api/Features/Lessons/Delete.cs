using MediatR;
using DiveIntoVietnamese.Api.Data;
using DiveIntoVietnamese.Api.Features.Behaviors;

public static class Delete
{
    public record DeleteLessonCommand(int Id) : IRequest<bool>, IRequireApiKey;

    public class Handler : IRequestHandler<DeleteLessonCommand, bool>
    {
        private readonly AppDbContext _db;
        public Handler(AppDbContext db) => _db = db;

        public async Task<bool> Handle(DeleteLessonCommand request, CancellationToken ct)
        {
            var entity = await _db.Lessons.FindAsync(request.Id, ct);
            if (entity == null)
                return false;

            _db.Lessons.Remove(entity);
            await _db.SaveChangesAsync(ct);
            return true;
        }
    }
}
