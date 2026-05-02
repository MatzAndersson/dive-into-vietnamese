using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DiveIntoVietnamese.Api.Migrations
{
    /// <inheritdoc />
    public partial class SyncLessonModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VocabularyJson",
                table: "Lessons",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VocabularyJson",
                table: "Lessons");
        }
    }
}
