using AutoMapper;

namespace VietLearn.Api.Features.Lessons
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Lesson, LessonDto>();   // entity → dto
            CreateMap<Create.CreateLessonCommand, Lesson>();
        }
    }
}
