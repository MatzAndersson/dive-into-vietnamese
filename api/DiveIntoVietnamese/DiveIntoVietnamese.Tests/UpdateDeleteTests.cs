using DiveIntoVietnamese.Api.Domain;
using DiveIntoVietnamese.Api.Features.Lessons;
using Microsoft.AspNetCore.Mvc.Testing;
using Shouldly;
using System.Net;
using System.Net.Http.Json;

public class UpdateDeleteTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    public UpdateDeleteTests(WebApplicationFactory<Program> factory) => _client = factory.CreateClient();

    [Fact]
    public async Task Put_Should_update_title()
    {
        var cmd = new Update.UpdateLessonCommand(
    1,
    "Updated title",
    "Updated description",
    LessonLevel.Beginner,
    null,
    null,
    null,
    null,
    null
);
        var resp = await _client.PutAsJsonAsync("/api/lessons/1", cmd);

        resp.StatusCode.ShouldBe(HttpStatusCode.OK);
        var dto = await resp.Content.ReadFromJsonAsync<LessonDto>();
        dto!.Title.ShouldBe("Xin chào bạn");
        dto.Description.ShouldBe("Greeting updated");
    }

    [Fact]
    public async Task Delete_Should_remove_row()
    {
        var resp = await _client.DeleteAsync("/api/lessons/2");
        resp.StatusCode.ShouldBe(HttpStatusCode.NoContent);

        var list = await _client.GetFromJsonAsync<List<LessonDto>>("/api/lessons");
        list!.Any(l => l.Id == 2).ShouldBeFalse();
    }
}
