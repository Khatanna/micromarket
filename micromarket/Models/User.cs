
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace micromarket.Models
{
   
  [Table("usuario")]
  public class User
  {
    [Key]
    public string nombre_de_usuario { get; set; }
    public string nombres { get; set; }
    public string apellido_paterno { get; set; }
    public string apellido_materno { get; set; }
    public string estado { get; set; }
    public ICollection<Role> roles { get; set; }

    public User() { }
  }
}
