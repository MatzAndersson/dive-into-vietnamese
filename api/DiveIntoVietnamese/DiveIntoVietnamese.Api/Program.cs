using DiveIntoVietnamese.Api.Data;
using DiveIntoVietnamese.Api.Features.Auth;
using DiveIntoVietnamese.Api.Features.Behaviors;
using DiveIntoVietnamese.Api.Features.Lessons;
using DiveIntoVietnamese.Api.Middleware;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
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

    o.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "ApiKey"
                }
            },
            Array.Empty<string>()
        }
    });
});
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssemblyContaining<Program>());   // scans current assembly
builder.Services.AddAutoMapper(typeof(Program)); // same
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

builder.Services.AddHttpContextAccessor();
builder.Services.Configure<JsonOptions>(o =>
    o.SerializerOptions.Converters.Add(new JsonStringEnumConverter()));



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


