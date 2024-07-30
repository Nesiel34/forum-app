using ForumApp.Core.Entities;
using Microsoft.AspNetCore.SignalR;

namespace ForumApp.Infrastructure.Hub
{
    public class ForumHub : Microsoft.AspNetCore.SignalR.Hub
    {

        public async Task SendPost(PostDto post)
        {
            await Clients.All.SendAsync("ReceivePost", post);
        }

        public async Task SendComment(CommentDto comment)
        {
            await Clients.All.SendAsync("ReceiveComment", comment);
        }
    }
}
