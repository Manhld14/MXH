using Backend.Data;
using Backend.DTO.UserDTO;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TestAPIDbContext _context;
        private readonly IWebHostEnvironment _env;

        public UsersController(TestAPIDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;

        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("update-profile/{id}")]
        public async Task<IActionResult> UpdateProfile(int id,[FromForm] UpdateUserDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            user.FullName = dto.FullName;
            user.Email = dto.Email;
            user.Birthday = dto.Birthday;
            user.Sex = dto.Sex;

            // ✅ Upload avatar
            if (dto.Avatar != null)
            {
                var folder = Path.Combine(_env.WebRootPath, "avatars");
                Directory.CreateDirectory(folder);

                var fileName = Guid.NewGuid() + Path.GetExtension(dto.Avatar.FileName);
                var path = Path.Combine(folder, fileName);

                using var stream = new FileStream(path, FileMode.Create);
                await dto.Avatar.CopyToAsync(stream);

                user.AvatarUrl = "/avatars/" + fileName;
            }

            await _context.SaveChangesAsync();

            return Ok(new UserDetailDto
            {
                UserId = user.UserId,
                FullName = user.FullName,
                AvatarUrl = user.AvatarUrl,
                Email = user.Email,
                Birthday = user.Birthday,
                Sex = user.Sex
            });
        }


        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            user.AvatarUrl = "/Img/defauAVT.jpg";
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLogin request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == request.Email);

            if (user == null)
                return BadRequest(new { message = "User không tồn tại!" });

            if (user.PasswordHash != request.PasswordHash)
                return BadRequest(new { message = "Sai mật khẩu" });

            return Ok(new
            {
                message = "Đăng nhập thành công",
                user = new
                {
                    user.UserId,
                    user.Email,
                    user.FullName,
                    user.AvatarUrl,
                    user.Birthday,
                    user.Sex,
                    user.CreatedAt
                }
            });
        }
    }
}
