using MediatR;

namespace VietLearn.Api.Features.Lessons
{
    public static class Endpoints
    {
        /// <summary>Extension method called from Program.cs</summary>
        public static IEndpointRouteBuilder MapLessonEndpoints(this IEndpointRouteBuilder app)
        {
            var g = app.MapGroup("/api/lessons").WithTags("Lessons");

            // GET /api/lessons
            g.MapGet("/", async (IMediator med) =>
                Results.Ok(await med.Send(new GetAll.Query())));

            // POST /api/lessons
            g.MapPost("/", async (IMediator med, Create.CreateLessonCommand body) =>
            {
                var dto = await med.Send(body);
                return Results.Created($"/api/lessons/{dto.Id}", dto);
            });

            // PUT /api/lessons/{id}
            g.MapPut("/{id:int}", async (int id, IMediator med, Update.UpdateLessonCommand body) =>
            {
                var dto = await med.Send(body with { Id = id });
                return Results.Ok(dto);
            });

            // DELETE /api/lessons/{id}
            g.MapDelete("/{id:int}", async (int id, IMediator med) =>
            {
                await med.Send(new Delete.DeleteLessonCommand(id));
                return Results.NoContent();
            });

            return app;
        }
    }
}
