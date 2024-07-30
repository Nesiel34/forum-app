using ForumApp.Application.Interfaces.Repository;
using ForumApp.Application.Interfaces.Services;
using ForumApp.Core.Entities;

namespace ForumApp.Application.Services
{
    internal class CommentService(ICommentRepository commentRepository) : ICommentService
    {
        public async Task AddCommentAsync(Comment comment)
        {
            comment.CreatedAt = DateTime.Now;
          await commentRepository.AddCommentAsync(comment);
        }

        public async Task<List<CommentDto>> GetCommentByIdAsync(int id)
        {
            return await commentRepository.GetAllCommentsByPostIdAsync(id);
        }
    }
}
