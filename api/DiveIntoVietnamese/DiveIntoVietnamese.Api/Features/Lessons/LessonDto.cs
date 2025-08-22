namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public sealed record LessonDto(
        int Id,
        string Title,
        string? Description,
        LessonLevel Level,
        string? ImageUrl,
        DateTime CreatedAt
    );
}
