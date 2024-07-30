using ForumApp.Core.Entities;

namespace ForumApp.Application.Interfaces.Services
{
    public interface IPostService
    {
        Task<List<PostDto>> GetAllPostsAsync();
        Task AddPostAsync(Post post);
    }
}
