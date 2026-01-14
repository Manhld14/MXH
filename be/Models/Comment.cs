using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Backend.Models
{
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        [ValidateNever]
        public User User { get; set; }
        [ForeignKey("Post")]

        public int PostId { get; set; }
        [ValidateNever]
        public Post Post { get; set; }
    }
}
