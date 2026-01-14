using Backend.DTO.UserDTO;

namespace Backend.DTO.Post
{
    public class CommentDto
    {
        public int CommentId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }

        public UserDto User { get; set; }
    }

}
