using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VietLearn.Api.Migrations
{
    /// <inheritdoc />
    public partial class SeedRealLessons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Lessons",
                columns: new[] { "Id", "Description", "Title" },
                values: new object[,]
                {
                    { 3, "Asking someone's name", "Bạn tên gì?" },
                    { 4, "I don't understand", "Tôi không hiểu" },
                    { 5, "Where is the toilet?", "Nhà vệ sinh ở đâu?" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
        }
    }
}
