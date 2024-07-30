using ForumApp.Application.Interfaces.Services;
using ForumApp.Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ForumApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController(IPostService postService) : ControllerBase
    {


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
             List<PostDto> posts = await postService.GetAllPostsAsync();
             return Ok(posts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Post post)
        {
            try
            {
              await  postService.AddPostAsync(post);
              return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }
    }
 
}
