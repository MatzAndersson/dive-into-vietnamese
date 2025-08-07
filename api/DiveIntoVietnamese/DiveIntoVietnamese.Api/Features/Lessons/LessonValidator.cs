using FluentValidation;

namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public class LessonValidator : AbstractValidator<Create.CreateLessonCommand>
    {
        public LessonValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(500);
        }
    }
}
