using System.Linq.Expressions;

namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public static class LessonMapping
    {
        public static readonly Expression<Func<Lesson, LessonDto>> ToDtoExpression =
            lesson => new LessonDto(
                lesson.Id,
                lesson.Title,
                lesson.Description,
                lesson.Level,
                lesson.ImageUrl,
                lesson.CreatedAt,
                lesson.Explanation,
                lesson.ConversationJson,
                lesson.AudioUrl,
                lesson.VocabularyJson,
                lesson.QuestionsJson,
                lesson.GrammarJson,
                lesson.ExercisesJson
            );

        public static LessonDto ToDto(Lesson lesson)
        {
            return new LessonDto(
                lesson.Id,
                lesson.Title,
                lesson.Description,
                lesson.Level,
                lesson.ImageUrl,
                lesson.CreatedAt,
                lesson.Explanation,
                lesson.ConversationJson,
                lesson.AudioUrl,
                lesson.VocabularyJson,
                lesson.QuestionsJson,
                lesson.GrammarJson,
                lesson.ExercisesJson
            );
        }
    }
}