using DiveIntoVietnamese.Api.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace DiveIntoVietnamese.Api.Features.Auth
{
    public static class Login
    {
        public record LoginRequest(string Username, string Password);

        public record LoginResult(string Token);

        public class Validator : AbstractValidator<LoginRequest>
        {
            public Validator()
            {
                RuleFor(x => x.Username)
                    .NotEmpty();

                RuleFor(x => x.Password)
                    .NotEmpty();
            }
        }

        public static async Task<LoginResult?> HandleAsync(
            LoginRequest request,
            AppDbContext db,
            CancellationToken ct)
        {
            var user = await db.Users.SingleOrDefaultAsync(
                user => user.Username == request.Username,
                ct);

            if (user is null)
            {
                return null;
            }

            var passwordIsValid = BCrypt.Net.BCrypt.Verify(
                request.Password,
                user.PasswordHash);

            return passwordIsValid
                ? new LoginResult("dummy-jwt-token")
                : null;
        }
    }
}