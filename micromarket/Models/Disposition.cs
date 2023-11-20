using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace micromarket.Models {
  public class Disposition {
    [Key]
    public string id {  get; set; }
    [ForeignKey("almacen")]
    public string almacen_id { get; set; }
    
    public int disposicion { get; set; }
    public virtual Store almacen { get; set; }

    public string codigo { get; set; }
    }
  }
