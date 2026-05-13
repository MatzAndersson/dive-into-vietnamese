using AutoMapper;
using DiveIntoVietnamese.Api.Data;
using DiveIntoVietnamese.Api.Domain;
using DiveIntoVietnamese.Api.Features.Lessons;
using Microsoft.EntityFrameworkCore;
using Shouldly;
public class CreateHandlerTests
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _db;

    public CreateHandlerTests()
    {
        _mapper = new MapperConfiguration(cfg =>
            cfg.AddProfile(new MappingProfile())).CreateMapper();

        // simple in-memory EF Core context
        var opt = new DbContextOptionsBuilder<AppDbContext>()
                    .UseInMemoryDatabase(databaseName: "LessonDb")
                    .Options;
        _db = new AppDbContext(opt);
    }

    [Fact]
    public async Task Creates_Lesson_and_returns_DTO()
    {
        // arrange
        var handler = new Create.Handler(_db, _mapper);
        var cmd = new Create.CreateLessonCommand(
            "Xin chào",
            "Greeting",
            LessonLevel.Beginner,
            null,
            null,
            null,
            null,
            null,
            null
        );

        // act
        LessonDto dto = await handler.Handle(cmd, CancellationToken.None);

        // assert
        dto.Title.ShouldBe("Xin chào");
        _db.Lessons.Count().ShouldBe(1);
    }
}
