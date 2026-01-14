namespace Backend.DTO.UserDTO
{
    public class UserDetailDto
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string AvatarUrl { get; set; }
        public string Email { get; set; }
        public DateTime Birthday { get; set; }
        public string Sex { get; set; }
    }
}
