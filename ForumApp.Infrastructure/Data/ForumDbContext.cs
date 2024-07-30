using Microsoft.EntityFrameworkCore;
using ForumApp.Core.Entities;

namespace ForumApp.Infrastructure.Data
{
    public class ForumDbContext(DbContextOptions<ForumDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // User-Post relationship
            modelBuilder.Entity<User>()
                .HasMany(u => u.Posts)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId)
                  .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
           .HasMany(u => u.Comments)
           .WithOne(c => c.User)
           .HasForeignKey(c => c.UserId)
             .OnDelete(DeleteBehavior.Restrict);

            // Post-Comment relationship
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Comments)
                .WithOne(c => c.Post)
                .HasForeignKey(c => c.PostId)
                  .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
