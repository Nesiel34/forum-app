import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;
  private postService:PostService = inject(PostService);

  constructor() {


    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${environment.hub}`)
    .build();

    this.hubConnection
    .start()
    .then(() => console.log('Connection started'))
    .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('ReceivePost', (post) => {
      console.log(post);
      this.postService.updatePost([post]);
    });

    this.hubConnection.on('ReceiveComment', (comment) => {
        this.postService.addCommentToPost(comment);
    });
  }



}
