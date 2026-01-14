namespace Backend.DTO.Post
{
    public class PostResponseDto
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string AuthorName { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<string> Images { get; set; }
    }
}
