using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace micromarket.Models
{
    [Table("producto")]
    public class Product
    {
        [Key]
        public String? codigo { get; set; }
    [MaxLength(100)]
    public String nombre { get; set; }
        public String precio { get; set; }
    [MaxLength(255)]
    public String descripción { get; set; }

        public String? imagenURL { get; set; }

        [ForeignKey("categoria")]
        public String categoriaId { get; set; }        
        public virtual Category? categoria { get; set; }
    }
}
