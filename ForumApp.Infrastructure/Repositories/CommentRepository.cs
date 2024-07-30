using ForumApp.Application.Interfaces.Repository;
using ForumApp.Core.Entities;
using ForumApp.Infrastructure.Data;
using ForumApp.Infrastructure.Hub;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace ForumApp.Infrastructure.Repositories
{
    public class CommentRepository(ForumDbContext context, IHubContext<ForumHub> hubContext) : ICommentRepository
    {
        public async Task AddCommentAsync(Comment comment)
        {
            context.Comments.Add(comment);
            await context.SaveChangesAsync();
           Comment commentToRecive =  context.Comments
                .Include(u => u.User)
                .FirstOrDefault(f => f.Id == comment.Id);
            if(commentToRecive!= null) {
                CommentDto commentDto = new CommentDto
                {
                    Id = commentToRecive.Id,
                    Content = commentToRecive.Content,
                    Timestamp = commentToRecive.CreatedAt,
                    Username = commentToRecive.User.Username,
                    PostId = commentToRecive.PostId,
                };
                await hubContext.Clients.All.SendAsync("ReceiveComment", commentDto);
            }
        }

        public async Task<List<CommentDto>> GetAllCommentsByPostIdAsync(int id)
        {
            List<Comment> comments =  await context.Comments
                .Where(w=>w.PostId == id)
                .Include(u=>u.User)
                .ToListAsync();
            return comments.Select(p => new CommentDto
            {
                Id = p.Id,
                Content = p.Content,
                Timestamp = p.CreatedAt,
                Username = p.User.Username,
            }).ToList();
        }
    }
}
