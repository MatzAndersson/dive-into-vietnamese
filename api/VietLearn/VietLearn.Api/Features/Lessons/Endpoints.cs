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
            g.MapPost("/", async (IMediator med, Create.Command body) =>
            {
                var dto = await med.Send(body);
                return Results.Created($"/api/lessons/{dto.Id}", dto);
            });

            return app;
        }
    }
}
