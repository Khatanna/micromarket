using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace micromarket.Models
{
  [Table("categoria")]
  public class Category
  {
    [Key]
    public String id { get; set; }

    public String nombre { get; set; }

    public String prefijo { get; set; }
    public String? padre_id {get; set;} 
    
    public virtual Category? padre { get; set; } 
    
    public ICollection<Product>? productos { get; set; }
    
    public ICollection<Category>? categorias { get; set; }
  }
}
