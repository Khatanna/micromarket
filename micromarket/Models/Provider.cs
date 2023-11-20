using System.ComponentModel.DataAnnotations;

namespace micromarket.Models {
  public class Provider {
    [Key]
    public String id { get; set; }

    public String nombre { get; set; }

    public virtual ICollection<Buy> compras { get; set; }
    }
  }
