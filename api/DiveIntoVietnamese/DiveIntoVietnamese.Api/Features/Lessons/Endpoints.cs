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

            // GET /api/lessons
            g.MapGet("/", async (IMediator med) =>
             Results.Ok(await med.Send(new GetAll.Query()))).WithOpenApi();

            var secured = g.MapGroup("/").AddEndpointFilter<ApiKeyFilter>();

            // POST /api/lessons
            secured.MapPost("/", async (IMediator med, Create.CreateLessonCommand body) =>
            {
                var dto = await med.Send(body);
                return Results.Created($"/api/lessons/{dto.Id}", dto);
            }).WithOpenApi(RequireApiKey);

            // PUT /api/lessons/{id}
            secured.MapPut("/{id:int}", async (int id, IMediator med, Update.UpdateLessonCommand body) =>
            {
                var dto = await med.Send(body with { Id = id });
                return dto is null ? Results.NotFound() : Results.Ok(dto);
            }).WithOpenApi(RequireApiKey);

            // DELETE /api/lessons/{id}
            secured.MapDelete("/{id:int}", async (int id, IMediator med) =>
            {
                var success = await med.Send(new Delete.DeleteLessonCommand(id));
                return success ? Results.NoContent() : Results.NotFound();
            }).WithOpenApi(RequireApiKey);

            return app;
        }

        // Helper to mark only these operations as requiring the ApiKey in Swagger
        private static OpenApiOperation RequireApiKey(OpenApiOperation op)
        {
            op.Security =
            [
                new()
            {
                [ new OpenApiSecurityScheme
                    { Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "ApiKey" } }
                ] = []
            }
            ];
            return op;
        }
    }
}
