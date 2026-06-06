using DiveIntoVietnamese.Api.Features.Auth;
using DiveIntoVietnamese.Api.Features.Lessons;
using DiveIntoVietnamese.Api.Features.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DiveIntoVietnamese.Api.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Lesson> Lessons => Set<Lesson>();

        // Temporary: keep old prototype users until dummy auth endpoints are removed/replaced.
        public DbSet<User> PrototypeUsers => Set<User>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // PostgreSQL: store UTC server time
            modelBuilder.Entity<Lesson>()
                .Property(l => l.CreatedAt)
                .HasDefaultValueSql("timezone('utc', now())");

            // Ensure valid default for enum (Beginner = 1)
            modelBuilder.Entity<Lesson>()
                .Property(l => l.Level)
                .HasDefaultValue(LessonLevel.Beginner);

            modelBuilder.Entity<User>()
                .Property(u => u.CreatedAt)
                .HasDefaultValueSql("timezone('utc', now())");

            modelBuilder.Entity<ApplicationUser>()
                .Property(u => u.CreatedAt)
                .HasDefaultValueSql("timezone('utc', now())");
        }
    }
}