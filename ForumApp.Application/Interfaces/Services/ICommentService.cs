using ForumApp.Core.Entities;

namespace ForumApp.Application.Interfaces.Services
{
    public interface ICommentService
    {
        Task<List<CommentDto>> GetCommentByIdAsync(int id);
        Task AddCommentAsync(Comment comment);
    }
}
