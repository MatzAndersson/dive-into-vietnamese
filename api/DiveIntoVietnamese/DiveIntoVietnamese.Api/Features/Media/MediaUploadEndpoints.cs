using System.Text;

namespace DiveIntoVietnamese.Api.Features.Media;

public static class MediaUploadEndpoints
{
    private const long MaxImageBytes =
        5L * 1024 * 1024;

    private const long MaxAudioBytes =
        25L * 1024 * 1024;

    public static IEndpointRouteBuilder MapMediaEndpoints(
        this IEndpointRouteBuilder app)
    {
        var group = app
            .MapGroup("/api/media")
            .WithTags("Media")
            .RequireAuthorization("CanManageLessons");

        group.MapPost(
                "/upload/{category}",
                UploadAsync)
            .WithName("UploadMedia");

        return app;
    }

    private static async Task<IResult> UploadAsync(
        string category,
        HttpRequest request,
        IMediaStorage storage,
        CancellationToken cancellationToken)
    {
        if (!request.Headers.TryGetValue(
                "X-File-Name",
                out var fileNameHeader))
        {
            return Results.BadRequest(new
            {
                message = "The X-File-Name header is required."
            });
        }

        var originalFileName =
            Path.GetFileName(fileNameHeader.ToString());

        if (string.IsNullOrWhiteSpace(originalFileName))
        {
            return Results.BadRequest(new
            {
                message = "The file name is invalid."
            });
        }

        var extension = Path
            .GetExtension(originalFileName)
            .ToLowerInvariant();

        var rule = GetUploadRule(
            category,
            extension);

        if (rule is null)
        {
            return Results.BadRequest(new
            {
                message =
                    "Unsupported media category or file type."
            });
        }

        var incomingContentType = request.ContentType?
            .Split(';', 2)[0]
            .Trim()
            .ToLowerInvariant();

        if (!IsCompatibleContentType(
                incomingContentType,
                rule.ContentType))
        {
            return Results.BadRequest(new
            {
                message =
                    $"The selected file must use " +
                    $"{rule.ContentType}."
            });
        }

        if (request.ContentLength is > 0 &&
            request.ContentLength > rule.MaxBytes)
        {
            return Results.Json(
                new
                {
                    message =
                        $"The file exceeds the " +
                        $"{FormatMegabytes(rule.MaxBytes)} MB limit."
                },
                statusCode:
                    StatusCodes.Status413PayloadTooLarge);
        }

        var fileBytes = await ReadWithLimitAsync(
            request.Body,
            rule.MaxBytes,
            cancellationToken);

        if (fileBytes is null)
        {
            return Results.Json(
                new
                {
                    message =
                        $"The file exceeds the " +
                        $"{FormatMegabytes(rule.MaxBytes)} MB limit."
                },
                statusCode:
                    StatusCodes.Status413PayloadTooLarge);
        }

        if (fileBytes.Length == 0)
        {
            return Results.BadRequest(new
            {
                message = "The selected file is empty."
            });
        }

        if (!HasExpectedFileSignature(
                fileBytes,
                rule.ContentType))
        {
            return Results.BadRequest(new
            {
                message =
                    "The file contents do not match " +
                    "the selected file type."
            });
        }

        var objectPath =
            $"{rule.Folder}/" +
            $"{DateTime.UtcNow:yyyy/MM}/" +
            $"{Guid.NewGuid():N}" +
            $"{rule.NormalizedExtension}";

        await using var fileStream =
            new MemoryStream(
                fileBytes,
                writable: false);

        var uploadResult = await storage.UploadAsync(
            fileStream,
            rule.ContentType,
            objectPath,
            cancellationToken);

        return Results.Ok(uploadResult);
    }

