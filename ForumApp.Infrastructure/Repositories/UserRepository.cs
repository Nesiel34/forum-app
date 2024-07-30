using ForumApp.Application.Interfaces.Repository;
using ForumApp.Application.Services;
using ForumApp.Core.Entities;
using ForumApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace ForumApp.Infrastructure.Repositories
{
    public class UserRepository(ForumDbContext context) : IUserRepository
    {

        public async Task<int> CreateUserAsync(User user)
        {
            user.PasswordHash = PasswordHasher.HashPassword(user.PasswordHash);
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return user.Id;
        }

        public async Task<int> GetUserAsync(User user)
        {
            User userFind = await context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);
            if(userFind == null)
            {
                return -1;
            }
            else
            {
                if(PasswordHasher.VerifyPassword(user.PasswordHash, userFind.PasswordHash))
                {
                    return userFind.Id;
                }
                else
                {
                    return -1;
                }
            }
        }
    }
}
