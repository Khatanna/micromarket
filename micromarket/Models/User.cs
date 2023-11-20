
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace micromarket.Models
{
   
  [Table("usuario")]
  public class User
  {
    [Key]
    public string id { get; set; }
    public string? nombre_de_usuario { get; set; }
    [MaxLength(100)]
    public string? contraseña { get; set; }
    [MaxLength(100)]
    public string nombres { get; set; }
    [MaxLength(100)]
    public string apellido_paterno { get; set; }
    [MaxLength(100)]
    public string apellido_materno { get; set; }

    [DefaultValue("ENABLE")]
    public string? estado { get; set; }
    public ICollection<Role>? roles { get; set; }


    public User() { }
  }
}
