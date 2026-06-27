using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace DiveIntoVietnamese.Api.Features.Auth;

public static class SessionEndpoints
{
    public static IEndpointRouteBuilder MapSessionEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/auth")
            .WithTags("Auth");

        group.MapGet("/me", async (
            ClaimsPrincipal user,
            UserManager<ApplicationUser> userManager) =>
        {
            if (user.Identity?.IsAuthenticated != true)
            {
                return Results.Ok(AuthMeResponse.Anonymous());
            }

            var applicationUser = await userManager.GetUserAsync(user);

            if (applicationUser is null)
            {
                return Results.Ok(AuthMeResponse.Anonymous());
            }

            var roles = await userManager.GetRolesAsync(applicationUser);

            var canManageLessons =
                roles.Contains("Admin") ||
                roles.Contains("Teacher");

            return Results.Ok(new AuthMeResponse(
                IsAuthenticated: true,
                Email: applicationUser.Email,
                Roles: roles,
                CanManageLessons: canManageLessons));
        })
        .AllowAnonymous();

        return app;
    }
}

public sealed record AuthMeResponse(
    bool IsAuthenticated,
    string? Email,
    IList<string> Roles,
    bool CanManageLessons)
{
    public static AuthMeResponse Anonymous()
    {
        return new AuthMeResponse(
            IsAuthenticated: false,
            Email: null,
            Roles: [],
            CanManageLessons: false);
    }
}