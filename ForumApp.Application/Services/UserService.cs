using ForumApp.Application.Interfaces.Repository;
using ForumApp.Application.Interfaces.Services;
using ForumApp.Core.Entities;

namespace ForumApp.Application.Services
{
    public class UserService(IUserRepository userRepository) : IUserService
    {
        public async Task<int> GetUserAsync(User user)
        {
            return await userRepository.GetUserAsync(user);
        }

        public async Task<int> CreateUserAsync(User user)
        {
            return await userRepository.CreateUserAsync(user);
        }

    }
}
