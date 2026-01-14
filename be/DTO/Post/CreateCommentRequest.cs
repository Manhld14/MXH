namespace Backend.DTO.Post
{
    public class CreateCommentRequest
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string Content { get; set; }
    }
}
