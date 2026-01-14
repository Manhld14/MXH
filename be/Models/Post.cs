using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace Backend.Models
{
    public class Post
    {
        [Key]
        public int PostId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        [ForeignKey("User")]

        public int UserId { get; set; }
        public User User { get; set; }

        public List<PostImage> Images { get; set; }
        public List<Comment> Comments { get; set; }
        public List<PostLike> Likes { get; set; }
    }
}
