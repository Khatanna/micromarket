using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace micromarket.Models {
  [Table("almacen")]
  public class Store {
    [Key]
    public string id { get; set; }

    [ForeignKey("producto")]
    public string product_id { get; set; }
    
    public virtual Product? producto { get; set; }
    public int cantidad { get; set; }
    
    public virtual ICollection<Disposition>? disposiciones { get; set; }
    }
  }
