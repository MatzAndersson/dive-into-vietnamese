using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DiveIntoVietnamese.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddLessonConversationJson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ConversationJson",
                table: "Lessons",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConversationJson",
                table: "Lessons");
        }
    }
}
