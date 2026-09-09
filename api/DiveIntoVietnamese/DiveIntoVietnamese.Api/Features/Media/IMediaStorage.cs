namespace DiveIntoVietnamese.Api.Features.Media;

public interface IMediaStorage
{
    Task<MediaUploadResult> UploadAsync(
        Stream fileStream,
        string contentType,
        string objectPath,
        CancellationToken cancellationToken);
}