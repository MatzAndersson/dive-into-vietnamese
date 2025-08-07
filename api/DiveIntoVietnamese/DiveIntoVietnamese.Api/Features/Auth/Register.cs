using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using DiveIntoVietnamese.Api.Data;
using DiveIntoVietnamese.Api.Features.Users;

namespace DiveIntoVietnamese.Api.Features.Auth
{


    /// <summary>Registers a new user and returns true on success.</summary>
    public record RegisterCommand(string Username, string Email, string Password)
    : IRequest<bool>;

    public class RegisterValidator : AbstractValidator<RegisterCommand>
    {
        public RegisterValidator()
        {
            RuleFor(x => x.Username).NotEmpty().MinimumLength(3);
            RuleFor(x => x.Email).EmailAddress();
            RuleFor(x => x.Password).MinimumLength(6);
        }
    }

    public class RegisterHandler : IRequestHandler<RegisterCommand, bool>
    {
        private readonly AppDbContext _db;
        public RegisterHandler(AppDbContext db) => _db = db;

        public async Task<bool> Handle(RegisterCommand req, CancellationToken ct)
        {
            // prevent duplicate usernames
            if (await _db.Users.AnyAsync(u => u.Username == req.Username, ct))
                return false;

            var user = new User
            {
                Username = req.Username,
                Email = req.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
                CreatedAt = DateTime.UtcNow
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync(ct);
            return true;
        }
    }




}
