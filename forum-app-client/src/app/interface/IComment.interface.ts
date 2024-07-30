export interface CommentDTO {
  id: number;
  content: string;
  timestamp: Date;
  username:string;
  postId:number;
}

export interface Comment{
  content:string;
  userId:number;
  postId:number;
}
