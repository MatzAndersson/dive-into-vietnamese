using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DiveIntoVietnamese.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lessons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "timezone('utc', now())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lessons", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Lessons",
                columns: new[] { "Id", "CreatedAt", "Description", "Title" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 7, 25, 0, 0, 0, 0, DateTimeKind.Utc), "Say hello", "Xin chào" },
                    { 2, new DateTime(2025, 7, 25, 0, 0, 0, 0, DateTimeKind.Utc), "Say thanks", "Cảm ơn" },
                    { 3, new DateTime(2025, 7, 25, 0, 0, 0, 0, DateTimeKind.Utc), "Asking someone's name", "Bạn tên gì?" },
                    { 4, new DateTime(2025, 7, 25, 0, 0, 0, 0, DateTimeKind.Utc), "I don't understand", "Tôi không hiểu" },
                    { 5, new DateTime(2025, 7, 25, 0, 0, 0, 0, DateTimeKind.Utc), "Where is the toilet?", "Nhà vệ sinh ở đâu?" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lessons");
        }
    }
}
