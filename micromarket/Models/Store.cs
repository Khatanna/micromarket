using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace micromarket.Models
{
    [Table("almacen")]
    public class Store
    {
        [Key]
        public string id { get; set; }

        public Product producto { get; set; }

        public int cantidad { get; set; }
    }
}
