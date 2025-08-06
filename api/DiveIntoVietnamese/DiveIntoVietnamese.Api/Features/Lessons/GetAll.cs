using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using VietLearn.Api.Data;

namespace VietLearn.Api.Features.Lessons
{
    public static class GetAll
    {
        /// <summary>Request message (no parameters)</summary>
        public record Query : IRequest<IEnumerable<LessonDto>>;

        /// <summary>Handler executes the query</summary>
        public class Handler : IRequestHandler<Query, IEnumerable<LessonDto>>
        {
            private readonly AppDbContext _db;
            private readonly IMapper _map;

            public Handler(AppDbContext db, IMapper map)
            {
                _db = db;
                _map = map;
            }

            public async Task<IEnumerable<LessonDto>> Handle(Query request, CancellationToken ct)
            {
                var lessons = await _db.Lessons.AsNoTracking().ToListAsync(ct);
                return _map.Map<IEnumerable<LessonDto>>(lessons);
            }
        }
    }
}
