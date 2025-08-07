using Microsoft.AspNetCore.Mvc.Testing;
using Shouldly;
using System.Net.Http.Json;
using DiveIntoVietnamese.Api.Features.Lessons;

public class GetAllTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public GetAllTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetAll_Should_return_seeded_two()
    {
        // act
        var lessons = await _client.GetFromJsonAsync<List<LessonDto>>("/api/lessons");

        // assert
        lessons!.Count.ShouldBe(2);
        lessons.Any(l => l.Title == "Xin chào").ShouldBeTrue();
        lessons.Any(l => l.Title == "Cảm ơn").ShouldBeTrue();
    }
}

