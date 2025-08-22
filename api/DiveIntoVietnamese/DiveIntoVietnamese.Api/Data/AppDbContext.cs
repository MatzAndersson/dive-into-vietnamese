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


        }
    }


}
