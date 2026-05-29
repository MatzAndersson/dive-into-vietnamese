using FluentValidation;

namespace DiveIntoVietnamese.Api.Filters
{
    public sealed class ValidationFilter<T> : IEndpointFilter
        where T : class
    {
        private readonly IValidator<T> _validator;

        public ValidationFilter(IValidator<T> validator)
        {
            _validator = validator;
        }

        public async ValueTask<object?> InvokeAsync(
            EndpointFilterInvocationContext context,
            EndpointFilterDelegate next)
        {
            var request = context.Arguments.OfType<T>().FirstOrDefault();

            if (request is null)
            {
                return Results.BadRequest("Request body is missing or invalid.");
            }

            var validationResult = await _validator.ValidateAsync(
                request,
                context.HttpContext.RequestAborted);

            if (!validationResult.IsValid)
            {
                var errors = validationResult.Errors
                    .GroupBy(error => error.PropertyName)
                    .ToDictionary(
                        group => group.Key,
                        group => group.Select(error => error.ErrorMessage).ToArray());

                return Results.ValidationProblem(errors);
            }

            return await next(context);
        }
    }
}