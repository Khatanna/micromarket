using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace micromarket.Models
{
    [Table("rol")]
    public class Role
    {
        [Key]
        public string id { get; set; }

        [MaxLength(100)]
        public string nombre { get; set; }

        public ICollection<User> users { get; set; }

        public Role() { }
    }
}
