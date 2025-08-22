using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DiveIntoVietnamese.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddLessonLevelAndImageUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Lessons",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Lessons",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Lessons",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Lessons",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Lessons",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Lessons",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Level",
                table: "Lessons",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "Level",
                table: "Lessons");

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
    }
}
