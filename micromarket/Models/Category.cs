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

        public ICollection<Product>? productos { get; set; }
    }
}
