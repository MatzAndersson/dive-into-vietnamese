using DiveIntoVietnamese.Api.Data;
using DiveIntoVietnamese.Api.Features.Users;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace DiveIntoVietnamese.Api.Features.Auth
{
    public static class Register
    {
        public record RegisterRequest(
            string Username,
            string Email,
            string Password);

        public class Validator : AbstractValidator<RegisterRequest>
        {
            public Validator()
            {
                RuleFor(x => x.Username)
                    .NotEmpty()
                    .MinimumLength(3);

                RuleFor(x => x.Email)
                    .EmailAddress();

                RuleFor(x => x.Password)
                    .MinimumLength(6);
            }
        }

        public static async Task<bool> HandleAsync(
            RegisterRequest request,
            AppDbContext db,
            CancellationToken ct)
        {
            var usernameAlreadyExists = await db.Users.AnyAsync(
                user => user.Username == request.Username,
                ct);

            if (usernameAlreadyExists)
            {
                return false;
            }

            var user = new User
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                CreatedAt = DateTime.UtcNow
            };

            db.Users.Add(user);
            await db.SaveChangesAsync(ct);

            return true;
        }
    }
}