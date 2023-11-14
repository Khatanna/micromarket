using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace micromarket.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "categoria",
                columns: table => new
                {
                    id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    nombre = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    padre_id = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_categoria", x => x.id);
                    table.ForeignKey(
                        name: "FK_categoria_categoria_padre_id",
                        column: x => x.padre_id,
                        principalTable: "categoria",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "rol",
                columns: table => new
                {
                    id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    nombre = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rol", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    nombre_de_usuario = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    contraseña = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    nombres = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    apellido_paterno = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    apellido_materno = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    estado = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuario", x => x.nombre_de_usuario);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "producto",
                columns: table => new
                {
                    codigo = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    nombre = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    precio = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    descripción = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    imagenURL = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    categoriaId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_producto", x => x.codigo);
                    table.ForeignKey(
                        name: "FK_producto_categoria_categoriaId",
                        column: x => x.categoriaId,
                        principalTable: "categoria",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "_roletouser",
                columns: table => new
                {
                    A = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    B = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__roletouser", x => new { x.A, x.B });
                    table.ForeignKey(
                        name: "FK__roletouser_rol_A",
                        column: x => x.A,
                        principalTable: "rol",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__roletouser_usuario_B",
                        column: x => x.B,
                        principalTable: "usuario",
                        principalColumn: "nombre_de_usuario",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "categoria",
                columns: new[] { "id", "nombre", "padre_id" },
                values: new object[,]
                {
                    { "1862b90e-034c-4ce2-9e26-0d3c8ce875e9", "Alimento bebible de Soya", null },
                    { "20368c37-79ab-4bde-aca2-1ff189012374", "Bebida lactea", null },
                    { "968c060a-d5d4-4d3c-997f-80821d65f022", "Bebidas - Agua", null },
                    { "984709a0-79f0-4825-9242-940cdeec6f92", "Bebidas - Bebida refrescante", null },
                    { "9cf7e664-68e5-424f-9dc1-de4780e2c789", "Bebidas - Juguitos", null },
                    { "160d1544-5256-445a-9b82-17ba620fc157", "Alimento no bebible de Soya", "1862b90e-034c-4ce2-9e26-0d3c8ce875e9" }
                });

            migrationBuilder.InsertData(
                table: "producto",
                columns: new[] { "codigo", "categoriaId", "descripción", "imagenURL", "nombre", "precio" },
                values: new object[,]
                {
                    { "DNT-01-0001", "1862b90e-034c-4ce2-9e26-0d3c8ce875e9", "El alimento bebible de soya no contiene lactosa", "https://firebasestorage.googleapis.com/v0/b/micromarket-35ab5.appspot.com/o/productos%2Fcategorias%2Falimento%20soya%20bebible%2F3-300x300.png?alt=media&token=6ee2d102-1c75-4e03-95b5-68ad7437e789", "Soy banana bolsa 1.100 ML", "9.99" },
                    { "DNT-01-0002", "1862b90e-034c-4ce2-9e26-0d3c8ce875e9", "El alimento bebible de soya no contiene lactosa", "https://firebasestorage.googleapis.com/v0/b/micromarket-35ab5.appspot.com/o/productos%2Fcategorias%2Falimento%20soya%20bebible%2Fsoy-choco-300x300.jpg?alt=media&token=15621d77-fede-4aa0-84b8-183e102f5cba", "Soy chocolate bolsa 1.100 ML", "9.99" },
                    { "DNT-01-0003", "1862b90e-034c-4ce2-9e26-0d3c8ce875e9", "El alimento bebible de soya no contiene lactosa", "https://firebasestorage.googleapis.com/v0/b/micromarket-35ab5.appspot.com/o/productos%2Fcategorias%2Falimento%20soya%20bebible%2F4-300x300.png?alt=media&token=4d342099-aea0-48d8-a970-4390c6d330c2", "Soy frutilla bolsa 1.100 ML", "9.99" },
                    { "DNT-01-0004", "1862b90e-034c-4ce2-9e26-0d3c8ce875e9", "El alimento bebible de soya no contiene lactosa", "https://firebasestorage.googleapis.com/v0/b/micromarket-35ab5.appspot.com/o/productos%2Fcategorias%2Falimento%20soya%20bebible%2Fsoy-original-300x300.jpg?alt=media&token=d9d1ec8a-c617-4091-896f-92d621c2408d", "Soy natural bolsa 1.100 MLL", "9.99" },
                    { "DNT-01-0005", "1862b90e-034c-4ce2-9e26-0d3c8ce875e9", "El alimento bebible de soya no contiene lactosa", "https://firebasestorage.googleapis.com/v0/b/micromarket-35ab5.appspot.com/o/productos%2Fcategorias%2Falimento%20soya%20bebible%2Fsoy-chirimoya-300x300.jpg?alt=media&token=4810853d-8855-4448-8a2d-36e9533b2e06", "Soy chirimoya bolsa 1.100 ML", "9.99" },
                    { "DNT-01-0006", "1862b90e-034c-4ce2-9e26-0d3c8ce875e9", "El alimento bebible de soya no contiene lactosa", "https://firebasestorage.googleapis.com/v0/b/micromarket-35ab5.appspot.com/o/productos%2Fcategorias%2Falimento%20soya%20bebible%2Fsoy-vainilla-300x300.jpg?alt=media&token=adfae0b2-3cbd-4b3c-aea1-359d26ba400e", "Soy vainilla bolsa 1.100 ML", "9.99" }
                });

            migrationBuilder.CreateIndex(
                name: "IX__roletouser_B",
                table: "_roletouser",
                column: "B");

            migrationBuilder.CreateIndex(
                name: "IX_categoria_padre_id",
                table: "categoria",
                column: "padre_id");

            migrationBuilder.CreateIndex(
                name: "IX_producto_categoriaId",
                table: "producto",
                column: "categoriaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "_roletouser");

            migrationBuilder.DropTable(
                name: "producto");

            migrationBuilder.DropTable(
                name: "rol");

            migrationBuilder.DropTable(
                name: "usuario");

            migrationBuilder.DropTable(
                name: "categoria");
        }
    }
}
