using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace micromarket.Migrations
{
    /// <inheritdoc />
    public partial class newseed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "160d1544-5256-445a-9b82-17ba620fc157",
                columns: new[] { "nombre", "padre_id" },
                values: new object[] { "Agua", "20368c37-79ab-4bde-aca2-1ff189012374" });

            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "20368c37-79ab-4bde-aca2-1ff189012374",
                column: "nombre",
                value: "Bebidas");

            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "968c060a-d5d4-4d3c-997f-80821d65f022",
                columns: new[] { "nombre", "padre_id" },
                values: new object[] { "Bebida refrescante", "20368c37-79ab-4bde-aca2-1ff189012374" });

            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "984709a0-79f0-4825-9242-940cdeec6f92",
                columns: new[] { "nombre", "padre_id" },
                values: new object[] { "Juguito", "20368c37-79ab-4bde-aca2-1ff189012374" });

            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "9cf7e664-68e5-424f-9dc1-de4780e2c789",
                columns: new[] { "nombre", "padre_id" },
                values: new object[] { "Frutts tetra", "20368c37-79ab-4bde-aca2-1ff189012374" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "160d1544-5256-445a-9b82-17ba620fc157",
                columns: new[] { "nombre", "padre_id" },
                values: new object[] { "Alimento no bebible de Soya", "1862b90e-034c-4ce2-9e26-0d3c8ce875e9" });

            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "20368c37-79ab-4bde-aca2-1ff189012374",
                column: "nombre",
                value: "Bebida lactea");

            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "968c060a-d5d4-4d3c-997f-80821d65f022",
                columns: new[] { "nombre", "padre_id" },
                values: new object[] { "Bebidas - Agua", null });

            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "984709a0-79f0-4825-9242-940cdeec6f92",
                columns: new[] { "nombre", "padre_id" },
                values: new object[] { "Bebidas - Bebida refrescante", null });

            migrationBuilder.UpdateData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "9cf7e664-68e5-424f-9dc1-de4780e2c789",
                columns: new[] { "nombre", "padre_id" },
                values: new object[] { "Bebidas - Juguitos", null });
        }
    }
}
