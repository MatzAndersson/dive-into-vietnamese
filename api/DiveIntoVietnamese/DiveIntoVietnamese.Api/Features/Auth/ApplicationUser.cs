using Microsoft.AspNetCore.Identity;

namespace DiveIntoVietnamese.Api.Features.Auth;

public sealed class ApplicationUser : IdentityUser
{
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}