namespace Backend.DTO.UserDTO
{
    public class UpdateUserDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public DateTime Birthday { get; set; }
        public string Sex { get; set; }

        public IFormFile? Avatar { get; set; }  // ✅ Upload ảnh
    }
}
