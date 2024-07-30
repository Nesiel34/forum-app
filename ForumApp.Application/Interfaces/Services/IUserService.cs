using ForumApp.Core.Entities;

namespace ForumApp.Application.Interfaces.Services
{
    public interface IUserService
    {
        Task<int> GetUserAsync(User user);
        Task<int> CreateUserAsync(User user);
    }
}
