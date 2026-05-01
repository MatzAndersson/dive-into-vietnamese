using AutoMapper;
using AutoMapper.QueryableExtensions;
using DiveIntoVietnamese.Api.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DiveIntoVietnamese.Api.Features.Lessons
{
    public static class GetById
    {
        public sealed record Query(int Id) : IRequest<LessonDto?>;

        public sealed class Handler : IRequestHandler<Query, LessonDto?>
        {
            private readonly AppDbContext _db;
            private readonly IMapper _map;

            public Handler(AppDbContext db, IMapper map)
            {
                _db = db;
                _map = map;
            }

            public async Task<LessonDto?> Handle(Query request, CancellationToken ct)
            {
                var item = await _db.Lessons
                    .AsNoTracking()
                    .Where(l => l.Id == request.Id)
                    .ProjectTo<LessonDto>(_map.ConfigurationProvider)
                    .FirstOrDefaultAsync(ct);

                return item;
            }
        }
    }
}