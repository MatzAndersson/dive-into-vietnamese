using DiveIntoVietnamese.Api.Features.Lessons;
using DiveIntoVietnamese.Api.Features.Users;
using Microsoft.EntityFrameworkCore;

namespace DiveIntoVietnamese.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Lesson> Lessons => Set<Lesson>();

        public DbSet<User> Users => Set<User>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // PostgreSQL: store UTC server time
            modelBuilder.Entity<Lesson>()
                .Property(l => l.CreatedAt)
                .HasDefaultValueSql("timezone('utc', now())");

            modelBuilder.Entity<User>()
    .Property(u => u.CreatedAt)
    .HasDefaultValueSql("timezone('utc', now())");

            modelBuilder.Entity<Lesson>().HasData(
                new Lesson { Id = 1, Title = "Xin chào", Description = "Say hello", CreatedAt = new DateTime(2025, 07, 25, 0, 0, 0, DateTimeKind.Utc) },
                new Lesson { Id = 2, Title = "Cảm ơn", Description = "Say thanks", CreatedAt = new DateTime(2025, 07, 25, 0, 0, 0, DateTimeKind.Utc) },
                new Lesson { Id = 3, Title = "Bạn tên gì?", Description = "Asking someone's name", CreatedAt = new DateTime(2025, 07, 25, 0, 0, 0, DateTimeKind.Utc) },
                new Lesson { Id = 4, Title = "Tôi không hiểu", Description = "I don't understand", CreatedAt = new DateTime(2025, 07, 25, 0, 0, 0, DateTimeKind.Utc) },
                new Lesson { Id = 5, Title = "Nhà vệ sinh ở đâu?", Description = "Where is the toilet?", CreatedAt = new DateTime(2025, 07, 25, 0, 0, 0, DateTimeKind.Utc) }
            );
        }
    }


}
