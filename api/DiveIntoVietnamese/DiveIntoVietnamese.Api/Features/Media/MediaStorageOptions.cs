namespace DiveIntoVietnamese.Api.Features.Media;

public sealed class MediaStorageOptions
{
    public const string SectionName = "SupabaseStorage";

    public string Url { get; init; } = string.Empty;

    public string SecretKey { get; init; } = string.Empty;

    public string Bucket { get; init; } = "lesson-media";
}