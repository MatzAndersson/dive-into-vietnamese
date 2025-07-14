namespace VietLearn.Api.Features.Lessons
{
    public class Lesson
    {
        public int Id { get; set; }
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
