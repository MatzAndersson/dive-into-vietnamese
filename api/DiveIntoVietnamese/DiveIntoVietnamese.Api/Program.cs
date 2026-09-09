using Microsoft.AspNetCore.Identity;
using DiveIntoVietnamese.Api.Data;
using DiveIntoVietnamese.Api.Features.Auth;

using DiveIntoVietnamese.Api.Features.Lessons;
using DiveIntoVietnamese.Api.Features.Media;
using DiveIntoVietnamese.Api.Middleware;
using FluentValidation;

using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using System.Text.Json.Serialization;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()

    .AddJsonOptions(o =>
    {
        o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        // optional: o.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    }); ;
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

const string FrontendCors = "FrontendCors";

var frontendOrigin =
    builder.Configuration["AllowedOrigins:Frontend"]
    ?? "http://localhost:5173";

builder.Services.AddCors(opt =>
{
    opt.AddPolicy(FrontendCors, p => p
        .WithOrigins(frontendOrigin)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(o =>
{
    o.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
    {
        Name = "X-API-KEY",
        Type = SecuritySchemeType.ApiKey,
        In = ParameterLocation.Header,
        Description = "Paste the API key defined in appsettings.json."
    });

   
});


builder.Services.AddValidatorsFromAssemblyContaining<Program>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services
    .AddIdentityApiEndpoints<ApplicationUser>(options =>
    {
        options.User.RequireUniqueEmail = true;

        options.Password.RequiredLength = 8;
        options.Password.RequireDigit = true;
        options.Password.RequireLowercase = true;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CanManageLessons", policy =>
        policy.RequireRole("Admin", "Teacher"));
});


builder.Services.AddHttpContextAccessor();
builder.Services.ConfigureHttpJsonOptions(o =>
{
    o.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services
    .AddOptions<MediaStorageOptions>()
    .Bind(
        builder.Configuration.GetSection(
            MediaStorageOptions.SectionName))
    .Validate(
        options =>
            Uri.TryCreate(
                options.Url,
                UriKind.Absolute,
                out var uri) &&
            uri.Scheme == Uri.UriSchemeHttps,
        "SupabaseStorage:Url must be a valid HTTPS URL.")
    .Validate(
        options =>
            !string.IsNullOrWhiteSpace(options.SecretKey),
        "SupabaseStorage:SecretKey is required.")
    .Validate(
        options =>
            !string.IsNullOrWhiteSpace(options.Bucket),
        "SupabaseStorage:Bucket is required.")
    .ValidateOnStart();

builder.Services.AddHttpClient<
    IMediaStorage,
    SupabaseMediaStorage>();


var app = builder.Build();

if (args.Contains("--seed-production-admin", StringComparer.OrdinalIgnoreCase))
{
    using var scope = app.Services.CreateScope();

    await ProductionIdentitySeeder.SeedAsync(
        scope.ServiceProvider,
        app.Configuration);

    return;
}

if (args.Contains("--reset-production-admin-password", StringComparer.OrdinalIgnoreCase))
{
    using var scope = app.Services.CreateScope();

    await ProductionIdentitySeeder.ResetAdminPasswordAsync(
        scope.ServiceProvider,
        app.Configuration);

    return;
}

if (args.Contains("--seed-production-teacher", StringComparer.OrdinalIgnoreCase))
{
    using var scope = app.Services.CreateScope();

    await ProductionIdentitySeeder.SeedTeacherAsync(
        scope.ServiceProvider,
        app.Configuration);

    return;
}

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();

    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();   // applies schema
    await DevSeeder.SeedAsync(db);      // seeds if empty

    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

    string[] roles = ["Admin", "Teacher"];

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }

    const string adminEmail = "admin@test.local";
    const string adminPassword = "Password1";

    var adminUser = await userManager.FindByEmailAsync(adminEmail);

    if (adminUser is null)
    {
        adminUser = new ApplicationUser
        {
            UserName = adminEmail,
            Email = adminEmail,
            EmailConfirmed = true
        };

        var createResult = await userManager.CreateAsync(adminUser, adminPassword);

        if (!createResult.Succeeded)
        {
            var errors = string.Join(", ", createResult.Errors.Select(error => error.Description));
            throw new InvalidOperationException($"Could not create development admin user: {errors}");
        }
    }

    if (!await userManager.IsInRoleAsync(adminUser, "Admin"))
    {
        await userManager.AddToRoleAsync(adminUser, "Admin");
    }
}


app.UseMiddleware<ValidationExceptionMiddleware>();
// Configure the HTTP request pipeline



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseCors(FrontendCors);

if (!app.Environment.IsDevelopment())
{
    app.Use(async (context, next) =>
    {
        if (
            HttpMethods.IsPost(context.Request.Method) &&
            context.Request.Path.Equals("/identity/register", StringComparison.OrdinalIgnoreCase)
        )
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            return;
        }

        await next();
    });
}

app.UseAuthentication();
app.UseAuthorization();

app.MapLessonEndpoints();
app.MapMediaEndpoints();

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.MapAuthEndpoints();
}

// Temporary for Session 8H: expose built-in ASP.NET Identity endpoints for local testing.
// Excluded from Swagger because Swashbuckle currently has trouble generating schemas
// for some built-in Identity endpoint request types.
app.MapGroup("/identity")
    .MapIdentityApi<ApplicationUser>()
    .ExcludeFromDescription();

app.MapSessionEndpoints();

app.Run();



public partial class Program { }


