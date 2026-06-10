using DiveIntoVietnamese.Api.Data;

using DiveIntoVietnamese.Api.Filters;



namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public static class Endpoints
    {
        /// <summary>Extension method called from Program.cs</summary>
        public static IEndpointRouteBuilder MapLessonEndpoints(this IEndpointRouteBuilder app)
        {
            var g = app.MapGroup("/api/lessons").WithTags("Lessons");
            var secured = g.MapGroup("/").RequireAuthorization("CanManageLessons");


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
                Create.Request body,
                AppDbContext db,
                CancellationToken ct) =>
            {
                var dto = await Create.HandleAsync(body, db, ct);
                return Results.Created($"/api/lessons/{dto.Id}", dto);
            })
            .AddEndpointFilter<ValidationFilter<Create.Request>>()
            .WithOpenApi();

            // PUT /api/lessons/{id}
            secured.MapPut("/{id:int}", async (
                int id,
                Update.UpdateLessonRequest body,
                AppDbContext db,
                CancellationToken ct) =>
            {
                var dto = await Update.HandleAsync(id, body, db, ct);
                return dto is null ? Results.NotFound() : Results.Ok(dto);
            })
            .AddEndpointFilter<ValidationFilter<Update.UpdateLessonRequest>>()
            .WithOpenApi();

            // DELETE /api/lessons/{id}
            secured.MapDelete("/{id:int}", async (
                int id,
                AppDbContext db,
                CancellationToken ct) =>
            {
                var success = await Delete.HandleAsync(id, db, ct);
                return success ? Results.NoContent() : Results.NotFound();
            })
            .WithOpenApi();

            return app;
        }

       
    }
}