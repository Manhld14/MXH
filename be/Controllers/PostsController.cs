using Backend.Data;
using Backend.DTO;
using Backend.DTO.Post;
using Backend.DTO.UserDTO;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly TestAPIDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public PostsController(TestAPIDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _environment = env;
        }

        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts( int page = 1,int pageSize = 10,int? currentUserId = null)
        {
            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 10;

            var query = _context.Posts
                .AsNoTracking()
                .OrderByDescending(p => p.CreatedAt);

            var totalPosts = await query.CountAsync();

            var posts = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new PostDTO
                {
                    PostId = p.PostId,
                    Content = p.Content,
                    CreatedAt = p.CreatedAt,

                    User = new UserDto
                    {
                        UserId = p.User.UserId,
                        FullName = p.User.FullName,
                        AvatarUrl = p.User.AvatarUrl
                    },

                    Images = p.Images.Select(i => new PostImageDto
                    {
                        ImageId = i.ImageId,
                        ImageUrl = i.ImageUrl
                    }).ToList(),

                    LikeCount = p.Likes.Count(),
                    CommentCount = p.Comments.Count(),

                    IsLiked = currentUserId.HasValue &&
                              p.Likes.Any(l => l.UserId == currentUserId),

                    comments = p.Comments
                        .OrderBy(c => c.CreatedAt)
                        .Select(c => new CommentDto
                        {
                            CommentId = c.CommentId,
                            Content = c.Content,
                            CreatedAt = c.CreatedAt,
                            User = new UserDto
                            {
                                UserId = c.User.UserId,
                                FullName = c.User.FullName,
                                AvatarUrl = c.User.AvatarUrl
                            }
                        }).ToList()
                })
                .ToListAsync();

            return Ok(new
            {
                totalItems = totalPosts,
                page,
                pageSize,
                totalPages = (int)Math.Ceiling((double)totalPosts / pageSize),
                items = posts
            });
        }

        // POST: api/Posts/comment
        [HttpPost("comment")]
        public async Task<IActionResult> PostComment([FromBody] CreateCommentRequest dto)
        {
            // Kiểm tra Post
            var post = await _context.Posts.FindAsync(dto.PostId);
            if (post == null)
                return NotFound(new { message = "Post không tồn tại" });

            // Kiểm tra User
            var user = await _context.Users.FindAsync(dto.UserId);
            if (user == null)
                return NotFound(new { message = "User không tồn tại" });

            // Tạo comment
            var comment = new Comment
            {
                Content = dto.Content,
                UserId = dto.UserId,
                PostId = dto.PostId,
                CreatedAt = DateTime.Now,
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            // ⭐ Trả về đúng CommentDto FE đang dùng
            var result = new CommentDto
            {
                CommentId = comment.CommentId,
                Content = comment.Content,
                CreatedAt = comment.CreatedAt,

                User = new UserDto
                {
                    UserId = user.UserId,
                    FullName = user.FullName,
                    AvatarUrl = user.AvatarUrl
                }
            };

            return Ok(result);
        }




        // GET: api/Posts/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPostsByUser(int userId)
        {
            // Kiểm tra user có tồn tại
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound(new { message = "User not found" });

            // Lấy danh sách post của user
            var posts = await _context.Posts
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedAt)
                .Include(p => p.Images) // bao gồm ảnh
                .Include(p => p.Comments)
                    .ThenInclude(c => c.User).Include(p => p.Likes) // include user của comment
                .ToListAsync();

            // Map sang DTO
            var postDtos = posts.Select(p => new PostDTO
            {
                PostId = p.PostId,
                Content = p.Content,
                CreatedAt = p.CreatedAt,
                User = new UserDto
                {
                    UserId = p.UserId,
                    FullName = user.FullName,
                    AvatarUrl = user.AvatarUrl
                },
                Images = p.Images.Select(img => new PostImageDto
                {
                    ImageId = img.ImageId,
                    ImageUrl = img.ImageUrl
                }).ToList(),
                LikeCount = p.Likes.Count(),
                CommentCount = p.Comments.Count(),
                IsLiked = false // tuỳ bạn check user hiện tại đã like chưa
            }).ToList();

            return Ok(postDtos);
        }


        // PUT: api/Posts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(int id, UpdatePostDto dto)
        {
            if (id != dto.PostId)
            {
                return BadRequest();
            }


            var post = await _context.Posts
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.PostId == id);


            if (post == null)
                return NotFound("Không tìm thấy bài viết");

           


            try
            {
                // ✅ Update nội dung
                post.Content = dto.Content;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new
            {
                message = "Cập nhật bài viết thành công",
                post = new PostDTO
                {
                    PostId = post.PostId,
                    Content = post.Content,
                    CreatedAt = post.CreatedAt,
                    Images = post.Images.Select(img => new PostImageDto
                    {
                        ImageId = img.ImageId,
                        ImageUrl = img.ImageUrl
                    }).ToList(),
                    LikeCount = _context.Likes.Count(l => l.PostId == post.PostId),
                    CommentCount = _context.Comments.Count(c => c.PostId == post.PostId)
                }
            });
        }

        // POST: api/Posts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("create")]
        public async Task<ActionResult<PostResponseDto>> CreatePost([FromForm] CreatePost model)
        {
            // 1️⃣ Kiểm tra user
            var user = await _context.Users.FindAsync(model.UserId);
            if (user == null) return BadRequest(new { message = "User not found" });

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // 2️⃣ Tạo post
                var post = new Post
                {
                    UserId = model.UserId,
                    Content = model.Content,
                    CreatedAt = DateTime.Now
                };
                _context.Posts.Add(post);
                await _context.SaveChangesAsync(); // cần để lấy PostId

                // 3️⃣ Upload ảnh
                var webRoot = _environment.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                var uploadsFolder = Path.Combine(webRoot, "uploads");
                if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

                var imageUrls = new List<string>();

                if (model.Images != null)
                {
                    foreach (var file in model.Images)
                    {
                        if (file?.Length > 0)
                        {
                            var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
                            var filePath = Path.Combine(uploadsFolder, fileName);
                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await file.CopyToAsync(stream);
                            }

                            var img = new PostImage
                            {
                                PostId = post.PostId,
                                ImageUrl = $"/uploads/{fileName}"
                            };
                            _context.PostImages.Add(img);

                            imageUrls.Add(img.ImageUrl);
                        }
                    }
                    await _context.SaveChangesAsync();
                }

                await transaction.CommitAsync();

                // 4️⃣ Trả về DTO
                var response = new PostResponseDto
                {
                    PostId = post.PostId,
                    UserId = user.UserId,
                    AuthorName = user.FullName,
                    Content = post.Content,
                    CreatedAt = post.CreatedAt,
                    Images = imageUrls
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new { message = "Create post failed", error = ex.Message });
            }
        }


        // DELETE: api/Posts/5

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts
                .Include(p => p.Images)
                .Include(p => p.Comments)
                .Include(p => p.Likes)
                .FirstOrDefaultAsync(p => p.PostId == id);

            if (post == null)
                return NotFound(new { message = "Bài viết không tồn tại!" });

            // ✅ 1. XÓA FILE ẢNH VẬT LÝ
            foreach (var img in post.Images)
            {
                if (!string.IsNullOrEmpty(img.ImageUrl))
                {
                    // Bỏ dấu "/" đầu nếu có
                    var filePath = Path.Combine(
                        Directory.GetCurrentDirectory(),
                        "wwwroot",
                        img.ImageUrl.TrimStart('/')
                    );

                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                }
            }

            // ✅ 2. XÓA DB
            _context.PostImages.RemoveRange(post.Images);
            _context.Comments.RemoveRange(post.Comments);
            _context.Likes.RemoveRange(post.Likes);
            _context.Posts.Remove(post);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa bài viết và ảnh thành công!" });
        }



        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.PostId == id);
        }


    }
}
