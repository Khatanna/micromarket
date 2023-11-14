using Microsoft.EntityFrameworkCore;
using micromarket.Models;
using System.Collections.Generic;

namespace micromarket.Config
{
  // [DbConfigurationType(typeof(MySqlEFConfiguration))]
  public class MySqlDbContext : DbContext
  {
    public MySqlDbContext(): base() { }

    public MySqlDbContext(DbContextOptions<MySqlDbContext> options) : base(options)
    {
      
    }
    public DbSet<User> usuario { get; set; }
    public DbSet<Role> rol { get; set;  }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasMany(e => e.roles)
                .WithMany(e => e.users)
                .UsingEntity("_roletouser",
                l => l.HasOne(typeof(Role)).WithMany().HasForeignKey("A").HasPrincipalKey(nameof(Role.id)),
                r => r.HasOne(typeof(User)).WithMany().HasForeignKey("B").HasPrincipalKey(nameof(User.nombre_de_usuario)),
                j => j.HasKey("A", "B"));

            modelBuilder.Entity<Category>()
                .HasMany(p => p.productos)
                .WithOne(c => c.categoria)
                .HasForeignKey(p => p.categoriaId);

      modelBuilder.Entity<Category>()
        .HasOne(c => c.padre)
        .WithMany(c => c.categorias)
        .HasForeignKey(c => c.padre_id);

