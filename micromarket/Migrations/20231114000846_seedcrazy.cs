using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace micromarket.Migrations
{
    /// <inheritdoc />
    public partial class seedcrazy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "categoria",
                columns: new[] { "id", "nombre", "padre_id", "prefijo" },
                values: new object[,]
                {
                    { "27ddffa1-46cd-4ffa-b256-d5f31af645df", "Margarina", null, "13" },
                    { "3d4901fc-71f4-4586-9bd3-a77d2a71c814", "Conservas de frutas", null, "05" },
                    { "50c686ed-915e-4edb-acc4-4cc3ba11fa84", "Mermelada", null, "14" },
                    { "5365364f-784d-4ae3-ba10-02b1da5aea66", "Panetones", null, "15" },
                    { "744fa27c-41c6-4337-b968-90b5677c3711", "Fideos", null, "08" },
                    { "ab9a9c37-31de-47ee-89a5-1e0921220438", "Congelados", null, "04" },
                    { "b377cf12-b224-469e-8898-074c1e08fc6c", "Cafe", null, "03" },
                    { "d82b11f5-2ac7-44c1-af01-da95afb72ab5", "Leches Fluidas", null, "10" },
                    { "e415d736-eaee-4563-93d6-052f22b7305e", "Dulce de leche", null, "07" },
                    { "e64b0949-a59f-4309-85a1-b08bcfe80196", "Leche de condensada", null, "09" },
                    { "e9845636-3ce3-43f8-9d80-002a83a7d105", "Lomitos de atun", null, "11" },
                    { "fb648f85-1dfc-434e-93ed-9f8d84a0967d", "Mantequilla", null, "12" },
                    { "fc60f291-c024-48e6-ba0b-ae14272d8d70", "Crema respostera", null, "06" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "27ddffa1-46cd-4ffa-b256-d5f31af645df");

            migrationBuilder.DeleteData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "3d4901fc-71f4-4586-9bd3-a77d2a71c814");

            migrationBuilder.DeleteData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "50c686ed-915e-4edb-acc4-4cc3ba11fa84");

            migrationBuilder.DeleteData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "5365364f-784d-4ae3-ba10-02b1da5aea66");

            migrationBuilder.DeleteData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "744fa27c-41c6-4337-b968-90b5677c3711");

            migrationBuilder.DeleteData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "ab9a9c37-31de-47ee-89a5-1e0921220438");

            migrationBuilder.DeleteData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "b377cf12-b224-469e-8898-074c1e08fc6c");

            migrationBuilder.DeleteData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "d82b11f5-2ac7-44c1-af01-da95afb72ab5");

            migrationBuilder.DeleteData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "e415d736-eaee-4563-93d6-052f22b7305e");

            migrationBuilder.DeleteData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "e64b0949-a59f-4309-85a1-b08bcfe80196");

            migrationBuilder.DeleteData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "e9845636-3ce3-43f8-9d80-002a83a7d105");

            migrationBuilder.DeleteData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "fb648f85-1dfc-434e-93ed-9f8d84a0967d");

            migrationBuilder.DeleteData(
                table: "categoria",
                keyColumn: "id",
                keyValue: "fc60f291-c024-48e6-ba0b-ae14272d8d70");
        }
    }
}
