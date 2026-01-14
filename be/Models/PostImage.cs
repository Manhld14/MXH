using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class PostImage
    {
        [Key]
        public int ImageId { get; set; }
        public string ImageUrl { get; set; }
        [ForeignKey("Post")]

        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
