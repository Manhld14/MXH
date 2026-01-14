using Backend.DTO.UserDTO;

namespace Backend.DTO.Post
{
    public class PostDetailDto
    {
        public int PostId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }

        public UserLogin User { get; set; }

        public List<string> Images { get; set; }

        public List<CommentDto> Comments { get; set; }
        public int LikeCount { get; set; }
    }
}
