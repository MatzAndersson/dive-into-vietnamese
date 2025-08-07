namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public sealed record LessonDto(
        int Id,
        string Title,
        string? Description,
        DateTime CreatedAt
    );
}
