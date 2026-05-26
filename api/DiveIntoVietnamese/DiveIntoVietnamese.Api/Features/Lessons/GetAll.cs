
using DiveIntoVietnamese.Api.Data;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public static class GetAll
    {
        /// <summary>Request message (no parameters)</summary>
        /// <summary>Request with optional filtering</summary>
        public sealed record Query(
            [FromQuery] string? level,
            [FromQuery] string? q,
            [FromQuery] int skip = 0,
            [FromQuery] int take = 50
        ) : IRequest<IReadOnlyList<LessonDto>>;

        /// <summary>Handler executes the query</summary>
        public sealed class Handler : IRequestHandler<Query, IReadOnlyList<LessonDto>>
        {
            private readonly AppDbContext _db;

            public Handler(AppDbContext db)
            {
                _db = db;
            }

            public async Task<IReadOnlyList<LessonDto>> Handle(Query request, CancellationToken ct)
            {
                IQueryable<Lesson> query = _db.Lessons.AsNoTracking();

                // ✅ Case-insensitive search via PostgreSQL ILIKE
                if (!string.IsNullOrWhiteSpace(request.q))
                {
                    var q = request.q.Trim();
                    var pattern = $"%{q}%";
                    query = query.Where(l =>
                        EF.Functions.ILike(l.Title, pattern) ||
                        (l.Description != null && EF.Functions.ILike(l.Description!, pattern)));
                }

                // Level filter (accepts "Beginner" or "1")
                if (!string.IsNullOrWhiteSpace(request.level))
                {
                    if (Enum.TryParse<LessonLevel>(request.level, true, out var lvl))
                        query = query.Where(l => l.Level == lvl);
                    else if (int.TryParse(request.level, out var n) && Enum.IsDefined(typeof(LessonLevel), n))
                        query = query.Where(l => (int)l.Level == n);
                }

                var items = await query
                    .OrderByDescending(l => l.CreatedAt)
                    .Skip(Math.Max(request.skip, 0))
                    .Take(Math.Clamp(request.take, 1, 200))
                    .Select(LessonMapping.ToDtoExpression)
                    .ToListAsync(ct);

                return items;
            }
        }
    }
}
