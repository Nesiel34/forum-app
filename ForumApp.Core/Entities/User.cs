using System.ComponentModel.DataAnnotations;


namespace ForumApp.Core.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        [DataType(DataType.Password)]
        public string PasswordHash { get; set; }
        public ICollection<Post>? Posts { get; set; }
        public ICollection<Comment>? Comments { get; set; }

    }
}
