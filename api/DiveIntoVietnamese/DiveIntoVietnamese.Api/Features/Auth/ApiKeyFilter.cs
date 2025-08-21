// Features/Auth/ApiKeyFilter.cs
namespace DiveIntoVietnamese.Api.Features.Auth;

public sealed class ApiKeyFilter : IEndpointFilter
{
    private const string HeaderName = "X-API-KEY";
    private readonly string? _expected;

    public ApiKeyFilter(IConfiguration config) => _expected = config["ApiKey"];

    public ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext ctx, EndpointFilterDelegate next)
    {
        // Fail-closed if no key configured (safer). If you want a dev fallback, swap the next two lines.
        if (string.IsNullOrWhiteSpace(_expected))
            return new(Results.Unauthorized());

        if (!ctx.HttpContext.Request.Headers.TryGetValue(HeaderName, out var got) ||
            !string.Equals(got.ToString(), _expected, StringComparison.Ordinal))
        {
            return new(Results.Unauthorized());
        }

        return next(ctx);
    }
}
