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

            modelBuilder.Entity<Category>().HasData(
                new Category { id = "1862b90e-034c-4ce2-9e26-0d3c8ce875e9", nombre = "Alimento bebible de Soya" },
                new Category { id = "20368c37-79ab-4bde-aca2-1ff189012374", nombre = "Bebida lactea" },
                new Category { id = "968c060a-d5d4-4d3c-997f-80821d65f022", nombre = "Bebidas - Agua" },
                new Category { id = "984709a0-79f0-4825-9242-940cdeec6f92", nombre = "Bebidas - Bebida refrescante" },
                new Category { id = "9cf7e664-68e5-424f-9dc1-de4780e2c789", nombre = "Bebidas - Juguitos" }
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
