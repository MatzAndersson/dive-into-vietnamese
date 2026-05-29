using DiveIntoVietnamese.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public static class GetAll
    {
        public sealed record Query(
            [FromQuery] string? level,
            [FromQuery] string? q,
            [FromQuery] int skip = 0,
            [FromQuery] int take = 50
        );

        public static async Task<IReadOnlyList<LessonDto>> HandleAsync(
            Query request,
            AppDbContext db,
            CancellationToken ct)
        {
            IQueryable<Lesson> query = db.Lessons.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(request.q))
            {
                var q = request.q.Trim();
                var pattern = $"%{q}%";

                query = query.Where(l =>
                    EF.Functions.ILike(l.Title, pattern) ||
                    (l.Description != null &&
                     EF.Functions.ILike(l.Description, pattern)));
            }

            if (!string.IsNullOrWhiteSpace(request.level))
            {
                if (Enum.TryParse<LessonLevel>(request.level, true, out var lvl))
                {
                    query = query.Where(l => l.Level == lvl);
                }
                else if (int.TryParse(request.level, out var n) &&
                         Enum.IsDefined(typeof(LessonLevel), n))
                {
                    query = query.Where(l => (int)l.Level == n);
                }
            }

            return await query
                .OrderByDescending(l => l.CreatedAt)
                .Skip(Math.Max(request.skip, 0))
                .Take(Math.Clamp(request.take, 1, 200))
                .Select(LessonMapping.ToDtoExpression)
                .ToListAsync(ct);
        }
    }
}