    private static UploadRule? GetUploadRule(
        string category,
        string extension)
    {
        var normalizedCategory =
            category.Trim().ToLowerInvariant();

        return normalizedCategory switch
        {
            "lesson-image" => extension switch
            {
                ".jpg" or ".jpeg" => new UploadRule(
                    Folder: "images",
                    NormalizedExtension: ".jpg",
                    ContentType: "image/jpeg",
                    MaxBytes: MaxImageBytes),

                ".png" => new UploadRule(
                    Folder: "images",
                    NormalizedExtension: ".png",
                    ContentType: "image/png",
                    MaxBytes: MaxImageBytes),

                ".webp" => new UploadRule(
                    Folder: "images",
                    NormalizedExtension: ".webp",
                    ContentType: "image/webp",
                    MaxBytes: MaxImageBytes),

                _ => null
            },

            "conversation-audio" => extension switch
            {
                ".mp3" => new UploadRule(
                    Folder: "conversations",
                    NormalizedExtension: ".mp3",
                    ContentType: "audio/mpeg",
                    MaxBytes: MaxAudioBytes),

                ".m4a" => new UploadRule(
                    Folder: "conversations",
                    NormalizedExtension: ".m4a",
                    ContentType: "audio/mp4",
                    MaxBytes: MaxAudioBytes),

                _ => null
            },

            _ => null
        };
    }

    private static bool IsCompatibleContentType(
        string? incomingContentType,
        string expectedContentType)
    {
        if (string.IsNullOrWhiteSpace(incomingContentType))
        {
            return true;
        }

        if (incomingContentType == expectedContentType)
        {
            return true;
        }

        if (incomingContentType == "application/octet-stream")
        {
            return true;
        }

        if (expectedContentType == "audio/mpeg" &&
    incomingContentType == "audio/mp3")
        {
            return true;
        }

        if (expectedContentType == "audio/mp4" &&
            incomingContentType == "audio/x-m4a")
        {
            return true;
        }

        return false;
    }

    private static async Task<byte[]?> ReadWithLimitAsync(
        Stream input,
        long maximumBytes,
        CancellationToken cancellationToken)
    {
        using var output = new MemoryStream();

        var buffer = new byte[81920];
        long totalBytes = 0;

        while (true)
        {
            var bytesRead = await input.ReadAsync(
                buffer.AsMemory(0, buffer.Length),
                cancellationToken);

            if (bytesRead == 0)
            {
                break;
            }

            totalBytes += bytesRead;

            if (totalBytes > maximumBytes)
            {
                return null;
            }

            await output.WriteAsync(
                buffer.AsMemory(0, bytesRead),
                cancellationToken);
        }

        return output.ToArray();
    }

    private static bool HasExpectedFileSignature(
        byte[] bytes,
        string contentType)
    {
        return contentType switch
        {
            "image/jpeg" =>
                bytes.Length >= 3 &&
                bytes[0] == 0xFF &&
                bytes[1] == 0xD8 &&
                bytes[2] == 0xFF,

            "image/png" =>
                bytes.Length >= 8 &&
                bytes[0] == 0x89 &&
                bytes[1] == 0x50 &&
                bytes[2] == 0x4E &&
                bytes[3] == 0x47 &&
                bytes[4] == 0x0D &&
                bytes[5] == 0x0A &&
                bytes[6] == 0x1A &&
                bytes[7] == 0x0A,

            "image/webp" =>
                bytes.Length >= 12 &&
                Encoding.ASCII
                    .GetString(bytes, 0, 4) == "RIFF" &&
                Encoding.ASCII
                    .GetString(bytes, 8, 4) == "WEBP",
            "audio/mpeg" =>
                HasMp3Signature(bytes),

            "audio/mp4" =>
                HasM4aSignature(bytes),

            _ => false

        };
    }

    private static bool HasMp3Signature(byte[] bytes)
    {
        var hasId3Header =
            bytes.Length >= 3 &&
            bytes[0] == (byte)'I' &&
            bytes[1] == (byte)'D' &&
            bytes[2] == (byte)'3';

        var hasMpegFrameHeader =
            bytes.Length >= 2 &&
            bytes[0] == 0xFF &&
            (bytes[1] & 0xE0) == 0xE0;

        return hasId3Header || hasMpegFrameHeader;
    }
    private static bool HasM4aSignature(byte[] bytes)
    {
        return bytes.Length >= 12 &&
               Encoding.ASCII.GetString(bytes, 4, 4) == "ftyp";
    }

    private static long FormatMegabytes(long bytes)
    {
        return bytes / 1024 / 1024;
    }

    private sealed record UploadRule(
        string Folder,
        string NormalizedExtension,
        string ContentType,
        long MaxBytes);
}