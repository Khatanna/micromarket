using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace micromarket.Migrations
{
    /// <inheritdoc />
    public partial class seedfinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "imagenURL",
                table: "producto",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "producto",
                keyColumn: "imagenURL",
                keyValue: null,
                column: "imagenURL",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "imagenURL",
                table: "producto",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
