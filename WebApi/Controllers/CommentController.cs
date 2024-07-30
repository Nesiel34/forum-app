using ForumApp.Application.Interfaces.Services;
using ForumApp.Application.Services;
using ForumApp.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ForumApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController(ICommentService commentService) : ControllerBase
    {


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                List<CommentDto> comment = await commentService.GetCommentByIdAsync(id);
                return Ok(comment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Comment comment)
        {
            try
            {
                await commentService.AddCommentAsync(comment);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
