using MediatR;

namespace DiveIntoVietnamese.Api.Features.Behaviors
{
    public class ApiKeyBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : notnull
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _config;

        public ApiKeyBehavior(IHttpContextAccessor httpContextAccessor, IConfiguration config)
        {
            _httpContextAccessor = httpContextAccessor;
            _config = config;
        }

        public async Task<TResponse> Handle(
            TRequest request,
            RequestHandlerDelegate<TResponse> next,
            CancellationToken cancellationToken)
        {
            // Example: Only protect "write" commands (POST/PUT/DELETE, not queries)
            if (request is IRequireApiKey)
            {
                var ctx = _httpContextAccessor.HttpContext;
                var apiKey = ctx?.Request.Headers["X-API-KEY"].FirstOrDefault();
                var requiredKey = _config["ApiKey"];

                if (apiKey != requiredKey)
                {
                    // Customize the unauthorized response as needed
                    throw new UnauthorizedAccessException("API key is missing or invalid");
                }
            }

            return await next();
        }
    }

    // Marker interface for commands requiring API key
    public interface IRequireApiKey { }
}
