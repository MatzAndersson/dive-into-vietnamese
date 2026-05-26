
using DiveIntoVietnamese.Api.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public static class GetById
    {
        public sealed record Query(int Id) : IRequest<LessonDto?>;

        public sealed class Handler : IRequestHandler<Query, LessonDto?>
        {
            private readonly AppDbContext _db;

            public Handler(AppDbContext db)
            {
                _db = db;
            }

            public async Task<LessonDto?> Handle(Query request, CancellationToken ct)
            {
                var item = await _db.Lessons
                    .AsNoTracking()
                    .Where(l => l.Id == request.Id)
                    .Select(LessonMapping.ToDtoExpression)
                    .FirstOrDefaultAsync(ct);

                return item;
            }
        }
    }
}