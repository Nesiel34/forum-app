using ForumApp.Application.Interfaces.Services;
using ForumApp.Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ForumApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService userService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(User user)
        {
           int userID =  await userService.CreateUserAsync(user);
            return Ok(userID);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Get([FromBody] User user)
        {
            int userId=  await userService.GetUserAsync(user);
            return Ok(userId);
        }
    }
}
