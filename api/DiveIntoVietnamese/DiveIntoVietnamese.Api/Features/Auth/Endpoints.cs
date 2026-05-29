using DiveIntoVietnamese.Api.Data;
using DiveIntoVietnamese.Api.Filters;

namespace DiveIntoVietnamese.Api.Features.Auth
{
    public static class AuthEndpoints
    {
        public static void MapAuthEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapPost("/api/auth/login",
                async (
                    Login.LoginRequest request,
                    AppDbContext db,
                    CancellationToken ct) =>
                {
                    var result = await Login.HandleAsync(request, db, ct);

                    return result is null
                        ? Results.Unauthorized()
                        : Results.Ok(result);
                })
                .AddEndpointFilter<ValidationFilter<Login.LoginRequest>>()
                .WithName("Login")
                .WithTags("Auth")
                .WithOpenApi(op =>
                {
                    op.Summary = "Authenticate and get a dummy JWT token.";
                    op.Description = "POST username and password. Returns dummy JWT if login is correct.";
                    return op;
                });

            app.MapPost("/api/auth/register",
                async (
                    Register.RegisterRequest request,
                    AppDbContext db,
                    CancellationToken ct) =>
                {
                    var registrationSucceeded = await Register.HandleAsync(
                        request,
                        db,
                        ct);

                    return registrationSucceeded
                        ? Results.Ok()
                        : Results.BadRequest("Username already exists");
                })
                .AddEndpointFilter<ValidationFilter<Register.RegisterRequest>>()
                .WithName("Register")
                .WithTags("Auth")
                .WithOpenApi(op =>
                {
                    op.Summary = "Create a new user account.";
                    op.Description = "Username must be unique. Password is stored as a BCrypt hash.";
                    return op;
                });
        }
    }
}