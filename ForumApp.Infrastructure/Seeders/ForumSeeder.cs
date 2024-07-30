using Microsoft.EntityFrameworkCore;
using ForumApp.Infrastructure.Data;
using ForumApp.Core.Entities;
using System.Runtime.Intrinsics.X86;
using Microsoft.AspNetCore.Identity;
using ForumApp.Application.Services;

namespace ForumApp.Infrastructure.Seeders
{
    internal class ForumSeeder(ForumDbContext dbContext) : IForumSeeder
    {
        public async Task Seed()
        {
            if (dbContext.Database.GetPendingMigrations().Any())
            {
                await dbContext.Database.MigrateAsync();
            }
            if (await dbContext.Database.CanConnectAsync())
            {
                if (!dbContext.Users.Any())
                {
                    Comment comment= InsertExample();
                    dbContext.Comments.Add(comment);
                    await dbContext.SaveChangesAsync();
                }
            }
        }

        private Comment InsertExample()
        {
            User user1 = new User
            {
                Username = "ישראל ישראלי",
                PasswordHash = PasswordHasher.HashPassword("qwer1234")
            };
            Post post = new Post
            {
                Title = "Title",
                Content = "Content",
                User = user1,
                CreatedAt = DateTime.Now,
            };
            Comment comment = new Comment
            {
                Content = "comment",
                Post = post,
                UserId = user1.Id,
                User = user1,
                CreatedAt = DateTime.Now
            };
            return comment;
        }
    }



}
