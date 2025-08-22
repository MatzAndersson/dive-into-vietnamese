
using DiveIntoVietnamese.Api.Features.Lessons;
using Microsoft.EntityFrameworkCore;

namespace DiveIntoVietnamese.Api.Data;

public static class DevSeeder
{
    public static async Task SeedAsync(AppDbContext db)
    {
        if (await db.Set<Lesson>().AnyAsync()) return;

        var now = DateTime.UtcNow;
        db.AddRange(
            new Lesson { Title = "Xin chào", Description = "Say hello", Level = LessonLevel.Beginner, ImageUrl = "https://picsum.photos/seed/hello/640/360", CreatedAt = now },
            new Lesson { Title = "Cảm ơn", Description = "Say thanks", Level = LessonLevel.Beginner, ImageUrl = "https://picsum.photos/seed/thanks/640/360", CreatedAt = now },
            new Lesson { Title = "Bạn tên gì?", Description = "Asking someone's name", Level = LessonLevel.Beginner, ImageUrl = "https://picsum.photos/seed/name/640/360", CreatedAt = now },
            new Lesson { Title = "Tôi không hiểu", Description = "I don't understand", Level = LessonLevel.Intermediate, ImageUrl = "https://picsum.photos/seed/understand/640/360", CreatedAt = now },
            new Lesson { Title = "Nhà vệ sinh ở đâu?", Description = "Where is the toilet?", Level = LessonLevel.Intermediate, ImageUrl = "https://picsum.photos/seed/toilet/640/360", CreatedAt = now },
            new Lesson { Title = "Đặt món", Description = "Ordering food", Level = LessonLevel.Advanced, ImageUrl = "https://picsum.photos/seed/food/640/360", CreatedAt = now }
        );
        await db.SaveChangesAsync();
    }
}
