using DiveIntoVietnamese.Api.Data;
using DiveIntoVietnamese.Api.Features.Auth;
using MediatR;
using Microsoft.OpenApi.Models;

namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public static class Endpoints
    {
        /// <summary>Extension method called from Program.cs</summary>
        public static IEndpointRouteBuilder MapLessonEndpoints(this IEndpointRouteBuilder app)
        {
            var g = app.MapGroup("/api/lessons").WithTags("Lessons");
            var secured = g.MapGroup("/").AddEndpointFilter<ApiKeyFilter>();

            // GET /api/lessons
            g.MapGet("/", async (
                [AsParameters] GetAll.Query query,
                AppDbContext db,
                CancellationToken ct) =>
            {
                var lessons = await GetAll.HandleAsync(query, db, ct);
                return Results.Ok(lessons);
            })
            .WithOpenApi();

            // GET /api/lessons/{id}
            g.MapGet("/{id:int}", async (
                int id,
                AppDbContext db,
                CancellationToken ct) =>
            {
                var dto = await GetById.HandleAsync(id, db, ct);
                return dto is null ? Results.NotFound() : Results.Ok(dto);
            })
            .WithOpenApi();

            // POST /api/lessons
            secured.MapPost("/", async (
                IMediator med,
                Create.CreateLessonCommand body) =>
            {
                var dto = await med.Send(body);
                return Results.Created($"/api/lessons/{dto.Id}", dto);
            })
            .WithOpenApi(RequireApiKey);

            // PUT /api/lessons/{id}
            secured.MapPut("/{id:int}", async (
                int id,
                IMediator med,
                Update.UpdateLessonRequest body) =>
            {
                var command = new Update.UpdateLessonCommand(
                    id,
                    body.Title,
                    body.Description,
                    body.Level,
                    body.ImageUrl,
                    body.Explanation,
                    body.ConversationJson,
                    body.AudioUrl,
                    body.VocabularyJson,
                    body.QuestionsJson,
                    body.GrammarJson,
                    body.ExercisesJson
                );

                var dto = await med.Send(command);
                return dto is null ? Results.NotFound() : Results.Ok(dto);
            })
            .WithOpenApi(RequireApiKey);

            // DELETE /api/lessons/{id}
            secured.MapDelete("/{id:int}", async (
                int id,
                AppDbContext db,
                CancellationToken ct) =>
            {
                var success = await Delete.HandleAsync(id, db, ct);
                return success ? Results.NoContent() : Results.NotFound();
            })
            .WithOpenApi(RequireApiKey);

            return app;
        }

        // Helper to mark only these operations as requiring the ApiKey in Swagger
        private static OpenApiOperation RequireApiKey(OpenApiOperation op)
        {
            op.Security =
            [
                new()
                {
                    [
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "ApiKey"
                            }
                        }
                    ] = []
                }
            ];

            return op;
        }
    }
}