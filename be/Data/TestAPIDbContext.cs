using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class TestAPIDbContext : DbContext
    {
        public TestAPIDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Models.User> Users { get; set; }
        public DbSet<Models.Post> Posts { get; set; }

        public DbSet<Models.Comment> Comments { get; set; }

        public DbSet<Models.PostLike> Likes { get; set; }
        public DbSet<Models.PostImage> PostImages { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // USER - POST  (1 - Many)
            modelBuilder.Entity<Post>()
                .HasOne(p => p.User)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // USER - COMMENT (1 - Many)
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // POST - COMMENT (1 - Many)
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            // USER - LIKE (1 - Many)
            modelBuilder.Entity<PostLike>()
                .HasOne(l => l.User)
                .WithMany(u => u.Likes)
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // POST - LIKE (1 - Many)
            modelBuilder.Entity<PostLike>()
                .HasOne(l => l.Post)
                .WithMany(p => p.Likes)
                .HasForeignKey(l => l.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            // POST - POSTIMAGE (1 - Many)
            modelBuilder.Entity<PostImage>()
                .HasOne(i => i.Post)
                .WithMany(p => p.Images)
                .HasForeignKey(i => i.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            // UNIQUE LIKE (User cannot like same post twice)
            modelBuilder.Entity<PostLike>()
                .HasIndex(l => new { l.UserId, l.PostId })
                .IsUnique();
        }



    }
}
