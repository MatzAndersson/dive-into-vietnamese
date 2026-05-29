using DiveIntoVietnamese.Api.Data;

namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public static class Delete
    {
        public static async Task<bool> HandleAsync(
            int id,
            AppDbContext db,
            CancellationToken ct)
        {
            var entity = await db.Lessons.FindAsync(new object?[] { id }, ct);

            if (entity is null)
            {
                return false;
            }

            db.Lessons.Remove(entity);
            await db.SaveChangesAsync(ct);

            return true;
        }
    }
}