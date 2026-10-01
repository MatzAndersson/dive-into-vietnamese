using DiveIntoVietnamese.Api.Domain;
using DiveIntoVietnamese.Api.Features.Lessons;
using FluentValidation.TestHelper;

namespace DiveIntoVietnamese.Tests.Features.Lessons;

public class LessonValidatorTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Create_RejectsMissingTitle(string? title)
    {
        var request = ValidCreateRequest() with { Title = title! };

        var result = new Create.Validator().TestValidate(request);

        result.ShouldHaveValidationErrorFor(x => x.Title)
            .WithErrorMessage("Title is required.")
            .Only();
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Update_RejectsMissingTitle(string? title)
    {
        var request = ValidUpdateRequest() with { Title = title! };

        var result = new Update.Validator().TestValidate(request);

        result.ShouldHaveValidationErrorFor(x => x.Title)
            .WithErrorMessage("Title is required.")
            .Only();
    }

    [Fact]
    public void Create_AcceptsNonEmptyTitle()
    {
        var result = new Create.Validator().TestValidate(ValidCreateRequest());

        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Update_AcceptsNonEmptyTitle()
    {
        var result = new Update.Validator().TestValidate(ValidUpdateRequest());

        result.ShouldNotHaveAnyValidationErrors();
    }

    [Theory]
    [InlineData(LessonLevel.Beginner)]
    [InlineData(LessonLevel.Intermediate)]
    [InlineData(LessonLevel.Advanced)]
    public void Create_AcceptsDefinedLessonLevel(LessonLevel level)
    {
        var request = ValidCreateRequest() with { Level = level };

        var result = new Create.Validator().TestValidate(request);

        result.ShouldNotHaveAnyValidationErrors();
    }

    [Theory]
    [InlineData(LessonLevel.Beginner)]
    [InlineData(LessonLevel.Intermediate)]
    [InlineData(LessonLevel.Advanced)]
    public void Update_AcceptsDefinedLessonLevel(LessonLevel level)
    {
        var request = ValidUpdateRequest() with { Level = level };

        var result = new Update.Validator().TestValidate(request);

        result.ShouldNotHaveAnyValidationErrors();
    }

    private static Create.Request ValidCreateRequest() => new(
        Title: "Xin chào",
        Description: null,
        Level: LessonLevel.Beginner,
        ImageUrl: null,
        Explanation: null,
        ConversationJson: null,
        AudioUrl: null,
        VocabularyJson: null,
        QuestionsJson: null,
        GrammarJson: null,
        ExercisesJson: null);

    private static Update.UpdateLessonRequest ValidUpdateRequest() => new(
        Title: "Xin chào",
        Description: null,
        Level: LessonLevel.Beginner,
        ImageUrl: null,
        Explanation: null,
        ConversationJson: null,
        AudioUrl: null,
        VocabularyJson: null,
        QuestionsJson: null,
        GrammarJson: null,
        ExercisesJson: null);
}
