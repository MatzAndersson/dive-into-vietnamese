using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DiveIntoVietnamese.Api.Migrations
{
    /// <inheritdoc />
    public partial class FixLessonLevelDefault : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.Sql("UPDATE \"Lessons\" SET \"Level\" = 1 WHERE \"Level\" = 0;");

            migrationBuilder.AlterColumn<int>(
                name: "Level",
                table: "Lessons",
                type: "integer",
                nullable: false,
                defaultValue: 1,
                oldClrType: typeof(int),
                oldType: "integer",
                oldDefaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Level",
                table: "Lessons",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldDefaultValue: 1);
        }
    }
}
