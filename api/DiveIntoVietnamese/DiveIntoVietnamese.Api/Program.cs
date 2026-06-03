using DiveIntoVietnamese.Api.Data;
using DiveIntoVietnamese.Api.Features.Auth;

using DiveIntoVietnamese.Api.Features.Lessons;
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

const string ViteDev = "ViteDev";
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(ViteDev, p => p
        .WithOrigins("http://localhost:5173")   // Vite dev server
        .AllowAnyHeader()                       // needed for X-API-KEY
        .AllowAnyMethod());                     // GET/POST/PUT/DELETE
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


builder.Services.AddHttpContextAccessor();
builder.Services.ConfigureHttpJsonOptions(o =>
{
    o.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();   // applies schema
    await DevSeeder.SeedAsync(db);      // seeds if empty
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

app.UseCors(ViteDev);



app.UseAuthorization();

app.MapLessonEndpoints();

app.MapControllers();

app.MapAuthEndpoints();

app.Run();



public partial class Program { }


