using Microsoft.EntityFrameworkCore;
using VietLearn.Api.Features.Lessons;

namespace VietLearn.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Lesson> Lessons => Set<Lesson>();
    }
}
