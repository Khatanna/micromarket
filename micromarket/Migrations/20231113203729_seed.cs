using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace micromarket.Migrations
{
    /// <inheritdoc />
    public partial class seed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "prefijo",
                table: "categoria",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "160d1544-5256-445a-9b82-17ba620fc157",
                column: "prefijo",
                value: "21");

            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "1862b90e-034c-4ce2-9e26-0d3c8ce875e9",
                column: "prefijo",
                value: "01");

            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "20368c37-79ab-4bde-aca2-1ff189012374",
                column: "prefijo",
                value: "02");

            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "968c060a-d5d4-4d3c-997f-80821d65f022",
                column: "prefijo",
                value: "22");

            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "984709a0-79f0-4825-9242-940cdeec6f92",
                column: "prefijo",
                value: "23");

            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "9cf7e664-68e5-424f-9dc1-de4780e2c789",
                column: "prefijo",
                value: "24");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "prefijo",
                table: "categoria");
        }
    }
}
