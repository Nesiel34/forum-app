import { CommentDTO } from "./IComment.interface";

export interface PostDTO {
  id: number;
  title: string;
  content: string;
  timestamp: Date;
  username:string;
  comments:CommentDTO[];
}


export interface Post {
  id: number;
  title: string;
  content: string;
  userId:number;
}
