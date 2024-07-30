import { inject, Injectable, signal } from '@angular/core';
import { Post, PostDTO } from '../interface/IPost.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Comment, CommentDTO } from '../interface/IComment.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  http:HttpClient = inject(HttpClient);

  post = signal<PostDTO[]>([]);

  getPosts(): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(`${environment.apiUrl}/Post`);
  }

  addPost(post: Post): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Post`,post);
  }

  updatePost(post:PostDTO[]){
    this.post.update(values => {
      return [...values, ...post];
   });
  }

  addCommentToPost(comment:CommentDTO){
    let newObj =  this.post().map((item) => {
      if(item.id===comment.postId){
        item.comments.push(comment);
      }
      return item;
    });
    this.post.set(newObj)
    }

}
