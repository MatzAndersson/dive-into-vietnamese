using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using VietLearn.Api.Data;

namespace VietLearn.Api.Features.Auth
{

    // Command
    public record LoginCommand(string Username, string Password) : IRequest<LoginResult?>;

    // Result
    public record LoginResult(string Token);

    // Validator
    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            RuleFor(x => x.Username).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }

    // Handler
    public class LoginHandler : IRequestHandler<LoginCommand, LoginResult?>
    {
        private readonly AppDbContext _db;
        public LoginHandler(AppDbContext db) => _db = db;

        public async Task<LoginResult?> Handle(LoginCommand request, CancellationToken ct)
        {
            var user = await _db.Users.SingleOrDefaultAsync(
                u => u.Username == request.Username, ct);

            if (user is null) return null;

            var ok = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            return ok ? new LoginResult("dummy-jwt-token") : null;
        }
    }

}
