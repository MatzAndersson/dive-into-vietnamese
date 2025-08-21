using DiveIntoVietnamese.Api.Data;
using DiveIntoVietnamese.Api.Features.Auth;
using DiveIntoVietnamese.Api.Features.Behaviors;
using DiveIntoVietnamese.Api.Features.Lessons;
using DiveIntoVietnamese.Api.Middleware;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;



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


});
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssemblyContaining<Program>());   // scans current assembly
builder.Services.AddAutoMapper(typeof(Program)); // same
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

builder.Services.AddHttpContextAccessor();
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ApiKeyBehavior<,>));


var app = builder.Build();

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


