﻿namespace ForumApp.Core.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int PostId { get; set; }
        public Post? Post { get; set; }
    }

    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public string Username { get; set; }
        public int PostId { get; set; }
    }
}
