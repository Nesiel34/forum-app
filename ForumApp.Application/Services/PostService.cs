using ForumApp.Application.Interfaces.Repository;
using ForumApp.Application.Interfaces.Services;
using ForumApp.Core.Entities;

namespace ForumApp.Application.Services
{
    public class PostService(IPostRepository postRepository) : IPostService
    {
        public async Task AddPostAsync(Post post)
        {
            post.CreatedAt = DateTime.Now;
            await postRepository.AddPostAsync(post);
        }

        public async Task<List<PostDto>> GetAllPostsAsync()
        {
            return await postRepository.GetAllPostsAsync();
        }

    }
}
