using ForumApp.Core.Entities;


namespace ForumApp.Application.Interfaces.Repository
{
    public interface ICommentRepository
    {
        Task<List<CommentDto>> GetAllCommentsByPostIdAsync(int id);
        Task AddCommentAsync(Comment comment);
    }
}
