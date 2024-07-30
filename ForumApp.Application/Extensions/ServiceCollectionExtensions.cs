using ForumApp.Application.Services;
using Microsoft.Extensions.DependencyInjection;
using ForumApp.Application.Interfaces.Services;

namespace ForumApp.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IPostService,PostService>();
        services.AddScoped<ICommentService, CommentService>();
    }
}