      _ = modelBuilder.Entity<Category>().HasData(
          new Category
          {
            id = "1862b90e-034c-4ce2-9e26-0d3c8ce875e9",
            nombre = "Alimento bebible de Soya",
            prefijo = "01",
            padre_id = null,
          },
          new Category { padre_id = null, id = "20368c37-79ab-4bde-aca2-1ff189012374", nombre = "Bebidas", prefijo = "02" },
          new Category
          {
            id = "160d1544-5256-445a-9b82-17ba620fc157",
            padre_id = "20368c37-79ab-4bde-aca2-1ff189012374",
            nombre = "Agua",
            prefijo = "21"
          },
          new Category
          {
            id = "968c060a-d5d4-4d3c-997f-80821d65f022",
            padre_id = "20368c37-79ab-4bde-aca2-1ff189012374",
            nombre = "Bebida refrescante",
            prefijo = "22"
          },
          new Category
          {
            id = "984709a0-79f0-4825-9242-940cdeec6f92",
            padre_id = "20368c37-79ab-4bde-aca2-1ff189012374",
            nombre = "Juguito",
            prefijo = "23"
          },
          new Category
          {
            id = "9cf7e664-68e5-424f-9dc1-de4780e2c789",
            padre_id = "20368c37-79ab-4bde-aca2-1ff189012374",
            nombre = "Frutts tetra",
            prefijo = "24"
          } ,
          new Category
          {
            id = "b377cf12-b224-469e-8898-074c1e08fc6c",
            nombre = "Cafe",
            prefijo = "03"
          },
          new Category
          {
            id = "ab9a9c37-31de-47ee-89a5-1e0921220438",
            nombre = "Congelados",
            prefijo = "04"
          },
          new Category
          {
            id = "3d4901fc-71f4-4586-9bd3-a77d2a71c814",
            nombre = "Conservas de frutas",
            prefijo = "05"
          },
          new Category
          {
            id = "fc60f291-c024-48e6-ba0b-ae14272d8d70",
            nombre = "Crema respostera",
            prefijo = "06"
          },
          new Category
          {
            id = "e415d736-eaee-4563-93d6-052f22b7305e",
            nombre = "Dulce de leche",
            prefijo = "07"
          },
          new Category
          {
            id = "744fa27c-41c6-4337-b968-90b5677c3711",
            nombre = "Fideos",
            prefijo = "08"
          },
          new Category
          {
            id = "e64b0949-a59f-4309-85a1-b08bcfe80196",
            nombre = "Leche de condensada",
            prefijo = "09"
          },
          new Category
          {
            id = "d82b11f5-2ac7-44c1-af01-da95afb72ab5",
            nombre = "Leches Fluidas",
            prefijo = "10"
          },
          new Category
          {
            id = "e9845636-3ce3-43f8-9d80-002a83a7d105",
            nombre = "Lomitos de atun",
            prefijo = "11"
          },
          new Category
          {
            id = "fb648f85-1dfc-434e-93ed-9f8d84a0967d",
            nombre = "Mantequilla",
            prefijo = "12"
          },
          new Category
          {
            id = "27ddffa1-46cd-4ffa-b256-d5f31af645df",
            nombre = "Margarina",
            prefijo = "13"
          },
          new Category
          {
            id = "50c686ed-915e-4edb-acc4-4cc3ba11fa84",
            nombre = "Mermelada",
            prefijo = "14"
          },
          new Category
          {
            id = "5365364f-784d-4ae3-ba10-02b1da5aea66",
            nombre = "Panetones",
            prefijo = "15"
          }
          );

            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    codigo = "DNT-01-0001",
                    nombre = "Soy banana bolsa 1.100 ML",
                    descripción = "El alimento bebible de soya no contiene lactosa",
                    precio = "9.99",
                    imagenURL = "https://firebasestorage.googleapis.com/v0/b/micromarket-35ab5.appspot.com/o/productos%2Fcategorias%2Falimento%20soya%20bebible%2F3-300x300.png?alt=media&token=6ee2d102-1c75-4e03-95b5-68ad7437e789",
                    categoriaId = "1862b90e-034c-4ce2-9e26-0d3c8ce875e9"
                },
                new Product
                {
                    codigo = "DNT-01-0002",
                    nombre = "Soy chocolate bolsa 1.100 ML",
                    descripción = "El alimento bebible de soya no contiene lactosa",
                    precio = "9.99",
                    imagenURL = "https://firebasestorage.googleapis.com/v0/b/micromarket-35ab5.appspot.com/o/productos%2Fcategorias%2Falimento%20soya%20bebible%2Fsoy-choco-300x300.jpg?alt=media&token=15621d77-fede-4aa0-84b8-183e102f5cba",
                    categoriaId = "1862b90e-034c-4ce2-9e26-0d3c8ce875e9"
                },
                new Product
                {
                    codigo = "DNT-01-0003",
                    nombre = "Soy frutilla bolsa 1.100 ML",
                    descripción = "El alimento bebible de soya no contiene lactosa",
                    precio = "9.99",
                    imagenURL = "https://firebasestorage.googleapis.com/v0/b/micromarket-35ab5.appspot.com/o/productos%2Fcategorias%2Falimento%20soya%20bebible%2F4-300x300.png?alt=media&token=4d342099-aea0-48d8-a970-4390c6d330c2",
                    categoriaId = "1862b90e-034c-4ce2-9e26-0d3c8ce875e9"
                },
                new Product
                {
                    codigo = "DNT-01-0004",
                    nombre = "Soy natural bolsa 1.100 MLL",
                    descripción = "El alimento bebible de soya no contiene lactosa",
                    precio = "9.99",
                    imagenURL = "https://firebasestorage.googleapis.com/v0/b/micromarket-35ab5.appspot.com/o/productos%2Fcategorias%2Falimento%20soya%20bebible%2Fsoy-original-300x300.jpg?alt=media&token=d9d1ec8a-c617-4091-896f-92d621c2408d",
                    categoriaId = "1862b90e-034c-4ce2-9e26-0d3c8ce875e9"
                },
                new Product
                {
                    codigo = "DNT-01-0005",
                    nombre = "Soy chirimoya bolsa 1.100 ML",
                    descripción = "El alimento bebible de soya no contiene lactosa",
                    precio = "9.99",
                    imagenURL = "https://firebasestorage.googleapis.com/v0/b/micromarket-35ab5.appspot.com/o/productos%2Fcategorias%2Falimento%20soya%20bebible%2Fsoy-chirimoya-300x300.jpg?alt=media&token=4810853d-8855-4448-8a2d-36e9533b2e06",
                    categoriaId = "1862b90e-034c-4ce2-9e26-0d3c8ce875e9"
                },
                new Product
                {
                    codigo = "DNT-01-0006",
                    nombre = "Soy vainilla bolsa 1.100 ML",
                    descripción = "El alimento bebible de soya no contiene lactosa",
                    precio = "9.99",
                    imagenURL = "https://firebasestorage.googleapis.com/v0/b/micromarket-35ab5.appspot.com/o/productos%2Fcategorias%2Falimento%20soya%20bebible%2Fsoy-vainilla-300x300.jpg?alt=media&token=adfae0b2-3cbd-4b3c-aea1-359d26ba400e",
                    categoriaId = "1862b90e-034c-4ce2-9e26-0d3c8ce875e9"
                }
                );
        }
        public DbSet<micromarket.Models.Product>? Product { get; set; }
        public DbSet<micromarket.Models.Category>? Category { get; set; }
  }
}
