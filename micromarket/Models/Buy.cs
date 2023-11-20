using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace micromarket.Models {
  [Table("Compra")]
  public class Buy {
    [Key]
    public string id {  get; set; }
    public string fecha_de_compra {  get; set; }

    [ForeignKey("usuario")]
    public virtual string usuario_id {  get; set; }
    public int cantidad { get; set; }
    public double precio_total { get; set; }
    public User usuario { get; set; }
    [ForeignKey("producto")]
    public virtual string? product_id {  get; set; }
    public Product producto{ get; set; }
    [ForeignKey("proveedor")]
    public virtual string? proveedor_id {  get; set; }
    public Provider proveedor { get; set; }
    }
  }
