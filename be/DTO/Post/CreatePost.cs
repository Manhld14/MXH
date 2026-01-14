namespace Backend.DTO.Post
{
    public class CreatePost
    {
        public int UserId { get; set; }
        public string Content { get; set; }
        public List<IFormFile>? Images { get; set; } // nhiều ảnh
    }
}
