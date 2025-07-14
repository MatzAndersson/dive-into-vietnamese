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
                new Lesson { Id = 2, Title = "Cảm ơn", Description = "Say thanks" }
            );
        }
    }


}
