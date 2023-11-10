using Microsoft.EntityFrameworkCore;
using micromarket.Models;

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
        }
  }
}
