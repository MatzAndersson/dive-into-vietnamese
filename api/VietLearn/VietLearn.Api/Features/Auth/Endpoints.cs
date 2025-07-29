using MediatR;


namespace VietLearn.Api.Features.Auth
{
    public static class AuthEndpoints
    {
        public static void MapAuthEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapPost("/api/auth/login",
                async (LoginCommand command, IMediator mediator) =>
                {
                    var result = await mediator.Send(command);
                    return result is null ? Results.Unauthorized() : Results.Ok(result);
                })
                .WithName("Login")
                .WithTags("Auth")
                .WithOpenApi(op =>
                {
                    op.Summary = "Authenticate and get a dummy JWT token.";
                    op.Description = "POST username and password. Returns dummy JWT if login is correct.";
                    return op;
                });
        }
    }
}
