namespace DiveIntoVietnamese.Api.Features.Auth
{
    public class ApiKeyFilter : IEndpointFilter
    {
        private readonly IConfiguration _config;

        public ApiKeyFilter(IConfiguration config)
        {
            _config = config;
        }

        public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
        {
            var httpContext = context.HttpContext;
            var apiKey = httpContext.Request.Headers["X-API-KEY"].FirstOrDefault();
            var requiredKey = _config["ApiKey"];
            if (apiKey != requiredKey)
                return Results.Unauthorized();
            return await next(context);
        }
    }
}
