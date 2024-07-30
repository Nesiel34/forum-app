using ForumApp.Core.Entities;

namespace ForumApp.Application.Interfaces.Repository
{
    public interface IUserRepository
    {
        Task<int> GetUserAsync(User user);
        Task<int> CreateUserAsync(User user);
    }
}
