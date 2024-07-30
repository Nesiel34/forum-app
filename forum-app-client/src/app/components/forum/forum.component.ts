import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostComponent } from '../post/post.component';
import { MatButton } from '@angular/material/button';
import {  MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [PostComponent,MatButton],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent implements OnInit {

  public postService:PostService = inject(PostService);
  readonly dialog = inject(MatDialog);


  ngOnInit(): void {
    this.postService.updatePost([]);
    this.postService.getPosts().subscribe(posts=>{
      this.postService.updatePost(posts);
    })
  }

  openPostDialog(){
    this.dialog.open(PostDialogComponent)
  }

}
