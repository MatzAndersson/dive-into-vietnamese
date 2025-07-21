using Microsoft.EntityFrameworkCore;
using VietLearn.Api.Features.Lessons;

namespace VietLearn.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Lesson> Lessons => Set<Lesson>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // PostgreSQL: store UTC server time
            modelBuilder.Entity<Lesson>()
                .Property(l => l.CreatedAt)
                .HasDefaultValueSql("timezone('utc', now())");

            modelBuilder.Entity<Lesson>().HasData(
                new Lesson { Id = 1, Title = "Xin chào", Description = "Say hello" },
                new Lesson { Id = 2, Title = "Cảm ơn", Description = "Say thanks" },
                new Lesson { Id = 3, Title = "Bạn tên gì?", Description = "Asking someone's name" },
                new Lesson { Id = 4, Title = "Tôi không hiểu", Description = "I don't understand" },
                new Lesson { Id = 5, Title = "Nhà vệ sinh ở đâu?", Description = "Where is the toilet?" }
            );
        }
    }


}
