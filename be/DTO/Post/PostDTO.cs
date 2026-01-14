using Backend.DTO.UserDTO;
using Backend.Models;

namespace Backend.DTO.Post
{
    public class PostDTO
    {
        public PostDTO()
        {
            
        }

        public int PostId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }

        public UserDto User { get; set; }

        public List<PostImageDto> Images { get; set; }
        public int LikeCount { get; set; }
        public int CommentCount { get; set; }

        public bool IsLiked { get; set; }

        public List<CommentDto> comments { get; set; }
    }
}
