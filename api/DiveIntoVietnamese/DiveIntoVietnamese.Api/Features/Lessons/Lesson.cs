namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public class Lesson
    {
        public int Id { get; set; }
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public LessonLevel Level { get; set; } = LessonLevel.Beginner;
        public string? ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Explanation { get; set; }
        public string? ConversationJson { get; set; }
        public string? AudioUrl { get; set; }
        public string? VocabularyJson { get; set; }

    }
}
