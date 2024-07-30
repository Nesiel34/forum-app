using ForumApp.Core.Entities;

namespace ForumApp.Application.Interfaces.Repository
{
    public interface IPostRepository
    {
        Task<List<PostDto>> GetAllPostsAsync();
        Task AddPostAsync(Post post);
    }
}
