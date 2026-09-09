using System.Net.Http.Headers;
using Microsoft.Extensions.Options;

namespace DiveIntoVietnamese.Api.Features.Media;

public sealed class SupabaseMediaStorage : IMediaStorage
{
    private readonly HttpClient _httpClient;
    private readonly MediaStorageOptions _options;

    public SupabaseMediaStorage(
        HttpClient httpClient,
        IOptions<MediaStorageOptions> options)
    {
        _httpClient = httpClient;
        _options = options.Value;
    }

    public async Task<MediaUploadResult> UploadAsync(
        Stream fileStream,
        string contentType,
        string objectPath,
        CancellationToken cancellationToken)
    {
        var baseUrl = _options.Url.TrimEnd('/');
        var encodedBucket = Uri.EscapeDataString(_options.Bucket);
        var encodedPath = EncodePath(objectPath);

        var uploadUrl =
            $"{baseUrl}/storage/v1/object/{encodedBucket}/{encodedPath}";

        using var request = new HttpRequestMessage(
            HttpMethod.Post,
            uploadUrl);

        // The new sb_secret_ keys are sent through the apikey header.
        request.Headers.TryAddWithoutValidation(
            "apikey",
            _options.SecretKey);

        // Also support the legacy JWT-based service_role key temporarily.
        if (!_options.SecretKey.StartsWith(
                "sb_secret_",
                StringComparison.Ordinal))
        {
            request.Headers.Authorization =
                new AuthenticationHeaderValue(
                    "Bearer",
                    _options.SecretKey);
        }

        // We generate unique names, so an existing file should not be replaced.
        request.Headers.TryAddWithoutValidation(
            "x-upsert",
            "false");

        request.Content = new StreamContent(fileStream);
        request.Content.Headers.ContentType =
            MediaTypeHeaderValue.Parse(contentType);

        using var response = await _httpClient.SendAsync(
            request,
            HttpCompletionOption.ResponseHeadersRead,
            cancellationToken);

        var responseBody = await response.Content.ReadAsStringAsync(
            cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException(
                $"Supabase Storage upload failed " +
                $"({(int)response.StatusCode}): {responseBody}");
        }

        var publicUrl =
            $"{baseUrl}/storage/v1/object/public/" +
            $"{encodedBucket}/{encodedPath}";

        return new MediaUploadResult(
            publicUrl,
            objectPath);
    }

    private static string EncodePath(string path)
    {
        return string.Join(
            "/",
            path
                .Split(
                    '/',
                    StringSplitOptions.RemoveEmptyEntries)
                .Select(Uri.EscapeDataString));
    }
}