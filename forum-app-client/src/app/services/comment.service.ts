import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentDTO,Comment } from '../interface/IComment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {


  http:HttpClient = inject(HttpClient);

  comment = signal<CommentDTO[]>([]);


  getComment(postId:number): Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(`${environment.apiUrl}/Comment/${postId}`);
  }

  addComment(comment: Comment): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Comment`,comment);
  }

  updateComment(comment:CommentDTO[]){
    this.comment.update(values => {
      return [...values, ...comment];
   });
  }
}
