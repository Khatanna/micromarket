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
  }
}
