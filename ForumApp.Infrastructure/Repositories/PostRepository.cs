using ForumApp.Application.Interfaces.Repository;
using ForumApp.Core.Entities;
using ForumApp.Infrastructure.Data;
using ForumApp.Infrastructure.Hub;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace ForumApp.Infrastructure.Repositories
{
    public class PostRepository(ForumDbContext context, IHubContext<ForumHub> hubContext) : IPostRepository
    {
        public async Task AddPostAsync(Post post)
        {

            context.Posts.Add(post);
            await context.SaveChangesAsync();
            Post postToRecive = context.Posts
           .Include(u => u.User)
           .FirstOrDefault(f => f.Id == post.Id);
            if (postToRecive != null)
            {
                PostDto postDto = new PostDto
                {
                    Id = postToRecive.Id,
                    Content = postToRecive.Content,
                    Title = postToRecive.Title,
                    Timestamp = postToRecive.CreatedAt,
                    Username = postToRecive.User.Username,
                    Comments = new List<CommentDto>()
                };
                await hubContext.Clients.All.SendAsync("ReceivePost", postDto);
            }
        }

        public async Task<List<PostDto>> GetAllPostsAsync()
        {
            List<Post> posts = await context.Posts
                .Include(p => p.User)
                .Include(p => p.Comments)
                .ThenInclude(c => c.User)
                .ToListAsync();


            return posts.Select(p => new PostDto
            {
                Id = p.Id,
                Title = p.Title,
                Content = p.Content,
                Timestamp = p.CreatedAt,
                Username = p.User.Username,
                Comments = p.Comments.Select(c => new CommentDto
                {
                    Id = c.Id,
                    Content = c.Content,
                    Timestamp = c.CreatedAt,
                    Username = c.User.Username
                }).ToList()
            }).ToList();
        }
    }
    
}
