using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Backend.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Sex { get; set; }
        public DateTime Birthday { get; set; }
        public string? AvatarUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        [ValidateNever]
        public List<Post> Posts { get; set; }
        [ValidateNever]

        public List<Comment> Comments { get; set; }

        [ValidateNever]

        public List<PostLike> Likes { get; set; }
    }
}
