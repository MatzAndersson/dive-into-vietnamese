using DiveIntoVietnamese.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public static class GetById
    {
        public static async Task<LessonDto?> HandleAsync(
            int id,
            AppDbContext db,
            CancellationToken ct)
        {
            return await db.Lessons
                .AsNoTracking()
                .Where(l => l.Id == id)
                .Select(LessonMapping.ToDtoExpression)
                .FirstOrDefaultAsync(ct);
        }
    }
}