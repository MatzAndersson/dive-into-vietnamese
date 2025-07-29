using FluentValidation;
using MediatR;

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

        public Task<LoginResult?> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            // Replace with real lookup later!
            if (request.Username == "teacher" && request.Password == "password")
                return Task.FromResult<LoginResult?>(new LoginResult("dummy-jwt-token"));

            return Task.FromResult<LoginResult?>(null);
        }
    }

}
